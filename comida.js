/* Tsuyo · Comida (módulo en pruebas, partes 1 y 2).
   Una sola cifra que importa: la proteína del día, calculada con el peso (1,6 g por kilo por defecto, hasta 2,2).
   Lo que cuenta es el total del día y la media de la semana; nada se pinta en rojo y no hay rachas.
   Los alimentos de la lista vienen de la tabla Ciqual 2025 (foods.js). Se apuntan con habituales, buscando o «a ojo».
   Datos: DB.cfg.mods.diet (encendido), DB.cfg.food = {kg, gk, man}, DB.diet[día].items = [{n,id,g,k,p,c,f,t,r}].
   Parte 2 (tsuyo-v28): Mis platos y productos (DB.mine[m…] = valores por ración) y escáner con Open Food Facts.
   Los gramos por kilo los pone Tsuyo según el objetivo (1,6; 2,2 al bajar grasa). Solo si man = 1 manda el gk que eligió la persona.
   Se carga antes que app.js: las funciones de la app (openSheet, ic, $…) solo se usan al llamar. */
'use strict';

/* ═════ CÁLCULOS ═════ */
const FOOD_BY={};FOODS.forEach(x=>{FOOD_BY['c'+x[0]]=x});
const GK_OPTS=[1.6,1.8,2,2.2];
const foodOn=()=>!!(DB&&DB.cfg&&DB.cfg.mods&&DB.cfg.mods.diet);
/* 1,6 g/kg: por encima, de media ya no se gana más músculo (Morton y otros, 2018).
   2,2 g/kg al bajar grasa: en déficit, más proteína ayuda a no perder músculo (ISSN 2017; Helms y otros, 2014). */
