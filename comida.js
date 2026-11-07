/* Tsuyo · Comida (módulo en pruebas, partes 1, 2 y 7).
   Una sola cifra que importa: la proteína del día, calculada con el peso (1,6 g por kilo por defecto, hasta 2,2).
   Lo que cuenta es el total del día y la media de la semana; nada se pinta en rojo y no hay rachas.
   Los alimentos de la lista vienen de la tabla Ciqual 2025 (foods.js). Se apuntan con habituales, buscando o «a ojo».
   Datos: DB.cfg.mods.diet (encendido), DB.cfg.food = {kg, gk, man}, DB.diet[día].items = [{n,id,g,k,p,c,f,t,r}].
   Parte 2 (tsuyo-v28): Mis platos y productos (DB.mine[m…] = valores por ración) y escáner con Open Food Facts.
   Los gramos por kilo los pone Tsuyo según el objetivo (1,6; 2,2 al bajar grasa). Solo si man = 1 manda el gk que eligió la persona.
   Parte 7 (tsuyo-v33): Suplementos de hoy. DB.cfg.supps = [{id, t = nombre, s = cantidad}] (ya venía de NEXA Fit) y DB.supp[día][id] = true si se tomó.
   No suman proteína ni tienen rachas: solo se marcan. El resumen del bloque enseña un % orientativo (app.js, blkSupps).
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
  const k=h.k.replace(/'/g,'');
  return qRow('foodQuickK(\''+k+'\')','Añadir '+esc(x.n)+', '+gTxt(x.p).replace(' g',' gramos')+' de proteína',esc(x.n),'A ojo · '+gTxt(x.p)+' de proteína','openFoodQ(null,\''+k+'\')','Otra cantidad de '+esc(x.n));
}
/* fila de un toque (tsuyo-v31): tocarla lo añade; el ⋯ de la derecha es para cambiarlo */
function qRow(add,addLab,title,sub,more,moreLab){
  return '<div class="cell static qrow"><button class="qmain" onclick="'+add+'" aria-label="'+addLab+'"><span class="ic soft" aria-hidden="true">'+ic('plus',16,2.6)+'</span><div class="cb"><div class="tt"><p class="bd ell">'+title+'</p><p class="fn l2 num">'+sub+'</p></div></div></button>'+
    '<span class="qside"><button class="ibtn qmore" onclick="'+more+'" aria-label="'+moreLab+'">'+ic('more',20)+'</button></span></div>';
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
  h+='</div>'+suppSection(d);
  if(items.length){
    h+='<div class="sec"><div class="stitle"><h3 class="t3">'+(d===T()?'Hoy':foodDayTxt(d))+'</h3><span class="fn l2 num">'+gTxt(p)+' de proteína</span></div><div class="pad"><div class="group">'+
      items.map(x=>'<button class="cell" onclick="openFoodItem('+x.i+')"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(x.n)+'</p><p class="fn l2 num">'+(x.id==='q'?'A ojo':(x.id&&x.id[0]==='m'?itemAmt(x):(x.g?x.g+' g':'Importado')))+' · '+gTxt(x.p||0)+' de proteína</p></div><span class="fn l2 num">'+esc(x.t||'')+'</span>'+chev()+'</div></button>').join('')+'</div></div></div>';
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

/* ═════ SUPLEMENTOS DE HOY (parte 7, tsuyo-v33) ═════
   Lo que tomas cada día y no aporta proteína (creatina, vitaminas, omega 3…). Un toque lo marca tomado ese día.
   Cada uno lleva su nombre y su cantidad, que pone cada uno. Sin rojos, sin rachas y sin contar proteína. */
const SUPP_MAX=12,SUPP_SUG=['Creatina','Vitamina D','Omega 3','Magnesio','Cafeína','Hierro'];
const suppList=()=>(DB.cfg.supps||[]);
const suppTook=(d,id)=>!!(DB.supp&&DB.supp[d]&&DB.supp[d][id]);
const suppName=x=>x.t+(x.s?' · '+x.s:'');
function suppSection(d){
  const L=suppList(),tit=d===T()?'Suplementos de hoy':'Suplementos · '+foodDayTxt(d);
  if(!L.length)return '<div class="sec"><div class="stitle"><h3 class="t3">'+tit+'</h3></div><div class="pad"><div class="group">'+
    '<button class="cell" onclick="openSuppEdit()"><span class="ic soft">'+ic('pill',17)+'</span><div class="cb"><div class="tt"><p class="bd">Añadir un suplemento</p><p class="fn l2">Creatina, vitamina D… y márcalo tomado de un toque</p></div>'+chev()+'</div></button></div></div></div>';
  const n=L.filter(x=>suppTook(d,x.id)).length;
  return '<div class="sec"><div class="stitle"><h3 class="t3">'+tit+'</h3><button class="fn link" onclick="openSuppList()" aria-label="Editar suplementos">Editar</button></div>'+
    '<div class="pad"><div class="group" role="group" aria-label="'+tit+', '+n+' de '+L.length+' tomados">'+L.map(x=>{const on=suppTook(d,x.id);
      return '<button class="cell" role="checkbox" aria-checked="'+on+'" onclick="suppToggle(\''+x.id+'\')" aria-label="'+esc(x.t)+(x.s?', '+esc(x.s):'')+'"><span class="exn'+(on?' done':'')+' sck" aria-hidden="true">'+(on?ic('check',14,2.8):'')+'</span>'+
        '<div class="cb" style="padding-left:0"><div class="tt"><p class="bd ell">'+esc(x.t)+'</p>'+(x.s?'<p class="fn l2 num">'+esc(x.s)+'</p>':'')+'</div>'+(on?'<span class="fn ink semi">Tomado</span>':'')+'</div></button>'}).join('')+'</div>'+
    '<p class="c1 l2" style="padding:8px 16px 0">Solo para marcarlos: no suman proteína.</p></div></div>';
}
function suppToggle(id){
  const d=fdDay(),x=suppList().find(z=>z.id===id);if(!x)return;
  DB.supp=DB.supp||{};const on=!suppTook(d,id);
  if(on)(DB.supp[d]=DB.supp[d]||{})[id]=true;else{delete DB.supp[d][id];if(!Object.keys(DB.supp[d]).length)delete DB.supp[d]}
  save();renderComida();
  const b=[...document.querySelectorAll('#v-comida [role="checkbox"]')].find(z=>z.getAttribute('onclick')==="suppToggle('"+id+"')");if(b)b.focus({preventScroll:true});
  const L=suppList(),n=L.filter(z=>suppTook(d,z.id)).length;
  say(x.t+(on?', tomado':', sin marcar')+'. '+n+' de '+L.length+' '+(d===T()?'hoy':foodDayTxt(d).toLowerCase()));
}
/* lista para editarlos */
function openSuppList(){openSheet(suppListSheet)}
function suppListSheet(){
  const L=suppList();
  return{title:'Mis suplementos',body:'<div class="pad">'+
    (L.length?'<div class="group">'+L.map(x=>'<button class="cell" onclick="openSuppEdit(\''+x.id+'\')"><span class="ic soft">'+ic('pill',17)+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(x.t)+'</p><p class="fn l2 num">'+(x.s?esc(x.s):'Sin cantidad')+'</p></div>'+chev()+'</div></button>').join('')+'</div>':'')+
    (L.length<SUPP_MAX?'<div class="stack" style="margin-top:16px"><button class="btn '+(L.length?'sec':'pri')+'" onclick="openSuppEdit()">'+ic('plus',18,2.6)+'Añadir un suplemento</button></div>':'<p class="fn l2 center" style="margin-top:14px">Como mucho '+SUPP_MAX+' suplementos.</p>')+
    '<p class="c1 l2 balance" style="padding:14px 8px 0">Lo que aporta proteína, como un batido o Plenny, va en Mis platos y productos: así suma a tu proteína del día.</p></div>'};
}
/* crear o editar uno: nombre y cantidad */
let SP=null;
function openSuppEdit(id){
  if(!id&&suppList().length>=SUPP_MAX){toast('Como mucho '+SUPP_MAX+' suplementos');return}
  const x=id?suppList().find(z=>z.id===id):null;SP={id:x?x.id:null,t:x?x.t:'',s:x?x.s:''};openSheet(suppEditSheet,true);
}
function suppEditSheet(){
  const edit=!!SP.id,used=suppList().map(x=>normTxt(x.t)),sug=SUPP_SUG.filter(n=>!used.includes(normTxt(n)));
  return{title:edit?'Editar suplemento':'Nuevo suplemento',body:'<div class="pad">'+
    '<div class="field"><label for="spN">Nombre</label><input id="spN" maxlength="40" autocomplete="off" value="'+esc(SP.t)+'" placeholder="Por ejemplo, creatina" oninput="SP.t=this.value"></div>'+
    (!edit&&sug.length?'<div class="schips" role="group" aria-label="Sugerencias de nombre">'+sug.map(n=>'<button class="pill gray" onclick="SP.t=\''+n+'\';drawSheet();a11yFocus($(\'spS\'))">'+n+'</button>').join('')+'</div>':'')+
    '<div class="field" style="margin-top:14px"><label for="spS">Cantidad</label><input id="spS" maxlength="30" autocomplete="off" value="'+esc(SP.s)+'" placeholder="Por ejemplo, 5 g o 1 cápsula" oninput="SP.s=this.value"></div>'+
    '<p class="c1 l2 balance" style="padding:8px 4px 0">La que tomas tú, como dice el envase o tu profesional sanitario.</p>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="suppSave()">Guardar</button>'+
    (edit?'<button class="btn sec danger" onclick="askSuppDel(\''+SP.id+'\')">Borrar</button>':'')+'</div></div>'};
}
function suppSave(){
  const t=sStr(SP.t,40),s=sStr(SP.s,30);if(!t){toast('Pon el nombre');a11yFocus($('spN'));return}
  const L=DB.cfg.supps=suppList().slice();
  if(SP.id){const x=L.find(z=>z.id===SP.id);if(x){x.t=t;x.s=s}}
  else{let id;do{id='s'+Date.now().toString(36)+Math.floor(Math.random()*36).toString(36)}while(L.some(z=>z.id===id));L.push({id,t,s})}
  save();render();const back=SHS.length>1;if(back)backSheet();else closeSheet();
  toast(SP.id?'Guardado':'Añadido: '+t);say((SP.id?'Guardado: ':'Añadido: ')+t+(s?', '+s:''));
}
function askSuppDel(id){const x=suppList().find(z=>z.id===id);if(!x)return;confirmSheet('Borrar suplemento','«'+esc(x.t)+'» deja de salir en Comida. Los días que ya lo marcaste no cambian.','Borrar','suppDel(\''+id+'\')',true)}
function suppDel(id){const x=suppList().find(z=>z.id===id);DB.cfg.supps=suppList().filter(z=>z.id!==id);save();render();
  SHS.length=Math.max(0,SHS.length-2);SHK.length=SHS.length;if(SHS.length&&suppList().length)drawSheet();else closeSheet();toast('Borrado');say('Borrado: '+(x?x.t:''))}

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
  if(quick)return qRow('foodQuick(\''+x.id+'\','+g+')','Añadir '+esc(f[1])+', '+g+' gramos, '+gTxt(x.p).replace(' g',' gramos')+' de proteína',esc(f[1]),(U&&g%U[1]===0?g/U[1]+' '+U[0]+(g/U[1]===1?'':'s')+' · ':'')+g+' g · '+gTxt(x.p)+' de proteína','openFoodAmt(\''+x.id+'\','+g+')','Otra cantidad de '+esc(f[1]));
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
  const nm=x.n.length>18?x.n.slice(0,17)+'…':x.n;toast(fdDay()===T()?'+ '+nm+' · '+Math.round(p)+' de '+goal+' g':'Añadido a '+foodDayTxt(fdDay()).toLowerCase()+' · '+Math.round(p)+' de '+goal+' g');
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
    const id=mineNewId();DB.mine[id]=mineCalc({n,L:{q:1,u:'u',p:FQP.p},t:1,ts:Date.now()});const x=mineAt(id,1);foodPush(x);foodAdded(x);toast('Guardado en Mis platos y añadido');return}
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

/* ═════ MIS PLATOS Y PRODUCTOS (parte 2, tsuyo-v28; etiqueta completa desde tsuyo-v29) ═════
   Un producto guarda su etiqueta tal cual y lo que te tomas cada vez (ver mineCalc en core.js); un plato, sus alimentos de la lista.
   Se apunta por veces (½, 1, 1½…), enseñando la cantidad («400 ml», «2 unidades», «1 plato»), nunca «raciones».
   Sale en Habituales con su «+». Lo ya apuntado no cambia si luego se edita o se borra. */
const mineIds=()=>Object.keys(DB.mine||{}).sort((a,b)=>DB.mine[a].n.localeCompare(DB.mine[b].n,'es'));
const mineNewId=()=>{let id;do{id='m'+Date.now().toString(36)+Math.floor(Math.random()*36).toString(36)}while(DB.mine[id]);return id};
/* 1,5 → «1½»; 0,5 → «½»; 0,75 → «0,75» */
function qTxt(n){n=Math.round(n*100)/100;const w=Math.floor(n),f=Math.round((n-w)*100)/100;return f===0.5?(w||'')+'½':String(n).replace('.',',')}
const qSay=n=>{n=Math.round(n*100)/100;const w=Math.floor(n),f=Math.round((n-w)*100)/100;return f===0.5?(w?w+' y media':'media'):String(n).replace('.',',')};
const U_TXT={g:['g','g'],ml:['ml','ml'],u:['unidad','unidades']},U_SAY={g:['gramo','gramos'],ml:['mililitro','mililitros'],u:['unidad','unidades']};
const uWord=(u,n,W)=>(W||U_TXT)[u][n<=1?0:1];
/* cantidad de r veces: «400 ml», «2 unidades», «1 plato (218 g)» */
function mAmt(m,r,say){
  if(m.parts){const g=Math.round((m.g||0)*r),w=say?(r===0.5?'medio plato':qSay(r)+(r<=1?' plato':' platos')):qTxt(r)+(r<=1?' plato':' platos');return w+(g?(say?', '+g+' gramos':' ('+g+' g)'):'')}
  const u=m.u==='u'?'u':(m.u==='ml'?'ml':'g'),n=u==='u'?(m.t||1)*r:Math.round((m.g||0)*r);
  return say?(u==='u'?qSay(n):n)+' '+uWord(u,n,U_SAY):(u==='u'?qTxt(n):n)+' '+uWord(u,n);
}
function mineAt(id,r){const m=DB.mine[id],x={n:m.n,id,r,p:fr1(m.p*r),k:Math.round((m.k||0)*r)};if(m.c!=null)x.c=fr1(m.c*r);if(m.f!=null)x.f=fr1(m.f*r);if(m.g)x.g=Math.round(m.g*r);return x}
function mineSub(id,r){const m=DB.mine[id];return mAmt(m,r)+' · '+gTxt(mineAt(id,r).p)+' de proteína'}
/* lo apuntado, en la lista del día: con la cantidad que se apuntó */
function itemAmt(x){const m=DB.mine[x.id];if(m&&!m.parts&&m.u!=='u'&&x.g)return x.g+' '+(m.u||'g');if(m)return mAmt(m,x.r||1);return x.g?x.g+' g':qTxt(x.r||1)}
function mineRow(id,r,quick){
  const m=DB.mine[id];if(!m)return '';
  return qRow('mineQuick(\''+id+'\','+r+')','Añadir '+esc(m.n)+', '+mAmt(m,r,1)+', '+gTxt(mineAt(id,r).p).replace(' g',' gramos')+' de proteína',esc(m.n),mineSub(id,r),'openMineMore(\''+id+'\','+r+')','Opciones de '+esc(m.n));
}
function mineQuick(id,r){if(!DB.mine[id])return;const x=mineAt(id,r);foodPush(x);foodAdded(x)}
/* ⋯ de un plato o producto: otra cantidad, editarlo o borrarlo */
function openMineMore(id,r){
  const m=DB.mine[id];if(!m)return;
  openSheet(()=>{const m=DB.mine[id];if(!m)return{title:'Mis platos',body:'<div class="empty">Ya no está en Mis platos.</div>'};
    return{title:esc(m.n),body:'<div class="pad"><p class="fn l2 center num" style="padding:0 8px 14px">'+mineSub(id,r)+'</p><div class="group">'+
    '<button class="cell" onclick="openMineAmt(\''+id+'\','+r+')"><span class="ic soft">'+ic('plus',16,2.6)+'</span><div class="cb"><div class="tt"><p class="bd">Añadir otra cantidad</p><p class="fn l2">Media, una y media, dos…</p></div>'+chev()+'</div></button>'+
    '<button class="cell" onclick="openMineEdit(\''+id+'\')"><span class="ic gray">'+ic('pen',16)+'</span><div class="cb"><div class="tt"><p class="bd">Editar</p><p class="fn l2">'+(m.parts?'Nombre y alimentos':'Nombre, etiqueta y lo que te tomas')+'</p></div>'+chev()+'</div></button></div>'+
    '<div class="group" style="margin-top:14px"><button class="cell" onclick="askMineDel(\''+id+'\')"><span class="ic red">'+ic('trash',16)+'</span><div class="cb"><span class="tt bd red">Borrar de Mis platos</span></div></button></div>'+
    '<p class="c1 l3 center" style="padding:12px 8px 0">Lo que ya apuntaste no cambia.</p></div>'}},true);
}

/* cuánto: − / + de media vez en media vez, enseñando la cantidad */
let FM=null;
function openMineAmt(id,r,idx){FM={id,r:r||1,idx:idx==null?null:idx};openSheet(mineAmtSheet,$('sheet').classList.contains('on'))}
function mineAmtSheet(){
  const m=DB.mine[FM.id];if(!m)return{title:'Mis platos',body:'<div class="empty">Ya no está en Mis platos.</div>'};
  const x=mineAt(FM.id,FM.r),edit=FM.idx!=null,A=mAmt(m,FM.r),sp=A.indexOf(' ');
  return{title:esc(m.n),body:'<div class="pad">'+
    '<div class="row" style="justify-content:center;gap:18px;padding:6px 0 2px">'+
      '<button class="step" onclick="mineAmtAdj(-1)" aria-label="Bajar a '+mAmt(m,Math.max(0.5,FM.r-0.5),1)+'"'+(FM.r<=0.5?' disabled':'')+'>'+ic('minus',24,2.6)+'</button>'+
      '<div class="center" style="min-width:140px"><p class="famt num" aria-hidden="true">'+A.slice(0,sp)+'</p><p class="fn l2" aria-hidden="true">'+A.slice(sp+1)+'</p></div>'+
      '<button class="step" onclick="mineAmtAdj(1)" aria-label="Subir a '+mAmt(m,Math.min(rMax(m),FM.r+0.5),1)+'"'+(FM.r>=rMax(m)?' disabled':'')+'>'+ic('plus',24,2.6)+'</button></div>'+
    '<div class="fchips" role="group" aria-label="Cantidad">'+[0.5,1,1.5,2].filter(n=>n<=rMax(m)).map(n=>'<button class="'+(FM.r===n?'on':'')+'" onclick="FM.r='+n+';drawSheet()" aria-pressed="'+(FM.r===n)+'" aria-label="'+mAmt(m,n,1)+'">'+mAmt(m,n).replace(/ \(.*\)$/,'')+'</button>').join('')+'</div>'+
    '<div class="card center" style="margin-top:16px;padding:14px" aria-live="polite"><p class="fn l2">Proteína</p><p class="t1 num">'+gTxt(x.p)+'</p></div>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="mineAmtOk()">'+(edit?'Guardar':'Añadir')+'</button>'+
    (edit?'<button class="btn sec danger" onclick="askFoodDel('+FM.idx+')">Quitar</button>':'')+
    '<button class="btn tx" onclick="openMineEdit(\''+FM.id+'\')">Editar «'+esc(m.n)+'»</button></div>'+
    (m.src==='off'?'<p class="c1 l3" style="padding:12px 6px 0">Datos de Open Food Facts, revisados por ti al guardarlo.</p>':'')+'</div>'};
}
/* como mucho 4 veces y no más de 200 g de proteína de golpe */
const rMax=m=>Math.max(0.5,Math.min(4,Math.floor(400/Math.max(m.p,1))/2));
function mineAmtAdj(d){FM.r=Math.max(0.5,Math.min(rMax(DB.mine[FM.id]),FM.r+d*0.5));drawSheet();const m=DB.mine[FM.id];say(mAmt(m,FM.r,1)+', '+gTxt(mineAt(FM.id,FM.r).p).replace(' g',' gramos')+' de proteína')}
function mineAmtOk(){
  const x=mineAt(FM.id,FM.r);
  if(FM.idx!=null){const L=dayItems(fdDay()),o=L[FM.idx];if(!o)return closeSheet();x.t=o.t||'';L[FM.idx]=x;save();closeSheet();render();toast('Guardado');say('Guardado: '+x.n+', '+mAmt(DB.mine[FM.id],FM.r,1));return}
  foodPush(x);foodAdded(x);
}

/* lista para verlos, editarlos o crear otro (desde la pantalla Comida) */
function openMineList(){openSheet(mineListSheet)}
function mineListSheet(){
  const L=mineIds();
  return{title:'Mis platos y productos',body:'<div class="pad">'+
    (L.length?'<div class="group">'+L.map(id=>{const m=DB.mine[id];return '<button class="cell" onclick="openMineEdit(\''+id+'\')"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(m.n)+'</p><p class="fn l2 num">'+mineSub(id,1)+'</p></div>'+chev()+'</div></button>'}).join('')+'</div>'
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

/* producto: «La etiqueta dice» (tal cual: proteína y, si quieres, el resto, por la cantidad que diga) y «Te tomas» (lo tuyo).
   No hay nada que elegir: la etiqueta no cambia al tocar lo que te tomas. Lo opcional se guarda para el futuro modo calorías. */
let PF=null;
const pNum=v=>{const t=String(v==null?'':v).trim().replace(',','.');if(!t)return null;const n=parseFloat(t);return isFinite(n)&&/^\d*\.?\d+$/.test(t)?n:NaN};
const nStr=n=>n==null?'':String(n).replace('.',',');
/* resto de la etiqueta, en el orden de la etiqueta europea */
const LBL_UI=[['k','Valor energético','kcal'],['f','Grasas','g'],['fs','de las cuales saturadas','g'],['c','Hidratos de carbono','g'],['s','de los cuales azúcares','g'],['fi','Fibra','g'],['sal','Sal','g']];
function prodBlank(code){return{id:null,n:'',b:'',code:code||'',src:'',q:'100',u:'g',L:{p:''},t:'',more:false}}
function openProd(id,pre){
  const m=id?DB.mine[id]:null;
  if(pre)PF=pre;
  else if(m){PF={id,n:m.n,b:m.b||'',code:m.code||'',src:m.src||'',q:nStr(m.L.q),u:m.L.u,L:{},t:nStr(m.t),more:false};['p'].concat(LBL.map(z=>z[0])).forEach(k=>PF.L[k]=nStr(m.L[k]))}
  else PF=prodBlank();
  openSheet(prodSheet,$('sheet').classList.contains('on'),!!pre);
}
const lblN=()=>LBL_UI.filter(([k])=>String(PF.L[k]||'').trim()).length;
/* topes de lo posible: más allá, casi seguro es un error de tecleo o de unidad */
const LIM={t:{g:2000,ml:2000,u:20},q:{g:1000,ml:1000,u:20},pToma:150,kcal100:900};
const limTxt={g:'2 kg',ml:'2 litros',u:'20 unidades'};
/* lee el formulario: {L, t} o {err, el} */
function prodRead(){
  const p=pNum(PF.L.p),q=pNum(PF.q),t=pNum(PF.t),U=PF.u;
  if(p==null)return{err:PF.noP?'Open Food Facts no trae la proteína':'Falta la proteína de la etiqueta',el:'pfP',noP:PF.noP};
  if(isNaN(p)||p<0||p>5000)return{err:'Revisa la proteína',el:'pfP'};
  if(q==null||isNaN(q)||q<=0)return{err:'Revisa la cantidad de la etiqueta',el:'pfQ'};
  if(q>LIM.q[U])return{err:U==='u'?'La etiqueta no da los valores por '+nStr(q)+' unidades: revisa la cantidad':'Las etiquetas dan los valores por 100 '+U+' o por toma: revisa la cantidad',el:'pfQ'};
  if(U!=='u'&&p>q)return{err:'La proteína no puede pasar de '+nStr(q)+' '+U+': revisa las cifras',el:'pfP'};
  const L={q:r1v(q),u:U,p:r1v(p)};
  for(const [k,name] of LBL_UI){const n=pNum(PF.L[k]);if(n==null)continue;if(isNaN(n)||n<0)return{err:'Revisa «'+name.replace(/^de l[oa]s cuales /,'')+'»',el:'pf_'+k};L[k]=k==='k'?Math.round(n):r1v(n)}
  if(U!=='u'){
    const sum=['p','f','c','fi','sal'].reduce((a,k)=>a+(L[k]||0),0);
    if(sum>q*1.05)return{err:'Proteína, grasas, hidratos, fibra y sal suman más de '+nStr(q)+' '+U+': revisa la etiqueta',el:'pf_f'};
    if(L.k!=null&&L.k>q*LIM.kcal100/100)return{err:'Más de '+Math.round(q*LIM.kcal100/100)+' kcal en '+nStr(q)+' '+U+' no es posible: revisa la energía',el:'pf_k'};
  }
  if(L.fs!=null&&L.f!=null&&L.fs>L.f)return{err:'Las saturadas no pueden pasar de las grasas',el:'pf_fs'};
  if(L.s!=null&&L.c!=null&&L.s>L.c)return{err:'Los azúcares no pueden pasar de los hidratos',el:'pf_s'};
  if(t==null)return{err:'Falta lo que te tomas',el:'pfT'};
  if(isNaN(t)||t<=0)return{err:'Revisa lo que te tomas',el:'pfT'};
  if(t>LIM.t[U])return{err:'Más de '+limTxt[U]+' de una vez no parece real: revisa lo que te tomas',el:'pfT'};
  const pt=L.p*t/L.q;
  if(pt>LIM.pToma)return{err:'Saldrían '+Math.round(pt)+' g de proteína de una vez, y eso no es posible: revisa las cifras'+(U==='u'?' (¿la etiqueta va por unidad?)':''),el:'pfT'};
  return{L,t:r1v(t)};
}
function prodRes(){
  const v=prodRead();
  if(v.noP)return '<p class="bd">'+v.err+'</p><p class="fn l2 balance" style="padding-top:4px">Mírala en la etiqueta. Si pone 0 g, no hace falta apuntarlo: no suma a tu proteína.</p>';
  if(v.err)return '<p class="fn l2">Cada vez que lo tomas</p><p class="bd" style="padding-top:4px">'+v.err+'</p>';
  const o=mineCalc({L:v.L,t:v.t});
  if(!v.L.p)return '<p class="fn l2">Cada vez que lo tomas</p><p class="t1 num">0 g de proteína</p><p class="fn l2 balance" style="padding-top:2px">No suma a tu proteína del día, así que no hace falta apuntarlo.</p>';
  return '<p class="fn l2">Cada vez que lo tomas</p><p class="t1 num">'+gTxt(o.p)+' de proteína</p><p class="fn l2 num">en '+mAmt(o,1)+'</p>';
}
function prodSheet(){
  const U=PF.u,off=PF.src==='off',per=nStr(pNum(PF.q)||'')||'…',nl=lblN();
  const inp=(id,val,on,ph,lab)=>'<input id="'+id+'" type="text" inputmode="decimal" maxlength="7" value="'+esc(val||'')+'"'+(ph?' placeholder="'+ph+'"':'')+' oninput="'+on+';prodLive()"'+(lab?' aria-label="'+lab+'"':'')+'>';
  return{title:PF.id?'Editar producto':(off?'¿Es este?':'Producto'),body:'<div class="pad">'+
    (off&&!PF.id?'<p class="sb l2 center balance" style="padding:0 8px 14px">Encontrado en Open Food Facts'+(PF.code?' · '+PF.code:'')+'. Comprueba las cifras con la etiqueta antes de guardar.</p>':'')+
    '<div class="field"><label for="pfN">Nombre</label><input id="pfN" maxlength="60" value="'+esc(PF.n)+'" placeholder="Por ejemplo, Plenny Shake" oninput="PF.n=this.value;prodLive()"></div>'+
    (PF.b?'<p class="fn l2" style="padding:6px 6px 0">Marca: '+esc(PF.b)+'</p>':'')+
    // la etiqueta, tal cual
    '<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">La etiqueta dice</p>'+
      '<div class="row" style="gap:10px;align-items:flex-end">'+
        '<div class="field grow"><label for="pfP">Proteína (g)</label>'+inp('pfP',PF.L.p,'PF.L.p=this.value',PF.noP?'—':'')+'</div>'+
        '<p class="sb" style="padding-bottom:13px">en</p>'+
        '<div class="field grow"><label for="pfQ">Cantidad</label>'+inp('pfQ',PF.q,'PF.q=this.value',U==='u'?'1':'100')+'</div></div>'+
      '<div class="segc" role="group" aria-label="Unidad de la etiqueta" style="margin-top:10px">'+[['g','g'],['ml','ml'],['u','unidad']].map(([k,t])=>'<button class="'+(U===k?'on':'')+'" onclick="prodUnit(\''+k+'\')" aria-pressed="'+(U===k)+'">'+t+'</button>').join('')+'</div>'+
      '<p class="fn l2" id="pfSay" style="padding:8px 6px 0">'+prodSay()+'</p>'+
      // resto de la etiqueta (opcional)
      '<div class="group" style="margin-top:14px"><button class="cell" onclick="PF.more=!PF.more;drawSheet()" aria-expanded="'+PF.more+'"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd">Resto de la etiqueta</p><p class="fn l2">'+(nl?nl+' de 7 datos':'Opcional · para el modo calorías')+'</p></div><span style="transform:rotate('+(PF.more?'-90':'90')+'deg);display:flex">'+chev()+'</span></div></button></div>'+
      (PF.more?'<div style="padding-top:12px"><p class="fn l2" style="padding:0 6px 10px">Por '+per+' '+uWord(U,pNum(PF.q)||1)+', como en la etiqueta. Ahora solo cuenta la proteína: el resto se guarda para cuando llegue el modo calorías.</p>'+
        '<div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px 12px">'+LBL_UI.map(([k,name,un])=>'<div class="field"'+(k==='k'?' style="grid-column:1/-1"':'')+'><label class="ell" for="pf_'+k+'"'+(name.startsWith('de ')?' style="padding-left:10px"':'')+'>'+name+' ('+un+')</label>'+inp('pf_'+k,PF.L[k],'PF.L.'+k+'=this.value')+'</div>').join('')+'</div></div>':'')+
    // lo tuyo
    '<p class="ghead" role="heading" aria-level="2" style="padding:18px 16px 7px">Te tomas</p>'+
    '<div class="row" style="gap:10px;align-items:center"><div class="field grow"><input id="pfT" type="text" inputmode="decimal" maxlength="7" value="'+esc(PF.t)+'" placeholder="'+(U==='u'?'1':'Por ejemplo, 400')+'" oninput="PF.t=this.value;prodLive()" aria-label="Te tomas, en '+uWord(U,2,U_SAY)+'"></div><p class="bd" id="pfTu" style="min-width:72px">'+uWord(U,pNum(PF.t)||2)+'</p></div>'+
    '<p class="fn l2" style="padding:6px 6px 0">Cada vez. Al apuntarlo puedes poner la mitad o el doble.</p>'+
    '<div class="card center" style="margin-top:16px;padding:14px" id="pfRes" aria-live="polite">'+prodRes()+'</div>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" id="pfOk" onclick="prodOk()"'+(prodRead().err||!sStr(PF.n,60)?' disabled':'')+'>'+(PF.id?'Guardar':'Guardar y apuntar')+'</button>'+
    (PF.id?'<button class="btn sec danger" onclick="askMineDel(\''+PF.id+'\')">Borrar de Mis platos</button>':'')+'</div>'+
    (off?'<p class="c1 l3" style="padding:12px 6px 0">Datos de Open Food Facts, base de datos abierta de alimentos (licencia ODbL). Puede tener errores: si no coincide, vale lo que diga la etiqueta.</p>':'')+'</div>'};
}
/* la etiqueta leída en una frase, para confirmar que se ha entendido bien */
function prodSay(){const p=pNum(PF.L.p),q=pNum(PF.q);if(p==null||isNaN(p)||!q)return 'Copia la proteína y la cantidad tal como vienen en la etiqueta.';return nStr(r1v(p))+' g de proteína por cada '+(PF.u==='u'&&q===1?'unidad':nStr(r1v(q))+' '+uWord(PF.u,q))}
/* g ↔ ml: mismas cifras. A unidad o desde unidad, las cifras ya no valen (40 g por 100 g no son 40 g por unidad):
   se guardan las de antes, se vacía la etiqueta y lo que te tomas, y al volver se recuperan */
function prodUnit(u){
  if(PF.u===u)return;const was=PF.u,kind=x=>x==='u'?'u':'m';
  if(kind(was)===kind(u)){PF.u=u;drawSheet();say('Unidad: '+uWord(u,2,U_SAY)+'. '+prodSay());return}
  PF.bk=PF.bk||{};PF.bk[kind(was)]={q:PF.q,L:Object.assign({},PF.L),t:PF.t};
  const b=PF.bk[kind(u)];PF.u=u;
  if(b){PF.q=b.q;PF.L=Object.assign({},b.L);PF.t=b.t}else{PF.q=u==='u'?'1':'100';PF.L={p:''};PF.t=''}
  drawSheet();
  const msg=b?'Recuperadas las cifras por '+uWord(u,2):'Pon las cifras de la etiqueta por '+(u==='u'?'unidad':'100 '+u);
  toast(msg);say('Unidad: '+uWord(u,2,U_SAY)+'. '+msg);
}
function prodLive(){
  $('pfRes').innerHTML=prodRes();$('pfSay').textContent=prodSay();$('pfTu').textContent=uWord(PF.u,pNum(PF.t)||2);
  $('pfOk').disabled=!!(prodRead().err||!sStr(PF.n,60));
}
function prodOk(){
  const v=prodRead(),n=sStr(PF.n,60);if(v.err||!n)return;const isNew=!PF.id,id=PF.id||mineNewId();
  const m={n,L:v.L,t:v.t,ts:Date.now()};if(PF.code)m.code=PF.code;if(PF.src==='off')m.src='off';if(PF.b)m.b=sStr(PF.b,40);
  DB.mine[id]=mineCalc(m);mineSaved(id,isNew);
}

/* plato: varios alimentos de la lista con sus gramos; al apuntarlo, una vez = el plato entero */
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
    '<p class="c1 l3" style="padding:12px 6px 0">Valores de la tabla Ciqual 2025. Al apuntarlo cuenta como el plato entero; puedes poner medio o dos.</p></div>'};
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
const offManual=code=>'<button class="btn pri" onclick="openProd(null,prodBlank(\''+code+'\'))">Crearlo a mano</button><button class="btn sec" onclick="openScan()">Probar otro código</button>';
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
const V_APP='32';
function offToPF(P,code){
  const N=P.nutriments||{},num=k=>{const n=parseFloat(N[k]);return isFinite(n)&&n>=0?r1v(n):null};
  const q=String(P.quantity||'')+' '+String(P.serving_size||''),ml=/\d\s*(ml|cl|l)\b/i.test(q)&&!/\d\s*g\b/i.test(String(P.serving_size||''));
  const sq=parseFloat(P.serving_quantity),o=prodBlank(code);
  // Open Food Facts da los valores por 100 g (o por 100 ml en bebidas): la etiqueta, tal cual
  o.n=sStr(P.product_name_es||P.product_name||P.generic_name||'',60);o.b=sStr(String(P.brands||'').split(',')[0],40);o.src='off';o.u=ml?'ml':'g';o.q='100';
  let kc=num('energy-kcal_100g');if(kc==null){const kj=num('energy-kj_100g');if(kj!=null)kc=Math.round(kj/4.184)}
  const V={p:num('proteins_100g'),k:kc==null?null:Math.round(kc),f:num('fat_100g'),fs:num('saturated-fat_100g'),c:num('carbohydrates_100g'),s:num('sugars_100g'),fi:num('fiber_100g'),sal:num('salt_100g')};
  Object.keys(V).forEach(k=>o.L[k]=nStr(V[k]));
  if(V.p!=null&&V.p>100)o.L.p='';
  if(V.p==null)o.noP=true;   // no trae proteína: se dice en la tarjeta, sin cifra de ejemplo que parezca suya
  o.t=sq>=1&&sq<=5000?nStr(Math.round(sq)):'';
  return o;
}
