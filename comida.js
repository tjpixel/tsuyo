/* Tsuyo · Comida (módulo en pruebas, parte 1).
   Una sola cifra que importa: la proteína del día, calculada con el peso (1,6 g por kilo por defecto, hasta 2,2).
   Lo que cuenta es el total del día y la media de la semana; nada se pinta en rojo y no hay rachas.
   Los alimentos de la lista vienen de la tabla Ciqual 2025 (foods.js). Se apuntan con habituales, buscando o «a ojo».
   Datos: DB.cfg.mods.diet (encendido), DB.cfg.food = {kg, gk, man}, DB.diet[día].items = [{n,id,g,k,p,c,f,t}].
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
function foodHabits(max){
  const by={},from=shiftD(T(),-30);
  Object.keys(DB.diet).filter(d=>d>=from).sort().forEach(d=>dayItems(d).forEach(x=>{
    if(!x.id||!FOOD_BY[x.id])return;const o=by[x.id]||(by[x.id]={id:x.id,n:0,g:x.g,last:d});o.n++;o.g=x.g||o.g;o.last=d}));
  return Object.values(by).sort((a,b)=>b.n-a.n||b.last.localeCompare(a.last)).slice(0,max||6);
}
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
      items.map(x=>'<button class="cell" onclick="openFoodItem('+x.i+')"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(x.n)+'</p><p class="fn l2 num">'+(x.id==='q'?'A ojo':(x.g?x.g+' g':'Importado'))+' · '+gTxt(x.p||0)+' de proteína</p></div><span class="fn l2 num">'+esc(x.t||'')+'</span>'+chev()+'</div></button>').join('')+'</div></div></div>';
  }
  if(goal){
    const W=foodWeek(d),Wn=W.filter(x=>x.n),avg=Wn.length?Wn.reduce((a,x)=>a+x.p,0)/Wn.length:0,cur=mondayOf(d)===mondayOf(T());
    h+='<div class="sec"><div class="stitle"><h3 class="t3">'+(cur?'Esta semana':'Semana del '+fmtD(mondayOf(d)))+'</h3>'+(Wn.length?'<span class="fn l2 num">media '+Math.round(avg)+' g</span>':'')+'</div><div class="pad"><div class="card" style="padding:14px 14px 10px">'+
      '<p class="fn l2">'+(Wn.length>1?'Media de los '+Wn.length+' días apuntados: '+Math.round(avg)+' g ('+Math.round(avg/goal*100)+' % del objetivo).':(Wn.length?'Un día apuntado: '+Math.round(avg)+' g ('+Math.round(avg/goal*100)+' % del objetivo).':'Cuando apuntes, verás aquí cada día de la semana.'))+'</p>'+
      '<div class="chart">'+weekBars(W,goal)+'</div><p class="c1 l2" style="padding:4px 2px 0">La línea es tu objetivo. Cuenta la media de la semana, no un día suelto.</p></div></div></div>';
  }
  h+='<div class="sec"><div class="pad"><div class="group">'+
    '<button class="cell" onclick="openFoodSetup()"><span class="ic gray">'+ic('pen',17)+'</span><div class="cb"><div class="tt"><p class="bd">Mi objetivo</p><p class="fn l2 num">'+(goal?foodCfg().kg+' kg × '+fmtG(foodCfg().gk)+' g = '+goal+' g al día':'Falta tu peso')+'</p></div>'+chev()+'</div></button>'+
    '<button class="cell" onclick="openGuide(\'proteina\')"><span class="ic gray">'+ic('book',17)+'</span><div class="cb"><span class="tt bd">Por qué esta cifra</span>'+chev()+'</div></button></div>'+
    '<p class="c1 l3" style="padding:12px 16px 0">Valores de la tabla Ciqual 2025 (Anses, Francia).</p></div></div>';
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
function foodRow(f,g,quick){
  const x=foodAt(f,g),U=f[8];
  return '<div class="cell static frow"><button class="cb" style="padding-left:2px;text-align:left" onclick="openFoodAmt(\''+x.id+'\','+g+')"><div class="tt"><p class="bd ell">'+esc(f[1])+'</p><p class="fn l2 num">'+(U&&g%U[1]===0?g/U[1]+' '+U[0]+(g/U[1]===1?'':'s')+' · ':'')+g+' g · '+gTxt(x.p)+' de proteína</p></div></button>'+
    (quick?'<button class="ibtn fadd" onclick="foodQuick(\''+x.id+'\','+g+')" aria-label="Añadir '+esc(f[1])+', '+g+' gramos">'+ic('plus',18,2.6)+'</button>':'')+'</div>';
}
function foodResults(){
  const q=normTxt(FQ.trim());
  if(q){
    const L=FOODS.filter(f=>normTxt(f[1]).includes(q)).slice(0,40);
    return L.length?'<div class="group">'+L.map(f=>foodRow(f,f[7])).join('')+'</div>':'<div class="empty">No está en la lista. Usa «A ojo» con la proteína de la etiqueta.</div>';
  }
  return Object.keys(FOOD_GROUPS).map(gk=>'<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">'+FOOD_GROUPS[gk]+'</p><div class="group">'+FOODS.filter(f=>f[2]===gk).map(f=>foodRow(f,f[7])).join('')+'</div>').join('');
}
function foodAddSheet(){
  const HB=foodHabits(6),d=fdDay();
  return{title:'Apuntar'+(d===T()?'':' · '+foodDayTxt(d).toLowerCase()),body:'<div class="pad">'+
    '<div class="field"><input id="fQ" type="search" placeholder="Buscar alimento" value="'+esc(FQ)+'" oninput="FQ=this.value;$(\'fRes\').innerHTML=foodResults();$(\'fTop\').hidden=!!FQ.trim()" aria-label="Buscar alimento" autocomplete="off"></div>'+
    '<div id="fTop"'+(FQ.trim()?' hidden':'')+'>'+
      (HB.length?'<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">Habituales</p><div class="group">'+HB.map(x=>foodRow(FOOD_BY[x.id],x.g,1)).join('')+'</div>':'')+
      '<div class="group" style="margin-top:14px"><button class="cell" onclick="openFoodQ()"><span class="ic soft">'+ic('bolt',17)+'</span><div class="cb"><div class="tt"><p class="bd">A ojo</p><p class="fn l2">Solo la proteína, si no sabes qué llevaba</p></div>'+chev()+'</div></button></div>'+
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
function openFoodAmt(id,g,idx){FA={id,g:Math.round(g),idx:idx==null?null:idx};openSheet(foodAmtSheet,true)}
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
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="foodAmtOk()">'+(edit?'Guardar':'Añadir')+'</button>'+
    (edit?'<button class="btn sec danger" onclick="askFoodDel('+FA.idx+')">Quitar</button>':'')+'</div>'+
    '<p class="c1 l3" style="padding:12px 6px 0">Por 100 g: '+gTxt(f[4])+' de proteína. Ración de referencia: '+f[7]+' g. Fuente: Ciqual 2025.</p></div>'};
}
const foodAmtRes=x=>'<p class="fn l2">Proteína</p><p class="t1 num">'+gTxt(x.p)+'</p>';
function foodAmtAdj(dir){const U=FOOD_BY[FA.id][8],st=U?U[1]:10;let g=dir>0?Math.floor(FA.g/st)*st+st:Math.ceil(FA.g/st)*st-st;FA.g=Math.max(st,Math.min(2000,g));drawSheet();say(FA.g+' gramos, '+gTxt(foodAt(FOOD_BY[FA.id],FA.g).p).replace(' g',' gramos')+' de proteína')}
function foodAmtTyped(v){const g=Math.round(parseFloat(v));if(!(g>=1&&g<=2000))return;FA.g=g;$('fAmtRes').innerHTML=foodAmtRes(foodAt(FOOD_BY[FA.id],g))}
function foodAmtOk(){
  const x=foodAt(FOOD_BY[FA.id],FA.g);
  if(FA.idx!=null){const L=dayItems(fdDay()),o=L[FA.idx];if(!o)return closeSheet();x.t=o.t||'';L[FA.idx]=x;save();closeSheet();render();toast('Guardado');say('Guardado: '+x.n+', '+FA.g+' gramos');return}
  foodPush(x);foodAdded(x);
}

/* a ojo: solo la proteína (por ejemplo, la de una etiqueta o un plato fuera de casa) */
let FQP=null;
function openFoodQ(idx){const o=idx!=null?dayItems(fdDay())[idx]:null;FQP={p:o?Math.round(o.p):20,n:o?o.n:'',idx:idx==null?null:idx};openSheet(foodQSheet,true)}
function foodQSheet(){
  const edit=FQP.idx!=null;
  return{title:'A ojo',body:'<div class="pad">'+
    '<p class="sb l2 center balance" style="padding:0 8px 14px">Para un plato fuera de casa o un producto con etiqueta: apunta solo su proteína.</p>'+
    '<div class="row" style="justify-content:center;gap:18px">'+
      '<button class="step" onclick="FQP.p=Math.max(1,FQP.p-5);drawSheet();say(FQP.p+\' gramos de proteína\')" aria-label="Bajar a '+Math.max(1,FQP.p-5)+' gramos">'+ic('minus',24,2.6)+'</button>'+
      '<div class="center" style="min-width:120px"><input class="famt num" type="number" inputmode="numeric" min="1" max="300" value="'+FQP.p+'" oninput="const n=Math.round(parseFloat(this.value));if(n>=1&&n<=300)FQP.p=n" aria-label="Gramos de proteína"><p class="fn l2">g de proteína</p></div>'+
      '<button class="step" onclick="FQP.p=Math.min(300,FQP.p+5);drawSheet();say(FQP.p+\' gramos de proteína\')" aria-label="Subir a '+Math.min(300,FQP.p+5)+' gramos">'+ic('plus',24,2.6)+'</button></div>'+
    '<div class="field" style="margin-top:18px"><label for="fQn">Qué era (opcional)</label><input id="fQn" maxlength="60" value="'+esc(FQP.n)+'" placeholder="Por ejemplo, batido de proteína" oninput="FQP.n=this.value"></div>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="foodQOk()">'+(edit?'Guardar':'Añadir')+'</button>'+
    (edit?'<button class="btn sec danger" onclick="askFoodDel('+FQP.idx+')">Quitar</button>':'')+'</div></div>'};
}
function foodQOk(){
  const x={n:sStr(FQP.n,60)||'A ojo',id:'q',p:FQP.p,k:0};
  if(FQP.idx!=null){const L=dayItems(fdDay()),o=L[FQP.idx];if(!o)return closeSheet();x.t=o.t||'';L[FQP.idx]=x;save();closeSheet();render();toast('Guardado');return}
  foodPush(x);foodAdded(x);
}