const autoGk=()=>DB.profile&&DB.profile.goal==='grasa'?2.2:1.6;
const foodCfg=()=>{const f=Object.assign({},DB.cfg.food||{});if(!f.man||!f.gk)f.gk=autoGk();return f};
/* objetivo de proteína en gramos al día: peso × g/kg; sin peso no hay objetivo */
function protGoal(){const f=foodCfg();return f.kg?Math.round(f.kg*f.gk):0}
const dayItems=d=>((DB.diet[d]||{}).items||[]);
const sumP=d=>dayItems(d).reduce((a,x)=>a+(x.p||0),0);
const fr1=n=>Math.round(n*10)/10;
const fmtG=n=>String(fr1(n)).replace('.',',');
const gTxt=n=>fmtG(Math.round(n))+' g';
const normTxt=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
/* valores de una cantidad de un alimento de la lista */
function foodAt(f,g){const q=g/100;return{n:f[1],id:'c'+f[0],g:Math.round(g),k:Math.round(f[3]*q),p:fr1(f[4]*q),c:fr1(f[5]*q),f:fr1(f[6]*q)}}
const nowHM=()=>{const d=new Date();return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')};
/* habituales: lo que más has apuntado en los últimos 30 días, con la última cantidad que usaste */
/* cuentan los alimentos de la lista, lo de Mis platos y lo «a ojo» con nombre (mismo nombre y misma proteína = lo mismo) */
function habKey(x){
  if(!x.id)return null;if(FOOD_BY[x.id])return x.id;if(x.id[0]==='m')return DB.mine[x.id]?x.id:null;
  if(x.id==='q'&&x.n&&x.n!=='A ojo')return 'q|'+normTxt(x.n)+'|'+Math.round(x.p);return null;
}
function foodHabits(max){
  const by={},from=shiftD(T(),-30);
  Object.keys(DB.diet).filter(d=>d>=from).sort().forEach(d=>dayItems(d).forEach(x=>{
    const k=habKey(x);if(!k)return;const o=by[k]||(by[k]={k,n:0,last:d});o.n++;o.x=x;o.last=d}));
  return Object.values(by).sort((a,b)=>b.n-a.n||b.last.localeCompare(a.last)).slice(0,max||6);
}
function habRow(h){
  const x=h.x;if(FOOD_BY[x.id])return foodRow(FOOD_BY[x.id],x.g||FOOD_BY[x.id][7],1);
  if(x.id[0]==='m')return mineRow(x.id,x.r||1,1);
  return '<div class="cell static frow"><button class="cb" style="padding-left:2px;text-align:left" onclick="openFoodQ(null,\''+h.k.replace(/'/g,'')+'\')"><div class="tt"><p class="bd ell">'+esc(x.n)+'</p><p class="fn l2 num">A ojo · '+gTxt(x.p)+' de proteína</p></div></button>'+
    '<button class="ibtn fadd" onclick="foodQuickK(\''+h.k.replace(/'/g,'')+'\')" aria-label="Añadir '+esc(x.n)+', '+gTxt(x.p).replace(' g',' gramos')+' de proteína">'+ic('plus',18,2.6)+'</button></div>';
}
function foodQuickK(k){const h=foodHabits(50).find(z=>z.k===k);if(!h)return;const x={n:h.x.n,id:'q',p:h.x.p,k:h.x.k||0};foodPush(x);foodAdded(x)}
/* semana de lunes a domingo del día que se está viendo */
function foodWeek(d){const m=mondayOf(d);return Array.from({length:7},(_,i)=>{const x=shiftD(m,i);return{d:x,p:sumP(x),n:dayItems(x).length}})}

/* ═════ PANTALLA COMIDA ═════ */
let FD=null;                                     // día que se está viendo (por defecto, hoy)
const fdDay=()=>{if(!FD||FD>T())FD=T();return FD};
function foodDayTxt(d){return d===T()?'Hoy':(d===shiftD(T(),-1)?'Ayer':longDate(d))}
function protRing(p,goal,size){
  const s=size||132,sw=s>80?12:6,r=(s-sw)/2,C=2*Math.PI*r,pct=goal?Math.min(1,p/goal):0;
  return '<div class="ring" style="width:'+s+'px;height:'+s+'px" aria-hidden="true"><svg width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'"><circle cx="'+s/2+'" cy="'+s/2+'" r="'+r+'" fill="none" stroke="var(--fill)" stroke-width="'+sw+'"/>'+
    '<circle cx="'+s/2+'" cy="'+s/2+'" r="'+r+'" fill="none" stroke="var(--tint)" stroke-width="'+sw+'" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(C*(1-pct))+'"/></svg>'+
    (s>80?'<div class="in"><span class="t1 num rnd">'+Math.round(p)+'</span><span class="c1 l2">de '+goal+' g</span></div>':'<div class="in">'+(pct>=1?ic('check',16,2.8):'')+'</div>')+'</div>';
}
function protSay(p,goal){const L=Math.max(0,Math.round(goal-p));return 'Proteína, '+Math.round(p)+' de '+goal+' gramos'+(L?', faltan '+L:', objetivo cumplido')}
function protLeft(p,goal){const L=Math.round(goal-p);return L>0?'Faltan '+L+' g':'Objetivo cumplido'}
function weekBars(W,goal){
  const Wd=330,H=118,top=10,bot=22,mx=Math.max(goal*1.25,...W.map(x=>x.p),1),cw=Wd/7,Y=v=>top+(H-top-bot)*(1-v/mx);
  let g='<line x1="0" x2="'+Wd+'" y1="'+Y(goal)+'" y2="'+Y(goal)+'" stroke="var(--ink)" stroke-dasharray="4 4" stroke-width="1.2"/>';
  W.forEach((x,i)=>{const bx=i*cw+7,bw=cw-14,h=Math.max(x.n?3:0,(H-top-bot)*(x.p/mx)),isT=x.d===T(),isF=x.d===fdDay();
    g+='<rect x="'+bx+'" y="'+(H-bot-h)+'" width="'+bw+'" height="'+h+'" rx="5" fill="'+(x.p>=goal?'var(--tint)':'var(--fill)')+'"'+(isF?' stroke="var(--ink)" stroke-width="1.5"':'')+'/>'+
      '<text x="'+(bx+bw/2)+'" y="'+(H-6)+'" text-anchor="middle" font-size="11" fill="'+(isT?'var(--ink)':'var(--label3)')+'" font-weight="'+(isT?600:400)+'">'+WDL[wdOf(x.d)]+'</text>'});
  const lab='Proteína por día esta semana, objetivo '+goal+' gramos: '+W.map(x=>DIAS[wdOf(x.d)]+', '+(x.n?Math.round(x.p)+' gramos':'sin apuntar')).join('; ');
  return '<svg viewBox="0 0 '+Wd+' '+H+'" width="100%" role="img" aria-label="'+lab+'">'+g+'</svg>';
}
function renderComida(){
  const v=$('v-comida');if(!v)return;
  const d=fdDay(),goal=protGoal(),p=sumP(d),items=dayItems(d).map((x,i)=>Object.assign({i},x)).sort((a,b)=>(a.t||'').localeCompare(b.t||''));
  let h='<div class="head"><div><h1 class="lt">Comida</h1><p class="sb l2 sub">Proteína del día · en pruebas</p></div></div>';
  h+='<div class="pad" style="padding-top:12px"><div class="fday" role="group" aria-label="Día">'+
    '<button class="ibtn" onclick="foodGoDay(-1)" aria-label="Día anterior"'+(d<=shiftD(T(),-60)?' disabled':'')+'>'+ic('chevL',18,2.4)+'</button>'+
    '<p class="hl center grow" aria-live="polite">'+foodDayTxt(d)+(d===T()||d===shiftD(T(),-1)?'<span class="fn l2"> · '+fmtD(d)+'</span>':'')+'</p>'+
    '<button class="ibtn" onclick="foodGoDay(1)" aria-label="Día siguiente"'+(d>=T()?' disabled':'')+'>'+ic('chevR',18,2.4)+'</button></div></div>';
  h+='<div class="pad" style="padding-top:8px">';
  if(!goal){
    h+='<div class="card" style="padding:20px"><h2 class="t2">Pon tu peso</h2><p class="sb l2" style="margin-top:4px">Tsuyo calcula tu proteína del día a partir de tu peso.</p><button class="btn pri" style="margin-top:16px" onclick="openFoodSetup()">Poner mi peso</button></div>';
  }else{
    h+='<div class="card" style="padding:18px 18px 16px"><div class="row" style="gap:18px" role="img" aria-label="'+protSay(p,goal)+'">'+protRing(p,goal,132)+
      '<div class="grow"><p class="fn l2">Proteína</p><p class="t2 num">'+protLeft(p,goal)+'</p><p class="fn l2" style="margin-top:2px">'+(items.length?items.length+(items.length===1?' cosa apuntada':' cosas apuntadas'):'Nada apuntado '+(d===T()?'todavía':'ese día'))+'</p></div></div>'+
      '<button class="btn pri" style="margin-top:16px" onclick="openFoodAdd()">'+ic('plus',20,2.6)+'Apuntar</button></div>';
  }
  h+='</div>';
  if(items.length){
    h+='<div class="sec"><div class="stitle"><h3 class="t3">'+(d===T()?'Hoy':foodDayTxt(d))+'</h3><span class="fn l2 num">'+gTxt(p)+' de proteína</span></div><div class="pad"><div class="group">'+
      items.map(x=>'<button class="cell" onclick="openFoodItem('+x.i+')"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(x.n)+'</p><p class="fn l2 num">'+(x.id==='q'?'A ojo':(x.id&&x.id[0]==='m'?rTxt(x.r||1)+(x.g?' ('+x.g+' '+((DB.mine[x.id]||{}).u||'g')+')':''):(x.g?x.g+' g':'Importado')))+' · '+gTxt(x.p||0)+' de proteína</p></div><span class="fn l2 num">'+esc(x.t||'')+'</span>'+chev()+'</div></button>').join('')+'</div></div></div>';
  }
  if(goal){
    const W=foodWeek(d),Wn=W.filter(x=>x.n),avg=Wn.length?Wn.reduce((a,x)=>a+x.p,0)/Wn.length:0,cur=mondayOf(d)===mondayOf(T());
    h+='<div class="sec"><div class="stitle"><h3 class="t3">'+(cur?'Esta semana':'Semana del '+fmtD(mondayOf(d)))+'</h3>'+(Wn.length?'<span class="fn l2 num">media '+Math.round(avg)+' g</span>':'')+'</div><div class="pad"><div class="card" style="padding:14px 14px 10px">'+
      '<p class="fn l2">'+(Wn.length>1?'Media de los '+Wn.length+' días apuntados: '+Math.round(avg)+' g ('+Math.round(avg/goal*100)+' % del objetivo).':(Wn.length?'Un día apuntado: '+Math.round(avg)+' g ('+Math.round(avg/goal*100)+' % del objetivo).':'Cuando apuntes, verás aquí cada día de la semana.'))+'</p>'+
      '<div class="chart">'+weekBars(W,goal)+'</div><p class="c1 l2" style="padding:4px 2px 0">La línea es tu objetivo. Cuenta la media de la semana, no un día suelto.</p></div></div></div>';
  }
  h+='<div class="sec"><div class="pad"><div class="group">'+
    '<button class="cell" onclick="openMineList()"><span class="ic gray">'+ic('list',17)+'</span><div class="cb"><div class="tt"><p class="bd">Mis platos y productos</p><p class="fn l2">'+(mineIds().length?mineIds().length+' guardados':'Lo que tomas a menudo, de un toque')+'</p></div>'+chev()+'</div></button>'+
    '<button class="cell" onclick="openFoodSetup()"><span class="ic gray">'+ic('pen',17)+'</span><div class="cb"><div class="tt"><p class="bd">Mi objetivo</p><p class="fn l2 num">'+(goal?foodCfg().kg+' kg × '+fmtG(foodCfg().gk)+' g = '+goal+' g al día':'Falta tu peso')+'</p></div>'+chev()+'</div></button>'+
    '<button class="cell" onclick="openGuide(\'proteina\')"><span class="ic gray">'+ic('book',17)+'</span><div class="cb"><span class="tt bd">Por qué esta cifra</span>'+chev()+'</div></button></div>'+
    '<p class="c1 l3" style="padding:12px 16px 0">Valores de la tabla Ciqual 2025 (Anses, Francia). Lo escaneado, de Open Food Facts (licencia ODbL).</p></div></div>';
  v.innerHTML=h;
}
function foodGoDay(n){const d=shiftD(fdDay(),n);if(d>T()||d<shiftD(T(),-60))return;FD=d;renderComida();say(foodDayTxt(d)+'. '+(protGoal()?protSay(sumP(d),protGoal()):''))}

/* ═════ PESTAÑA Y LÍNEA EN HOY ═════ */
function applyFoodTab(){
  const t=document.querySelector('.tab[data-v="comida"]'),on=foodOn();if(!t)return;
  t.hidden=!on;$('tabbar').classList.toggle('four',on);
  if(!on&&cur==='comida')go('hoy');
}
function foodHoyCard(){
  if(!foodOn())return '';
  const goal=protGoal(),p=sumP(T());
  if(!goal)return '<div class="pad" style="padding-top:12px"><button class="group" style="display:block;width:100%" onclick="openFoodSetup()"><div class="cell" style="min-height:60px"><span class="ic soft">'+ic('food',17)+'</span><div class="cb"><div class="tt"><p class="bd">Comida</p><p class="fn l2">Pon tu peso para calcular tu proteína</p></div>'+chev()+'</div></div></button></div>';
  return '<div class="pad" style="padding-top:12px"><button class="group" style="display:block;width:100%" onclick="go(\'comida\')" aria-label="'+protSay(p,goal)+'. Abrir Comida"><div class="cell" style="min-height:62px"><span style="align-self:center;margin-right:12px">'+protRing(p,goal,36)+'</span>'+
    '<div class="cb"><div class="tt"><p class="bd num">Proteína · '+Math.round(p)+' de '+goal+' g</p><p class="fn l2">'+protLeft(p,goal)+'</p></div>'+chev()+'</div></div></button></div>';
}

/* ═════ OBJETIVO: PESO Y GRAMOS POR KILO ═════ */
let FSET=null;
function openFoodSetup(){
  const f=foodCfg();FSET={kg:f.kg||'',gk:f.gk,man:!!f.man,open:!!f.man};
  openSheet(foodSetupSheet,$('sheet').classList.contains('on'));
}
const fsGk=()=>FSET.man?FSET.gk:autoGk();
function foodWhy(gk,man){
  if(man)return 'Cifra puesta a mano. 1,6 basta para la mayoría: comer más no suma más músculo.';
  return gk>=2.2?'2,2 g por kilo: mientras bajas grasa, algo más de proteína ayuda a no perder músculo.':'1,6 g por kilo, lo que basta para ganar músculo. Comer más no suma más músculo.';
}
const foodGoalTxt=(g,gk,man)=>g?'<p class="fn l2">Tu objetivo</p><p class="t1 num rnd">'+g+' g al día</p><p class="fn l2 balance" style="margin-top:4px">'+foodWhy(gk,man)+'</p>':'<p class="fn l2">Escribe tu peso para ver tu objetivo</p>';
function foodSetupSheet(){
  const on=foodOn(),kg=parseFloat(String(FSET.kg).replace(',','.')),ok=kg>=30&&kg<=300,gk=fsGk(),goal=ok?Math.round(kg*gk):0,G=GOALS[DB.profile.goal];
  return{title:'Comida',body:'<div class="pad">'+
    '<p class="sb l2 center balance" style="padding:0 8px 16px">Tsuyo te pone una sola cifra: la proteína del día. Lo que cuenta es la media de la semana, no un día suelto.</p>'+
    '<div class="field"><label for="fKg">Tu peso (kg)</label><input id="fKg" type="text" inputmode="decimal" autocomplete="off" maxlength="5" value="'+esc(FSET.kg)+'" placeholder="Por ejemplo, 75" oninput="FSET.kg=this.value;foodSetupLive()"></div>'+
    '<div class="card center" style="margin-top:16px;padding:16px 16px 14px" id="fGoal" aria-live="polite">'+foodGoalTxt(goal,gk,FSET.man)+'</div>'+
    '<p class="fn l2 center" style="padding:10px 6px 0">'+(G?'Según tu objetivo: '+esc(G.n.toLowerCase())+'. Si lo cambias en Tú, la cifra cambia sola.':'Pon tu objetivo en Tú para ajustar la cifra.')+'</p>'+
    (FSET.open?'<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">Gramos por kilo</p>'+
      '<div class="segc" role="group" aria-label="Gramos de proteína por kilo">'+GK_OPTS.map(x=>'<button class="'+(FSET.man&&FSET.gk===x?'on':'')+'" onclick="FSET.man=true;FSET.gk='+x+';drawSheet()" aria-pressed="'+(FSET.man&&FSET.gk===x)+'">'+x.toFixed(1).replace('.',',')+'</button>').join('')+'</div>'+
      '<p class="fn l2" style="padding:8px 6px 0">Cámbiala solo si sigues un plan de un dietista-nutricionista.</p>'+
      (FSET.man?'<button class="btn tx" onclick="FSET.man=false;FSET.open=false;drawSheet()">Usar la cifra de Tsuyo</button>':'')
      :'<button class="btn tx" onclick="FSET.open=true;drawSheet()">Cambiar la cifra</button>')+
    '<div class="stack" style="margin-top:14px"><button class="btn pri" id="fSave" onclick="saveFoodSetup()"'+(ok?'':' disabled')+'>'+(on?'Guardar':'Activar Comida')+'</button>'+
    (on?'<button class="btn sec" onclick="askFoodOff()">Apagar Comida</button>':'')+'</div>'+
    '<p class="fn l2" style="padding:14px 6px 0">En pruebas y gratis mientras se prueba. Si tienes una enfermedad renal o tu médico te ha limitado la proteína, consúltalo antes. Tu peso y lo que apuntas se quedan en este móvil.</p></div>'};
}
function foodSetupLive(){const kg=parseFloat(String(FSET.kg).replace(',','.')),ok=kg>=30&&kg<=300,gk=fsGk();$('fGoal').innerHTML=foodGoalTxt(ok?Math.round(kg*gk):0,gk,FSET.man);$('fSave').disabled=!ok}
function saveFoodSetup(){
  const kg=Math.round(parseFloat(String(FSET.kg).replace(',','.'))*10)/10;if(!(kg>=30&&kg<=300)){toast('Escribe un peso entre 30 y 300 kg');return}
  const was=foodOn();DB.cfg.food=FSET.man?{kg,gk:FSET.gk,man:1}:{kg};DB.cfg.mods=Object.assign({},DB.cfg.mods,{diet:true});save();closeSheet();applyFoodTab();
  if(!was){FD=T();go('comida');toast('Comida activada');say('Comida activada. Tu objetivo: '+protGoal()+' gramos de proteína al día')}else{render();toast('Objetivo: '+protGoal()+' g al día')}
}
function askFoodOff(){confirmSheet('Apagar Comida','Desaparece la pestaña Comida. Lo que has apuntado se guarda y vuelve si la activas otra vez.','Apagar','foodOff()')}
function foodOff(){DB.cfg.mods=Object.assign({},DB.cfg.mods,{diet:false});save();closeSheet();applyFoodTab();render();toast('Comida apagada')}

/* ═════ APUNTAR ═════ */
let FQ='';
function openFoodAdd(){FQ='';openSheet(foodAddSheet)}
function foodRow(f,g,quick,pick){
  const x=foodAt(f,g),U=f[8];
  return '<div class="cell static frow"><button class="cb" style="padding-left:2px;text-align:left" onclick="openFoodAmt(\''+x.id+'\','+g+(pick?',null,1':'')+')"><div class="tt"><p class="bd ell">'+esc(f[1])+'</p><p class="fn l2 num">'+(U&&g%U[1]===0?g/U[1]+' '+U[0]+(g/U[1]===1?'':'s')+' · ':'')+g+' g · '+gTxt(x.p)+' de proteína</p></div></button>'+
    (quick?'<button class="ibtn fadd" onclick="foodQuick(\''+x.id+'\','+g+')" aria-label="Añadir '+esc(f[1])+', '+g+' gramos">'+ic('plus',18,2.6)+'</button>':'')+'</div>';
}
function foodResults(pick){
  const q=normTxt(FQ.trim());
  if(q){
    const L=FOODS.filter(f=>normTxt(f[1]).includes(q)).slice(0,40),M=pick?[]:mineIds().filter(id=>normTxt(DB.mine[id].n+' '+(DB.mine[id].b||'')).includes(q));
    if(!L.length&&!M.length)return '<div class="empty">'+(pick?'No está en la lista.':'No está en la lista. Escanea el código o usa «A ojo» con la proteína de la etiqueta.')+'</div>';
    return (M.length?'<div class="group">'+M.map(id=>mineRow(id,1,1)).join('')+'</div><div style="height:14px"></div>':'')+(L.length?'<div class="group">'+L.map(f=>foodRow(f,f[7],0,pick)).join('')+'</div>':'');
  }
  return Object.keys(FOOD_GROUPS).map(gk=>'<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">'+FOOD_GROUPS[gk]+'</p><div class="group">'+FOODS.filter(f=>f[2]===gk).map(f=>foodRow(f,f[7],0,pick)).join('')+'</div>').join('');
}
function foodAddSheet(){
  const HB=foodHabits(6),d=fdDay(),hk=HB.map(h=>h.k),MI=mineIds().filter(id=>!hk.includes(id));
  return{title:'Apuntar'+(d===T()?'':' · '+foodDayTxt(d).toLowerCase()),body:'<div class="pad">'+
    '<div class="field"><input id="fQ" type="search" placeholder="Buscar alimento" value="'+esc(FQ)+'" oninput="FQ=this.value;$(\'fRes\').innerHTML=foodResults();$(\'fTop\').hidden=!!FQ.trim()" aria-label="Buscar alimento" autocomplete="off"></div>'+
    '<div id="fTop"'+(FQ.trim()?' hidden':'')+'>'+
      (HB.length?'<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">Habituales</p><div class="group">'+HB.map(habRow).join('')+'</div>':'')+
      (MI.length?'<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">Mis platos y productos</p><div class="group">'+MI.map(id=>mineRow(id,1,1)).join('')+'</div>':'')+
      '<div class="group" style="margin-top:14px">'+
      '<button class="cell" onclick="openScan()"><span class="ic soft">'+ic('scan',17)+'</span><div class="cb"><div class="tt"><p class="bd">Código de barras</p><p class="fn l2">'+(scanCam()?'Escanéalo con la cámara':'Escribe el número de la etiqueta')+'</p></div>'+chev()+'</div></button>'+
      '<button class="cell" onclick="openMineNew()"><span class="ic soft">'+ic('plus',17,2.4)+'</span><div class="cb"><div class="tt"><p class="bd">Crear plato o producto</p><p class="fn l2">Para apuntarlo de un toque la próxima vez</p></div>'+chev()+'</div></button>'+
      '<button class="cell" onclick="openFoodQ()"><span class="ic soft">'+ic('bolt',17)+'</span><div class="cb"><div class="tt"><p class="bd">A ojo</p><p class="fn l2">Solo la proteína, si no sabes qué llevaba</p></div>'+chev()+'</div></button></div>'+
    '</div><div id="fRes">'+foodResults()+'</div><div style="height:12px"></div></div>'};
}
function foodPush(x){
  const d=fdDay();DB.diet[d]=DB.diet[d]||{items:[]};DB.diet[d].items=DB.diet[d].items||[];
  x.t=d===T()?nowHM():'';DB.diet[d].items.push(x);save();
}
function foodAdded(x){
  const goal=protGoal(),p=sumP(fdDay());closeSheet();render();
  toast('Añadido'+(fdDay()===T()?'':' a '+foodDayTxt(fdDay()).toLowerCase())+' · '+Math.round(p)+' de '+goal+' g');
  say('Añadido: '+x.n+', '+gTxt(x.p).replace(' g',' gramos')+' de proteína. '+protSay(p,goal));
}
function foodQuick(id,g){const x=foodAt(FOOD_BY[id],g);foodPush(x);foodAdded(x)}

/* cantidad de un alimento: − / + por unidad (huevo, yogur…) o de 10 en 10 g; también se puede escribir */
let FA=null;
/* pl = 1: elegir un alimento para un plato de Mis platos (idx es entonces su posición en el plato) */
function openFoodAmt(id,g,idx,pl){FA={id,g:Math.round(g),idx:idx==null?null:idx,pl:!!pl};openSheet(foodAmtSheet,true)}
function foodAmtSheet(){
  const f=FOOD_BY[FA.id],U=f[8],x=foodAt(f,FA.g),edit=FA.idx!=null;
  const st=U?U[1]:10,chips=(U?[1,2,3].map(n=>[n*U[1],n+' '+U[0]+(n===1?'':'s')]):[]).concat([[f[7],'Ración'],[100,'100 g'],[150,'150 g'],[200,'200 g']]).filter((c,i,a)=>a.findIndex(y=>y[0]===c[0])===i);
  return{title:esc(f[1]),body:'<div class="pad">'+
    '<div class="row" style="justify-content:center;gap:18px;padding:6px 0 2px">'+
      '<button class="step" onclick="foodAmtAdj(-1)" aria-label="Bajar a '+Math.max(st,FA.g-st)+' gramos">'+ic('minus',24,2.6)+'</button>'+
      '<div class="center" style="min-width:140px"><input id="fG" class="famt num" type="number" inputmode="numeric" min="1" max="2000" value="'+FA.g+'" oninput="foodAmtTyped(this.value)" aria-label="Gramos"><p class="fn l2">gramos'+(U&&FA.g%U[1]===0?' · '+FA.g/U[1]+' '+U[0]+(FA.g/U[1]===1?'':'s'):'')+'</p></div>'+
      '<button class="step" onclick="foodAmtAdj(1)" aria-label="Subir a '+(FA.g+st)+' gramos">'+ic('plus',24,2.6)+'</button></div>'+
    '<div class="fchips" role="group" aria-label="Cantidades rápidas">'+chips.map(c=>'<button class="'+(FA.g===c[0]?'on':'')+'" onclick="FA.g='+c[0]+';drawSheet()" aria-pressed="'+(FA.g===c[0])+'">'+c[1]+'</button>').join('')+'</div>'+
    '<div class="card center" style="margin-top:16px;padding:14px" id="fAmtRes" aria-live="polite">'+foodAmtRes(x)+'</div>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="foodAmtOk()">'+(FA.pl?(edit?'Guardar':'Añadir al plato'):(edit?'Guardar':'Añadir'))+'</button>'+
    (edit?'<button class="btn sec danger" onclick="'+(FA.pl?'plDelPart('+FA.idx+')':'askFoodDel('+FA.idx+')')+'">Quitar</button>':'')+'</div>'+
    '<p class="c1 l3" style="padding:12px 6px 0">Por 100 g: '+gTxt(f[4])+' de proteína. Ración de referencia: '+f[7]+' g. Fuente: Ciqual 2025.</p></div>'};
}
const foodAmtRes=x=>'<p class="fn l2">Proteína</p><p class="t1 num">'+gTxt(x.p)+'</p>';
function foodAmtAdj(dir){const U=FOOD_BY[FA.id][8],st=U?U[1]:10;let g=dir>0?Math.floor(FA.g/st)*st+st:Math.ceil(FA.g/st)*st-st;FA.g=Math.max(st,Math.min(2000,g));drawSheet();say(FA.g+' gramos, '+gTxt(foodAt(FOOD_BY[FA.id],FA.g).p).replace(' g',' gramos')+' de proteína')}
function foodAmtTyped(v){const g=Math.round(parseFloat(v));if(!(g>=1&&g<=2000))return;FA.g=g;$('fAmtRes').innerHTML=foodAmtRes(foodAt(FOOD_BY[FA.id],g))}
function foodAmtOk(){
  const x=foodAt(FOOD_BY[FA.id],FA.g);
  if(FA.pl){if(FA.idx!=null)PL.parts[FA.idx]=[FA.id,FA.g];else PL.parts.push([FA.id,FA.g]);plBack();say('En el plato: '+x.n+', '+FA.g+' gramos. '+plSay());return}
  if(FA.idx!=null){const L=dayItems(fdDay()),o=L[FA.idx];if(!o)return closeSheet();x.t=o.t||'';L[FA.idx]=x;save();closeSheet();render();toast('Guardado');say('Guardado: '+x.n+', '+FA.g+' gramos');return}
  foodPush(x);foodAdded(x);
}

/* a ojo: solo la proteína (por ejemplo, la de una etiqueta o un plato fuera de casa) */
let FQP=null;
function openFoodQ(idx,hk){
  let o=idx!=null?dayItems(fdDay())[idx]:null;if(!o&&hk){const h=foodHabits(50).find(z=>z.k===hk);o=h&&h.x}
  FQP={p:o?Math.round(o.p):20,n:o?o.n:'',idx:idx==null?null:idx,keep:false};openSheet(foodQSheet,true);
}
function foodQSheet(){
  const edit=FQP.idx!=null;
  return{title:'A ojo',body:'<div class="pad">'+
    '<p class="sb l2 center balance" style="padding:0 8px 14px">Para un plato fuera de casa o un producto con etiqueta: apunta solo su proteína.</p>'+
    '<div class="row" style="justify-content:center;gap:18px">'+
      '<button class="step" onclick="FQP.p=Math.max(1,FQP.p-5);drawSheet();say(FQP.p+\' gramos de proteína\')" aria-label="Bajar a '+Math.max(1,FQP.p-5)+' gramos">'+ic('minus',24,2.6)+'</button>'+
      '<div class="center" style="min-width:120px"><input class="famt num" type="number" inputmode="numeric" min="1" max="300" value="'+FQP.p+'" oninput="const n=Math.round(parseFloat(this.value));if(n>=1&&n<=300)FQP.p=n" aria-label="Gramos de proteína"><p class="fn l2">g de proteína</p></div>'+
      '<button class="step" onclick="FQP.p=Math.min(300,FQP.p+5);drawSheet();say(FQP.p+\' gramos de proteína\')" aria-label="Subir a '+Math.min(300,FQP.p+5)+' gramos">'+ic('plus',24,2.6)+'</button></div>'+
    '<div class="field" style="margin-top:18px"><label for="fQn">Qué era (opcional)</label><input id="fQn" maxlength="60" value="'+esc(FQP.n)+'" placeholder="Por ejemplo, batido de proteína" oninput="FQP.n=this.value"></div>'+
    (edit?'':'<div class="group" style="margin-top:14px"><button class="cell" role="switch" aria-checked="'+FQP.keep+'" onclick="FQP.keep=!FQP.keep;drawSheet()"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd">Guardar en Mis platos</p><p class="fn l2">Para apuntarlo de un toque. Pon qué era.</p></div><span class="sw'+(FQP.keep?' on':'')+'" aria-hidden="true"></span></div></button></div>')+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="foodQOk()">'+(edit?'Guardar':'Añadir')+'</button>'+
    (edit?'<button class="btn sec danger" onclick="askFoodDel('+FQP.idx+')">Quitar</button>':'')+'</div></div>'};
}
function foodQOk(){
  if(FQP.keep&&FQP.idx==null){const n=sStr(FQP.n,60);if(!n){toast('Pon qué era para guardarlo');a11yFocus($('fQn'));return}
    const id=mineNewId();DB.mine[id]={n,p:FQP.p,k:0,ts:Date.now()};const x=mineAt(id,1);foodPush(x);foodAdded(x);toast('Guardado en Mis platos y añadido');return}
  const x={n:sStr(FQP.n,60)||'A ojo',id:'q',p:FQP.p,k:0};
  if(FQP.idx!=null){const L=dayItems(fdDay()),o=L[FQP.idx];if(!o)return closeSheet();x.t=o.t||'';L[FQP.idx]=x;save();closeSheet();render();toast('Guardado');return}
  foodPush(x);foodAdded(x);
}

/* tocar algo apuntado: cambiar la cantidad o quitarlo */
function openFoodItem(i){
  const o=dayItems(fdDay())[i];if(!o)return;
  if(o.id&&FOOD_BY[o.id])return openFoodAmt(o.id,o.g||FOOD_BY[o.id][7],i);
  if(o.id==='q')return openFoodQ(i);
  if(o.id&&o.id[0]==='m'&&DB.mine[o.id])return openMineAmt(o.id,o.r||1,i);
  openSheet(()=>({title:esc(o.n),body:'<div class="pad"><div class="card center" style="padding:14px"><p class="fn l2">Proteína</p><p class="t1 num">'+gTxt(o.p||0)+'</p></div>'+
    '<p class="fn l2 center" style="padding:12px 8px 0">'+(o.id&&o.id[0]==='m'?'Ya no está en Mis platos.':'Importado de NEXA Fit.')+'</p><div class="stack" style="margin-top:18px"><button class="btn sec danger" onclick="askFoodDel('+i+')">Quitar</button></div></div>'}));
}
function askFoodDel(i){const o=dayItems(fdDay())[i];if(!o)return;confirmSheet('Quitar','Se quita «'+esc(o.n)+'» de '+foodDayTxt(fdDay()).toLowerCase()+'. No se puede deshacer.','Quitar','foodDel('+i+')',true)}
function foodDel(i){const L=dayItems(fdDay());const o=L[i];if(!o)return closeSheet();L.splice(i,1);save();closeSheet();render();toast('Quitado');say('Quitado: '+o.n+'. '+protSay(sumP(fdDay()),protGoal()))}

/* ═════ MIS PLATOS Y PRODUCTOS (parte 2, tsuyo-v28) ═════
   Cada uno guarda sus valores por ración: un producto (Plenny, batido…) o un plato con varios alimentos de la lista.
   Se apunta por raciones (½, 1, 1½…) y sale en Habituales con su «+» de un toque. Lo ya apuntado no cambia si luego se edita o se borra. */
const mineIds=()=>Object.keys(DB.mine||{}).sort((a,b)=>DB.mine[a].n.localeCompare(DB.mine[b].n,'es'));
const mineNewId=()=>{let id;do{id='m'+Date.now().toString(36)+Math.floor(Math.random()*36).toString(36)}while(DB.mine[id]);return id};
function rTxt(r){const w=Math.floor(r),h=r-w>=0.5?'½':'',t=(w||!h?w||'':'')+h;return (t||'0')+(r===1||r===0.5?' ración':' raciones')}
const rSay=r=>(r===0.5?'media ración':(Math.floor(r)+(r%1?' y media':'')+(r===1?' ración':' raciones')));
function mineAt(id,r){const m=DB.mine[id],x={n:m.n,id,r,p:fr1(m.p*r),k:Math.round((m.k||0)*r)};if(m.c!=null)x.c=fr1(m.c*r);if(m.f!=null)x.f=fr1(m.f*r);if(m.g)x.g=Math.round(m.g*r);return x}
function mineSub(id,r){const m=DB.mine[id],x=mineAt(id,r);return rTxt(r)+(m.g?' ('+x.g+' '+(m.u||'g')+')':'')+' · '+gTxt(x.p)+' de proteína'}
function mineRow(id,r,quick){
  const m=DB.mine[id];if(!m)return '';
  return '<div class="cell static frow"><button class="cb" style="padding-left:2px;text-align:left" onclick="openMineAmt(\''+id+'\','+r+')"><div class="tt"><p class="bd ell">'+esc(m.n)+'</p><p class="fn l2 num">'+mineSub(id,r)+'</p></div></button>'+
    (quick?'<button class="ibtn fadd" onclick="mineQuick(\''+id+'\','+r+')" aria-label="Añadir '+esc(m.n)+', '+rSay(r)+', '+gTxt(mineAt(id,r).p).replace(' g',' gramos')+' de proteína">'+ic('plus',18,2.6)+'</button>':'')+'</div>';
}
function mineQuick(id,r){if(!DB.mine[id])return;const x=mineAt(id,r);foodPush(x);foodAdded(x)}

/* raciones: − / + de media en media */
let FM=null;
function openMineAmt(id,r,idx){FM={id,r:r||1,idx:idx==null?null:idx};openSheet(mineAmtSheet,$('sheet').classList.contains('on'))}
function mineAmtSheet(){
  const m=DB.mine[FM.id];if(!m)return{title:'Mis platos',body:'<div class="empty">Ya no está en Mis platos.</div>'};
  const x=mineAt(FM.id,FM.r),edit=FM.idx!=null;
  return{title:esc(m.n),body:'<div class="pad">'+
    '<div class="row" style="justify-content:center;gap:18px;padding:6px 0 2px">'+
      '<button class="step" onclick="mineAmtAdj(-1)" aria-label="Bajar a '+rSay(Math.max(0.5,FM.r-0.5))+'"'+(FM.r<=0.5?' disabled':'')+'>'+ic('minus',24,2.6)+'</button>'+
      '<div class="center" style="min-width:140px"><p class="famt num" aria-hidden="true">'+String(FM.r).replace('.',',')+'</p><p class="fn l2">'+(FM.r===1||FM.r===0.5?'ración':'raciones')+(m.g?' · '+x.g+' '+(m.u||'g'):'')+'</p></div>'+
      '<button class="step" onclick="mineAmtAdj(1)" aria-label="Subir a '+rSay(Math.min(10,FM.r+0.5))+'"'+(FM.r>=10?' disabled':'')+'>'+ic('plus',24,2.6)+'</button></div>'+
    '<div class="fchips" role="group" aria-label="Raciones">'+[0.5,1,1.5,2].map(n=>'<button class="'+(FM.r===n?'on':'')+'" onclick="FM.r='+n+';drawSheet()" aria-pressed="'+(FM.r===n)+'" aria-label="'+rSay(n)+'">'+String(n).replace('0.5','½').replace('.5','½')+'</button>').join('')+'</div>'+
    '<div class="card center" style="margin-top:16px;padding:14px" aria-live="polite"><p class="fn l2">Proteína</p><p class="t1 num">'+gTxt(x.p)+'</p></div>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="mineAmtOk()">'+(edit?'Guardar':'Añadir')+'</button>'+
    (edit?'<button class="btn sec danger" onclick="askFoodDel('+FM.idx+')">Quitar</button>':'')+
    '<button class="btn tx" onclick="openMineEdit(\''+FM.id+'\')">Editar «'+esc(m.n)+'»</button></div>'+
    '<p class="c1 l3" style="padding:12px 6px 0">Una ración: '+gTxt(m.p)+' de proteína'+(m.g?' en '+m.g+' '+(m.u||'g'):'')+'.'+(m.src==='off'?' Datos de Open Food Facts.':'')+'</p></div>'};
}
function mineAmtAdj(d){FM.r=Math.max(0.5,Math.min(10,FM.r+d*0.5));drawSheet();say(rSay(FM.r)+', '+gTxt(mineAt(FM.id,FM.r).p).replace(' g',' gramos')+' de proteína')}
function mineAmtOk(){
  const x=mineAt(FM.id,FM.r);
  if(FM.idx!=null){const L=dayItems(fdDay()),o=L[FM.idx];if(!o)return closeSheet();x.t=o.t||'';L[FM.idx]=x;save();closeSheet();render();toast('Guardado');say('Guardado: '+x.n+', '+rSay(FM.r));return}
  foodPush(x);foodAdded(x);
}

/* lista para verlos, editarlos o crear otro (desde la pantalla Comida) */
function openMineList(){openSheet(mineListSheet)}
function mineListSheet(){
  const L=mineIds();
  return{title:'Mis platos y productos',body:'<div class="pad">'+
    (L.length?'<div class="group">'+L.map(id=>{const m=DB.mine[id];return '<button class="cell" onclick="openMineEdit(\''+id+'\')"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(m.n)+'</p><p class="fn l2 num">'+(m.parts?m.parts.length+(m.parts.length===1?' alimento':' alimentos')+' · ':'')+gTxt(m.p)+' de proteína por ración</p></div>'+chev()+'</div></button>'}).join('')+'</div>'
      :'<p class="sb l2 center balance" style="padding:4px 12px 4px">Guarda lo que tomas a menudo, como un batido o tu desayuno de siempre, y apúntalo de un toque.</p>')+
    '<div class="stack" style="margin-top:16px"><button class="btn '+(L.length?'sec':'pri')+'" onclick="openMineNew()">Crear plato o producto</button><button class="btn sec" onclick="openScan()">Escanear un código de barras</button></div></div>'};
}
function openMineNew(){openSheet(()=>({title:'Crear',body:'<div class="pad"><div class="group">'+
  '<button class="cell" onclick="openProd()"><span class="ic soft">'+ic('bolt',17)+'</span><div class="cb"><div class="tt"><p class="bd">Producto con etiqueta</p><p class="fn l2">Un batido, una barrita, un yogur… con su proteína</p></div>'+chev()+'</div></button>'+
  '<button class="cell" onclick="openPlato()"><span class="ic soft">'+ic('food',17)+'</span><div class="cb"><div class="tt"><p class="bd">Plato con varios alimentos</p><p class="fn l2">Tu desayuno de siempre, una ensalada… de la lista</p></div>'+chev()+'</div></button>'+
  '<button class="cell" onclick="openScan()"><span class="ic soft">'+ic('scan',17)+'</span><div class="cb"><div class="tt"><p class="bd">Desde el código de barras</p><p class="fn l2">Busca el producto en Open Food Facts</p></div>'+chev()+'</div></button></div></div>'}),true)}
function openMineEdit(id){const m=DB.mine[id];if(!m)return;return m.parts?openPlato(id):openProd(id)}
function askMineDel(id){const m=DB.mine[id];if(!m)return;confirmSheet('Borrar de Mis platos','«'+esc(m.n)+'» deja de salir al apuntar. Lo que ya apuntaste se queda como está.','Borrar','mineDel(\''+id+'\')',true)}
function mineDel(id){const m=DB.mine[id];if(!m)return closeSheet();delete DB.mine[id];save();closeSheet();render();toast('Borrado de Mis platos');say('Borrado: '+m.n)}
function mineSaved(id,isNew){
  save();render();const m=DB.mine[id];
  if(isNew){FM={id,r:1,idx:null};openSheet(mineAmtSheet,true,true);toast('Guardado en Mis platos');say('Guardado en Mis platos: '+m.n+'. Elige cuánto y pulsa Añadir')}
  else{closeSheet();toast('Guardado');say('Guardado: '+m.n)}
}

/* producto: su proteína por ración o, si la etiqueta da los valores por 100 g, por 100 g y el tamaño de tu ración */
let PF=null;
const pNum=v=>{const n=parseFloat(String(v).replace(',','.'));return isFinite(n)?n:NaN};
function openProd(id,pre){
  const m=id?DB.mine[id]:null;
  PF=pre||(m?{id,n:m.n,b:m.b||'',code:m.code||'',src:m.src||'',u:m.u||'g',per:m.p100!=null?100:1,p100:m.p100!=null?String(m.p100).replace('.',','):'',k100:m.k100,c100:m.c100,f100:m.f100,g:m.g||'',p:Math.round(m.p*10)/10,k:m.k||''}
    :{id:null,n:'',b:'',code:'',src:'',u:'g',per:1,p100:'',g:'',p:20,k:''});
  openSheet(prodSheet,$('sheet').classList.contains('on'),!!pre);
}
function prodVals(){
  if(PF.per===100){const p100=pNum(PF.p100),g=Math.round(pNum(PF.g));if(!(p100>=0&&p100<=100)||!(g>=1&&g<=5000))return null;const q=g/100;
    const o={p:fr1(p100*q),k:PF.k100!=null?Math.round(PF.k100*q):0,g,p100:fr1(p100)};if(PF.k100!=null)o.k100=PF.k100;if(PF.c100!=null){o.c100=PF.c100;o.c=fr1(PF.c100*q)}if(PF.f100!=null){o.f100=PF.f100;o.f=fr1(PF.f100*q)}return o}
  const p=pNum(PF.p),g=Math.round(pNum(PF.g)),k=Math.round(pNum(PF.k));if(!(p>=0&&p<=500))return null;const o={p:fr1(p),k:k>=0&&k<=10000?k:0};if(g>=1&&g<=5000)o.g=g;return o;
}
function prodSheet(){
  const v=prodVals(),U=PF.u||'g',off=PF.src==='off';
  const res=v?'<p class="fn l2">Una ración</p><p class="t1 num">'+gTxt(v.p)+' de proteína</p>'+(v.g?'<p class="fn l2 num">en '+v.g+' '+U+'</p>':''):'<p class="fn l2">'+(PF.per===100&&!String(PF.p100).trim()?'Falta la proteína por 100 '+U+': mírala en la etiqueta':'Revisa las cifras')+'</p>';
  return{title:PF.id?'Editar producto':(off?'¿Es este?':'Producto'),body:'<div class="pad">'+
    (off&&!PF.id?'<p class="sb l2 center balance" style="padding:0 8px 14px">Encontrado en Open Food Facts'+(PF.code?' · '+PF.code:'')+'. Comprueba las cifras con la etiqueta antes de guardar.</p>':'')+
    '<div class="field"><label for="pfN">Nombre</label><input id="pfN" maxlength="60" value="'+esc(PF.n)+'" placeholder="Por ejemplo, Plenny Shake" oninput="PF.n=this.value;prodLive()"></div>'+
    (PF.b?'<p class="fn l2" style="padding:6px 6px 0">Marca: '+esc(PF.b)+'</p>':'')+
    '<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">La etiqueta da la proteína</p>'+
    '<div class="segc" role="group" aria-label="La etiqueta da la proteína">'+[[1,'Por ración'],[100,'Por 100 '+U]].map(([k,t])=>'<button class="'+(PF.per===k?'on':'')+'" onclick="prodPer('+k+')" aria-pressed="'+(PF.per===k)+'">'+t+'</button>').join('')+'</div>'+
    (PF.per===100
      ?'<div class="row" style="gap:12px;margin-top:14px"><div class="field grow"><label for="pfP">Proteína por 100 '+U+' (g)</label><input id="pfP" type="text" inputmode="decimal" maxlength="5" value="'+esc(PF.p100)+'" oninput="PF.p100=this.value;prodLive()"></div>'+
        '<div class="field grow"><label for="pfG">Tu ración ('+U+')</label><input id="pfG" type="number" inputmode="numeric" min="1" max="5000" value="'+esc(PF.g)+'" oninput="PF.g=this.value;prodLive()"></div></div>'+
        (PF.k100!=null?'<p class="fn l2" style="padding:6px 6px 0">Energía: '+Math.round(PF.k100)+' kcal por 100 '+U+'.</p>':'')
      :'<div class="row" style="justify-content:center;gap:18px;margin-top:14px">'+
        '<button class="step" onclick="prodStep(-1)" aria-label="Bajar a '+Math.max(0,Math.round(pNum(PF.p)||0)-1)+' gramos">'+ic('minus',24,2.6)+'</button>'+
        '<div class="center" style="min-width:120px"><input id="pfP" class="famt num" type="text" inputmode="decimal" maxlength="5" value="'+esc(String(PF.p).replace('.',','))+'" oninput="PF.p=this.value;prodLive()" aria-label="Gramos de proteína por ración"><p class="fn l2">g de proteína por ración</p></div>'+
        '<button class="step" onclick="prodStep(1)" aria-label="Subir a '+(Math.round(pNum(PF.p)||0)+1)+' gramos">'+ic('plus',24,2.6)+'</button></div>'+
        '<div class="field" style="margin-top:14px"><label for="pfG">Cuánto es una ración (opcional, en '+U+')</label><input id="pfG" type="number" inputmode="numeric" min="1" max="5000" value="'+esc(PF.g)+'" placeholder="Por ejemplo, 400" oninput="PF.g=this.value;prodLive()"></div>')+
    '<div class="card center" style="margin-top:16px;padding:14px" id="pfRes" aria-live="polite">'+res+'</div>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" id="pfOk" onclick="prodOk()"'+(v&&sStr(PF.n,60)?'':' disabled')+'>'+(PF.id?'Guardar':'Guardar y apuntar')+'</button>'+
    (PF.id?'<button class="btn sec danger" onclick="askMineDel(\''+PF.id+'\')">Borrar de Mis platos</button>':'')+'</div>'+
    (off?'<p class="c1 l3" style="padding:12px 6px 0">Datos de Open Food Facts, base de datos abierta de alimentos (licencia ODbL). Puede tener errores: si no coincide, vale lo que diga la etiqueta.</p>':'')+'</div>'};
}
function prodPer(k){
  if(PF.per===k)return;const v=prodVals();
  if(k===100&&v&&v.g&&!String(PF.p100).trim())PF.p100=String(fr1(v.p/v.g*100)).replace('.',',');
  if(k===1&&v)PF.p=v.p;PF.per=k;drawSheet();
}
function prodStep(d){PF.p=Math.max(0,Math.min(500,Math.round(pNum(PF.p)||0)+d));drawSheet();say(PF.p+' gramos de proteína por ración')}
function prodLive(){const v=prodVals(),U=PF.u||'g';$('pfRes').innerHTML=v?'<p class="fn l2">Una ración</p><p class="t1 num">'+gTxt(v.p)+' de proteína</p>'+(v.g?'<p class="fn l2 num">en '+v.g+' '+U+'</p>':''):'<p class="fn l2">'+(PF.per===100&&!String(PF.p100).trim()?'Falta la proteína por 100 '+U+': mírala en la etiqueta':'Revisa las cifras')+'</p>';$('pfOk').disabled=!(v&&sStr(PF.n,60))}
function prodOk(){
  const v=prodVals(),n=sStr(PF.n,60);if(!v||!n)return;const isNew=!PF.id,id=PF.id||mineNewId();
  const m=Object.assign({n,ts:Date.now()},v);if(PF.u==='ml')m.u='ml';if(PF.code)m.code=PF.code;if(PF.src==='off')m.src='off';if(PF.b)m.b=sStr(PF.b,40);
  DB.mine[id]=m;mineSaved(id,isNew);
}

/* plato: varios alimentos de la lista con sus gramos; la ración es el plato entero */
let PL=null;
function openPlato(id){const m=id?DB.mine[id]:null;PL={id:id||null,n:m?m.n:'',parts:m?m.parts.map(q=>q.slice()):[]};openSheet(platoSheet,$('sheet').classList.contains('on'))}
function plTot(){return PL.parts.reduce((a,[cid,g])=>{const f=FOOD_BY[cid];if(!f)return a;const x=foodAt(f,g);a.p+=x.p;a.k+=x.k;a.c+=x.c;a.f+=x.f;a.g+=g;return a},{p:0,k:0,c:0,f:0,g:0})}
const plSay=()=>'Plato: '+gTxt(plTot().p).replace(' g',' gramos')+' de proteína en total';
function platoSheet(){
  const t=plTot(),ok=PL.parts.length&&sStr(PL.n,60);
  return{title:PL.id?'Editar plato':'Plato',body:'<div class="pad">'+
    '<div class="field"><label for="plN">Nombre</label><input id="plN" maxlength="60" value="'+esc(PL.n)+'" placeholder="Por ejemplo, desayuno de siempre" oninput="PL.n=this.value;$(\'plOk\').disabled=!(PL.parts.length&&this.value.trim())"></div>'+
    '<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">Lleva</p>'+
    (PL.parts.length?'<div class="group">'+PL.parts.map(([cid,g],i)=>{const f=FOOD_BY[cid];if(!f)return '';const x=foodAt(f,g);
      return '<button class="cell" onclick="openFoodAmt(\''+cid+'\','+g+','+i+',1)"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(f[1])+'</p><p class="fn l2 num">'+g+' g · '+gTxt(x.p)+' de proteína</p></div>'+chev()+'</div></button>'}).join('')+'</div>'
      :'<div class="empty" style="padding:14px">Añade los alimentos que lleva, con sus gramos.</div>')+
    '<button class="btn sec" style="margin-top:12px" onclick="openPlPick()">'+ic('plus',18,2.6)+'Añadir alimento</button>'+
    '<div class="card center" style="margin-top:16px;padding:14px" aria-live="polite"><p class="fn l2">El plato entero</p><p class="t1 num">'+gTxt(t.p)+' de proteína</p>'+(t.g?'<p class="fn l2 num">'+t.g+' g</p>':'')+'</div>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" id="plOk" onclick="platoOk()"'+(ok?'':' disabled')+'>'+(PL.id?'Guardar':'Guardar y apuntar')+'</button>'+
    (PL.id?'<button class="btn sec danger" onclick="askMineDel(\''+PL.id+'\')">Borrar de Mis platos</button>':'')+'</div>'+
    '<p class="c1 l3" style="padding:12px 6px 0">Valores de la tabla Ciqual 2025. Al apuntarlo, una ración es el plato entero; puedes poner media o dos.</p></div>'};
}
function openPlPick(){FQ='';openSheet(()=>({title:'Añadir al plato',body:'<div class="pad"><div class="field"><input id="fQ" type="search" placeholder="Buscar alimento" value="'+esc(FQ)+'" oninput="FQ=this.value;$(\'fRes\').innerHTML=foodResults(1)" aria-label="Buscar alimento" autocomplete="off"></div><div id="fRes">'+foodResults(1)+'</div><div style="height:12px"></div></div>'}),true)}
/* vuelve a la hoja del plato, quitando las de elegir alimento y cantidad */
function plBack(){while(SHS.length>1&&SHS[SHS.length-1]!==platoSheet)SHS.pop();SHK.length=SHS.length;drawSheet()}
function plDelPart(i){const f=FOOD_BY[(PL.parts[i]||[])[0]];PL.parts.splice(i,1);plBack();say('Quitado del plato: '+(f?f[1]:'')+'. '+plSay())}
function platoOk(){
  const n=sStr(PL.n,60);if(!n||!PL.parts.length)return;const t=plTot(),isNew=!PL.id,id=PL.id||mineNewId();
  DB.mine[id]={n,p:fr1(t.p),k:Math.round(t.k),c:fr1(t.c),f:fr1(t.f),g:t.g,parts:PL.parts.map(q=>q.slice()),ts:Date.now()};
  mineSaved(id,isNew);
}

/* ═════ CÓDIGO DE BARRAS · OPEN FOOD FACTS ═════
   Cámara solo donde el navegador sabe leer códigos (Chrome de Android: BarcodeDetector). En el resto, se escribe el número.
   Lo encontrado se enseña para confirmarlo o corregirlo y se guarda en Mis platos: la próxima vez no hace falta conexión.
   Open Food Facts pide no pasar de 15 consultas por minuto: aquí, como mucho 10. Solo se envía el número del código. */
const OFF_URL='https://world.openfoodfacts.org/api/v2/product/';
const scanCam=()=>'BarcodeDetector' in window&&!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);
let SCN={st:null,tm:null,det:null,busy:false,err:'',code:''},OFFT=[];
function scanStop(){if(SCN.tm){clearInterval(SCN.tm);SCN.tm=null}if(SCN.st){SCN.st.getTracks().forEach(t=>t.stop());SCN.st=null}SCN.busy=false}
document.addEventListener('visibilitychange',()=>{if(document.hidden)scanStop()});
function openScan(){scanStop();SCN.err='';SCN.code='';openSheet(scanSheet,$('sheet').classList.contains('on'));if(scanCam())setTimeout(scanStart,60)}
function scanSheet(){
  const cam=scanCam();
  return{title:'Código de barras',body:'<div class="pad">'+
    (cam?'<div class="fscan" aria-hidden="true"><video id="fVid" playsinline muted autoplay></video><div class="fr"></div>'+(SCN.err?'<div class="msg">'+SCN.err+'</div>':'')+'</div>'+
      '<p class="sb l2 center" style="padding:10px 8px 0">Apunta al código de barras del envase.</p>'
      :'<p class="sb l2 center balance" style="padding:0 8px 4px">Este navegador no lee códigos con la cámara. Escribe el número que hay debajo de las barras.</p>')+
    '<div class="field" style="margin-top:16px"><label for="scC">'+(cam?'O escribe el número':'Número del código')+'</label><input id="scC" type="text" inputmode="numeric" maxlength="14" autocomplete="off" value="'+esc(SCN.code)+'" placeholder="Por ejemplo, 8410000000000" oninput="SCN.code=this.value.replace(/\\D/g,\'\');$(\'scGo\').disabled=!/^\\d{8,14}$/.test(SCN.code)"></div>'+
    '<div class="stack" style="margin-top:14px"><button class="btn '+(cam?'sec':'pri')+'" id="scGo" onclick="scanStop();offLookup(SCN.code)"'+(/^\d{8,14}$/.test(SCN.code)?'':' disabled')+'>Buscar</button></div>'+
    '<p class="c1 l3" style="padding:12px 6px 0">Busca en Open Food Facts, una base de datos abierta de alimentos. Solo se envía el número.</p></div>'};
}
async function scanStart(){
  const v=$('fVid');if(!v)return;
  try{
    SCN.det=SCN.det||new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e']});
    SCN.st=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:false});
    if(!v.isConnected){scanStop();return}
    v.srcObject=SCN.st;await v.play().catch(()=>{});
  }catch(e){scanStop();SCN.err=e&&e.name==='NotAllowedError'?'Sin permiso para la cámara. Escribe el número abajo o da permiso en los ajustes del navegador.':'No se puede abrir la cámara. Escribe el número abajo.';if($('fVid'))drawSheet();return}
  SCN.tm=setInterval(()=>{
    const el=$('fVid');if(!el||!el.isConnected){scanStop();return}
    if(SCN.busy||el.readyState<2)return;SCN.busy=true;
    SCN.det.detect(el).then(r=>{SCN.busy=false;const c=(r||[]).map(x=>x.rawValue).find(x=>/^\d{8,14}$/.test(x));
      if(c&&SCN.st){scanStop();try{navigator.vibrate&&navigator.vibrate(30)}catch(e){}offLookup(c)}}).catch(()=>{SCN.busy=false});
  },250);
}
function offMsg(title,text,btns){openSheet(()=>({title,body:'<div class="pad"><p class="sb l2 center balance" style="padding:4px 8px 0">'+text+'</p><div class="stack" style="margin-top:18px">'+btns+'</div></div>'}),true,true);say(title+'. '+text.replace(/<[^>]+>/g,''))}
const offManual=code=>'<button class="btn pri" onclick="openProd(null,{id:null,n:\'\',b:\'\',code:\''+code+'\',src:\'\',u:\'g\',per:1,p100:\'\',g:\'\',p:20,k:\'\'})">Crearlo a mano</button><button class="btn sec" onclick="openScan()">Probar otro código</button>';
async function offLookup(code){
  code=String(code||'').replace(/\D/g,'');if(!/^\d{8,14}$/.test(code))return;
  const had=mineIds().find(id=>DB.mine[id].code===code);
  if(had){FM={id:had,r:1,idx:null};openSheet(mineAmtSheet,true,true);toast('Ya está en Mis platos');say('Ya está en Mis platos: '+DB.mine[had].n);return}
  if(!navigator.onLine)return offMsg('Sin conexión','Para buscar el código '+code+' hace falta conexión. Puedes crearlo a mano con la etiqueta.',offManual(code));
  const now=Date.now();OFFT=OFFT.filter(t=>now-t<60000);
  if(OFFT.length>=10)return offMsg('Espera un momento','Has buscado muchos códigos seguidos. Prueba en un minuto o créalo a mano.',offManual(code));
  OFFT.push(now);
  openSheet(()=>({title:'Buscando…',body:'<div class="pad"><p class="sb l2 center" style="padding:24px 8px">Buscando el código '+code+' en Open Food Facts…</p></div>'}),true,true);say('Código '+code.split('').join(' ')+'. Buscando');
  let j=null;
  try{const ac=new AbortController(),to=setTimeout(()=>ac.abort(),9000);
    const r=await fetch(OFF_URL+code+'.json?fields=product_name,product_name_es,generic_name,brands,quantity,serving_size,serving_quantity,nutriments&app_name=Tsuyo&app_version='+V_APP,{signal:ac.signal});
    clearTimeout(to);if(r.status===404)j={status:0};else if(!r.ok)throw new Error(r.status);else j=await r.json();
  }catch(e){return offMsg('No se ha podido buscar','Open Food Facts no responde ahora. Prueba más tarde o créalo a mano con la etiqueta.',offManual(code))}
  if(!$('sheet').classList.contains('on'))return;   // cerró la hoja mientras buscaba
  const P=j&&j.status!==0&&j.product;
  if(!P)return offMsg('No está en Open Food Facts','El código '+code+' no aparece. Créalo a mano con la etiqueta y la próxima vez ya lo tendrás.',offManual(code));
  PF=offToPF(P,code);openProd(null,PF);
}
const V_APP='28';
function offToPF(P,code){
  const N=P.nutriments||{},num=k=>{const n=parseFloat(N[k]);return isFinite(n)&&n>=0?Math.round(n*10)/10:null};
  const q=String(P.quantity||'')+' '+String(P.serving_size||''),ml=/\d\s*(ml|cl|l)\b/i.test(q)&&!/\d\s*g\b/i.test(String(P.serving_size||''));
  const sq=parseFloat(P.serving_quantity),p100=num('proteins_100g');
  const o={id:null,n:sStr(P.product_name_es||P.product_name||P.generic_name||'',60),b:sStr(String(P.brands||'').split(',')[0],40),code,src:'off',u:ml?'ml':'g',per:100,
    p100:p100==null?'':String(Math.min(100,p100)).replace('.',','),g:sq>=1&&sq<=5000?Math.round(sq):100,p:20,k:''};
  const k=num('energy-kcal_100g'),c=num('carbohydrates_100g'),f=num('fat_100g');
  if(k!=null&&k<=1000)o.k100=k;if(c!=null&&c<=100)o.c100=c;if(f!=null&&f<=100)o.f100=f;
  return o;
}