/* tocar algo apuntado: cambiar la cantidad o quitarlo */
function openFoodItem(i){
  const o=dayItems(fdDay())[i];if(!o)return;
  if(o.id&&FOOD_BY[o.id])return openFoodAmt(o.id,o.g||FOOD_BY[o.id][7],i);
  if(o.id==='q')return openFoodQ(i);
  openSheet(()=>({title:esc(o.n),body:'<div class="pad"><div class="card center" style="padding:14px"><p class="fn l2">Proteína</p><p class="t1 num">'+gTxt(o.p||0)+'</p></div>'+
    '<p class="fn l2 center" style="padding:12px 8px 0">Importado de NEXA Fit.</p><div class="stack" style="margin-top:18px"><button class="btn sec danger" onclick="askFoodDel('+i+')">Quitar</button></div></div>'}));
}
function askFoodDel(i){const o=dayItems(fdDay())[i];if(!o)return;confirmSheet('Quitar','Se quita «'+esc(o.n)+'» de '+foodDayTxt(fdDay()).toLowerCase()+'. No se puede deshacer.','Quitar','foodDel('+i+')',true)}
function foodDel(i){const L=dayItems(fdDay());const o=L[i];if(!o)return closeSheet();L.splice(i,1);save();closeSheet();render();toast('Quitado');say('Quitado: '+o.n+'. '+protSay(sumP(fdDay()),protGoal()))}
