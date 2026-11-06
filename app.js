/* Tsuyo · interfaz (web de pruebas del diseño de iPhone).
   Pestañas Hoy · Progreso · Rutina, hoja «Tú», sesión guiada a pantalla completa y Plus simulado. */
'use strict';

/* ═════ ICONOS ═════ */
const IC={
  chevR:'<path d="M9 5.5l6.5 6.5L9 18.5"/>',chevL:'<path d="M14.5 5.5L8 12l6.5 6.5"/>',chevD:'<path d="M6 9.5l6 6 6-6"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',x:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  plus:'<path d="M12 5.5v13M5.5 12h13"/>',minus:'<path d="M6 12h12"/>',up:'<path d="M12 19V5.5M6.5 11L12 5.5 17.5 11"/>',
  more:'<circle cx="5.5" cy="12" r="1.8" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.8" fill="currentColor" stroke="none"/>',
  play:'<path fill="currentColor" stroke="none" d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10.6-6.8c.6-.4.6-1.3 0-1.7L9.6 4.3C8.9 3.9 8 4.4 8 5.2z"/>',
  star:'<path fill="currentColor" stroke="none" d="M12 3.2l2.3 5.6 6 .5-4.6 3.9 1.4 5.9L12 15.9l-5.1 3.2 1.4-5.9-4.6-3.9 6-.5z"/>',
  book:'<path d="M4.5 5.5c2.5-.9 5-.6 7.5 1 2.5-1.6 5-1.9 7.5-1v13c-2.5-.9-5-.6-7.5 1-2.5-1.6-5-1.9-7.5-1z"/><path d="M12 6.5v13"/>',
  cal:'<rect x="4" y="5" width="16" height="15" rx="3.2"/><path d="M4 10h16M8.5 3v4M15.5 3v4"/>',
  heart:'<path d="M12 20s-7.6-4.6-7.6-10.3A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.6 2.4C19.6 15.4 12 20 12 20z"/>',
  trophy:'<path d="M8 4.5h8v4.2a4 4 0 0 1-8 0z"/><path d="M8 6.2H5.6a2.6 2.6 0 0 0 2.6 3.2M16 6.2h2.4a2.6 2.6 0 0 1-2.6 3.2"/><path d="M12 12.7v3.3M9 20h6M10 16h4v4h-4z"/>',
  pen:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  clock:'<circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.5 1.5M10 3h4"/>',
  bolt:'<path d="M13.2 3L5.6 13.4h5.6L10.4 21l8-10.6h-5.6z"/>',
  flame:'<path d="M12 21c-3.7 0-6.2-2.6-6.2-6 0-3.6 3-5.6 3.7-9.3 2.5 1.6 3.5 3.9 3.5 5.8.8-.6 1.4-1.6 1.6-2.9 2.1 1.6 3.6 4.1 3.6 6.4 0 3.4-2.5 6-6.2 6z"/>',
  ball:'<circle cx="12" cy="12" r="8.4"/><path d="M5.3 7.6c3 1.5 4.5 4.6 3.8 9.3M18.7 16.4c-3-1.5-4.5-4.6-3.8-9.3"/>',
  dumb:'<rect x="5" y="6.5" width="3.2" height="11" rx="1.3"/><rect x="15.8" y="6.5" width="3.2" height="11" rx="1.3"/><path d="M2.6 10v4M21.4 10v4M8.2 12h7.6"/>',
  chart:'<path d="M4 19.5h16"/><path d="M5 15.5l4.5-4.5 3.2 3.2L19 8"/>',
  list:'<rect x="4.5" y="3.5" width="15" height="17" rx="3.2"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.4"/>',
  shield:'<path d="M12 3.5l7 2.6v5.4c0 4.4-3 8-7 9-4-1-7-4.6-7-9V6.1z"/>',
  down:'<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
  out:'<path d="M14 4.5h3.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H14M10 16l4-4-4-4M14 12H4.5"/>',
  trash:'<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>',redo:'<path d="M5.5 12a6.5 6.5 0 1 0 2-4.7M5 4.5v3.8h3.8"/>',
  moon:'<path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  lock:'<rect x="5.5" y="10.5" width="13" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  user:'<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.8 4-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/>',
  mail:'<rect x="3.5" y="5.5" width="17" height="13" rx="3"/><path d="M4.8 7.4l7.2 5.3 7.2-5.3"/>',
  skip:'<path d="M5 6l8 6-8 6zM16.5 6v12"/>',stop:'<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>',
  pause:'<rect x="6.5" y="5.5" width="3.6" height="13" rx="1.2" fill="currentColor" stroke="none"/><rect x="13.9" y="5.5" width="3.6" height="13" rx="1.2" fill="currentColor" stroke="none"/>'
};
const ic=(n,s=20,w=2)=>'<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>';
const $=id=>document.getElementById(id);
const dk=(pose,cell,extra)=>'<span class="deshi" data-pose="'+pose+'" data-cell="'+cell+'"'+(extra||'')+'></span>';
const dkStage=(pose,cell)=>'<div class="dk" aria-hidden="true">'+dk(pose,cell)+'<div class="floor"></div></div>';
const DIAS=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const DIAS3=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
const MESES=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const longDate=d=>{const x=new Date(d+'T00:00:00');return DIAS[x.getDay()].replace(/^./,c=>c.toUpperCase())+', '+x.getDate()+' de '+MESES[x.getMonth()]};
const fmtNum=n=>Math.round(n).toLocaleString('es-ES');
const mmss=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};

/* ═════ AVISOS, SONIDO Y PANTALLA ═════ */
let tmo;
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(tmo);tmo=setTimeout(()=>t.classList.remove('on'),2000)}

/* ═════ ACCESIBILIDAD (VoiceOver / TalkBack) ═════
   Avisos para el lector de pantalla: solo se oyen con VoiceOver o TalkBack encendido; para quien ve, no cambia nada. */
function say(m,urgent){const el=$(urgent?'srA':'srP');if(!el||!m)return;el.textContent='';clearTimeout(say.t);say.t=setTimeout(()=>{el.textContent=m},80)}
const spkT=s=>{s=Math.max(0,Math.round(s));const m=Math.floor(s/60),x=s%60;return (m?m+(m===1?' minuto':' minutos'):'')+(m&&x?' y ':'')+(x||!m?x+(x===1?' segundo':' segundos'):'')};
const spkKg=w=>String(w).replace('.',',')+(w==1?' kilo':' kilos');
/* lleva el foco (y el cursor del lector) a un elemento; si no es enfocable, lo hace enfocable sin meterlo en el orden del tabulador */
function a11yFocus(el){if(!el)return;if(el.tabIndex<0&&!el.hasAttribute('tabindex'))el.setAttribute('tabindex','-1');try{el.focus({preventScroll:true})}catch(e){}}
/* solo la capa de arriba se puede recorrer: hoja > pantalla completa > app; lo de debajo queda inerte */
function a11ySync(){
  const sh=$('sheet'),full=['cele','session','onb','welcome'].map($).find(x=>x&&x.classList.contains('on'));
  const top=sh.classList.contains('on')?sh:(full||$('app'));
  ['app','cele','session','onb','welcome','sheet'].forEach(id=>{const x=$(id);if(x)x.inert=x!==top});
  /* al cerrarse una pantalla completa (bienvenida, primeros pasos, sesión), el lector va al título de lo que queda */
  if(top!==a11ySync.top&&top.id!=='sheet'&&a11ySync.top&&a11ySync.top.id!=='sheet')setTimeout(()=>{const a=document.activeElement;if(a&&a!==document.body&&top.contains(a))return;a11yFocus(top.querySelector('.view.on h1')||top.querySelector('h1'))},0);
  a11ySync.top=top;
}
new MutationObserver(a11ySync).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class'],attributeOldValue:false});
let AC=null;
function audioUnlock(){try{if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(C)AC=new C()}if(AC&&AC.state==='suspended')AC.resume()}catch(e){}}
['pointerdown','click','touchend','keydown'].forEach(t=>document.addEventListener(t,audioUnlock,{passive:true,capture:true}));
function ding(){
  try{audioUnlock();const c=AC;if(!c)throw 0;
    [0,180,360].forEach(d=>setTimeout(()=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);
      o.frequency.value=880;o.type='sine';g.gain.setValueAtTime(.22,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.22);o.start();o.stop(c.currentTime+.22)},d));
  }catch(e){}
  if(navigator.vibrate)navigator.vibrate([180,90,180]);
}
let WL=null;
async function keepAwake(on){
  try{if(on&&'wakeLock' in navigator&&document.visibilityState==='visible'){if(!WL){WL=await navigator.wakeLock.request('screen');WL.addEventListener('release',()=>{WL=null})}}
    else if(!on&&WL){await WL.release();WL=null}}catch(e){WL=null}
}

/* Anillos de descanso: se vacían en sentido horario, como la aguja de un reloj (decisión heredada de NEXA Fit).
   El cronómetro de las series por tiempo se llena en el mismo sentido. */
/* ═════ TEMA ═════ */
const DARKQ=matchMedia('(prefers-color-scheme: dark)');
const isDark=()=>{const t=PREF.get('theme','auto');return t==='dark'||(t==='auto'&&DARKQ.matches)};
function applyTheme(){
  const t=PREF.get('theme','auto');document.documentElement.dataset.theme=t;
  document.querySelectorAll('meta[name=theme-color]').forEach(m=>{m.dataset.c=m.dataset.c||m.content;m.content=t==='auto'?m.dataset.c:(t==='dark'?'#0A0A0C':'#F2F2F6')});
  const b=$('btnTheme');if(b){const d=isDark();b.innerHTML=ic(d?'sun':'moon',20);b.setAttribute('aria-label',d?'Cambiar a tema claro':'Cambiar a tema oscuro')}
}
/* botón siempre a mano: alterna claro/oscuro; «Automática» sigue en Tú → Apariencia */
function toggleTheme(){
  const go=()=>{PREF.set('theme',isDark()?'light':'dark');applyTheme()};
  const b=$('btnTheme');if(b){b.classList.add('spin');setTimeout(()=>b.classList.remove('spin'),60)}
  if(document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.startViewTransition(go);else go();
}
DARKQ.addEventListener&&DARKQ.addEventListener('change',applyTheme);
function setTheme(t){PREF.set('theme',t);applyTheme();openSheet(meSheet,true)}

/* ═════ CONSTANCIA Y CINTURÓN ═════ */
const BELT_STEPS=[['blanco','Blanco',0],['amarillo','Amarillo',4],['naranja','Naranja',12],['verde','Verde',24],['azul','Azul',40],['marrón','Marrón',60],['negro','Negro',90]];
const mondayOf=d=>{const x=new Date(d+'T00:00:00');x.setDate(x.getDate()-((x.getDay()+6)%7));return dstr(x)};
function perWeek(){return Math.max(1,Math.min(dayKeys().length||3,(DB.cfg.avail||[]).length||3))}
function weekCounts(){const by={};Object.keys(DB.sess).filter(sessDone).forEach(d=>{const m=mondayOf(d);by[m]=(by[m]||0)+1});return by}
function constancy(){
  const by=weekCounts(),need=Math.max(1,Math.ceil(perWeek()*.75)),thisW=mondayOf(T());
  const good=Object.keys(by).filter(w=>by[w]>=need&&(w<thisW||by[w]>=need));
  let streak=0,w=(by[thisW]||0)>=need?thisW:shiftD(thisW,-7);
  while((by[w]||0)>=need){streak++;w=shiftD(w,-7)}
  const n=good.length;let i=0;BELT_STEPS.forEach((b,k)=>{if(n>=b[2])i=k});
  const next=BELT_STEPS[i+1]||null;
  return{n,streak,need,belt:BELT_STEPS[i],next,thisWeek:by[thisW]||0};
}
function applyLook(){
  const L=Object.assign({},DB.profile.deshi||{},{belt:constancy().belt[0]});
  Deshi.setLook(L);
  document.documentElement.style.setProperty('--belt',Deshi.BELTS[L.belt]);
}

/* ═════ NAVEGACIÓN ═════ */
let cur='hoy',curDate=T();
function go(v){
  cur=v;
  document.querySelectorAll('.view').forEach(x=>x.classList.toggle('on',x.id==='v-'+v));
  document.querySelectorAll('.tab').forEach(b=>{const on=b.dataset.v===v;b.classList.toggle('on',on);if(on)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
  window.scrollTo(0,0);render();
}
function render(){
  {const nd=T();if(nd!==curDate){curDate=nd;buildPlan()}}applyLook();
  if(cur==='hoy')renderHoy();if(cur==='progreso')renderProg();if(cur==='rutina')renderRut();
  renderAcc();checkBlock();
  $('btnMe').innerHTML='<span class="deshi" data-pose="stand" data-crop="head" data-box="40" data-still></span>';
}

/* ═════ SESIÓN DE HOY ═════ */
function todayN(){
  const f=PREF.get('force',null);
  if(f&&f.d===T()&&validDay(f.n))return f.n;
  if(f&&f.d===T()&&f.n===0)return 0;
  const P=planWeek();return validDay(P.map[T()]||P.sched[T()]||0);
}
function estMin(n){
  const hist=Object.keys(DB.sess).filter(k=>DB.sess[k].day===n&&DB.sess[k].dur>=10).sort().slice(-3);
  if(hist.length)return Math.round(hist.reduce((a,k)=>a+DB.sess[k].dur,0)/hist.length);
  let s=360;PLAN[n].ex.forEach((e,i)=>{const work=e.seg?(e.min?e.hi*60:e.hi):45;s+=nSteps(e)*work+Math.max(0,e.s-1)*e.r;if(i<PLAN[n].ex.length-1)s+=90});
  return Math.round(s/60/5)*5||5;
}
/* texto bajo el reloj de la plancha: rango normal o, en semana ligera, el tiempo de hoy */
function segLab(e,el){
  const lg=lightGoal(e);
  if(lg)return el>=lg?'suficiente por hoy':'semana ligera · unos '+lg+' s';
  return el>=e.hi?'tope del rango':(el>=e.lo?'en rango':'objetivo '+e.lo+'–'+e.hi+' s');
}
const unitOf=e=>e.seg?(e.min?'min':'s'):'reps';
function exLine(e){
  const a=advise(e),u=unitOf(e);
  const rng=a.lt||a.lr||(e.lo===e.hi?e.hi:(e.lo+'–'+e.hi));
  let w='';
  if(e.spd)w=a.sp?' · '+fmtSp(a.sp)+' km/h':'';else if(!e.bw&&a.w)w=' · '+fmtSp(a.w)+' kg';
  return (e.s>1?e.s+' × ':'')+rng+' '+u+(e.side?' por lado':'')+w;
}
function setsDoneToday(n){const log=DB.sess[T()]?.ex||{};let k=0;(PLAN[n]?.ex||[]).forEach(e=>(log[e.id]||[]).forEach(s=>{if(s&&s.r)k++}));return k}
function totalSets(n){return PLAN[n].ex.reduce((a,e)=>a+nSteps(e),0)}
function weekStrip(P){
  /* para el lector de pantalla, la semana en una frase: solo los días con algo */
  const say=P.week.map(dt=>{const hd=P.map[dt],pl=P.sched[dt],sk=(P.skips||{})[dt],hoy=dt===T();const st=hd?'hecha':(sk?'saltada':(pl?'prevista':''));
    if(!st&&!hoy)return null;return DIAS[wdOf(dt)]+' '+Number(dt.slice(8))+(hoy?' (hoy)':'')+(st?', sesión '+st:', descanso')}).filter(Boolean).join('; ');
  return '<div class="week" role="img" aria-label="'+esc(say.replace(/^./,c=>c.toUpperCase()))+'">'+P.week.map(dt=>{
    const hd=P.map[dt],pl=P.sched[dt],sk=(P.skips||{})[dt],hoy=dt===T();
    let c=hd?'done':(sk?'skip':(pl?'plan':''));if(hoy)c+=' today';
    const dot=hoy&&!hd?'tint':(pl&&!hd&&!hoy?'on':'');
    return '<div class="day'+(hoy?' today':'')+'"><span class="dl">'+WDL[wdOf(dt)]+'</span><span class="dc '+c+'">'+Number(dt.slice(8))+'</span><span class="dot '+dot+'"></span></div>';
  }).join('')+'</div>';
}
function nextSession(P){
  const fut=Object.keys(P.sched).filter(d=>d>T()).sort();
  if(fut.length){const d=fut[0];return{n:P.sched[d],when:d===shiftD(T(),1)?'mañana':DIAS[wdOf(d)]}}
  return null;
}
function renderHoy(){
  const v=$('v-hoy'),P=planWeek(),n=todayN(),hecho=!!P.map[T()],B=blockInfo();
  const done=Object.keys(P.map).length,tot=dayKeys().length;
  let sub=longDate(T());
  if(B){const ph=phaseOf(B.b,B.bw);sub+=' · semana '+B.bw+' de 12'}
  let h='<div class="head"><div><h1 class="lt">Hoy</h1><p class="sb l2 sub">'+sub+'</p></div></div>';
  h+='<div class="pad" style="padding-top:16px">';
  if(!dayKeys().length){
    h+='<div class="card" style="padding:20px"><div class="row" style="align-items:flex-end"><div class="grow"><h2 class="t2">Elige tu rutina</h2><p class="sb l2" style="margin-top:4px">Todavía no tienes plan de entreno.</p></div>'+dkStage('stand',1.6)+'</div>'+
      '<button class="btn pri" style="margin-top:16px" onclick="openTplPicker()">Elegir rutina</button></div>';
  }else if(n&&PLAN[n].ex.length){
    const p=PLAN[n],sd=setsDoneToday(n),ts=totalSets(n),allDone=sd>=ts;
    const ups=p.ex.filter(e=>advise(e).up);
    h+='<div class="card" style="padding:18px 18px 18px 20px"><div class="row" style="align-items:flex-end;gap:10px"><div class="grow" style="padding-bottom:8px">'+
      '<p class="fn l2">'+(allDone?'Sesión hecha hoy':(sd?'Sesión a medias':'Sesión '+Math.min(tot,done+1)+' de '+tot+' de la semana'))+'</p>'+
      '<h2 class="t1" style="margin-top:4px">'+esc(p.n)+'</h2>'+
      '<p class="sb l2" style="margin-top:2px">'+p.ex.length+' ejercicios · unos '+estMin(n)+' min</p>'+
      (sd&&!allDone?'<p class="sb ink semi" style="margin-top:6px">'+sd+' de '+ts+' series hechas</p>':'')+
      (ups.length&&!hecho?'<span class="pill tint" style="margin-top:10px">'+ic('up',13,2.6)+esc(ups[0].n)+(ups.length>1?' y '+(ups.length-1)+' más':'')+': toca subir</span>':'')+
      (B&&B.bw===11?'<span class="pill amb" style="margin-top:10px">Semana ligera</span>':'')+
      '</div>'+dkStage(allDone?'cheer':'guard',allDone?1.55:1.95)+'</div>'+
      '<div class="row" style="margin-top:18px">'+
      (allDone?'<button class="btn sec grow" onclick="openSession('+n+')">Ver resumen</button>'
        :'<button class="btn pri grow" onclick="openSession('+n+')">'+ic('play',18)+(sd?'Continuar':'Empezar')+'</button>')+
      '<button class="btn sec" style="width:54px;flex-shrink:0" onclick="openTodayMenu('+n+')" aria-label="Más opciones de la sesión">'+ic('more',22)+'</button></div></div>';
  }else{
    const nx=nextSession(P),sk=(P.skips||{})[T()];
    h+='<div class="card" style="padding:18px 18px 18px 20px"><div class="row" style="align-items:flex-end;gap:10px"><div class="grow" style="padding-bottom:8px">'+
      '<p class="fn l2">Sin sesión</p><h2 class="t1" style="margin-top:4px">'+(sk?'Sesión movida':'Día de descanso')+'</h2>'+
      '<p class="sb l2" style="margin-top:4px">'+(sk?'Hoy no pudo ser. La semana se ha reorganizado sola.':'El músculo se construye descansando.')+'</p></div>'+
      dkStage(sk?'tired':'seiza',1.75)+'</div>'+
      (nx?'<div class="row" style="margin-top:16px;padding:12px 14px;border-radius:18px;background:var(--fill2)"><span class="ic soft" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">'+ic('cal',20)+'</span>'+
        '<div class="grow"><p class="fn l2">Próxima sesión</p><p class="hl">'+esc(PLAN[nx.n].n)+' · '+nx.when+'</p></div></div>':'')+
      (sk?'<button class="btn sec" style="margin-top:12px" onclick="unskipToday()">Deshacer</button>'
        :'<button class="btn sec" style="margin-top:12px" onclick="openPickDay()">Entrenar hoy igualmente</button>')+'</div>';
  }
  h+='</div>';
  h+=firstCard();
  // semana
  if(dayKeys().length){
    h+='<div class="sec"><div class="stitle"><h3 class="t3">Esta semana</h3><span class="fn l2">'+done+' de '+tot+' hechas</span></div>'+
      '<div class="pad"><div class="card" style="padding:14px 8px 12px">'+weekStrip(P)+'</div>';
    if(P.noFit.length&&!(DB.cfg.start&&DB.cfg.start>=P.week[0]))h+='<p class="fn l2" style="padding:8px 16px 0">'+(P.noFit.length>1?P.noFit.length+' sesiones no caben':'«'+esc(PLAN[P.noFit[0]].n)+'» no cabe')+' en lo que queda de semana. El lunes se reparten de nuevo.</p>';
    if(B&&B.bw===10)h+='<p class="fn l2" style="padding:8px 16px 0">La semana que viene es la semana ligera. Aprovecha esta para exprimir tus pesos.</p>';
    if(B&&B.bw===12)h+='<p class="fn l2" style="padding:8px 16px 0">Última semana del bloque. Al acabarla verás el resumen de tus 12 semanas.</p>';
    h+='</div></div>';
  }
  // ejercicios de la sesión
  if(n&&PLAN[n]&&PLAN[n].ex.length){
    const log=DB.sess[T()]?.ex||{};
    h+='<div class="sec"><div class="stitle"><h3 class="t3">La sesión</h3><button class="fn link" onclick="openDaySheet('+n+')">Ver todo</button></div><div class="pad"><div class="group">'+
      PLAN[n].ex.map((e,i)=>{const dn=(log[e.id]||[]).filter(x=>x&&x.r).length>=nSteps(e),a=advise(e);
        return '<button class="cell" onclick="openExSheet('+n+','+i+')"><span class="exn'+(dn?' done':'')+'">'+(dn?ic('check',14,2.8):(i+1))+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(e.n)+'</p><p class="fn l2 num">'+exLine(e)+'</p></div>'+
          (a.up&&!dn?'<span class="pill tint num">'+(a.w?a.w+' kg':'subir')+'</span>':'')+'</div></button>'}).join('')+'</div></div></div>';
  }
  v.innerHTML=h;
}
/* ═════ PRIMER ENTRENO ═════
   Al acabar Primeros pasos se elige día y hora (o «Ahora no»). Mientras no haya ninguna sesión hecha,
   Hoy lo recuerda con Deshi y deja añadirlo al calendario del móvil con un archivo .ics, que vale en iPhone
   y Android y no depende de las notificaciones web. En la app nativa será una notificación. */
const anyDone=()=>Object.keys(DB.sess).some(sessDone);
const firstDay=()=>dayKeys().includes(1)?1:(dayKeys()[0]||1);
const whenTxt=d=>d===T()?'Hoy':(d===shiftD(T(),1)?'Mañana':longDate(d));
const firstDays=()=>Array.from({length:7},(_,i)=>shiftD(T(),i));
/* propuesta: el primer día de entreno elegido a partir de hoy (hoy solo si aún no son las 20 h) */
function defFirst(av){const h=new Date().getHours(),ds=firstDays();return ds.find((d,i)=>(i>0||h<20)&&(av||[]).includes(wdOf(d)))||ds[1]}
function firstPicker(sel,t,js,tv){
  return '<div class="daysel two" role="group" aria-label="Día">'+firstDays().map((d,i)=>'<button class="'+(d===sel?'on':'')+'" onclick="'+js+'(\''+d+'\')" aria-pressed="'+(d===sel)+'" aria-label="'+(i===0?'Hoy, ':(i===1?'Mañana, ':''))+longDate(d)+'"><small>'+(i===0?'HOY':WDL[wdOf(d)])+'</small><span class="num">'+Number(d.slice(8))+'</span></button>').join('')+'</div>'+
    '<div class="field" style="margin-top:16px"><label for="fT">Hora</label><input id="fT" type="time" value="'+t+'" oninput="'+tv+'=this.value||'+tv+'"></div>';
}
function firstCard(){
  if(!dayKeys().length||anyDone())return'';
  const f=DB.cfg.first,gl='<button class="cell" onclick="openGuide(\'inicio\')"><span class="ic gray">'+ic('book',17)+'</span><div class="cb"><div class="tt"><p class="bd">Guía para empezar</p><p class="fn l2">Cómo encontrar tus pesos y qué esperar</p></div>'+chev()+'</div></button>';
  if(!f)return '<div class="pad" style="margin-top:12px"><div class="group"><button class="cell" onclick="openFirst()"><span class="ic soft">'+ic('cal',17)+'</span><div class="cb"><div class="tt"><p class="bd">Ponle día y hora a tu primer entreno</p><p class="fn l2">Una cita concreta ayuda a empezar</p></div>'+chev()+'</div></button>'+gl+'</div></div>';
  const late=f.d<T(),k=firstDay();
  return '<div class="pad" style="margin-top:12px"><div class="card" style="padding:16px 16px 16px 18px"><div class="row" style="align-items:flex-end;gap:10px"><div class="grow" style="padding-bottom:6px">'+
    '<p class="fn l2">'+(late?'Tu primer entreno se quedó pendiente':'Tu primer entreno')+'</p>'+
    '<h2 class="t2" style="margin-top:4px">'+(late?'¿Le ponemos otra fecha?':whenTxt(f.d)+' · '+f.t)+'</h2>'+
    '<p class="sb l2" style="margin-top:2px">'+(late?'Era el '+longDate(f.d).replace(/^[^,]+, /,'')+'. Pasa a todos: elige otro día.':esc(PLAN[k].n)+' · unos '+estMin(k)+' min')+'</p></div>'+dkStage(late?'seiza':'rei',1.5)+'</div>'+
    '<div class="row" style="margin-top:14px;gap:8px">'+(late?'<button class="btn sec grow" onclick="openFirst()">Elegir otro día</button>'
      :'<button class="btn sec grow" onclick="addFirstCal()">'+ic('cal',18)+'Añadir a mi calendario</button><button class="btn sec" style="width:98px;flex-shrink:0" onclick="openFirst()">Cambiar</button>')+'</div></div>'+
    '<div class="group" style="margin-top:10px">'+gl+'</div></div>';
}
let FST=null;
function openFirst(){
  const f=DB.cfg.first;FST={d:f&&f.d>=T()?f.d:defFirst(DB.cfg.avail),t:f?f.t:'18:00'};
  openSheet(()=>({title:'Primer entreno',body:'<div class="pad"><p class="sb l2 center balance" style="padding:0 10px 16px">Elige día y hora. Te lo recordamos en Hoy y puedes añadirlo a tu calendario.</p>'+firstPicker(FST.d,FST.t,'fstDay','FST.t')+
    '<div class="stack" style="margin-top:20px"><button class="btn pri" onclick="saveFirst()">Guardar</button>'+(DB.cfg.first?'<button class="btn tx red" onclick="clearFirst()">Quitar la cita</button>':'')+'</div></div>'}));
}
function fstDay(d){FST.d=d;drawSheet();const b=[...document.querySelectorAll('#sheet .daysel button')].find(x=>x.getAttribute('onclick').includes(d));if(b)a11yFocus(b)}
function saveFirst(){if(!/^\d\d:\d\d$/.test(FST.t||'')){toast('Elige una hora');return}DB.cfg.first={d:FST.d,t:FST.t};save();closeSheet();render();toast('Primer entreno: '+whenTxt(FST.d).toLowerCase()+' a las '+FST.t)}
function clearFirst(){delete DB.cfg.first;save();closeSheet();render();toast('Cita quitada')}
/* archivo de calendario con aviso 30 min antes (hora local, sin zona: el móvil la toma como suya) */
function addFirstCal(){
  const f=DB.cfg.first;if(!f)return;const k=firstDay(),pd=n=>String(n).padStart(2,'0');
  const st=new Date(f.d+'T'+f.t+':00'),en=new Date(st.getTime()+estMin(k)*60000);
  const fmt=x=>x.getFullYear()+pd(x.getMonth()+1)+pd(x.getDate())+'T'+pd(x.getHours())+pd(x.getMinutes())+'00';
  const ie=t=>String(t).replace(/\\/g,'\\\\').replace(/[,;]/g,m=>'\\'+m).replace(/\n/g,'\\n');
  const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Tsuyo//Primer entreno//ES','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',
    'UID:tsuyo-primer-'+f.d+'-'+f.t.replace(':','')+'@tsuyo','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d+/,''),
    'DTSTART:'+fmt(st),'DTEND:'+fmt(en),'SUMMARY:'+ie('Tsuyo · '+PLAN[k].n),'DESCRIPTION:'+ie('Tu primer entreno. Abre Tsuyo y pulsa Empezar: la primera vez de cada ejercicio te ayuda a buscar tu peso.'),
    'BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+ie('Tsuyo · primer entreno en 30 minutos'),'TRIGGER:-PT30M','END:VALARM','END:VEVENT','END:VCALENDAR'].join('\r\n');
  try{const b=new Blob([ics],{type:'text/calendar;charset=utf-8'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tsuyo-primer-entreno.ics';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);toast('Ábrelo para añadirlo a tu calendario')}
  catch(e){toast('No se pudo crear el archivo')}
}
function openTodayMenu(n){
  openSheet(()=>({title:'Sesión de hoy',body:'<div class="pad"><div class="group">'+
    '<button class="cell" onclick="openDaySheet('+n+')"><span class="ic gray">'+ic('list',18)+'</span><div class="cb"><span class="tt bd">Ver la sesión completa</span>'+ic('chevR',15,2.4).replace('<svg','<svg class="chev"')+'</div></button>'+
    '<button class="cell" onclick="openPickDay(true)"><span class="ic gray">'+ic('dumb',18)+'</span><div class="cb"><span class="tt bd">Hacer otra sesión</span>'+ic('chevR',15,2.4).replace('<svg','<svg class="chev"')+'</div></button>'+
    (planWeek().sched[T()]?'<button class="cell" onclick="closeSheet();skipToday()"><span class="ic gray">'+ic('skip',18)+'</span><div class="cb"><div class="tt"><p class="bd">Hoy no he podido</p><p class="fn l2">La semana se reorganiza sola</p></div></div></button>':'')+
    (PREF.get('force',null)?.d===T()?'<button class="cell" onclick="PREF.set(\'force\',null);closeSheet();render()"><span class="ic gray">'+ic('cal',18)+'</span><div class="cb"><span class="tt bd">Volver a la sesión del plan</span></div></button>':'')+
    '</div></div>'}));
}
function openPickDay(push){
  openSheet(()=>({title:'¿Qué sesión haces hoy?',body:'<div class="pad"><div class="group">'+dayKeys().map(k=>
    '<button class="cell" onclick="PREF.set(\'force\',{d:T(),n:'+k+'});closeSheet();render()"><div class="cb"><div class="tt"><p class="bd">'+esc(PLAN[k].n)+'</p><p class="fn l2">'+PLAN[k].ex.length+' ejercicios · unos '+estMin(k)+' min</p></div>'+(todayN()===k?ic('check',18,2.6):'')+'</div></button>').join('')+
    '</div></div>'}),push);
}
function renderHoyAlias(){render()}
window.renderHoy=renderHoy;

/* ═════ PROGRESO ═════ */
function weekVolumes(nw){
  const thisW=mondayOf(T()),out=[];
  for(let i=nw-1;i>=0;i--){
    const w=shiftD(thisW,-7*i);let t=0;
    Object.keys(DB.sess).forEach(d=>{if(mondayOf(d)!==w)return;Object.values(DB.sess[d].ex||{}).forEach(a=>a.forEach(s=>{if(s&&s.r)t+=(s.w||0)*s.r}))});
    out.push({w,t});
  }
  return out;
}
function niceStep(mx){const raw=mx/2;const p=Math.pow(10,Math.floor(Math.log10(raw||1)));const m=raw/p;return (m<=1?1:m<=2?2:m<=5?5:10)*p}
function volChart(V){
  const W=330,H=132,left=6,right=46,top=10,bot=22,mx=Math.max(...V.map(v=>v.t),1);
  const st=niceStep(mx),max=Math.max(mx,st*2);
  const cw=(W-left-right)/V.length,Y=v=>top+(H-top-bot)*(1-v/max);
  let g='';
  [st,st*2].forEach(t=>{if(t>max)return;g+='<line x1="'+left+'" x2="'+(W-right+6)+'" y1="'+Y(t)+'" y2="'+Y(t)+'" stroke="var(--sep)" stroke-dasharray="3 3"/>'+
    '<text x="'+(W-2)+'" y="'+(Y(t)+4)+'" text-anchor="end" font-size="10.5" fill="var(--label3)">'+fmtNum(t)+'</text>'});
  const lastFull=V.length-2;
  V.forEach((v,i)=>{
    const x=left+i*cw+4,w=cw-8,h=Math.max(v.t?3:0,(H-top-bot)*(v.t/max)),y=H-bot-h;
    const isCur=i===V.length-1,isHi=i===lastFull;
    g+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+(isCur?'var(--tint-soft)':(isHi?'var(--tint)':'var(--fill)'))+'"'+(isCur?' stroke="var(--ink)" stroke-width="1.5"':'')+'/>';
    const d=new Date(v.w+'T00:00:00');
    g+='<text x="'+(x+w/2)+'" y="'+(H-6)+'" text-anchor="middle" font-size="10" fill="'+(isCur?'var(--ink)':'var(--label3)')+'" font-weight="'+(isCur?600:400)+'">'+(isCur?'Esta':d.getDate()+' '+MESES[d.getMonth()].slice(0,3))+'</text>';
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Volumen semanal de las últimas '+V.length+' semanas. Esta semana, '+fmtNum(V[V.length-1].t)+' kilos'+(V.length>1?'; la anterior, '+fmtNum(V[V.length-2].t)+' kilos':'')+'">'+g+'</svg>';
}
function renderProg(){
  const C=constancy(),V=weekVolumes(8),useCur=!V[V.length-2].t,last=useCur?V[V.length-1].t:V[V.length-2].t,prev=useCur?0:V[V.length-3].t;
  const pct=prev?Math.round((last-prev)/prev*100):null;
  const R=prData(),recent=Object.keys(R).sort((a,b)=>R[b].d.localeCompare(R[a].d)||exName(a).localeCompare(exName(b))).slice(0,4);
  const goal=C.next?C.next[2]:C.belt[2],from=C.belt[2],cells=C.next?(goal-from):1;
  let h='<div class="head"><div><h1 class="lt">Progreso</h1><p class="sb l2 sub">Tu constancia y tus marcas</p></div></div><div class="pad stack" style="padding-top:16px">';
  h+='<button class="card" style="padding:16px 18px 16px 16px;display:block;width:100%;text-align:left" onclick="openBeltSheet()"><div class="row" style="gap:14px">'+
    '<div class="avatar" style="width:58px;height:58px;background:var(--fill2)"><span class="deshi" data-pose="stand" data-crop="head" data-box="58" data-still></span></div>'+
    '<div class="grow"><p class="fn l2">Constancia</p><p class="t2">Cinturón '+C.belt[1].toLowerCase()+'</p><p class="fn l2">'+C.n+' semana'+(C.n===1?'':'s')+' constante'+(C.n===1?'':'s')+(C.streak>1?' · '+C.streak+' seguidas':'')+'</p></div></div>'+
    (C.next?'<div class="beltbar">'+Array.from({length:Math.min(cells,30)},(_,i)=>'<i class="'+(i<C.n-from?'on':'')+'"></i>').join('')+'</div>'+
      '<div class="row" style="justify-content:space-between;margin-top:7px"><span class="c1 l2">Faltan '+(goal-C.n)+' semana'+(goal-C.n===1?'':'s')+' para el '+C.next[1].toLowerCase()+'</span><span class="c1 l3 num">'+C.n+'/'+goal+'</span></div>'
      :'<p class="fn l2" style="margin-top:10px">Has llegado al cinturón negro.</p>')+'</button>';
  h+='<div class="card" style="padding:16px 16px 14px"><p class="fn l2">Volumen semanal</p><div class="row" style="margin-top:2px;gap:8px"><span class="t2 num">'+fmtNum(last)+' kg</span>'+
    (pct!=null&&last?'<span class="pill '+(pct>=0?'tint':'gray')+' num">'+(pct>=0?'+':'')+pct+' %</span>':'')+'</div>'+
    '<p class="fn l2">'+(useCur?'Esta semana, por ahora':'La semana pasada'+(pct!=null&&last?', frente a la anterior':''))+'</p><div class="chart">'+volChart(V)+'</div></div>';
  h+='</div>';
  h+='<div class="sec"><div class="stitle"><h3 class="t3">Récords recientes</h3>'+(Object.keys(R).length?'<button class="fn link" onclick="openRecords()">Ver todos</button>':'')+'</div><div class="pad"><div class="group">'+
    (recent.length?recent.map(id=>'<div class="cell static"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(exName(id))+'</p><p class="fn l2 num">'+esc(R[id].lbl)+'</p></div><span class="fn l2">'+(R[id].d===T()?'Hoy':fmtD(R[id].d))+'</span></div></div>').join('')
      :'<div class="empty">Tus mejores marcas aparecerán aquí cuando registres series.</div>')+'</div></div></div>';
  const BL=blkDone();
  if(BL.length)h+='<div class="sec"><div class="stitle"><h3 class="t3">Tus bloques</h3></div><div class="pad"><div class="group">'+BL.slice().reverse().map(b=>{const R=blkRange(b),n=blkSess(b).length;
    return '<button class="cell" onclick="openCele('+b+',1)"><span class="ic tint">'+ic('trophy',17)+'</span><div class="cb"><div class="tt"><p class="bd">Bloque '+b+' · 12 semanas</p><p class="fn l2 num">'+fmtD(R.s)+' – '+fmtD(R.last)+' · '+n+' sesi'+(n===1?'ón':'ones')+'</p></div>'+chev()+'</div></button>'}).join('')+'</div></div></div>';
  h+='<div class="sec"><div class="stitle" style="justify-content:flex-start;gap:8px"><h3 class="t3">Más detalle</h3>'+(isPlus()?'':'<span class="pill plus">Plus</span>')+'</div><div class="pad"><div class="group">'+
    '<button class="cell" onclick="'+(isPlus()?'openExChart()':'openPlus()')+'"><span class="ic soft">'+ic('chart',18)+'</span><div class="cb"><span class="tt bd">Progreso por ejercicio</span>'+chev()+'</div></button>'+
    '<button class="cell" onclick="openHistory()"><span class="ic soft">'+ic('cal',18)+'</span><div class="cb"><div class="tt"><p class="bd">Historial de sesiones</p>'+(isPlus()?'':'<p class="fn l2">Últimos 30 días; completo con Plus</p>')+'</div>'+chev()+'</div></button>'+
    '</div></div></div>';
  $('v-progreso').innerHTML=h;
}
const chev=()=>'<svg class="chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC.chevR+'</svg>';
function openBeltSheet(){
  const C=constancy();
  openSheet(()=>({title:'Cinturón',body:'<div class="center" style="padding:6px 20px 0"><div style="display:flex;justify-content:center">'+dkStage('stand',2.2)+'</div>'+
    '<p class="t2" style="margin-top:14px">Cinturón '+C.belt[1].toLowerCase()+'</p><p class="sb l2" style="margin-top:4px">Una semana es constante si haces al menos '+C.need+' sesión'+(C.need===1?'':'es')+'. El cinturón nunca se pierde.</p></div>'+
    '<div class="pad" style="margin-top:18px"><div class="group">'+BELT_STEPS.map(b=>'<div class="cell static"><span class="ic" style="background:'+Deshi.BELTS[b[0]]+';box-shadow:inset 0 0 0 .5px var(--sep)"></span><div class="cb"><span class="tt bd">'+b[1]+'</span><span class="val num">'+(b[2]?b[2]+' semanas':'Al empezar')+'</span>'+(C.n>=b[2]?ic('check',16,2.6):'')+'</div></div>').join('')+'</div></div>'}));
}
function openRecords(){
  const R=prData(),ids=Object.keys(R).sort((a,b)=>exName(a).localeCompare(exName(b)));
  openSheet(()=>({title:'Récords',body:'<div class="pad"><div class="group">'+ids.map(id=>'<div class="cell static"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd ell">'+esc(exName(id))+'</p><p class="fn l2 num">'+esc(R[id].lbl)+'</p></div><span class="fn l2">'+fmtD(R[id].d)+'</span></div></div>').join('')+'</div></div>'}));
}
function sessStats(d){let n=0,ton=0;Object.values(DB.sess[d]?.ex||{}).forEach(a=>a.forEach(s=>{if(s&&s.r){n++;ton+=(s.w||0)*s.r}}));return{n,ton}}
function openHistory(){
  const lim=isPlus()?'0000':shiftD(T(),-30);
  const ks=Object.keys(DB.sess).filter(d=>sessDone(d)&&d>=lim).sort().reverse();
  openSheet(()=>({title:'Historial',body:'<div class="pad"><div class="group">'+(ks.length?ks.map(d=>{const s=sessStats(d),p=PLAN[DB.sess[d].day];
    return '<button class="cell" onclick="openPastSession(\''+d+'\')"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd">'+(p?esc(p.n):'Sesión')+'</p><p class="fn l2 num">'+longDate(d)+'</p></div><span class="fn l2 num">'+s.n+' series</span>'+chev()+'</div></button>'}).join('')
    :'<div class="empty">Aún no hay sesiones.</div>')+'</div>'+(isPlus()?'':'<p class="gfoot" style="padding-left:16px">Con Plus ves el historial completo.</p>')+'</div>'}),true);
}
function openPastSession(d){
  const s=DB.sess[d],p=PLAN[s.day];
  openSheet(()=>({title:fmtD(d),body:'<div class="pad stack">'+Object.entries(s.ex||{}).filter(([,a])=>a.some(x=>x&&x.r)).map(([id,a])=>{const e=exBase(id)||{};
    return '<div class="card" style="padding:14px 16px"><p class="hl">'+esc(exName(id))+'</p><p class="fn l2 num" style="margin-top:4px">'+a.filter(x=>x&&x.r).map(x=>(x.w?x.w+' kg × ':'')+x.r+(e.seg?(e.min?' min':' s'):'')+(x.sp?' · '+x.sp+' km/h':'')).join(' · ')+'</p></div>'}).join('')+
    (s.dur?'<p class="fn l2 center">'+s.dur+' min'+(p?' · '+esc(p.n):'')+'</p>':'')+
    '<button class="btn tx danger" style="margin-top:4px" onclick="askDelPast(\''+d+'\')">'+ic('trash',18)+'Borrar este entreno</button></div>'}),true);
}
function askDelPast(d){const n=sessStats(d).n;confirmSheet('Borrar este entreno','Se borra'+(n===1?' la serie':'n las '+n+' series')+' del '+longDate(d).replace(/^./,c=>c.toLowerCase())+' y deja de contar en tu progreso y tus récords. <b>No se puede deshacer.</b>','Borrar','delPast(\''+d+'\')',true)}
function delPast(d){
  if(SS.on&&d===T()){SS.tEnd=0;closeSession()}
  const st=PREF.get('sess',null);if(st&&st.d===d)PREF.set('sess',null);
  delete DB.sess[d];save();closeSheet();render();toast('Entreno borrado');
}
function openExChart(id){
  if(!id){
    const ids=[...new Set(Object.values(DB.sess).flatMap(s=>Object.keys(s.ex||{})))].filter(x=>exBase(x)).sort((a,b)=>exName(a).localeCompare(exName(b)));
    openSheet(()=>({title:'Elige un ejercicio',body:'<div class="pad"><div class="group">'+(ids.length?ids.map(x=>'<button class="cell" onclick="openExChart(\''+x+'\')"><div class="cb" style="padding-left:2px"><span class="tt bd">'+esc(exName(x))+'</span>'+chev()+'</div></button>').join(''):'<div class="empty">Registra series para ver su progreso.</div>')+'</div></div>'}),true);
    return;
  }
  const e=exBase(id),pts=Object.keys(DB.sess).sort().map(d=>{const a=(DB.sess[d].ex||{})[id];if(!a)return null;const ok=a.filter(x=>x&&x.r);if(!ok.length)return null;
    const v=e.spd?Math.max(...ok.map(x=>x.sp||0)):((e.bw||e.seg)?Math.max(...ok.map(x=>x.r)):Math.max(...ok.map(x=>x.w||0)));return{d,v}}).filter(Boolean);
  const unit=e.spd?'km/h':((e.bw||e.seg)?(e.seg?'s':'reps'):'kg');
  let svg='<div class="empty">Necesitas al menos dos sesiones con este ejercicio.</div>';
  if(pts.length>1){
    const W=330,H=170,l=8,r=40,t=14,b=24,mn=Math.min(...pts.map(p=>p.v)),mx=Math.max(...pts.map(p=>p.v)),pad=(mx-mn)||1;
    const lo=mn-pad*.15,hi=mx+pad*.15,X=i=>l+i*(W-l-r)/(pts.length-1),Y=v=>t+(H-t-b)*(1-(v-lo)/(hi-lo));
    let g='<line x1="'+l+'" x2="'+(W-r)+'" y1="'+Y(mx)+'" y2="'+Y(mx)+'" stroke="var(--sep)" stroke-dasharray="3 3"/><text x="'+(W-2)+'" y="'+(Y(mx)+4)+'" text-anchor="end" font-size="10.5" fill="var(--label3)">'+mx+'</text>'+
      '<line x1="'+l+'" x2="'+(W-r)+'" y1="'+Y(mn)+'" y2="'+Y(mn)+'" stroke="var(--sep)" stroke-dasharray="3 3"/><text x="'+(W-2)+'" y="'+(Y(mn)+4)+'" text-anchor="end" font-size="10.5" fill="var(--label3)">'+mn+'</text>';
    g+='<path d="'+pts.map((p,i)=>(i?'L':'M')+X(i)+' '+Y(p.v)).join('')+'L'+X(pts.length-1)+' '+(H-b)+'L'+X(0)+' '+(H-b)+'Z" fill="var(--tint-soft)"/>';
    g+='<path d="'+pts.map((p,i)=>(i?'L':'M')+X(i)+' '+Y(p.v)).join('')+'" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>';
    g+='<circle cx="'+X(pts.length-1)+'" cy="'+Y(pts[pts.length-1].v)+'" r="4.5" fill="var(--tint)" stroke="var(--ink)" stroke-width="2"/>';
    g+='<text x="'+l+'" y="'+(H-6)+'" font-size="10" fill="var(--label3)">'+fmtD(pts[0].d)+'</text><text x="'+(W-r)+'" y="'+(H-6)+'" text-anchor="end" font-size="10" fill="var(--label3)">'+fmtD(pts[pts.length-1].d)+'</text>';
    svg='<svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="Progreso de '+esc(e.n)+': de '+pts[0].v+' a '+pts[pts.length-1].v+' '+unit+' entre el '+fmtD(pts[0].d)+' y el '+fmtD(pts[pts.length-1].d)+'. Máximo, '+mx+' '+unit+'">'+g+'</svg>';
  }
  const first=pts[0],lastP=pts[pts.length-1];
  openSheet(()=>({title:esc(e.n),body:'<div class="pad"><div class="card" style="padding:16px"><p class="fn l2">'+(e.spd?'Velocidad máxima':((e.bw||e.seg)?'Mejor serie':'Peso máximo'))+'</p>'+
    '<p class="t2 num">'+(lastP?lastP.v+' '+unit:'—')+'</p>'+(first&&lastP&&pts.length>1?'<p class="fn l2 num">'+(lastP.v-first.v>=0?'+':'')+(Math.round((lastP.v-first.v)*10)/10)+' '+unit+' desde el '+fmtD(first.d)+'</p>':'')+
    '<div class="chart">'+svg+'</div></div></div>'}),true);
}

/* ═════ FIN DE BLOQUE · CELEBRACIÓN DE LAS 12 SEMANAS ═════
   Un bloque son 12 semanas (84 días) desde el día en que empezaste (DB.cfg.start). Al terminarlo, Tsuyo lo celebra
   una sola vez con un resumen muy visual. DB.cfg.cel guarda el último bloque celebrado y viaja con la cuenta.
   · Si la sesión de hoy es la última del bloque, la pantalla de «Sesión completada» ofrece verlo.
   · Si no, sale sola la primera vez que abres la app en el bloque nuevo.
   Solo sale sola si el bloque tuvo al menos BLK_MIN sesiones. Todos los resúmenes se vuelven a ver en Progreso. */
const BLK_MIN=6,CAR_KG=1200;                               // un coche pequeño, para comparar el volumen
const dDays=(a,b)=>Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/864e5);
const dLong=d=>{const x=new Date(d+'T00:00:00');return x.getDate()+' de '+MESES[x.getMonth()]};
function blkRange(b){const s=shiftD(DB.cfg.start,(b-1)*84);return{s,e:shiftD(s,84),last:shiftD(s,83)}}
function blkSess(b){if(!DB.cfg.start)return[];const R=blkRange(b);return Object.keys(DB.sess).filter(d=>d>=R.s&&d<R.e&&sessDone(d)).sort()}
/* último bloque terminado por calendario (0 mientras vas por el primero) */
function blkLast(){const w=weekNo();return w&&w>12?Math.floor((w-1)/12):0}
/* ¿la sesión de hoy cierra el bloque? Semana 12, el bloque acaba esta semana y no queda ninguna sesión prevista antes */
function blkEndsToday(){
  const B=blockInfo();if(!B||B.bw!==12||!sessDone(T()))return 0;
  const R=blkRange(B.b),P=planWeek();
  if(R.e>shiftD(P.week[0],7))return 0;
  return Object.keys(P.sched).some(d=>d>T()&&d<R.e)?0:B.b;
}
const blkNew=b=>b>(DB.cfg.cel||0)&&blkSess(b).length>=BLK_MIN;
/* bloques terminados (o ya celebrados) con algún entreno, para Progreso */
function blkDone(){const n=Math.max(blkLast(),DB.cfg.cel||0),o=[];for(let b=1;b<=n;b++)if(blkSess(b).length)o.push(b);return o}

/* la mejor cifra de un ejercicio en una sesión: kg en los de carga; reps, segundos o km/h en el resto */
function exBest(e,sets){
  const ok=(sets||[]).filter(x=>x&&x.r);if(!ok.length)return null;
  if(e.spd)return Math.max(...ok.map(x=>x.sp||0));
  if(e.seg||e.bw)return Math.max(...ok.map(x=>x.r));
  return Math.max(...ok.map(x=>x.w||0));
}
const exUnit=e=>e.spd?'km/h':(e.seg?(e.min?'min':'s'):(e.bw?'reps':'kg'));
/* valor de récord, igual que prData (peso manda; a igual peso, más repeticiones) */
function prVal(e,sets){
  let v=null;(sets||[]).forEach(q=>{if(!q||!q.r)return;let x;
    if(e.spd){if(!q.sp)return;x=q.sp}else if(e.seg||e.bw||!q.w)x=q.r;else x=q.w*1000+q.r;
    if(v==null||x>v)v=x});
  return v;
}
function blkSummary(b){
  const R=blkRange(b),ds=blkSess(b),need=Math.max(1,Math.ceil(perWeek()*.75));
  let sets=0,ton=0,min=0,nDur=0;const wk=Array(12).fill(0),hist={};
  ds.forEach(d=>{
    const s=DB.sess[d];wk[Math.min(11,Math.floor(dDays(R.s,d)/7))]++;if(s.dur){min+=s.dur;nDur++}
    Object.entries(s.ex||{}).forEach(([id,a])=>{
      (a||[]).forEach(x=>{if(x&&x.r){sets++;ton+=(x.w||0)*x.r}});
      const e=exBase(id);if(!e)return;const v=exBest(e,a);if(v!=null)(hist[id]=hist[id]||[]).push(v);
    });
  });
  // lo que más ha subido: la primera vez del bloque frente a la mejor
  const gains=Object.entries(hist).map(([id,v])=>{const e=exBase(id),f=v[0],m=Math.max(...v);return{id,n:e.n,u:exUnit(e),f,m,p:f>0?(m-f)/f:0}})
    .filter(g=>g.f>0&&g.m>g.f).sort((a,b)=>b.p-a.p||a.n.localeCompare(b.n)).slice(0,4);
  // récords batidos en el bloque (la primera vez que haces un ejercicio no cuenta)
  const best={};let recs=0;
  Object.keys(DB.sess).sort().forEach(d=>{if(d>=R.e)return;Object.entries(DB.sess[d].ex||{}).forEach(([id,a])=>{
    const e=exBase(id);if(!e)return;const v=prVal(e,a);if(v==null)return;
    if(best[id]!=null&&v>best[id]&&d>=R.s)recs++;if(best[id]==null||v>best[id])best[id]=v})});
  // cinturón al empezar y al acabar
  const by=weekCounts(),good=lim=>Object.keys(by).filter(w=>w<lim&&by[w]>=need).length;
  const beltOf=n=>{let i=0;BELT_STEPS.forEach((x,k)=>{if(n>=x[2])i=k});return BELT_STEPS[i]};
  return{b,R,n:ds.length,plan:perWeek()*12,sets,ton,min,nDur,wk,need,good:wk.filter(x=>x>=need).length,gains,recs,
    b0:beltOf(good(mondayOf(R.s))),b1:beltOf(good(R.e))};
}

/* ── pantalla ── */
let CE=null;
const RMQ=matchMedia('(prefers-reduced-motion: reduce)');
const fmtDec=(v,d)=>Number(v).toLocaleString('es-ES',{minimumFractionDigits:d||0,maximumFractionDigits:d||0});
/* número que cuenta desde 0 al aparecer; el lector de pantalla oye siempre la cifra final */
const cnt=(v,d)=>'<span class="ce-n" aria-hidden="true" data-to="'+v+'" data-dec="'+(d||0)+'">'+(RMQ.matches?fmtDec(v,d):'0')+'</span><span class="sr">'+fmtDec(v,d)+'</span>';
const kgTxt=(v,u)=>fmtSp(r2(v))+' '+u;
const IC_CAR='<path d="M3.5 15.5v-2.8l2.2-4.6c.3-.6.9-1.1 1.6-1.1h9.4c.7 0 1.3.5 1.6 1.1l2.2 4.6v2.8a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"/><path d="M5.8 12h12.4"/><circle cx="7.8" cy="16.5" r="1.7"/><circle cx="16.2" cy="16.5" r="1.7"/>';

function openCele(b,rev,mark){
  if(!DB.cfg.start||!b)return;
  if(!rev){const m=Math.max(b,mark||0);if(m>(DB.cfg.cel||0)){DB.cfg.cel=m;save()}}
  const S=blkSummary(b),B=blockInfo(),inNew=!!(B&&B.b>b),nb=b+1;
  CE={b,rev:!!rev,parts:[],raf:0,t:0,io:null};
  const pct=S.plan?S.n/S.plan:0,C=2*Math.PI*50,hrs=S.min/60,ton=S.ton/1000,cars=Math.round(S.ton/CAR_KG);
  const hrD=hrs<10?1:0,tonD=ton<100?1:0,maxW=Math.max(perWeek(),...S.wk,1);
  let h='<canvas class="ce-fx" id="ceFx" aria-hidden="true"></canvas><div class="fullin ce">'+
    '<div class="fnav"><span></span><button class="ibtn x-btn" onclick="closeCele()" aria-label="Cerrar">'+ic('x',16,2.4)+'</button></div>';
  // portada: Deshi celebrando y la cuenta de 12 semanas
  h+='<div class="ce-hero"><div class="ce-glow" aria-hidden="true"></div>'+
    '<button class="ce-dk" onclick="ceBurst()" aria-label="Lanzar confeti">'+dkStage('cheer',3.1)+'</button>'+
    '<span class="pill tint ce-pill">Bloque '+b+'</span>'+
    '<h1 class="ce-h" id="ceT" tabindex="-1"><span class="ce-big num" id="ceBig" aria-hidden="true">'+(RMQ.matches?12:0)+'</span><span class="sr">12 </span><span class="t2">semanas completadas</span></h1>'+
    '<div class="ce-dots" aria-hidden="true">'+Array.from({length:12},(_,i)=>'<i class="'+(i===10?'dl':'')+'"></i>').join('')+'</div>'+
    '<p class="sb l2" style="margin-top:12px">Del '+dLong(S.R.s)+' al '+dLong(S.R.last)+'</p></div>';
  h+='<div class="stack ce-list">';
  // sesiones: anillo de lo hecho frente a lo previsto
  h+='<div class="card ce-in ce-ses"><div class="ce-ring" aria-hidden="true"><svg width="116" height="116" viewBox="0 0 116 116"><circle cx="58" cy="58" r="50" fill="none" stroke="var(--fill2)" stroke-width="12"/>'+
    '<circle class="v" cx="58" cy="58" r="50" fill="none" stroke="var(--tint)" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C+'" data-off="'+(C*(1-Math.min(1,pct)))+'" transform="rotate(-90 58 58)"/></svg>'+
    '<div class="in num"><span>'+cnt(Math.round(pct*100))+'<small>%</small></span></div></div>'+
    '<div class="grow"><p class="fn l2">Sesiones</p><p class="ce-num num">'+cnt(S.n)+'</p><p class="sb l2">de '+S.plan+' previstas</p></div></div>';
  // horas, series y peso movido
  const tiles=[];
  // las horas solo si casi todas las sesiones guardan su duración (las importadas pueden no tenerla)
  if(S.min&&S.nDur>=S.n*.8)tiles.push(['Horas',cnt(r2(hrs).toFixed(hrD),hrD),' h']);
  tiles.push(['Series',cnt(S.sets),'']);
  if(S.ton>=1000)tiles.push(['Peso movido',cnt(ton.toFixed(tonD),tonD),' t']);else if(S.ton)tiles.push(['Peso movido',cnt(Math.round(S.ton)),' kg']);
  h+='<div class="card ce-in" style="overflow:hidden"><div class="row" style="gap:0">'+tiles.map(([l,v,u],i)=>
    '<div class="grow center" style="padding:15px 6px 13px'+(i?';border-left:.5px solid var(--sep)':'')+'"><p class="fn l2">'+l+'</p><p class="t2 num">'+v+'<span class="sb l3 semi">'+u+'</span></p></div>').join('')+'</div>'+
    (cars>=2?'<div class="ce-car"><span class="ic soft" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC_CAR+'</svg></span><p class="sb"><b>Como levantar '+fmtNum(cars)+' coches</b> <span class="l2">en total</span></p></div>':'')+'</div>';
  // las 12 semanas, barra a barra
  const wkSay=S.wk.map((c,i)=>'semana '+(i+1)+', '+c).join('; ');
  h+='<div class="card ce-in" style="padding:16px 16px 14px"><div class="row" style="justify-content:space-between;gap:8px"><p class="hl">Tus 12 semanas</p><span class="pill tint num">'+S.good+' de 12 constantes</span></div>'+
    '<div class="ce-wk" role="img" aria-label="Sesiones por semana: '+wkSay+'">'+S.wk.map((c,i)=>{
      const on=c>=S.need,ht=c?Math.max(12,Math.round(c/maxW*82)):4;
      return '<div class="b"><span class="col"><b class="num'+(c?'':' l3')+'" style="bottom:calc('+ht+'% + 3px);transition-delay:'+(i*70+350)+'ms">'+c+'</b><i class="bar'+(on?' on':'')+'" style="height:'+ht+'%;transition-delay:'+(i*70)+'ms"></i></span><small class="num'+(i===10?' amb':'')+'">'+(i+1)+'</small></div>'}).join('')+'</div>'+
    '<p class="c1 l2" style="margin-top:10px">Verde: semana constante ('+S.need+' sesi'+(S.need===1?'ón':'ones')+' o más). La 11 fue la semana ligera.</p></div>';
  // lo que ha subido
  h+='<div class="card ce-in" style="padding:16px 16px 6px"><p class="hl">'+(S.gains.length?'Lo que has subido':'Tus marcas')+'</p>'+
    (S.gains.length?S.gains.map((g,i)=>{const base=Math.round(g.f/g.m*100),pc=Math.round(g.p*100);
      return '<div class="ce-g" role="img" aria-label="'+esc(g.n)+': de '+fmtSp(r2(g.f))+' a '+fmtSp(r2(g.m))+' '+g.u+', '+pc+' por ciento más">'+
        '<div class="row" style="gap:8px"><p class="bd ell grow">'+esc(g.n)+'</p><span class="pill tint num">+'+pc+' %</span></div>'+
        '<div class="trk"><i class="base" style="width:'+base+'%"></i><i class="gr" style="left:'+base+'%;width:'+(100-base)+'%;transition-delay:'+(250+i*160)+'ms"></i></div>'+
        '<p class="fn l2 num">'+kgTxt(g.f,g.u)+' → <b class="ink">'+kgTxt(g.m,g.u)+'</b></p></div>'}).join('')
      :'<p class="sb l2" style="padding:6px 0 12px">Has mantenido tus cifras. Mantener peso y repeticiones bloque tras bloque también es progresar.</p>')+'</div>';
  // récords y cinturón
  const bc=k=>'<i class="ce-belt" style="background:'+Deshi.BELTS[k[0]]+'"></i>',up=S.b1[0]!==S.b0[0];
  h+='<div class="row ce-in" style="gap:12px;align-items:stretch">'+
    '<div class="card grow ce-tile"><span class="ic tint" aria-hidden="true">'+ic('trophy',20)+'</span><p class="ce-num num">'+cnt(S.recs)+'</p><p class="fn l2">récord'+(S.recs===1?' batido':'s batidos')+'</p></div>'+
    '<div class="card grow ce-tile"><div class="ce-belts" aria-hidden="true">'+(up?bc(S.b0)+ic('chevR',14,2.6)+bc(S.b1):bc(S.b1))+'</div>'+
    '<p class="hl" style="margin-top:12px">Cinturón '+S.b1[1].toLowerCase()+'</p><p class="fn l2">'+(up?'Subiste desde el '+S.b0[1].toLowerCase():'Tu constancia sigue sumando')+'</p></div></div>';
  // despedida: el saludo de Deshi y lo que viene
  const nxt=inNew?'Ya estás en el bloque '+nb+'. Empieza con la reentrada: recupera tus pesos a RIR 3.':'El '+DIAS[wdOf(S.R.e)]+' '+dLong(S.R.e)+' empieza el bloque '+nb+', con una semana de reentrada para recuperar tus pesos.';
  h+='<div class="card ce-in center" style="padding:22px 20px 20px"><div style="display:flex;justify-content:center">'+dkStage('rei',2.2)+'</div>'+
    (CE.rev&&B&&B.b>nb?'<p class="t2" style="margin-top:14px">Bloque '+b+' hecho</p><p class="sb l2 balance" style="margin-top:6px">Cada bloque suma. Gracias por entrenar.</p>'
      :'<p class="t2" style="margin-top:14px">Siguiente: bloque '+nb+'</p><p class="sb l2 balance" style="margin-top:6px">'+nxt+' Si quieres, cambia 1 o 2 ejercicios en Rutina para darle aire.</p>')+'</div>';
  h+='</div><div class="foot">'+(CE.rev?'<button class="btn pri lg" onclick="closeCele()">Cerrar</button>'
    :'<button class="btn pri lg" onclick="closeCele()">A por el bloque '+nb+'</button><button class="btn tx" onclick="closeCele();go(\'rutina\')">Revisar mi rutina</button>')+'</div></div>';
  const el=$('cele');el.innerHTML=h;el.scrollTop=0;el.classList.add('on');
  say('Bloque '+b+' completado. 12 semanas, '+S.n+' sesiones'+(S.recs?' y '+S.recs+(S.recs===1?' récord':' récords'):'')+'.');
  setTimeout(()=>a11yFocus($('ceT')),60);
  ceRun();
}
function closeCele(){
  if(!CE)return;clearInterval(CE.t);cancelAnimationFrame(CE.raf);if(CE.io)CE.io.disconnect();CE=null;
  const el=$('cele');el.classList.remove('on');el.innerHTML='';render();
}
/* la cuenta 1…12, el confeti y cada tarjeta animándose al entrar en pantalla */
function ceRun(){
  const root=$('cele'),big=$('ceBig'),dots=[...root.querySelectorAll('.ce-dots i')],cards=[...root.querySelectorAll('.ce-in')];
  if(RMQ.matches||!window.IntersectionObserver){dots.forEach(d=>d.classList.add('on'));cards.forEach(c=>{c.classList.add('vis');ceAnim(c)});return}
  let i=0;
  setTimeout(()=>{if(!CE)return;CE.t=setInterval(()=>{
    i++;big.textContent=i;if(dots[i-1])dots[i-1].classList.add('on');
    if(i>=12){clearInterval(CE.t);big.classList.add('ce-pop');fanfare();ceBurst(true)}
  },105)},420);
  CE.io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;en.target.classList.add('vis');ceAnim(en.target);CE.io.unobserve(en.target)}),{root,threshold:.2});
  cards.forEach(c=>CE.io.observe(c));
}
function ceAnim(card){
  card.querySelectorAll('.ce-ring .v').forEach(c=>{requestAnimationFrame(()=>c.setAttribute('stroke-dashoffset',c.dataset.off))});
  card.querySelectorAll('.ce-n').forEach(n=>{
    const to=+n.dataset.to,dec=+n.dataset.dec;
    if(RMQ.matches){n.textContent=fmtDec(to,dec);return}
    const t0=performance.now(),D=1100;
    const st=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);n.textContent=fmtDec(to*e,dec);if(k<1)requestAnimationFrame(st)};
    requestAnimationFrame(st);
  });
}
/* confeti con los colores de la app; tocar a Deshi lanza más */
function ceBurst(big){
  if(!CE||RMQ.matches)return;
  const cv=$('ceFx');if(!cv)return;
  const W=innerWidth,H=innerHeight,dpr=Math.min(2,devicePixelRatio||1);
  if(cv.width!==Math.round(W*dpr)||cv.height!==Math.round(H*dpr)){cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr)}
  const cs=getComputedStyle(document.documentElement),cv0=v=>cs.getPropertyValue(v).trim();
  const cols=[cv0('--tint'),cv0('--tint'),cv0('--ink'),cv0('--warn'),cv0('--belt'),Deshi.BELTS.azul].filter(Boolean);
  const add=(x,y,ang,n,spd)=>{for(let k=0;k<n;k++){const a=ang+(Math.random()-.5)*.9,v=spd*(.55+Math.random()*.6);
    CE.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:Math.random()*6.3,vr:(Math.random()-.5)*.35,w:6+Math.random()*6,h:3+Math.random()*4,
      c:cols[Math.floor(Math.random()*cols.length)],o:Math.random()<.25,ph:Math.random()*6.3})}};
  if(big){add(-10,H*.62,-1.05,70,17);add(W+10,H*.62,-2.09,70,17);add(W/2,H*.32,-1.57,40,12)}
  else{add(W/2,H*.3,-1.57,45,12);try{navigator.vibrate&&navigator.vibrate(25)}catch(e){}}
  if(!CE.raf){let last=performance.now();const ctx=cv.getContext('2d');
    const loop=t=>{if(!CE){return}const dt=Math.min(2.5,(t-last)/16.7);last=t;
      ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
      CE.parts=CE.parts.filter(p=>p.y<H+30&&p.x>-40&&p.x<W+40);
      CE.parts.forEach(p=>{p.vy+=.32*dt;p.vx*=Math.pow(.985,dt);p.vy*=Math.pow(.985,dt);p.x+=(p.vx+Math.sin(p.ph+=.12*dt)*.6)*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;
        if(p.o){ctx.beginPath();ctx.arc(0,0,p.h*.8,0,6.3);ctx.fill()}else{ctx.scale(1,Math.cos(p.ph));ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h)}
        ctx.restore()});
      if(CE.parts.length)CE.raf=requestAnimationFrame(loop);else{CE.raf=0;ctx.clearRect(0,0,W,H)}};
    CE.raf=requestAnimationFrame(loop)}
}
/* cuatro notas hacia arriba y una vibración; sin sonido si el móvil aún no ha dado permiso de audio */
function fanfare(){
  try{audioUnlock();const c=AC;if(c&&c.state==='running')[[523.25,0],[659.25,.12],[783.99,.24],[1046.5,.38]].forEach(([f,t],i)=>{
    const o=c.createOscillator(),g=c.createGain(),s=c.currentTime+t,d=i===3?.7:.2;o.type='triangle';o.frequency.value=f;o.connect(g);g.connect(c.destination);
    g.gain.setValueAtTime(0,s);g.gain.linearRampToValueAtTime(.16,s+.02);g.gain.exponentialRampToValueAtTime(.001,s+d);o.start(s);o.stop(s+d+.03)})}catch(e){}
  try{navigator.vibrate&&navigator.vibrate([40,60,40,60,180])}catch(e){}
}
/* al abrir la app en un bloque nuevo: se celebra el último bloque terminado que tenga entrenos suficientes */
function checkBlock(){
  if(CE||!started||(SS&&SS.on)||!DB.cfg.start)return;
  if(['onb','welcome','session'].some(id=>$(id)&&$(id).classList.contains('on'))||$('sheet').classList.contains('on'))return;
  const L=blkLast(),cel=DB.cfg.cel||0;if(L<=cel)return;
  let b=0;for(let k=L;k>cel;k--)if(blkSess(k).length>=BLK_MIN){b=k;break}
  if(!b){DB.cfg.cel=L;save();return}                      // bloques sin apenas entrenos: se marcan sin fiesta
  // se marca como celebrado solo cuando de verdad se enseña
  setTimeout(()=>{if(CE||(SS&&SS.on)||$('sheet').classList.contains('on'))return;openCele(b,0,L)},400);
}

/* ═════ RUTINA ═════ */
function renderRut(){
  const src=DB.plan?.src,t=TPLS[src],av=(DB.cfg.avail||[]).slice().sort((a,b)=>((a+6)%7)-((b+6)%7));
  let h='<div class="head"><div><h1 class="lt">Rutina</h1></div></div><div class="pad" style="padding-top:14px">';
  h+='<div class="card" style="padding:14px 16px 16px 18px"><div class="row" style="justify-content:space-between"><p class="fn l2">Tu plan</p><button class="fn link" style="height:28px" onclick="openTplPicker()">Cambiar de rutina</button></div>'+
    '<p class="t3" style="margin-top:1px">'+(DB.plan?(t?esc(t.n)+(DB.plan.edited?' · editada':''):(src==='nexa'?'Tu rutina de NEXA Fit':'Rutina propia')):'Sin rutina')+'</p>'+
    '<p class="fn l2" style="margin-top:1px">'+dayKeys().length+' sesiones · entrenas '+av.map(d=>DIAS3[d].toLowerCase()).join(', ')+'</p></div></div>';
  if(dayKeys().length){
    h+='<div class="sec"><div class="stitle"><h3 class="t3">Sesiones</h3><span class="fn l2">toca para ver o editar</span></div><div class="pad"><div class="group">'+
      dayKeys().map(k=>'<button class="cell" onclick="openDaySheet('+k+')"><span class="exn">'+k+'</span><div class="cb"><div class="tt"><p class="hl">'+esc(PLAN[k].n)+'</p><p class="fn l2 ell">'+PLAN[k].ex.slice(0,3).map(e=>esc(e.n)).join(' · ')+(PLAN[k].ex.length>3?' · +'+(PLAN[k].ex.length-3):'')+'</p></div>'+chev()+'</div></button>').join('')+'</div></div></div>';
  }
  h+='<div class="sec"><div class="stitle"><h3 class="t3">Aprende</h3></div><div class="pad"><div class="group">'+
    Object.keys(GUIDES).map(k=>'<button class="cell" onclick="openGuide(\''+k+'\')"><span class="ic gray">'+ic(GUIDES[k].i,17)+'</span><div class="cb"><span class="tt bd">'+GUIDES[k].t+'</span>'+chev()+'</div></button>').join('')+'</div></div></div>';
  $('v-rutina').innerHTML=h;
}
function openDaySheet(k){
  const p=PLAN[k],plus=isPlus();
  openSheet(()=>({title:esc(PLAN[k].n),body:'<div class="pad"><div class="field" style="margin-bottom:10px"><label for="dayName">Nombre de la sesión</label><input id="dayName" value="'+esc(PLAN[k].n)+'" maxlength="40" onchange="renameDay('+k+',this.value)"></div><p class="fn l2" style="padding:0 16px 10px">'+PLAN[k].ex.length+' ejercicios · '+totalSets(k)+' series · unos '+estMin(k)+' min</p><div class="group">'+
    PLAN[k].ex.map((e,i)=>'<button class="cell" onclick="openExSheet('+k+','+i+')"><span class="exn">'+(i+1)+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(e.n)+'</p><p class="fn l2 num">'+exLine(e)+' · descanso '+mmss(e.r)+'</p></div>'+chev()+'</div></button>').join('')+'</div>'+
    (plus?'<button class="btn sec" style="margin-top:12px" onclick="openCatalog('+k+')">'+ic('plus',18)+'Añadir ejercicio</button>'
      :'<button class="cell" style="margin-top:12px;background:var(--sheet2);border-radius:22px" onclick="openPlus()"><span class="ic soft">'+ic('pen',17)+'</span><div class="cb"><div class="tt"><p class="bd">Editar esta sesión</p><p class="fn l2">Ejercicios, series y descansos</p></div><span class="pill plus">Plus</span></div></button>')+
    '</div>'}),true);
}
function openExSheet(k,i){
  const e=PLAN[k].ex[i],plus=isPlus(),img=IMG[e.id];
  const stepRow=(lbl,f,val,unit)=>'<div class="cell static"><div class="cb" style="padding-left:2px"><span class="tt bd">'+lbl+'</span>'+(plus?'<button class="mini" style="background:var(--fill2)" onclick="exEdit('+k+','+i+',\''+f+'\',-1)" aria-label="Bajar '+lbl.toLowerCase()+', ahora '+val+unit+'">'+ic('minus',16,2.4)+'</button><span class="hl num" style="min-width:56px;text-align:center">'+val+unit+'</span><button class="mini" style="background:var(--fill2)" onclick="exEdit('+k+','+i+',\''+f+'\',1)" aria-label="Subir '+lbl.toLowerCase()+', ahora '+val+unit+'">'+ic('plus',16,2.4)+'</button>':'<span class="val num">'+val+unit+'</span>')+'</div></div>';
  openSheet(()=>{const e=PLAN[k].ex[i],a=advise(e);return{title:esc(e.n),body:'<div class="pad stack">'+
    '<div class="card" style="padding:14px 16px"><p class="fn l2">Hoy</p><p class="sb" style="margin-top:2px">'+a.txt+'</p>'+(e.tip?'<p class="fn l2" style="margin-top:6px">'+esc(e.tip)+'</p>':'')+'</div>'+
    (careZones(e).length?'<div class="note"><span>Cuidas <b>'+zTxt(careZones(e))+'</b>. Empieza suave y para si molesta: el dolor en una articulación no es esfuerzo. Aquí el peso sube con más calma.</span></div>':'')+
    '<div><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Ajustes</p><div class="group">'+stepRow('Series','s',e.s,'')+stepRow(e.seg?'Tiempo mínimo':'Repeticiones mínimas','lo',e.lo,e.seg?(e.min?' min':' s'):'')+stepRow(e.seg?'Tiempo máximo':'Repeticiones máximas','hi',e.hi,e.seg?(e.min?' min':' s'):'')+stepRow('Descanso','r',mmss(e.r),'')+'</div>'+
    (plus?'<div class="row" style="margin-top:10px"><button class="btn sec sm grow" onclick="exReset('+k+','+i+')">Valores por defecto</button><button class="btn sec sm grow danger" onclick="exRemove('+k+','+i+')">Quitar de la sesión</button></div>'
      :'<p class="gfoot" style="padding-left:16px">Con <button class="link" onclick="openPlus()">Plus</button> puedes cambiarlos.</p>')+'</div>'+
    (e.inc>0&&!e.bw?'<div><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">'+(isMaq(e)?'Tu máquina':'Tu material')+'</p><div class="group"><div class="cell static"><div class="cb" style="padding-left:2px"><span class="tt bd">Salto de peso</span><button class="mini" style="background:var(--fill2)" onclick="incEdit('+k+','+i+',-1)" aria-label="Bajar el salto de peso, ahora '+String(e.inc).replace('.',',')+' kilos">'+ic('minus',16,2.4)+'</button><span class="hl num" style="min-width:56px;text-align:center">'+String(e.inc).replace('.',',')+' kg</span><button class="mini" style="background:var(--fill2)" onclick="incEdit('+k+','+i+',1)" aria-label="Subir el salto de peso, ahora '+String(e.inc).replace('.',',')+' kilos">'+ic('plus',16,2.4)+'</button></div></div></div><p class="gfoot" style="padding-left:16px">'+(isMaq(e)?'Lo que sube la placa de la máquina. Ej.: si va 6, 12, 18…, pon 6.':'Lo que va de un disco o una mancuerna a la siguiente. Ej.: mancuernas de 2 en 2 (6, 8, 10…), pon 2.')+'</p></div>':'')+
    (wuOK(e)?'<div><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Calentamiento</p><div class="group">'+wuCell(e)+'</div><p class="gfoot" style="padding-left:16px">No cuenta como serie ni en tu progreso. Se puede saltar cada día.</p></div>':'')+
    (e.k&&e.k.length?'<div><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Técnica</p><div class="card tech" style="padding:14px 16px">'+(img?'<img src="'+img+'" alt="Técnica de '+esc(e.n)+'" loading="lazy" style="margin-bottom:12px">':'')+
      '<ul class="sb" style="padding-left:18px">'+e.k.map(x=>'<li style="margin-top:4px">'+esc(x)+'</li>').join('')+'</ul></div></div>':'')+
    '</div>'}},true);
}
function planRef(k,i){return DB.plan.days[k-1].ex[i]}
function exEdit(k,i,f,d){
  const ref=planRef(k,i),e=PLAN[k].ex[i];
  const step=f==='r'?15:1,lim={s:[1,10],lo:[1,999],hi:[1,999],r:[0,600]}[f];
  let v=Math.min(lim[1],Math.max(lim[0],(e[f]||0)+d*step));
  ref[f]=v;if(f==='lo'&&v>(ref.hi??e.hi))ref.hi=v;if(f==='hi'&&v<(ref.lo??e.lo))ref.lo=v;
  DB.plan.edited=true;save();buildPlan();openSheet(SHS[SHS.length-1],true,true);
}
function incEdit(k,i,d){
  const e=PLAN[k].ex[i],o=INC_OPTS,b=exBase(e.id);
  const v=d>0?o.find(x=>x>e.inc):[...o].reverse().find(x=>x<e.inc);if(v==null)return;
  DB.inc=DB.inc||{};if(b&&v===b.inc)delete DB.inc[e.id];else DB.inc[e.id]=v;
  save();buildPlan();if(SS.on&&SS.day===k&&SS.ei===i){SS.w=null;renderSession()}openSheet(SHS[SHS.length-1],true,true);
}
function exReset(k,i){const ref=planRef(k,i);EDITABLE.forEach(f=>delete ref[f]);save();buildPlan();openSheet(SHS[SHS.length-1],true,true);toast('Valores por defecto')}
function exRemove(k,i){
  if(PLAN[k].ex.length<=1){toast('Una sesión necesita al menos un ejercicio');return}
  DB.plan.days[k-1].ex.splice(i,1);DB.plan.edited=true;save();buildPlan();backSheet();render();toast('Ejercicio quitado');
}
let CATQ='';
function openCatalog(k){
  openSheet(()=>{const inDay=new Set(PLAN[k].ex.map(e=>e.id)),q=CATQ.toLowerCase();
    return{title:'Añadir ejercicio',body:'<div class="pad"><div class="field" style="margin-bottom:12px"><input id="catQ" placeholder="Buscar" value="'+esc(CATQ)+'" oninput="CATQ=this.value;openSheet(SHS[SHS.length-1],true,true);setTimeout(()=>{const i=$(\'catQ\');i.focus();i.setSelectionRange(i.value.length,i.value.length)},0)" aria-label="Buscar ejercicio"></div>'+
    GROUPS.map(g=>{const ids=Object.keys(EXC).filter(id=>EXC[id].g===g&&(!q||EXC[id].n.toLowerCase().includes(q)));if(!ids.length)return'';
      return '<p class="ghead" role="heading" aria-level="2" style="padding-left:16px;margin-top:6px">'+g+'</p><div class="group" style="margin-bottom:12px">'+ids.map(id=>'<button class="cell" onclick="addEx('+k+',\''+id+'\')"'+(inDay.has(id)?' disabled style="opacity:.4"':'')+'><div class="cb" style="padding-left:2px"><span class="tt bd">'+esc(EXC[id].n)+'</span>'+(()=>{const cz=careZones({id,g:EXC[id].g});return cz.length?'<span class="pill amb" aria-label="Carga '+esc(zTxt(cz))+'">'+cz.map(z=>ZONES[z]).join(' · ')+'</span>':''})()+(inDay.has(id)?'<span class="fn l2">En la sesión</span>':ic('plus',18,2.4))+'</div></button>').join('')+'</div>'}).join('')+'</div>'}},true);
}
function addEx(k,id){DB.plan.days[k-1].ex.push({id});DB.plan.edited=true;save();buildPlan();backSheet();openSheet(SHS[SHS.length-1],true,true);render();toast(EXC[id].n+' añadido')}
function openTplPicker(){
  const p=DB.profile||{},nd=(DB.cfg.avail||[]).length||3,order=rankTpls(p,nd),bd=tplBadges(p,nd);
  openSheet(()=>({title:'Rutinas',body:'<div class="pad stack">'+order.map(k=>{const t=TPLS[k],cur=DB.plan?.src===k;
    return '<button class="card" style="padding:16px;text-align:left;display:block;width:100%'+(cur?';box-shadow:inset 0 0 0 2px var(--ink)':'')+'" onclick="pickTpl(\''+k+'\')"><div class="row" style="gap:8px;flex-wrap:wrap">'+
      (bd[k]==='rec'?'<span class="pill tint">'+ic('check',13,2.6)+'Recomendada</span>':'')+(bd[k]==='also'?'<span class="pill gray">También encaja</span>':'')+(cur?'<span class="pill gray">Tu rutina</span>':'')+
      '<span class="fn l2">'+esc(t.tag)+'</span></div><p class="hl" style="margin-top:8px">'+esc(t.n)+'</p><p class="fn l2" style="margin-top:3px">'+esc(t.h)+'</p></button>'}).join('')+'</div>'}));
}
function pickTpl(k){
  if(DB.plan?.src===k){closeSheet();return}
  const t=TPLS[k];
  openSheet(()=>({title:'Cambiar de rutina',body:'<div class="pad"><p class="sb center" style="padding:0 12px">Pasarás a <b>'+esc(t.n)+'</b>. Tus entrenos y récords se conservan.'+(DB.plan?.edited?' Los cambios que hiciste en tu rutina actual se perderán.':'')+'</p>'+
    '<div class="stack" style="margin-top:18px"><button class="btn pri" onclick="applyTpl(\''+k+'\')">Cambiar</button><button class="btn sec" onclick="backSheet()">Cancelar</button></div></div>'}),true);
}
function applyTpl(k){DB.plan=planFromTpl(k);PREF.set('force',null);save();buildPlan();closeSheet();render();toast('Rutina cambiada')}

/* ═════ GUÍAS ═════ */
const GUIDES={
  inicio:{t:'Tu primer entreno',i:'play',h:'<p>El primer día no va de cuánto mueves, sino de <b>encontrar tu punto de partida</b> y aprender los movimientos.</p><ul><li><b>Busca tu peso.</b> La primera vez que haces un ejercicio, Tsuyo te deja tantear: haz 5 repeticiones tranquilas y elige <b>Fácil · subo</b> o <b>Pesado · bajo</b> hasta dar con un peso con el que llegarías a las repeticiones del rango dejando unas 3 en recámara. Ese será tu peso. Las pruebas no cuentan como series.</li><li><b>Si dudas, el más ligero.</b> Subir es fácil; recuperarse de un tirón, no.</li><li><b>Técnica primero.</b> Toca «Técnica» en cada ejercicio. Mejor un recorrido completo con poco peso que medio recorrido con mucho.</li><li><b>Descansa lo que marca el reloj.</b> Entre series, no apures.</li><li><b>Agujetas.</b> Es normal notarlas 1–3 días. No es una lesión.</li></ul><p>Las primeras 3 semanas son de aprendizaje: Tsuyo te propone pesos conservadores. <b>Si algo duele en una articulación, para.</b> Eso no es esfuerzo.</p>'},
  prog:{t:'Cómo progresar',i:'up',h:'<p>Cada ejercicio tiene un <b>rango</b> de repeticiones, por ejemplo 8–12.</p><ul><li>Cada sesión intentas <b>sumar repeticiones</b> con el mismo peso.</li><li>Cuando llegas al tope del rango <b>en todas las series</b>, subes peso.</li><li>Al subir, vuelves al extremo bajo del rango. Y otra vez.</li></ul><p>Tsuyo hace las cuentas: cuando toque subir, lo verás en Hoy con el peso propuesto.</p>'},
  descanso:{t:'Cuánto descansar',i:'clock',h:'<ul><li><b>Básicos pesados</b> (sentadilla, prensa, hip thrust…): 2,5–3 min.</li><li><b>Máquinas y mancuernas</b> de empuje y tirón: 2–2,5 min.</li><li><b>Aislados</b> (femoral, laterales, bíceps…): 1–1,5 min.</li><li><b>Core</b>: 60–90 s.</li><li><b>Después del cardio</b>: 1,5 min, para recuperar el aliento y cambiar de máquina.</li></ul><p>Con más descanso mantienes más carga. Si vas justo de tiempo, quita un ejercicio antes que recortar descansos.</p>'},
  esfuerzo:{t:'Cuánto apretar',i:'bolt',h:'<p>Al anotar cada serie eliges cómo ha ido:</p><ul><li><b>Fácil</b>: te sobraban 3 repeticiones o más. Toca subir.</li><li><b>Bien</b>: te sobraban 1–2. Es tu sitio casi siempre.</li><li><b>Al límite</b>: no salía otra. Solo de vez en cuando, y nunca en los básicos pesados.</li></ul><p>Las primeras 3 semanas, quédate en Fácil o Bien mientras aprendes la técnica.</p>'},
  ciclo:{t:'El ciclo de 12 semanas',i:'cal',h:'<ul><li><b>Semanas 1–3</b>: aprendizaje. Pesos conservadores.</li><li><b>Semanas 4–8</b>: progresión. Subes casi cada semana.</li><li><b>Semanas 9–10</b>: se frena. Es normal.</li><li><b>Semana 11</b>: semana ligera. Mismos ejercicios, series y descansos con unos 2/3 del esfuerzo, para llegar descansado al bloque siguiente. En cada ejercicio Tsuyo baja una sola cosa y te pone la cifra: el peso al 65 %, la velocidad del cardio al 85 % y, en los de peso corporal o por tiempo, unos 2/3 de tus repeticiones o segundos. Esa semana no sube nada.</li><li><b>Semana 12</b>: revisión. Aquí sí cambias 1–2 ejercicios.</li></ul>'},
  seguridad:{t:'Seguridad',i:'shield',h:'<p>Si tienes una <b>lesión, dolor o una condición médica</b>, consulta antes con un profesional sanitario.</p><p><b>El dolor articular no es esfuerzo.</b> Si una serie molesta en una articulación, para, baja la carga o cambia el ejercicio.</p><p>Tsuyo no sustituye a un entrenador ni a un médico.</p>'}
};
function openGuide(k){openSheet(()=>({title:GUIDES[k].t,body:'<div class="prose">'+GUIDES[k].h+'</div>'}))}

/* ═════ HOJAS ═════ */
const SHS=[];
function openSheet(fn,push,replace){
  if(replace)SHS[SHS.length-1]=fn;else if(push&&$('sheet').classList.contains('on')){const a=document.activeElement;SHK[SHS.length]=a&&$('sheet').contains(a)?a.getAttribute('onclick'):null;SHS.push(fn)}else{SHS.length=0;SHK.length=0;SHS.push(fn)}
  drawSheet();
}
function drawSheet(){
  const fn=SHS[SHS.length-1];if(!fn)return closeSheet();
  const o=fn(),sh=$('sheet'),sc=sh.querySelector('.sbody')?.scrollTop||0,same=sh.dataset.k===String(SHS.length);
  /* al redibujar la misma hoja (por ejemplo, tras − / +), el lector vuelve al mismo botón */
  const af=document.activeElement,afK=af&&sh.contains(af)?af.getAttribute('onclick'):null;
  if(!sh.classList.contains('on'))SHOPEN=document.activeElement;
  sh.innerHTML='<div class="grabber"></div><div class="shead">'+(SHS.length>1?'<button class="ibtn l x-btn" onclick="backSheet()" aria-label="Atrás">'+ic('chevL',18,2.4)+'</button>':'')+
    '<p class="hl ell" id="shTitle" role="heading" aria-level="2" tabindex="-1">'+(o.title||'')+'</p><button class="ibtn r '+(o.ok?'ok-btn':'x-btn')+'" onclick="'+(o.onOk||'closeSheet()')+'" aria-label="'+(o.ok?'Listo':'Cerrar')+'">'+ic(o.ok?'check':'x',o.ok?18:16,o.ok?2.8:2.4)+'</button></div>'+
    '<div class="sbody">'+o.body+'</div>';
  sh.dataset.k=SHS.length;
  if(same)sh.querySelector('.sbody').scrollTop=sc;
  sh.classList.add('on');$('scrim').classList.add('on');lockScroll(true);a11ySync();
  const back=same&&afK?[...sh.querySelectorAll('[onclick]')].find(x=>x.getAttribute('onclick')===afK):null;
  a11yFocus(back||(same?null:$('shTitle')));
}
let SHOPEN=null;
function backSheet(){SHS.pop();const k=SHK[SHS.length];SHK.length=SHS.length;if(!SHS.length)return closeSheet();drawSheet();
  const b=k&&[...$('sheet').querySelectorAll('[onclick]')].find(x=>x.getAttribute('onclick')===k);if(b)a11yFocus(b)}
const SHK=[];
function closeSheet(){const sh=$('sheet');sh.classList.remove('on','drag');sh.style.transform='';$('scrim').classList.remove('on');$('scrim').style.opacity='';SHS.length=0;delete sh.dataset.k;lockScroll(false);a11ySync();
  /* el lector vuelve al botón que abrió la hoja; si ese botón ya no está (la pantalla se redibujó), al título de la pantalla */
  const o=SHOPEN,ok=o&&o.getAttribute&&o.getAttribute('onclick');SHOPEN=null;if(document.activeElement)document.activeElement.blur();
  setTimeout(()=>{if(document.activeElement&&document.activeElement!==document.body)return;
    let t=o&&o.isConnected&&!o.closest('[inert]')&&o.getClientRects().length?o:null;
    if(!t&&ok)t=[...document.querySelectorAll('[onclick]')].find(x=>x.getAttribute('onclick')===ok&&!x.closest('[inert]')&&x.getClientRects().length);
    a11yFocus(t||document.querySelector('.full.on h1')||document.querySelector('.view.on h1'))},0)}
/* con una hoja abierta, la pantalla de detrás no se mueve */
let LOCKY=null;
function lockScroll(on){
  const b=document.body;
  if(on&&LOCKY==null){LOCKY=window.scrollY;b.style.top=-LOCKY+'px';b.classList.add('locked')}
  else if(!on&&LOCKY!=null){b.classList.remove('locked');b.style.top='';window.scrollTo(0,LOCKY);LOCKY=null}
}
/* arrastrar hacia abajo para cerrar, como en iOS: desde la barrita o la cabecera, o desde el contenido si ya está arriba del todo.
   Un gesto que empieza de lado (carruseles, selectores) no cuenta. */
(function(){
  let x0=0,y0=0,t0=0,dy=0,on=false,ok=false;
  const sh=()=>$('sheet');
  document.addEventListener('touchstart',e=>{
    const s=sh();if(!s||!s.classList.contains('on')||!s.contains(e.target)||e.touches.length>1){ok=false;return}
    const body=s.querySelector('.sbody'),inHead=!!e.target.closest('.grabber,.shead')&&!e.target.closest('button');
    ok=inHead||(body&&body.contains(e.target)&&body.scrollTop<=0&&!e.target.closest('input,textarea,select,.seg3,.segc'));
    x0=e.touches[0].clientX;y0=e.touches[0].clientY;t0=Date.now();dy=0;on=false;
  },{passive:true});
  document.addEventListener('touchmove',e=>{
    if(!ok||e.touches.length>1)return;const s=sh();dy=e.touches[0].clientY-y0;const dx=e.touches[0].clientX-x0;
    if(!on){if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>6){ok=false;return}if(dy>8){on=true;s.classList.add('drag')}else if(dy<-4){ok=false;return}else return}
    e.preventDefault();const d=Math.max(0,dy);
    s.style.transform='translate(-50%,'+d+'px)';$('scrim').style.opacity=String(Math.max(0,1-d/(s.offsetHeight||600)));
  },{passive:false});
  document.addEventListener('touchend',()=>{
    if(!on){ok=false;return}
    const s=sh(),v=dy/Math.max(1,Date.now()-t0);s.classList.remove('drag');on=false;ok=false;
    if(dy>Math.min(140,s.offsetHeight*.3)||v>.6)closeSheet();
    else{s.style.transform='';$('scrim').style.opacity=''}
  });
})();

/* ═════ TÚ ═════ */
function openMe(){openSheet(meSheet)}
function meSheet(){
  const p=DB.profile||{},C=constancy(),av=(DB.cfg.avail||[]).slice().sort((a,b)=>((a+6)%7)-((b+6)%7)),th=PREF.get('theme','auto');
  const row=(lbl,val,fn)=>'<button class="cell" onclick="'+fn+'"><div class="cb" style="padding-left:2px"><span class="tt bd">'+lbl+'</span><span class="val">'+val+'</span>'+chev()+'</div></button>';
  return{title:'Tú',ok:1,body:
    '<div class="row" style="align-items:flex-end;gap:16px;padding:4px 24px 0">'+dkStage('stand',2)+'<div class="grow" style="padding-bottom:8px">'+
      '<input id="meName" class="t2" style="border:0;background:none;width:100%;outline:none;padding:0" value="'+esc(p.name||'')+'" placeholder="Tu nombre" maxlength="30" onchange="setName(this.value)" aria-label="Tu nombre">'+
      '<p class="fn l2">'+(USER?esc(USER.email||'Cuenta')+' · sincronizado':'En este móvil · sin cuenta')+'</p>'+
      '<span class="pill" style="margin-top:8px;background:var(--amber-soft);color:var(--amber)">Cinturón '+C.belt[1].toLowerCase()+'</span></div></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Deshi</p><div class="group">'+row('Aspecto','Piel, pelo y gi','openLook()')+row('Cinturón','Por constancia','openBeltSheet()')+'</div></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Entreno</p><div class="group">'+
      row('Días de entreno',av.map(d=>WDL[d]).join(', '),'openDays()')+row('Objetivo',p.goal?GOALS[p.goal].n:'—','openPickGoal()')+row('Experiencia',p.lvl?LEVELS[p.lvl].n:'—','openPickLvl()')+row('Zonas que cuidar',(p.care||[]).length?p.care.map(z=>ZONES[z]).join(', '):'Ninguna','openCare()')+'</div></div>'+
    '<div class="pad" style="margin-top:22px"><button class="group" style="display:block;width:100%" onclick="openPlus()"><div class="cell" style="min-height:64px"><span class="ic tint" style="width:34px;height:34px;border-radius:10px">'+ic('star',18)+'</span>'+
      '<div class="cb"><div class="tt"><p class="hl">'+(isPlus()?'Tsuyo Plus activo':'Prueba Tsuyo Plus')+'</p><p class="fn l2">'+(isPlus()?'Simulado en esta versión de pruebas':'7 días gratis · rutina a medida y más')+'</p></div>'+chev()+'</div></div></button></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Apariencia</p><div class="segc" role="group" aria-label="Apariencia">'+
      [['auto','Automática'],['light','Clara'],['dark','Oscura']].map(([k,l])=>'<button class="'+(th===k?'on':'')+'" onclick="setTheme(\''+k+'\')">'+l+'</button>').join('')+'</div></div>'+
    '<div class="pad" style="margin-top:22px"><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Tus datos</p><div class="group">'+
      '<button class="cell" onclick="downloadData()"><span class="ic gray">'+ic('down',17)+'</span><div class="cb"><span class="tt bd">Descargar mis datos</span></div></button>'+
      '<button class="cell" onclick="openImport()"><span class="ic gray">'+ic('up',17)+'</span><div class="cb"><div class="tt"><p class="bd">Importar una copia</p><p class="fn l2">De Tsuyo o de NEXA Fit</p></div>'+chev()+'</div></button>'+
      '<button class="cell" onclick="openPrivacy()"><span class="ic gray">'+ic('shield',17)+'</span><div class="cb"><span class="tt bd">Privacidad</span>'+chev()+'</div></button>'+
      (CLOUD&&!USER?'<button class="cell" onclick="openAuth(\'up\',true)"><span class="ic soft">'+ic('user',17)+'</span><div class="cb"><div class="tt"><p class="bd">Crear cuenta</p><p class="fn l2">Guarda tus datos en la nube</p></div>'+chev()+'</div></button>':'')+
      (USER?'<button class="cell" onclick="askLogout()"><span class="ic gray">'+ic('out',17)+'</span><div class="cb"><span class="tt bd">Cerrar sesión</span></div></button>':'')+
      '<button class="cell" onclick="askDelete()"><span class="ic red">'+ic('trash',17)+'</span><div class="cb"><span class="tt bd red">'+(USER?'Eliminar cuenta y datos':'Borrar los datos de este móvil')+'</span></div></button>'+
    '</div><p class="gfoot center" style="padding:16px 0 0">Tsuyo '+CFG.version+'</p></div>'};
}
function setName(v){DB.profile=Object.assign({},DB.profile,{name:v.trim().slice(0,30)});save()}
function openLook(){
  openSheet(()=>{const L=Deshi.getLook(),chip=(on,js,color,lbl)=>'<button class="ibtn" style="width:46px;height:46px;background:'+color+';box-shadow:inset 0 0 0 '+(on?'3px var(--ink)':'.5px var(--sep)')+'" onclick="'+js+'" aria-label="'+lbl+'" aria-pressed="'+on+'"></button>';
    const grp=(t,arr,key)=>'<p class="ghead" role="heading" aria-level="2" style="padding-left:16px;margin-top:16px">'+t+'</p><div class="card row" style="padding:12px 14px;flex-wrap:wrap">'+arr.map(([n,c],i)=>chip(L[key]===i,"setLook('"+key+"',"+i+")",c,t+' '+n)).join('')+'</div>';
    return{title:'Aspecto de Deshi',body:'<div style="display:flex;justify-content:center;padding:8px 0 10px">'+dkStage('guard',2.6)+'</div><div class="pad">'+grp('Piel',Deshi.SKINS,'skin')+grp('Pelo',Deshi.HAIRS,'hair')+grp('Gi',Deshi.GIS,'gi')+'</div>'}},true);
}
function setLook(k,i){const L=Object.assign({},DB.profile.deshi||{});L[k]=i;DB.profile=Object.assign({},DB.profile,{deshi:Deshi.cleanLook(L)});save();applyLook();drawSheet();render()}
function openDays(){
  openSheet(()=>{const av=DB.cfg.avail||[],nd=dayKeys().length;
    return{title:'Días de entreno',body:'<div class="pad"><p class="sb l2 center" style="padding:0 10px 16px">Tsuyo coloca tus '+nd+' sesiones en estos días y, si te saltas una, la mueve sola.</p>'+
      '<div class="daysel">'+[1,2,3,4,5,6,0].map(d=>'<button class="'+(av.includes(d)?'on':'')+'" onclick="toggleDay('+d+')" aria-label="'+DIAS[d].replace(/^./,c=>c.toUpperCase())+'" aria-pressed="'+av.includes(d)+'">'+WDL[d]+'</button>').join('')+'</div>'+
      (av.length<nd?'<div class="note" style="margin-top:14px">Tienes menos días que sesiones: cada semana quedará fuera la menos importante.</div>':'')+'</div>'}},true);
}
function toggleDay(d){const a=DB.cfg.avail||[];const i=a.indexOf(d);if(i>=0){if(a.length===1){toast('Elige al menos un día');return}a.splice(i,1)}else a.push(d);DB.cfg.avail=a;save();drawSheet();render()}
function openPickGoal(){openSheet(()=>({title:'Objetivo',body:'<div class="pad stack">'+Object.keys(GOALS).map(k=>optBtn(GOALS[k],DB.profile.goal===k,"setProf('goal','"+k+"')",GOAL_IC[k])).join('')+'</div>'}),true)}
function openPickLvl(){openSheet(()=>({title:'Experiencia',body:'<div class="pad stack">'+Object.keys(LEVELS).map(k=>optBtn(LEVELS[k],DB.profile.lvl===k,"setProf('lvl','"+k+"')")).join('')+'</div>'}),true)}
/* zonas que cuidar: opcional; solo sirve para avisar y subir el peso con más calma */
const careNote='<p class="fn l2" style="padding:14px 6px 0">Tsuyo te avisará en los ejercicios que cargan esa zona, los marcará al añadir ejercicios y subirá el peso con más calma. No sustituye a un profesional: si algo duele, para y consulta. Solo se usa para esto.</p>';
const zoneBtns=(sel,js)=>'<div class="zsel" role="group" aria-label="Zonas que cuidar">'+Object.keys(ZONES).map(z=>'<button class="'+(sel.includes(z)?'on':'')+'" onclick="'+js+'(\''+z+'\')" aria-pressed="'+sel.includes(z)+'">'+ZONES[z]+'</button>').join('')+'</div>';
function openCare(){openSheet(()=>({title:'Zonas que cuidar',body:'<div class="pad"><p class="sb l2 center balance" style="padding:0 10px 16px">¿Tienes alguna molestia o una lesión antigua? Márcala. Puedes cambiarlo cuando quieras.</p>'+zoneBtns(DB.profile.care||[],'careTog')+careNote+'</div>'}),true)}
function careTog(z){const c=(DB.profile.care||[]).slice(),i=c.indexOf(z);if(i>=0)c.splice(i,1);else c.push(z);
  const pf=Object.assign({},DB.profile);if(c.length)pf.care=c;else delete pf.care;DB.profile=pf;save();drawSheet();render();say(ZONES[z]+(i>=0?', quitada':', marcada'))}
function setProf(f,v){DB.profile=Object.assign({},DB.profile,{[f]:v});save();backSheet()}
function downloadData(){
  try{const b=new Blob([JSON.stringify(DB,null,1)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tsuyo-datos-'+T()+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
  catch(e){toast('No se pudo descargar')}
}
function openPrivacy(){
  openSheet(()=>({title:'Privacidad',body:'<div class="prose fn" style="font-size:15px;line-height:21px">'+
    '<h4>Responsable</h4><p>'+esc(CFG.owner)+' · '+esc(CFG.ownerEmail)+'</p>'+
    '<h4>Qué se guarda</h4><p>Tu email (si creas cuenta), tu perfil (nombre, objetivo, experiencia, días y, si las marcas, las zonas que cuidas) y tus entrenos: rutina, series, pesos, repeticiones y esfuerzo.</p>'+
    '<h4>Para qué</h4><p>Solo para que registres y consultes tu progreso. No se usa para publicidad ni se cede a nadie.</p>'+
    '<h4>Dónde</h4><p>'+(CLOUD?'En Supabase, en servidores de la '+esc(CFG.region)+'. Cada persona solo accede a sus datos. Una copia queda en tu móvil.':'Esta versión de pruebas guarda los datos solo en este móvil.')+'</p>'+
    '<h4>Tus derechos</h4><p>Puedes descargar tus datos y eliminarlos desde Tú. Para cualquier otra petición escribe a '+esc(CFG.ownerEmail)+'. También puedes reclamar ante la AEPD (aepd.es).</p>'+
    '<h4>Edad</h4><p>Si tienes menos de 14 años necesitas el consentimiento de tu padre, madre o tutor.</p></div>'}),true);
}
function confirmSheet(title,text,btn,fn,danger){
  openSheet(()=>({title,body:'<div class="pad"><p class="sb center" style="padding:0 12px">'+text+'</p><div class="stack" style="margin-top:18px"><button class="btn '+(danger?'sec danger':'pri')+'" onclick="'+fn+'">'+btn+'</button><button class="btn sec" onclick="backSheet()">Cancelar</button></div></div>'}),true);
}
function askLogout(){confirmSheet('Cerrar sesión','Tus datos quedan en tu cuenta. En este móvil se borra la copia.','Cerrar sesión','doLogout()')}
async function doLogout(){
  if(DB._dirty||pushT){const ok=await push();if(!ok){toast('Sin conexión: no se pudo guardar');return}}
  S.del(uKey());closeSheet();await sb.auth.signOut();USER=null;started=false;DB=freshDB();showWelcome();
}
function askDelete(){confirmSheet(USER?'Eliminar cuenta':'Borrar datos',USER?'Se borrarán tu cuenta, tu rutina y tus entrenos. <b>No se puede deshacer.</b>':'Se borrarán tu rutina y tus entrenos de este móvil. <b>No se puede deshacer.</b>',USER?'Eliminar':'Borrar','doDelete()',true)}
async function doDelete(){
  try{await deleteAccount()}catch(e){toast(e.message);return}
  closeSheet();started=false;DB=freshDB();PREF.set('force',null);toast('Datos borrados');showWelcome();
}

function renameDay(k,v){v=v.trim().slice(0,40);if(!v)return;DB.plan.days[k-1].n=v;save();buildPlan();drawSheet();render();toast('Nombre guardado')}

/* ═════ IMPORTAR ═════ */
let IMP=null;
function openImport(){
  openSheet(()=>({title:'Importar una copia',body:'<div class="pad stack">'+
    '<p class="sb l2" style="padding:0 6px">Elige el archivo de una copia o pega aquí su texto. Sirve una copia de Tsuyo o la exportación de NEXA Fit (Guía → Datos → Exportar).</p>'+
    '<label class="btn sec" for="impFile">'+ic('down',18)+'Elegir archivo</label><input id="impFile" type="file" accept=".json,.txt,application/json,text/plain" hidden onchange="impFile(this)">'+
    '<div class="field"><label for="impText">O pega el texto</label><textarea id="impText" rows="5" style="border:0;border-radius:14px;background:var(--sheet2);padding:12px 14px;font-size:14px;line-height:19px;resize:vertical;font-family:ui-monospace,Menlo,monospace" placeholder="{&quot;v&quot;:1,&quot;sess&quot;:{…"></textarea></div>'+
    '<p class="msg" id="impMsg"></p><button class="btn pri" onclick="impCheck($(\'impText\').value)">Revisar</button></div>'}),true);
}
function impFile(inp){const f=inp.files&&inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>impCheck(String(r.result||''));r.onerror=()=>{const m=$('impMsg');if(m)m.textContent='No se pudo leer el archivo.'};r.readAsText(f)}
function impCheck(txt){
  const msg=m=>{const e=$('impMsg');if(e)e.textContent=m};
  let o;try{o=JSON.parse(String(txt).trim())}catch(e){return msg('Ese texto no es una copia válida. Cópiala entera, desde la primera llave hasta la última.')}
  if(!o||typeof o!=='object'||!o.sess||typeof o.sess!=='object')return msg('No encuentro sesiones en esa copia.');
  impAlias(o);const fixes=impClean(o);
  const ds=Object.keys(o.sess).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
  const done=ds.filter(d=>o.sess[d]&&o.sess[d].ex&&Object.values(o.sess[d].ex).some(a=>Array.isArray(a)&&a.some(x=>x&&x.r)));
  let plan=null,inferred=false;
  if(o.plan&&Array.isArray(o.plan.days)&&o.plan.days.length)plan=o.plan;
  else{plan=inferPlan(o,done);inferred=true}
  if(!plan||!plan.days.length)return msg('No he podido deducir la rutina de esa copia.');
  IMP={o,plan,inferred,done};
  const unknown=[...new Set(plan.days.flatMap(d=>d.ex.map(e=>e.id)).filter(id=>!EXC[id]&&!(o.cex||{})[id]))];
  openSheet(()=>({title:'Revisar copia',body:'<div class="pad stack">'+
    '<div class="card" style="padding:14px 16px"><p class="hl">'+done.length+' sesiones</p><p class="fn l2">'+(done.length?'Del '+fmtD(done[0])+' al '+fmtD(done[done.length-1]):'Sin entrenos registrados')+(o.cfg&&o.cfg.start?' · bloque iniciado el '+fmtD(o.cfg.start):'')+'</p></div>'+
    '<p class="ghead" role="heading" aria-level="2" style="padding-left:16px;margin-bottom:-4px">'+(inferred?'Rutina deducida de tu historial':'Rutina de la copia')+'</p>'+
    plan.days.map((d,i)=>'<div class="card" style="padding:12px 16px"><p class="hl">'+esc(d.n)+'</p><p class="fn l2" style="margin-top:3px">'+d.ex.map(e=>esc((EXC[e.id]||(o.cex||{})[e.id]||{n:e.id}).n)+(e.s?' ('+e.s+(e.side?' por lado':'')+')':(e.side?' (por lado)':''))).join(' · ')+'</p></div>').join('')+
    (fixes.length?'<div class="note">He descartado '+(fixes.length===1?'un valor imposible':fixes.length+' valores imposibles')+': '+fixes.slice(0,3).map(esc).join(' · ')+(fixes.length>3?'…':'')+'.</div>':'')+(unknown.length?'<div class="note">Hay ejercicios que Tsuyo no conoce: '+unknown.map(esc).join(', ')+'. Se añadirán como ejercicios propios.</div>':'')+
    '<p class="fn l2" style="padding:0 6px">'+(inferred?'Los rangos y descansos son los de cada ejercicio por defecto; con Plus puedes ajustarlos. ':'')+'Tu rutina actual de Tsuyo se sustituye; las sesiones que ya tengas se conservan.</p>'+
    '<button class="btn pri" onclick="impApply()">Importar</button><button class="btn sec" onclick="backSheet()">Cancelar</button></div>'}),true);
}
/* descarta pesos, repeticiones o velocidades imposibles (errores de tecleo): muy por encima de lo habitual en ese ejercicio */
function impClean(o){
  const vals={},fixes=[],med=a=>{const b=[...a].sort((x,y)=>x-y);return b[Math.floor(b.length/2)]};
  const each=f=>Object.entries(o.sess||{}).forEach(([d,s])=>s&&s.ex&&Object.entries(s.ex).forEach(([id,sets])=>Array.isArray(sets)&&sets.forEach(x=>x&&f(d,id,x))));
  each((d,id,x)=>['w','r','sp'].forEach(k=>{const v=Number(x[k]);if(v>0)((vals[id]=vals[id]||{})[k]=vals[id][k]||[]).push(v)}));
  const nm=id=>(EXC[id]||(o.cex||{})[id]||{n:id}).n,cap={w:500,r:600,sp:30},unit={w:' kg',r:' reps',sp:' km/h'};
  each((d,id,x)=>['w','r','sp'].forEach(k=>{if(x[k]==null)return;const v=Number(x[k]),m=med((vals[id]||{})[k]||[v]);
    if(!isFinite(v)||v<0||v>cap[k]||(m>0&&v>m*3&&v-m>=10)){fixes.push(String(x[k]).slice(0,8)+unit[k]+' en '+nm(id)+' ('+fmtD(d)+')');delete x[k]}}));
  return fixes;
}
/* nombres de la primera versión de NEXA Fit → catálogo actual */
const IMP_ALIAS={latmanc:{id:'laterales'},cardio25:{id:'cardio',lo:25,hi:25},cardio15:{id:'cardiof',lo:15,hi:15}};
function impAlias(o){
  Object.values(o.sess||{}).forEach(s=>{if(!s||!s.ex)return;const ex={};
    Object.entries(s.ex).forEach(([id,v])=>{const a=IMP_ALIAS[id];if(a&&!s.ex[a.id]){ex[a.id]=v;if(a.lo)(o._min=o._min||{})[a.id]=a.lo}else ex[id]=v});s.ex=ex});
  if(o.plan&&Array.isArray(o.plan.days))o.plan.days.forEach(d=>(d.ex||[]).forEach(e=>{const a=IMP_ALIAS[e.id];if(a){e.id=a.id;if(a.lo&&e.lo==null){e.lo=a.lo;e.hi=a.hi}}}));
  o._alias=true;
}
/* deduce la rutina del historial: para cada día, los ejercicios que aparecen en al menos el 40 % de sus sesiones
   (así un ejercicio saltado un día no se pierde y uno hecho de forma puntual no se cuela), en su orden habitual */
function inferPlan(o,done){
  const byDay={};
  done.forEach(d=>{const s=o.sess[d],n=Math.round(Number(s.day));if(!(n>=1&&n<=6))return;(byDay[n]=byDay[n]||[]).push(d)});
  const days=Object.keys(byDay).map(Number).sort((a,b)=>a-b);
  if(!days.length)return null;
  const filled=(d,id)=>((o.sess[d].ex||{})[id]||[]).filter(x=>x&&x.r).length;
  return{src:'nexa',edited:true,prio:days.map((_,i)=>i+1),days:days.map(n=>{
    const list=byDay[n].slice(-10),cnt={},pos={};
    list.forEach(d=>{const ids=Object.keys(o.sess[d].ex||{}).filter(id=>/^[A-Za-z0-9_-]{1,40}$/.test(id)&&filled(d,id));
      ids.forEach((id,i)=>{cnt[id]=(cnt[id]||0)+1;(pos[id]=pos[id]||[]).push(ids.length>1?i/(ids.length-1):0)})});
    const avg=id=>pos[id].reduce((a,b)=>a+b,0)/pos[id].length;
    const ids=Object.keys(cnt).filter(id=>cnt[id]>=Math.max(1,list.length*.4)).sort((a,b)=>avg(a)-avg(b));
    return{n:'Día '+n,ex:ids.map(id=>{
      const counts=list.filter(d=>filled(d,id)).slice(-3).map(d=>filled(d,id));
      const base=EXC[id],steps=counts.length?Math.max(...counts):0;
      const x={id};let sets=base&&base.side?Math.round(steps/2):steps;
      if(base&&!base.side&&!base.seg&&steps===2*base.s){x.side=1;sets=base.s}   // registrado por lados
      if(sets&&base&&sets!==base.s)x.s=Math.min(10,sets);
      const m=(o._min||{})[id];if(m){x.lo=m;x.hi=m}return x})};
  })};
}
function impApply(){
  if(!IMP)return;const {o,plan}=IMP;
  const cex=Object.assign({},DB.cex,o.cex||{});
  plan.days.forEach(d=>d.ex.forEach(e=>{if(!EXC[e.id]&&!cex[e.id])cex[e.id]={n:e.id.replace(/[_-]+/g,' ').replace(/^./,c=>c.toUpperCase()),g:'Core',t:'peso'}}));
  const next=Object.assign({},DB,{plan:{src:plan.src||'nexa',edited:!!plan.edited,prio:plan.prio||plan.days.map((_,i)=>i+1),days:plan.days},cex,
    sess:Object.assign({},DB.sess,o.sess),skips:Object.assign({},DB.skips,o.skips||{})});
  if(o.cfg&&/^\d{4}-\d{2}-\d{2}$/.test(o.cfg.start||''))next.cfg=Object.assign({},DB.cfg,{start:o.cfg.start});
  if(o.cfg&&Array.isArray(o.cfg.avail)&&o.cfg.avail.length)next.cfg=Object.assign({},next.cfg||DB.cfg,{avail:o.cfg.avail});
  if(o.profile&&o.profile.done)next.profile=Object.assign({},DB.profile,o.profile,{deshi:DB.profile.deshi||o.profile.deshi});
  DB=mergeDefaults(next);save();buildPlan();IMP=null;PREF.set('force',null);closeSheet();go('hoy');
  toast('Copia importada: '+Object.keys(DB.sess).filter(sessDone).length+' sesiones');
}

/* ═════ PLUS (simulado) ═════ */
let PLUSP='y';
function openPlus(){
  openSheet(()=>({title:'',body:'<div style="display:flex;flex-direction:column;align-items:center;padding:0 20px">'+dkStage('suburi',2)+
    '<div class="row" style="gap:8px;margin-top:14px"><span class="brand" style="font-size:22px">Tsuyo</span><span class="pill plus">PLUS</span></div><h2 class="t1 center" style="margin-top:6px">Entrena a tu medida</h2></div>'+
    '<div class="stack" style="padding:18px 28px 0;gap:14px">'+[['pen','Rutina a medida','Cambia días, series, descansos y ejercicios.'],['cal','Ciclo de 12 semanas','Semana ligera con las cifras ya calculadas.'],['chart','Progreso completo','Gráfica por ejercicio e historial sin límite.'],['heart','Nutrición y medidas','Llegarán en las próximas versiones.']].map(([i,t,s])=>
      '<div class="row" style="gap:13px;align-items:flex-start"><span class="ic soft" style="width:32px;height:32px;border-radius:9px;display:grid;place-items:center">'+ic(i,17)+'</span><div><p class="hl">'+t+'</p><p class="fn l2">'+s+'</p></div></div>').join('')+'</div>'+
    (isPlus()?'<div class="pad stack" style="margin-top:22px"><div class="note"><span>Plus está activo en modo de pruebas. No se ha cobrado nada.</span></div><button class="btn sec danger" onclick="PREF.set(\'plus\',false);closeSheet();render();toast(\'Plus desactivado\')">Desactivar Plus</button></div>'
    :'<div class="pad stack" style="margin-top:22px;gap:8px">'+
      [['y','Anual','19,99 € al año','1,67 € al mes','7 días gratis'],['m','Mensual','2,99 € al mes','','']].map(([k,t,p,s,b])=>'<button class="card row" style="padding:12px 14px 12px 16px;text-align:left;width:100%'+(PLUSP===k?';box-shadow:inset 0 0 0 2px var(--ink);background:var(--tint-soft)':'')+'" onclick="PLUSP=\''+k+'\';drawSheet()">'+
        '<span style="width:24px;height:24px;border-radius:50%;display:grid;place-items:center;'+(PLUSP===k?'background:var(--ink);color:var(--bg)':'box-shadow:inset 0 0 0 1.5px var(--fill)')+'">'+(PLUSP===k?ic('check',13,3.2):'')+'</span>'+
        '<span class="grow"><span class="hl" style="display:block">'+t+'</span><span class="fn num"><span class="semi">'+p+'</span><span class="c1 l3">'+(s?' · '+s:'')+'</span></span></span>'+(b?'<span class="pill plus">'+b+'</span>':'')+'</button>').join('')+
      '<button class="btn pri" style="margin-top:6px" onclick="PREF.set(\'plus\',true);closeSheet();render();toast(\'Plus activado (simulado, sin cobro)\')">'+(PLUSP==='y'?'Empezar la prueba gratis':'Suscribirme')+'</button>'+
      '<p class="c1 l2 center balance">'+(PLUSP==='y'?'7 días gratis; después, 19,99 € al año.':'2,99 € al mes.')+' Se renueva salvo que canceles al menos 24 h antes.</p>'+
      '<p class="c1 l2 center">Versión de pruebas: no se cobra nada.</p></div>')}),true);
}

/* ═════ BIENVENIDA Y CUENTA ═════ */
let started=false;
function showWelcome(){
  $('tabbar').hidden=true;$('btnMe').hidden=true;$('btnTheme').hidden=true;$('acc').hidden=true;
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('on'));
  $('welcome').innerHTML='<div class="fullin" style="justify-content:space-between">'+
    '<div style="display:flex;flex-direction:column;align-items:center;padding-top:8vh">'+dkStage('rei',3.6)+
    '<div class="brand" style="font-size:22px;margin-top:30px;color:var(--label2)">Tsuyo</div>'+
    '<h1 class="t1 center balance" style="margin-top:12px;max-width:320px">Entrena con un plan que se ajusta a ti</h1>'+
    '<p class="sb l2 center balance" style="margin-top:10px;max-width:300px">Te dice qué toca hoy, cuánto peso poner y cuándo subir.</p></div>'+
    '<div class="foot">'+(CLOUD
      ?'<button class="btn inv" onclick="openAuth(\'in\')">'+ic('mail',21,1.8)+'Continuar con email</button><button class="btn tx" onclick="startLocal()">Probar sin cuenta</button>'
      :'<button class="btn pri" onclick="startLocal()">Empezar</button><p class="c1 l2 center">Versión de pruebas: tus datos se guardan en este móvil.</p>')+
    '<p class="c1 l3 center balance" style="margin-top:4px">Al continuar aceptas la <button class="semi l2" onclick="openPrivacy()">política de privacidad</button>.</p></div></div>';
  $('welcome').classList.add('on');
}
function startLocal(){S.set(KEY+'_mode','local');USER=null;startApp()}
let AUTHM='in';
function openAuth(m,push){
  AUTHM=m;
  openSheet(()=>({title:{in:'Entrar',up:'Crear cuenta',reset:'Recuperar contraseña',newpass:'Nueva contraseña'}[AUTHM],body:'<div class="pad stack">'+
    (AUTHM==='in'||AUTHM==='up'?'<div class="segc"><button class="'+(AUTHM==='in'?'on':'')+'" onclick="AUTHM=\'in\';drawSheet()">Entrar</button><button class="'+(AUTHM==='up'?'on':'')+'" onclick="AUTHM=\'up\';drawSheet()">Crear cuenta</button></div>':'')+
    (AUTHM!=='newpass'?'<div class="field"><label for="auE">Email</label><input id="auE" type="email" autocomplete="email" inputmode="email"></div>':'')+
    (AUTHM!=='reset'?'<div class="field"><label for="auP">'+(AUTHM==='in'?'Contraseña':'Contraseña (mínimo 8)')+'</label><input id="auP" type="password" autocomplete="'+(AUTHM==='in'?'current-password':'new-password')+'"></div>':'')+
    (AUTHM==='up'||AUTHM==='newpass'?'<div class="field"><label for="auP2">Repite la contraseña</label><input id="auP2" type="password" autocomplete="new-password"></div>':'')+
    (AUTHM==='up'?'<label class="tick"><input type="checkbox" id="auC1"><span>He leído la <button class="semi ink" onclick="openPrivacy()">política de privacidad</button> y acepto que se guarden mis datos de entrenamiento.</span></label><label class="tick"><input type="checkbox" id="auC2"><span>Tengo 14 años o más, o mi padre, madre o tutor ha dado su consentimiento.</span></label>':'')+
    '<p class="msg" id="auMsg"></p><button class="btn pri" id="auGo" onclick="authGo()">'+{in:'Entrar',up:'Crear cuenta',reset:'Enviar enlace',newpass:'Guardar contraseña'}[AUTHM]+'</button>'+
    (AUTHM==='in'?'<button class="btn tx" onclick="AUTHM=\'reset\';drawSheet()">He olvidado mi contraseña</button>':'')+
    (AUTHM==='reset'?'<button class="btn tx" onclick="AUTHM=\'in\';drawSheet()">Volver</button>':'')+'</div>'}),push);
}
function authMsg(m,ok){const e=$('auMsg');if(e){e.textContent=m||'';e.className='msg'+(ok?' ok':'')}}
async function authGo(){
  const gv=id=>($(id)||{}).value||'';const e=gv('auE').trim(),p=gv('auP'),p2=gv('auP2'),btn=$('auGo');
  if(AUTHM!=='newpass'&&!/^\S+@\S+\.\S+$/.test(e))return authMsg('Escribe un email válido.');
  if((AUTHM==='up'||AUTHM==='newpass')&&p.length<8)return authMsg('La contraseña necesita al menos 8 caracteres.');
  if((AUTHM==='up'||AUTHM==='newpass')&&p!==p2)return authMsg('Las contraseñas no coinciden.');
  if(AUTHM==='up'&&!($('auC1').checked&&$('auC2').checked))return authMsg('Marca las dos casillas para crear la cuenta.');
  if(AUTHM==='in'&&!p)return authMsg('Escribe tu contraseña.');
  btn.disabled=true;
  try{
    if(AUTHM==='in')await signIn(e,p);
    else if(AUTHM==='up'){const ses=await signUp(e,p);if(!ses){AUTHM='in';drawSheet();authMsg('Te hemos enviado un email de confirmación. Ábrelo y después entra aquí.',true)}}
    else if(AUTHM==='reset'){await resetPass(e);authMsg('Si hay una cuenta con ese email, te llegará el enlace en unos minutos.',true)}
    else{const {error}=await sb.auth.updateUser({password:p});if(error)throw new Error('No se pudo guardar: '+error.message);history.replaceState(null,'',location.pathname);closeSheet();toast('Contraseña actualizada')}
  }catch(err){authMsg(err.message||'Sin conexión con el servidor.')}
  finally{if($('auGo'))$('auGo').disabled=false}
}
async function onAuth(ev,ses){
  if(ev==='PASSWORD_RECOVERY'){openAuth('newpass');return}
  if(ses&&ses.user){
    if(started&&USER&&USER.id===ses.user.id)return;
    const wasLocal=!USER&&started,localDB=wasLocal?DB:null;
    USER=ses.user;S.set(KEY+'_mode','cloud');closeSheet();
    await startApp(localDB);
  }else if(ev==='INITIAL_SESSION'||ev==='SIGNED_OUT'){
    if(S.get(KEY+'_mode')==='local'){if(!started)startApp();return}
    USER=null;if(!started)showWelcome();
  }
}

/* ═════ ONBOARDING ═════ */
const GOAL_IC={musculo:'dumb',grasa:'flame',fuerza:'bolt',salud:'heart',deporte:'ball'};
const optBtn=(o,on,js,icn)=>'<button class="opt'+(on?' on':'')+'" onclick="'+js+'" aria-pressed="'+on+'">'+(icn?'<span class="gi">'+ic(icn,22)+'</span>':'')+
  '<span class="grow"><span class="hl" style="display:block">'+esc(o.n)+'</span>'+(o.s?'<span class="fn l2" style="display:block">'+esc(o.s)+'</span>':'')+'</span><span class="ck">'+(on?ic('check',14,3):'')+'</span></button>';
let ONB=null;
const ONB_ST=['goal','lvl','days','care','routine','when'];
function openOnb(){ONB={i:0,goal:DB.profile.goal||'',lvl:DB.profile.lvl||'',av:(DB.cfg.avail||[1,3,5]).slice(),tpl:null,care:(DB.profile.care||[]).slice(),fd:null,ft:'18:00'};renderOnb();$('onb').classList.add('on')}
function onbGo(d){
  const st=ONB_ST[ONB.i];
  if(d>0&&st==='goal'&&!ONB.goal)return toast('Elige un objetivo');
  if(d>0&&st==='lvl'&&!ONB.lvl)return toast('Elige tu experiencia');
  if(d>0&&st==='days'&&!ONB.av.length)return toast('Elige al menos un día');
  if(d>0&&st==='when'){ONB.first={d:ONB.fd,t:ONB.ft};return finishOnb()}
  if(d<0&&ONB.i===0){$('onb').classList.remove('on');if(!DB.profile.done){started=false;S.del(KEY+'_mode');showWelcome()}return}
  ONB.i+=d;if(ONB_ST[ONB.i]==='when'&&!ONB.fd)ONB.fd=defFirst(ONB.av);if(ONB_ST[ONB.i]==='routine'&&!ONB.picked)ONB.tpl=rankTpls({goal:ONB.goal,lvl:ONB.lvl},ONB.av.length)[0];renderOnb();$('onb').scrollTop=0;
}
function renderOnb(){
  const st=ONB_ST[ONB.i];let h='';
  const af=document.activeElement,afK=af&&$('onb').contains(af)?af.getAttribute('onclick'):null,sameStep=renderOnb.last===ONB.i;renderOnb.last=ONB.i;
  const head='<div class="fnav"><button class="ibtn glass" onclick="onbGo(-1)" aria-label="Atrás">'+ic('chevL',22,2.2)+'</button><div class="dots" style="width:132px" role="img" aria-label="Paso '+(ONB.i+1)+' de '+ONB_ST.length+'">'+ONB_ST.map((x,i)=>i).map(i=>'<i class="'+(i<=ONB.i?'on':'')+'"></i>').join('')+'</div><div style="width:44px"></div></div>';
  if(st==='goal')h='<h1 class="lt balance" style="margin-top:24px">¿Qué quieres conseguir?</h1><p class="sb l2" style="margin-top:8px">Con esto elegimos tu rutina. Puedes cambiarlo cuando quieras.</p><div class="stack" style="margin-top:24px;gap:10px">'+
    Object.keys(GOALS).map(k=>optBtn({n:GOALS[k].n,s:{grasa:'Bajar grasa sin perder músculo',musculo:'Aumentar masa muscular',fuerza:'Mover más peso en los básicos',salud:'Moverme y sentirme bien',deporte:'Pádel, fútbol, artes marciales…'}[k]},ONB.goal===k,"ONB.goal='"+k+"';renderOnb()",GOAL_IC[k])).join('')+'</div>';
  if(st==='lvl')h='<h1 class="lt balance" style="margin-top:24px">¿Cuánto has entrenado?</h1><p class="sb l2" style="margin-top:8px">Así ajustamos la rutina y los primeros pesos.</p><div class="stack" style="margin-top:24px;gap:10px">'+
    Object.keys(LEVELS).map(k=>optBtn(LEVELS[k],ONB.lvl===k,"ONB.lvl='"+k+"';renderOnb()")).join('')+'</div>';
  if(st==='days')h='<h1 class="lt balance" style="margin-top:24px">¿Qué días puedes entrenar?</h1><p class="sb l2" style="margin-top:8px">Si un día no puedes, Tsuyo mueve la sesión sola.</p><div class="daysel" style="margin-top:28px">'+
    [1,2,3,4,5,6,0].map(d=>'<button class="'+(ONB.av.includes(d)?'on':'')+'" onclick="onbDay('+d+')" aria-label="'+DIAS[d].replace(/^./,c=>c.toUpperCase())+'" aria-pressed="'+ONB.av.includes(d)+'">'+WDL[d]+'</button>').join('')+'</div><p class="fn l2 center" style="margin-top:12px">'+ONB.av.length+' día'+(ONB.av.length===1?'':'s')+' a la semana</p>';
  if(st==='care')h='<h1 class="lt balance" style="margin-top:24px">¿Alguna zona que cuidar?</h1><p class="sb l2" style="margin-top:8px">Opcional. Si tienes una molestia o una lesión antigua, márcala.</p><div style="margin-top:24px">'+zoneBtns(ONB.care,'onbCare')+'</div>'+careNote;
  if(st==='when')h='<div class="row" style="align-items:flex-end;margin-top:16px"><div class="grow" style="padding-bottom:6px"><h1 class="lt balance">¿Cuándo es tu primer entreno?</h1><p class="sb l2 balance" style="margin-top:8px">Ponerle día y hora ayuda a que no se quede en «ya empezaré».</p></div>'+dkStage('rei',1.8)+'</div><div style="margin-top:22px">'+firstPicker(ONB.fd,ONB.ft,'onbFD','ONB.ft')+'</div><p class="fn l2" style="padding:12px 6px 0">Te lo recordamos en Hoy y podrás añadirlo a tu calendario. Puedes cambiarlo cuando quieras.</p>';
  if(st==='routine'){
    const t=TPLS[ONB.tpl],rec=rankTpls({goal:ONB.goal,lvl:ONB.lvl},ONB.av.length)[0]===ONB.tpl;
    const days=ONB.av.slice().sort((a,b)=>((a+6)%7)-((b+6)%7));
    h='<div class="row" style="align-items:flex-end;margin-top:16px"><div class="grow" style="padding-bottom:6px"><h1 class="lt balance">Tu rutina está lista</h1><p class="sb l2 balance" style="margin-top:8px">Para '+GOALS[ONB.goal].n.toLowerCase()+' entrenando '+ONB.av.length+'&nbsp;día'+(ONB.av.length===1?'':'s')+' a la semana.</p></div>'+dkStage('walk',2)+'</div>'+
      '<div class="card" style="padding:18px 18px 6px;margin-top:22px"><div class="row" style="gap:8px;flex-wrap:wrap">'+(rec?'<span class="pill tint">'+ic('check',13,2.6)+'Recomendada</span>':'')+'<span class="fn l2">'+esc(t.tag)+'</span></div>'+
      '<h2 class="t2" style="margin-top:12px">'+esc(t.n)+'</h2><p class="sb l2" style="margin-top:6px">'+esc(t.h)+'</p><div style="margin-top:14px">'+
      t.d.map(([n,ids],i)=>'<div class="row" style="gap:12px;padding:10px 0;border-top:.5px solid var(--sep)"><span class="pill gray" style="width:46px;justify-content:center;height:30px;border-radius:15px">'+(days[i]!=null?DIAS3[days[i]]:'—')+'</span><span class="hl grow">'+esc(n)+'</span><span class="fn l2 num">'+ids.length+' ejercicios</span></div>').join('')+'</div></div>'+
      (t.d.length>ONB.av.length?'<div class="note" style="margin-top:12px">Esta rutina tiene '+t.d.length+' sesiones y has elegido '+ONB.av.length+' días: cada semana quedará fuera la menos importante.</div>':'')+
      '<p class="fn l2" style="padding:10px 16px 0">Podrás cambiar los días y la rutina cuando quieras.</p>';
  }
  $('onb').innerHTML='<div class="fullin">'+head+h+'<div class="foot">'+(st==='routine'?'<button class="btn tx" onclick="onbOthers()">Ver otras rutinas</button>':'')+
    '<button class="btn pri" onclick="onbGo(1)">'+(st==='when'?'Guardar y empezar':(st==='care'&&!ONB.care.length?'Ninguna, continuar':'Continuar'))+'</button>'+(st==='when'?'<button class="btn tx" onclick="finishOnb()">Ahora no</button>':'')+'</div></div>';
  /* lector de pantalla: al cambiar de paso, al título; al marcar una opción, se queda en ella */
  const box=$('onb'),back=sameStep&&afK?[...box.querySelectorAll('[onclick]')].find(x=>x.getAttribute('onclick')===afK):null;
  if($('onb').classList.contains('on')||back){a11ySync();a11yFocus(back||box.querySelector('h1'))}
}
function onbCare(z){const i=ONB.care.indexOf(z);if(i>=0)ONB.care.splice(i,1);else ONB.care.push(z);renderOnb()}
function onbFD(d){ONB.fd=d;renderOnb()}
function onbDay(d){const i=ONB.av.indexOf(d);if(i>=0)ONB.av.splice(i,1);else ONB.av.push(d);renderOnb()}
function onbOthers(){
  const p={goal:ONB.goal,lvl:ONB.lvl},nd=ONB.av.length,order=rankTpls(p,nd),bd=tplBadges(p,nd);
  openSheet(()=>({title:'Rutinas',body:'<div class="pad stack">'+order.map(k=>{const t=TPLS[k];
    return '<button class="card" style="padding:16px;text-align:left;display:block;width:100%'+(ONB.tpl===k?';box-shadow:inset 0 0 0 2px var(--ink)':'')+'" onclick="ONB.tpl=\''+k+'\';ONB.picked=1;closeSheet();renderOnb()"><div class="row" style="gap:8px;flex-wrap:wrap">'+
      (bd[k]==='rec'?'<span class="pill tint">Recomendada</span>':'')+'<span class="fn l2">'+esc(t.tag)+'</span></div><p class="hl" style="margin-top:8px">'+esc(t.n)+'</p><p class="fn l2" style="margin-top:3px">'+esc(t.h)+'</p></button>'}).join('')+'</div>'}));
}
function finishOnb(){
  DB.profile=Object.assign({},DB.profile,{goal:ONB.goal,lvl:ONB.lvl,done:1});
  if(ONB.care.length)DB.profile.care=ONB.care.slice();else delete DB.profile.care;
  if(ONB.first)DB.cfg.first=ONB.first;
  DB.cfg.avail=ONB.av.slice();
  if(!DB.plan||DB.plan.src!==ONB.tpl)DB.plan=planFromTpl(ONB.tpl);
  if(!DB.cfg.start)DB.cfg.start=T();
  save();buildPlan();$('onb').classList.remove('on');showApp();go('hoy');
}

/* ═════ SESIÓN GUIADA ═════ */
const SS={bg:false,on:false,min:false,day:0,ei:0,si:0,ph:'set',acc:0,runAt:0,paused:false,pauseAt:0,cI:null,tEnd:0,tTot:0,tI:null,ann:null,last:0,R0:null,w:null,wOn:false,wStart:0,mins:null,sp:null};
const EFF={
  rir:[[3,'Fácil','3+ de sobra'],[2,'Bien','1–2 de sobra'],[0,'Al límite','Ni una más']],
  rpe:[[7,'Fácil','Aguantaba más'],[8,'Bien','Quedaban 10–15 s'],[10,'Al límite','Ni un segundo más']],
  car:[[4,'Suave','Hablo sin esfuerzo'],[5,'Bien','Frases completas'],[7,'Duro','Palabras sueltas']]
};
const effKind=e=>e.spd?'car':(e.seg?'rpe':'rir');
function openSession(day){
  if(SS.on&&SS.day===day){expandSession();return}
  const p=PLAN[day],log=DB.sess[T()]?.ex||{};
  SS.on=true;SS.min=false;SS.bg=false;SS.wAcc=0;SS.cDone=false;SS.wOn=false;SS.day=day;SS.ei=0;SS.si=0;SS.past=[];SS.preSkip=[];SS.preRest=false;SS.wKey=null;SS.pn=1;SS.ann=null;SS.last=0;SS.w=null;SS.mins=null;SS.sp=null;stopTimer();
  let found=false;
  outer:for(let i=0;i<p.ex.length;i++){const e=p.ex[i],s=log[e.id]||[];for(let j=0;j<nSteps(e);j++)if(!(s[j]&&s[j].r)){SS.ei=i;SS.si=j;found=true;break outer}}
  const st=PREF.get('sess',null),same=st&&st.d===T()&&st.n===day;
  /* reloj de entrenamiento real: solo cuenta el tiempo entrenando; las pausas no suman y al minimizar sigue contando.
     Si saliste y vuelves hoy, sigue desde donde lo dejaste (no suma el rato fuera). */
  SS.acc=same?(st.acc!=null?st.acc:0):0;SS.paused=false;SS.pauseAt=0;
  SS.runAt=same&&!st.out?(st.acc!=null?st.run:st.t)||0:Date.now();
  if(same&&!st.out&&st.acc!=null&&!st.run){SS.paused=true;SS.pauseAt=Date.now();SS.runAt=0}
  SS.R0=same&&st.R0?st.R0:prSnapshot();
  SS.ph=found?'set':'done';
  if(SS.ph==='done')freezeClock();
  sessPersist();
  SS.a11yK=null;$('session').classList.add('on');keepAwake(!SS.paused);startClock();renderSession();renderAcc();
}
const activeMs=()=>SS.acc+(SS.paused||!SS.runAt?0:Date.now()-SS.runAt);
const activeMin=()=>Math.max(1,Math.round(activeMs()/60000));
function sessPersist(out){PREF.set('sess',{d:T(),n:SS.day,R0:SS.R0,acc:SS.acc,run:SS.paused?0:SS.runAt,out:out?1:undefined})}
/* deja el reloj quieto (pausa, salir o sesión terminada): lo contado pasa a «acc» */
function freezeClock(){if(SS.runAt){SS.acc=activeMs();SS.runAt=0}}
function startClock(){clearInterval(SS.cI);SS.cI=setInterval(()=>{const c=$('ssClock');if(c&&!SS.min){c.textContent=mmss(activeMs()/1000);c.setAttribute('aria-label','Tiempo entrenando: '+spkT(activeMs()/1000))}},1000)}
/* Pausa/Seguir lo congela todo: el reloj de arriba, el descanso (también el de la cápsula) y los cronómetros de cardio y plancha.
   Al seguir, todo continúa justo donde estaba. */
function pauseSession(){
  if(!SS.on||SS.paused||SS.ph==='done')return;
  SS.acc=activeMs();SS.runAt=0;SS.paused=true;SS.pauseAt=Date.now();stopTimer();
  sessPersist();closeSheet();keepAwake(false);renderSession();renderAcc();
}
function resumeSession(){
  if(!SS.paused)return;
  const now=Date.now(),sh=SS.pauseAt?now-SS.pauseAt:0;
  if(SS.tEnd)SS.tEnd+=sh;if(SS.wOn)SS.wStart+=sh;
  SS.paused=false;SS.pauseAt=0;SS.runAt=now;SS.prevL=null;
  sessPersist();if(!SS.min)keepAwake(true);
  if(SS.tEnd||SS.wOn)startTick();
  renderSession();renderAcc();
}
function prSnapshot(){const R=prData(),o={};Object.keys(R).forEach(k=>o[k]=R[k].v);return o}
function minimizeSession(){SS.min=true;$('session').classList.remove('on');render();renderAcc();a11ySync();a11yFocus($('acc'))}
function expandSession(){if(!SS.on)return;SS.min=false;SS.a11yK=null;$('session').classList.add('on');renderSession();renderAcc();keepAwake(true)}
function closeSession(){
  stopTimer();clearInterval(SS.cI);SS.on=false;SS.paused=false;SS.min=false;$('session').classList.remove('on');keepAwake(false);PREF.set('sess',null);closeSheet();render();
}
function curEx(){return PLAN[SS.day].ex[SS.ei]}
function logSet(e,si,val){
  const d=T();DB.sess[d]=DB.sess[d]||{day:SS.day,ex:{}};DB.sess[d].day=SS.day;DB.sess[d].ex[e.id]=DB.sess[d].ex[e.id]||[];
  const prev=DB.sess[d].ex[e.id][si]||{};DB.sess[d].ex[e.id][si]=Object.assign({},prev,val);
  DB.sess[d].dur=activeMin();save();
}
const setsFor=e=>DB.sess[T()]?.ex?.[e.id]||[];
function defaultW(e){
  const s=setsFor(e),q=s[SS.si];if(q&&q.w!=null)return q.w;
  if(SS.si>0&&s[SS.si-1]&&s[SS.si-1].w!=null)return s[SS.si-1].w;
  const pw=DB.sess[T()]?.wu?.[e.id];if(pw&&pw.p&&pw.w)return pw.w;   // el peso que encontraste hoy al tantear
  const a=advise(e);if(a.w!=='')return a.w;
  return e.opt?0:null;
}
function defaultR(e){
  const s=setsFor(e);if(s[SS.si]&&s[SS.si].r)return s[SS.si].r;
  if(SS.si>0&&s[SS.si-1]&&s[SS.si-1].r)return s[SS.si-1].r;
  const lr=lightRepGoal(e);if(lr)return lr;
  const L=lastFor(e.id),q=L&&L.sets[SS.si];return q&&q.r?q.r:e.lo;
}
/* orden libre: si dejas un ejercicio para luego (máquina ocupada), las líneas marcan lo hecho de verdad, no la posición.
   Un ejercicio cuenta como hecho si tiene todas sus series anotadas o si lo pasaste de largo saltando series. */
const exDoneAt=i=>{const e=PLAN[SS.day].ex[i],s=setsFor(e);if((SS.past||[]).includes(i))return true;for(let j=0;j<nSteps(e);j++)if(!(s[j]&&s[j].r))return false;return true};
/* siguiente ejercicio pendiente: primero los que vienen detrás; después, los que dejaste atrás */
function nextPend(){const n=PLAN[SS.day].ex.length;for(let k=1;k<n;k++){const i=(SS.ei+k)%n;if(!exDoneAt(i))return i}return -1}
function firstStep(i){const e=PLAN[SS.day].ex[i],s=setsFor(e);for(let j=0;j<nSteps(e);j++)if(!(s[j]&&s[j].r))return j;return 0}
function sessDots(){const p=PLAN[SS.day],dn=p.ex.filter((e,i)=>exDoneAt(i)).length;return '<div class="dots" role="img" aria-label="Ejercicio '+(SS.ei+1)+' de '+p.ex.length+', '+dn+(dn===1?' hecho':' hechos')+'">'+p.ex.map((e,i)=>'<i class="'+(i===SS.ei?'now':(exDoneAt(i)?'on':''))+'"></i>').join('')+'</div>'}
function sessHead(){
  return '<div class="fnav"><button class="ibtn glass" onclick="minimizeSession()" aria-label="Minimizar la sesión">'+ic('chevD',22,2.2)+'</button>'+
    '<div class="center"><p class="fn semi">'+esc(PLAN[SS.day].n)+'</p><p class="c1 l2 num" id="ssClock" role="timer">'+mmss(activeMs()/1000)+'</p></div>'+
    '<button class="ibtn glass" onclick="openSessMenu()" aria-label="Opciones de la sesión">'+ic('more',22)+'</button></div>';
}
function rirHint(){const B=blockInfo();if(!B)return'1–2 reps';if(B.bw===11)return'4 reps';if((B.b===1&&B.bw<=3)||(B.b>1&&B.bw===1))return'3 reps';return'1–2 reps'}
function renderSession(){
  if(!SS.on)return;
  const af=document.activeElement;SS.a11yAf=af&&$('session').contains(af)?af.getAttribute('onclick'):null;
  const p=PLAN[SS.day],box=$('session');let h='';
  if(SS.ph==='done'){renderDone();return}
  if(SS.paused){renderPaused();return}
  const e=curEx(),u=unitOf(e),side=e.side?(SS.si%2?' · Derecha':' · Izquierda'):'',setN=e.side?Math.floor(SS.si/2)+1:SS.si+1;
  const top=sessHead()+'<div style="margin-top:10px">'+sessDots()+'</div>'+(SS.ph==='set'&&SS.bg?restPill():'');
  if(SS.ph==='set'&&preKind(e)){
    h=top+preHtml(e,preKind(e));
  }else if(SS.ph==='set'){
    const a=probedAdvise(e);
    h=top+'<h1 class="lt balance" style="margin-top:26px">'+esc(e.n)+'</h1>'+
      '<div class="row" style="margin-top:14px;gap:12px;align-items:center"><div class="grow" style="min-width:0">'+(e.s>1||e.side?setBar(e,setN)+'<p class="fn l2" style="margin-top:7px;white-space:nowrap">Serie '+setN+' de '+e.s+'<span class="amb">'+side+'</span></p>':'')+'</div>'+
      (e.k&&e.k.length?'<button class="pill" style="height:32px;padding:0 12px;border-radius:16px;background:var(--fill2);color:var(--label);font-size:13px" onclick="openExSheet('+SS.day+','+SS.ei+')">'+ic('book',15)+'Técnica</button>':'')+'</div>'+
      '<div class="card row" style="margin-top:20px;padding:14px 16px;gap:13px;align-items:flex-start">'+(a.up?'<span class="ic tint" style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center">'+ic('up',18,2.6)+'</span>':'<span class="ic soft" style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center">'+ic('chart',17)+'</span>')+
      '<div class="grow"><p class="sb">'+a.txt+'</p>'+careLine(e)+'</div></div>';
    if(e.spd){
      if(SS.mins==null)SS.mins=e.hi;if(SS.sp==null){if(a.sp)SS.sp=a.sp;else{const L=lastFor(e.id);SS.sp=L?Math.max(0,...L.sets.map(x=>x&&x.sp||0))||null:null}}
      const el=cEl(),R=80,C=2*Math.PI*R,tg=SS.mins*60,st=SS.wOn?'run':(el>0?'pause':'idle');
      h+='<div style="display:flex;flex-direction:column;align-items:center;margin-top:22px"><div class="ring" style="width:184px;height:184px"><svg width="184" height="184" viewBox="0 0 184 184" aria-hidden="true"><circle cx="92" cy="92" r="'+R+'" fill="none" stroke="var(--fill2)" stroke-width="11"/>'+
        '<circle id="cArc" cx="92" cy="92" r="'+R+'" fill="none" stroke="var(--tint)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-Math.min(1,el/tg))+'"/></svg>'+
        '<div class="in"><span class="rnd num bold" style="font-size:48px;line-height:54px" id="cT">'+mmss(el)+'</span><span class="fn l2 num" id="cL">'+cLab(el,tg)+'</span></div></div></div>'+
        '<div class="stack" style="margin-top:20px;gap:12px">'+stepper('Objetivo',SS.mins,'min','ssMin',1)+stepper('Velocidad',SS.sp==null?'—':SS.sp,'km/h','ssSp',.5)+'</div>'+
        '<div class="foot">'+(st==='idle'
          ?'<button class="btn pri lg" onclick="cStart()">'+ic('play',20)+'Empezar</button><button class="btn tx" onclick="doneSet()">Anotar sin cronómetro</button>'
          :'<button class="btn pri lg" onclick="'+(st==='run'?'cPause()':'cStart()')+'">'+(st==='run'?ic('pause',20)+'Pausa':ic('play',20)+'Seguir')+'</button><button class="btn tx" onclick="cFinish()">Terminar y anotar</button>')+'</div>';
    }else if(e.seg){
      const el=SS.wOn?Math.floor((Date.now()-SS.wStart)/1000):0,R=88,C=2*Math.PI*R;
      h+='<div style="display:flex;flex-direction:column;align-items:center;margin-top:26px"><div class="ring" style="width:200px;height:200px"><svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="'+R+'" fill="none" stroke="var(--fill2)" stroke-width="12"/>'+
        '<circle id="swArc" cx="100" cy="100" r="'+R+'" fill="none" stroke="var(--tint)" stroke-width="12" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+C*(1-Math.min(1,el/(lightGoal(e)||e.hi)))+'"/></svg>'+
        '<div class="in"><span class="rnd num bold" style="font-size:54px;line-height:60px" id="swT">'+mmss(el)+'</span><span class="fn l2" id="swL">'+segLab(e,el)+'</span></div></div>'+
        (e.id==='plancha'||e.id==='plancL'?'<p class="fn amb center" style="margin-top:12px">Para cuando la cadera empiece a caer.</p>':'')+'</div>'+
        '<div class="foot"><button class="btn pri lg" onclick="swToggle()">'+(SS.wOn?ic('stop',22)+'Parar y anotar':ic('play',20)+'Empezar')+'</button><button class="btn tx" onclick="skipSet()">Saltar serie</button></div>';
    }else{
      if(SS.w==null)SS.w=defaultW(e);
      const lr=lightRepGoal(e),tgt=lr?(e.bw?lr:'unas '+lr):(e.lo===e.hi?e.hi:e.lo+'–'+e.hi);
      h+='<div style="flex:1 1 0;min-height:24px"></div>'+(e.bw?'<div class="center"><p class="fn l2 caps semi">Peso corporal</p><p class="big rnd">'+tgt+'</p><p class="fn l2">repeticiones'+(e.side?' por lado':'')+(lr?' · semana ligera':'')+'</p></div>'
        :'<div style="display:flex;flex-direction:column;align-items:center"><p class="fn l2 caps semi">Peso</p><div class="row" style="gap:22px;margin-top:6px">'+
          '<button class="step" id="ssWm" onclick="adjW(-1)" aria-label="Quitar peso">'+ic('minus',22,2.4)+'</button><div class="row" style="align-items:baseline;gap:4px;justify-content:center"><input id="ssW" class="big rnd" type="number" inputmode="decimal" step="any" placeholder="0" value="'+(SS.w==null?'':SS.w)+'" oninput="SS.w=this.value===\'\'?null:parseFloat(this.value);fitW(this)" aria-label="Peso en kilos" style="width:150px;text-align:center;background:none;border:0;outline:none;padding:0"><span class="t3 l2">kg</span></div>'+
          '<button class="step" id="ssWp" onclick="adjW(1)" aria-label="Añadir peso">'+ic('plus',22,2.4)+'</button></div></div>')+
        '<p class="sb l2 center num" style="margin-top:44px">'+(e.bw?'':'<span class="semi" style="color:var(--label)">'+tgt+' '+u+(e.side?' por lado':'')+'</span> · ')+'deja '+rirHint()+' en recámara</p><div style="flex:1.7 1 0"></div>'+
        '<div class="foot"><button class="btn pri lg" onclick="doneSet()">'+ic('check',22,2.6)+'Serie hecha</button><button class="btn tx" onclick="skipSet()">Saltar serie</button></div>';
    }
  }else if(SS.ph==='rest'){
    const A=SS.ann?setsFor(SS.ann.e)[SS.ann.si]:null,ae=SS.ann?SS.ann.e:e,kind=effKind(ae);
    const hard=A&&A.rir!=null&&EFF[kind][2][0]===A.rir;
    const nx=nextLabel();
    const R=82,C=2*Math.PI*R,L=SS.tEnd?Math.max(0,(SS.tEnd-Date.now())/1000):0;
    h=top+'<p class="fn l2" style="margin-top:22px">'+(SS.ann?esc(ae.n)+' · serie '+(ae.side?Math.floor(SS.ann.si/2)+1:SS.ann.si+1)+' hecha':(SS.preRest?esc(e.n)+' · '+(SS.preK==='probe'?'tu peso: '+fmtSp(defaultW(e))+' kg':'calentamiento hecho'):''))+'</p><h1 class="lt" style="margin-top:2px">'+(SS.last?'¡Última serie!':(SS.sw?'Cambio de lado':'Descanso'))+'</h1>'+
      '<div style="flex:1 1 0;min-height:22px"></div><div class="row" style="justify-content:center;gap:24px">'+'<div id="restDk" style="align-self:flex-end;margin-bottom:12px;width:108px;height:150px;display:flex;align-items:flex-end;justify-content:center">'+dkStage(hard?'tired':'seiza',1.75)+'</div>'+
      '<div class="ring" style="width:176px;height:176px"><svg width="176" height="176" viewBox="0 0 176 176" aria-hidden="true"><circle cx="88" cy="88" r="'+R+'" fill="none" stroke="var(--fill2)" stroke-width="11"/>'+
      '<circle id="rArc" cx="88" cy="88" r="'+R+'" fill="none" stroke="'+(SS.last?'var(--tint)':restCol(L))+'" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(SS.last?0:-C*(1-(SS.tTot?L/SS.tTot:0)))+'"/></svg>'+
      '<div class="in">'+(SS.last?'<span style="color:var(--ink)">'+ic('check',54,3)+'</span>':'<span class="rnd num bold" style="font-size:50px;line-height:56px;color:'+restTxt(L)+'" id="rT">'+mmss(Math.ceil(L))+'</span><span class="fn l2 num" id="rL">'+(L<=10?'Prepárate':'de '+mmss(SS.tTot))+'</span>')+'</div></div></div>'+
      (SS.last?'':'<div class="row" style="justify-content:center;gap:10px;margin-top:44px"><button class="btn sec sm" style="height:44px;padding:0 20px;border-radius:22px;font-size:15px" onclick="addRest(30)">+30 s</button><button class="btn sec sm" style="height:44px;padding:0 20px;border-radius:22px;font-size:15px" onclick="endRest()">Saltar descanso</button></div>')+
      '<div style="flex:1 1 0;min-height:22px"></div><div class="foot" style="padding-top:22px">'+(A?annCard(ae,A,kind,prepOK()?null:nx):'')+prepBtn()+(SS.last?'<button class="btn pri lg" onclick="finishSession()">Terminar sesión</button>':'')+'</div>';
  }
  box.innerHTML='<div class="fullin">'+h+'</div>';fitW($('ssW'));a11ySess();
}

/* ═════ SESIÓN CON LECTOR DE PANTALLA ═════
   Cada vez que cambia el paso (serie, descanso, pausa, fin), el lector salta al título y lo dice todo de una vez:
   «Press banca. Serie 2 de 4. 40 kilos, objetivo 8 a 10 repeticiones». Los redibujados del mismo paso no mueven el foco. */
function a11ySess(){
  const box=$('session'),H=box.querySelector('h1');if(!H)return;
  H.id='ssH';let s='';
  if(SS.ph==='done'){const p=H.nextElementSibling;if(p){s='. '+p.textContent;p.setAttribute('aria-hidden','true')}}
  else if(SS.paused){const p=H.nextElementSibling;if(p){s='. '+p.textContent+'. Pulsa Seguir para continuar';p.setAttribute('aria-hidden','true')}}
  else if(SS.ph==='set'&&preKind(curEx())){
    const pk=preKind(curEx()),kg=SS.w?spkKg(SS.w):'Sin peso puesto';
    s=pk==='probe'?'. Busca tu peso, prueba '+(SS.pn||1)+'. '+kg+'. Haz '+PROBE_REPS+' repeticiones tranquilas y elige: Pesado, bajo; Fácil, subo; o Este es mi peso. No cuenta como serie':'. Serie de calentamiento. '+kg+', '+WU_REPS+' repeticiones tranquilas. No cuenta como serie';
    const cz=careZones(curEx());if(cz.length)s+='. Cuidas '+zTxt(cz)+': empieza suave';
    wLabels();
  }
  else if(SS.ph==='set'){
    const e=curEx(),setN=e.side?Math.floor(SS.si/2)+1:SS.si+1,lo=e.lo,hi=e.hi,rng=lo===hi?String(hi):lo+' a '+hi;
    s='. Serie '+setN+' de '+e.s+(e.side?(SS.si%2?', lado derecho':', lado izquierdo'):'');
    if(e.spd){s+='. Cardio, objetivo '+(SS.mins||hi)+' minutos';if(isLightWk()&&SS.sp)s+=', semana ligera, a '+fmtSp(SS.sp)+' kilómetros por hora'}
    else if(e.seg)s+=SS.wOn?'. Cronómetro en marcha':(lightGoal(e)?'. Semana ligera, aguanta unos '+lightGoal(e)+' segundos. Pulsa Empezar':'. Por tiempo, objetivo '+rng+' segundos. Pulsa Empezar');
    else{const lr=lightRepGoal(e),obj=lr?'semana ligera, unas '+lr+' repeticiones':(isLightWk()?'semana ligera, ':'')+'objetivo '+rng+' repeticiones';
      if(e.bw)s+='. Peso corporal, '+obj+(e.side?' por lado':'');
      else s+='. '+(SS.w?spkKg(SS.w):'Sin peso puesto')+', '+obj+(e.side?' por lado':'');}
    if(SS.bg&&SS.tEnd)s+='. El descanso sigue: quedan '+spkT((SS.tEnd-Date.now())/1000);
    const sb=box.querySelector('.setbar');if(sb&&sb.parentElement)sb.parentElement.setAttribute('aria-hidden','true');
    wLabels();
  }else if(SS.ph==='rest'){
    const pv=H.previousElementSibling;if(pv&&pv.textContent){s='. '+pv.textContent;pv.setAttribute('aria-hidden','true')}
    if(SS.last)s+='. Ya no quedan series. Anota esta y pulsa Terminar sesión';
    else{s+='. Quedan '+spkT((SS.tEnd-Date.now())/1000);if(SS.ann)s+=(SS.ann.e.seg||SS.ann.e.spd)?'. Debajo puedes anotar cómo ha ido':'. Debajo puedes anotar las repeticiones y cómo ha ido';const nx=nextLabel();if(nx)s+='. Después: '+nx.replace(/&amp;/g,'&').replace(' kg',' kilos')}
  }
  if(s){const sp=document.createElement('span');sp.className='sr';sp.textContent=s.replace(/\s+·\s+/g,', ').replace(/–/g,' a ');H.appendChild(sp)}
  a11yTimers();
  const k=[SS.ph,SS.ei,SS.si,SS.last,SS.paused,SS.sw,SS.ph==='set'?preKind(curEx()):'',SS.preRest].join('|');
  if(k!==SS.a11yK&&!$('sheet').classList.contains('on')){SS.a11yK=k;a11ySync();a11yFocus(H)}
  /* mismo paso redibujado (por ejemplo, Empezar → Parar en la plancha): el lector se queda en el mismo botón o en el principal */
  else if(SS.a11yAf&&(document.activeElement===document.body||!document.activeElement)){const b=[...box.querySelectorAll('[onclick]')].find(x=>x.getAttribute('onclick')===SS.a11yAf)||box.querySelector('.foot .btn.pri');a11yFocus(b||H)}
}
/* los relojes se leen en palabras («quedan 1 minuto y 20 segundos»), no «1:20» */
function a11yTimers(){
  const lab=(id,txt)=>{const t=$(id);if(!t)return;const r=t.closest('.ring');if(!r)return;r.setAttribute('role','timer');r.setAttribute('aria-label',txt);const i=r.querySelector('.in');if(i)i.setAttribute('aria-hidden','true')};
  if(SS.ph==='rest'&&SS.tEnd)lab('rT','Descanso: quedan '+spkT(Math.ceil((SS.tEnd-(SS.paused?SS.pauseAt:Date.now()))/1000)));
  const e=SS.on&&SS.ph==='set'?curEx():null;if(!e)return;
  if(e.spd){const el=cEl();lab('cT','Cardio: llevas '+spkT(el)+' de '+spkT((SS.mins||e.hi)*60))}
  else if(e.seg){const el=SS.wOn?Math.floor((Date.now()-SS.wStart)/1000):0;{const lg=lightGoal(e);lab('swT','Llevas '+spkT(el)+(lg?', semana ligera, unos '+lg+' segundos':', objetivo '+e.lo+' a '+e.hi+' segundos'))}}
  const p=$('bgPill');if(p&&SS.tEnd)p.setAttribute('aria-label','Descanso: quedan '+spkT(Math.ceil((SS.tEnd-Date.now())/1000)));
}
/* avisos mientras corre el tiempo: a los 10 s del descanso, al acabarlo y al entrar en rango en las series por tiempo */
function a11yTick(){
  if(SS.paused)return;
  const sec=Math.floor(Date.now()/1000);if(sec===SS.a11yS)return;SS.a11yS=sec;a11yTimers();
  const e=SS.on&&SS.ph==='set'?curEx():null;
  if(e&&e.seg&&!e.spd&&SS.wOn&&lightGoal(e)){const el=Math.floor((Date.now()-SS.wStart)/1000),st=el>=lightGoal(e)?3:0;
    if(st!==SS.a11ySeg){if(st===3)say('Suficiente por hoy, '+el+' segundos');SS.a11ySeg=st}}
  else if(e&&e.seg&&SS.wOn){const el=Math.floor((Date.now()-SS.wStart)/1000),st=el>=e.hi?2:(el>=e.lo?1:0);
    if(st!==SS.a11ySeg){if(st===1)say('En rango, '+el+' segundos');if(st===2)say('Tope del rango, '+el+' segundos');SS.a11ySeg=st}}
  else SS.a11ySeg=0;
}
/* progreso de series: un tramo por serie; en ejercicios por lados el tramo actual se llena a la mitad tras el primer lado */
function setBar(e,setN){
  const half=e.side&&SS.si%2===1;
  return '<div class="setbar" aria-hidden="true">'+Array.from({length:e.s},(_,i)=>'<i class="'+(i<setN-1?'on':(i===setN-1?(half?'now half':'now'):''))+'"></i>').join('')+'</div>';
}
function stepper(lbl,val,unit,id,step){
  return '<div class="card row" style="padding:10px 10px 10px 18px"><span class="bd grow">'+lbl+'</span><button class="mini" style="background:var(--fill2)" onclick="adjV(\''+id+'\',-'+step+')" aria-label="Bajar '+lbl.toLowerCase()+'">'+ic('minus',16,2.4)+'</button>'+
    '<span class="t3 num" style="min-width:76px;text-align:center"><span id="'+id+'">'+val+'</span> <span class="fn l2">'+unit+'</span></span><button class="mini" style="background:var(--fill2)" onclick="adjV(\''+id+'\','+step+')" aria-label="Subir '+lbl.toLowerCase()+'">'+ic('plus',16,2.4)+'</button></div>';
}
function adjV(id,d){
  if(id==='ssMin')SS.mins=Math.max(1,(SS.mins||0)+d);
  if(id==='ssSp')SS.sp=Math.max(0,Math.round(((SS.sp||0)+d)*10)/10);
  const el=$(id);if(el)el.textContent=id==='ssMin'?SS.mins:SS.sp;
  say(id==='ssMin'?'Objetivo, '+SS.mins+(SS.mins===1?' minuto':' minutos'):'Velocidad, '+String(SS.sp).replace('.',',')+' kilómetros por hora');
}
/* el campo de peso crece con la cifra para que «42,5» no pise los «kg» */
let _cv;
function fitW(el){
  if(!el)return;el.style.fontSize='';const cs=getComputedStyle(el);_cv=_cv||document.createElement('canvas');const x=_cv.getContext('2d');
  let fs=parseFloat(cs.fontSize);const txt=el.value||el.placeholder||'0';
  const meas=()=>{x.font=cs.fontWeight+' '+fs+'px '+cs.fontFamily;return x.measureText(txt).width+(txt.length-1)*parseFloat(cs.letterSpacing||0)};
  let w=meas();while(w>150&&fs>40){fs-=4;w=meas()}
  el.style.fontSize=fs+'px';el.style.width=Math.ceil(w+fs*.16+4)+'px';   // margen: el lienzo no aplica cifras tabulares ni el redondeo del glifo
  if(!fitW.ready&&document.fonts&&document.fonts.ready){fitW.ready=1;document.fonts.ready.then(()=>fitW($('ssW')))}
}
function nextW(d){const e=curEx(),inc=e.inc||2.5,w=SS.w==null?0:SS.w;return Math.max(0,offStep(w,inc)?r2((d>0?Math.ceil(w/inc):Math.floor(w/inc))*inc):r2(w+d*inc))}
function adjW(d){SS.w=nextW(d);const el=$('ssW');if(el){el.value=SS.w;fitW(el)}wLabels();say(spkKg(SS.w))}
/* los botones − / + dicen a qué peso llevan («Bajar a 42 kilos»), para no ir a ciegas */
function wLabels(){const m=$('ssWm'),p=$('ssWp');if(m)m.setAttribute('aria-label','Bajar a '+spkKg(nextW(-1)));if(p)p.setAttribute('aria-label','Subir a '+spkKg(nextW(1)))}
function nextLabel(){
  const p=PLAN[SS.day],e=curEx();
  if(SS.last)return null;
  if(SS.preRest)return (e.side?'Serie 1 de '+e.s+', lado izquierdo':'Serie 1 de '+e.s)+' · '+fmtSp(defaultW(e)??'—')+' kg';
  if(SS.si<nSteps(e)-1){const n=e.side?Math.floor((SS.si+1)/2)+1:SS.si+2;return (e.side&&SS.si%2===0?'Lado derecho':'Serie '+n+' de '+e.s)+(e.bw||e.seg?'':' · '+(SS.w==null?'—':SS.w)+' kg')}
  const ni=nextPend(),ne=ni<0?null:p.ex[ni];return ne?esc(ne.n):null;
}
/* Preparar la siguiente máquina: al acabar un ejercicio, pasa al siguiente sin cortar el descanso.
   El descanso sigue en una cápsula arriba (como una Live Activity) y avisa al terminar. */
/* el descanso avisa al acabarse: ámbar en los últimos 10 s, rojo en los 3 últimos, con vibración (heredado de NEXA Fit) */
const restCol=L=>L<=3.05?'var(--red)':(L<=10.05?'var(--warn)':'var(--tint)');
const restTxt=L=>L<=3.05?'var(--red)':(L<=10.05?'var(--amber)':'');
function restBuzz(L){const p=SS.prevL;SS.prevL=L;if(p==null)return;if((p>10&&L<=10)||(p>3&&L<=3))try{navigator.vibrate&&navigator.vibrate(60)}catch(e){}
  if(p>10&&L<=10)say('Quedan 10 segundos de descanso')}
function prepOK(){const p=PLAN[SS.day],e=curEx();return SS.ph==='rest'&&!SS.last&&!SS.sw&&!SS.preRest&&SS.tEnd>Date.now()&&SS.si>=nSteps(e)-1&&nextPend()>=0}
function prepBtn(){
  if(!prepOK())return'';const ne=PLAN[SS.day].ex[nextPend()];
  return '<button class="prepbtn" onclick="prepNext()"><span class="pi">'+ic('chevR',18,2.6)+'</span><span class="grow" style="min-width:0"><span class="hl ell" style="display:block">Preparar '+esc(ne.n)+'</span><span class="fn l2" style="display:block">El descanso sigue contando</span></span></button>';
}
function prepNext(){
  if(!prepOK()){endRest();return}
  const ni=nextPend();SS.ei=ni;SS.si=firstStep(ni);SS.w=null;SS.mins=null;SS.sp=null;SS.ph='set';SS.ann=null;SS.sw=false;SS.bg=true;
  renderSession();renderAcc();
}
function restPill(){
  const L=Math.max(0,(SS.tEnd-Date.now())/1000),C=2*Math.PI*11;
  return '<div class="restpill" id="bgPill" role="timer" aria-label="Descanso"><div class="ring" style="width:28px;height:28px"><svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="11" fill="none" stroke="var(--fill)" stroke-width="3.2"/>'+
    '<circle id="bgArc" cx="14" cy="14" r="11" fill="none" stroke="'+restCol(L)+'" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(-C*(1-L/SS.tTot))+'"/></svg></div>'+
    '<span class="tt" id="bgT">Descanso · '+mmss(Math.ceil(L))+'</span><button class="add" onclick="addRest(30)" aria-label="Añadir 30 segundos">+30 s</button></div>';
}
/* al empezar el ejercicio preparado (plancha o cardio), el descanso que seguía en la cápsula se da por acabado: no cuentan dos relojes a la vez */
function dropBgRest(){if(SS.bg){SS.bg=false;SS.tEnd=0;SS.prevL=null}}
/* fin del descanso en segundo plano: no se vuelve a pintar la pantalla, para no perder el peso que estés escribiendo */
function endBgRest(done){
  SS.bg=false;SS.tEnd=0;const el=$('bgPill');
  if(el&&done){el.classList.add('end');const t=$('bgT');if(t)t.textContent='Descanso terminado';el.querySelectorAll('button').forEach(b=>b.remove());
    const r=el.querySelector('.ring');if(r)r.outerHTML='<span style="width:28px;height:28px;display:grid;place-items:center">'+ic('check',18,3)+'</span>';setTimeout(()=>{el.classList.add('gone');setTimeout(()=>el.remove(),400)},2200)}
  else if(el)el.remove();
  if(!SS.wOn)stopTimer();renderAcc();
}
function annCard(e,A,kind,nx){
  const valTxt=e.spd?(A.r+' min'+(A.sp?' · '+A.sp+' km/h':'')):(e.seg?A.r+' s':null);
  return '<div class="anncard"><div class="row" style="justify-content:space-between"><p class="hl">Anota la serie '+(e.side?Math.floor(SS.ann.si/2)+1:SS.ann.si+1)+'</p><p class="fn l2 num">'+(A.w?A.w+' kg':(e.bw?'peso corporal':''))+'</p></div>'+
    (valTxt?'<p class="t3 num" style="margin-top:8px">'+valTxt+'</p>'
      :'<div class="row" style="justify-content:space-between;margin-top:12px;padding:6px 6px 6px 14px;border-radius:22px;background:var(--fill2)"><span class="bd">Repeticiones</span><div class="row" style="gap:12px">'+
      '<button class="mini" onclick="annRep(-1)" aria-label="Una repetición menos">'+ic('minus',18,2.4)+'</button><span class="t2 num" id="annR" style="min-width:30px;text-align:center">'+A.r+'</span><button class="mini" onclick="annRep(1)" aria-label="Una repetición más">'+ic('plus',18,2.4)+'</button></div></div>')+
    '<p class="fn l2" style="margin:14px 0 8px">¿Cómo ha ido?</p><div class="seg3">'+EFF[kind].map(([v,t,s])=>'<button data-v="'+v+'" class="'+(A.rir===v?'on':'')+'" onclick="setEff('+v+')" aria-pressed="'+(A.rir===v)+'"><span class="hl">'+t+'</span><span class="c1 l2">'+s+'</span></button>').join('')+'</div>'+
    (nx?'<div class="row" style="margin-top:14px;padding-top:12px;border-top:.5px solid var(--sep)"><span class="fn l2 grow">Siguiente</span><span class="fn semi num">'+nx+'</span></div>':'')+'</div>';
}
function annRep(d){if(!SS.ann)return;const A=setsFor(SS.ann.e)[SS.ann.si];if(!A)return;A.r=Math.max(0,(A.r||0)+d);save();const el=$('annR');if(el)el.textContent=A.r;say(A.r+(A.r===1?' repetición':' repeticiones'))}
/* anotar el esfuerzo sin repintar la pantalla: el temporizador no se mueve ni parpadea */
function setEff(v){
  if(!SS.ann)return;const A=setsFor(SS.ann.e)[SS.ann.si];if(!A)return;A.rir=A.rir===v?undefined:v;save();
  document.querySelectorAll('#session .seg3 button').forEach(b=>{const on=+b.dataset.v===A.rir;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  const kind=effKind(SS.ann.e),hard=A.rir!=null&&EFF[kind][2][0]===A.rir,box=$('restDk');
  if(box){const cur=box.querySelector('.deshi'),want=hard?'tired':'seiza';if(!cur||cur.dataset.pose!==want)box.innerHTML=dkStage(want,1.75)}
}
/* cardio con cronómetro: cuenta hacia arriba hasta el objetivo (avisa al llegar) y se puede pausar */
const cEl=()=>Math.floor((SS.wAcc||0)+(SS.wOn?(Date.now()-SS.wStart)/1000:0));
const cLab=(el,tg)=>el>=tg?'¡Objetivo cumplido!':(SS.wOn||el?'de '+mmss(tg):'objetivo '+mmss(tg));
function cStart(){dropBgRest();SS.wOn=true;SS.wStart=Date.now();renderSession();startTick();renderAcc()}
function cPause(){SS.wAcc=cEl();SS.wOn=false;stopTimer();renderSession();renderAcc()}
function cFinish(){const el=cEl();SS.wOn=false;SS.wAcc=0;SS.cDone=false;stopTimer();if(el<30){renderSession();toast('Menos de 30 s: no se anota');return}SS.mins=Math.max(1,Math.round(el/60));doneSet()}
function doneSet(){
  const e=curEx();
  if(e.spd){logSet(e,SS.si,{r:SS.mins,sp:SS.sp||undefined})}
  else if(!e.seg){
    if(!e.bw&&!e.opt&&(SS.w==null||SS.w<=0)&&e.inc>0){toast('Pon el peso que has usado');return}
    if(!e.bw&&SS.w>0&&SS.wOk!==e.id+':'+SS.w&&oddW(e,SS.w)){askW(e,SS.w);return}
    logSet(e,SS.si,{w:e.bw?undefined:(SS.w||undefined),r:defaultR(e)});
  }
  afterSet(e);
}
/* ═════ ANTES DE LA PRIMERA SERIE (ver core.js) ═════
   «Busca tu peso» la primera vez de cada ejercicio con carga; calentamiento si lo has activado en ese ejercicio.
   Se guarda aparte (sess[día].wu): no es una serie y no cuenta en progreso, récords ni peso sugerido. */
/* tras «Busca tu peso», la serie 1 ya no es «primera vez, elige un peso»: dice el que has encontrado */
function probedAdvise(e){
  const a=advise(e),pw=DB.sess[T()]?.wu?.[e.id];
  if(lastFor(e.id)||!pw||!pw.p)return a;
  return Object.assign({},a,{txt:'Has encontrado tu peso: <b>'+fmtSp(pw.w)+' kg</b>. Haz '+(e.lo===e.hi?e.hi:e.lo+'–'+e.hi)+' repeticiones'+(e.side?' por lado':'')+' dejando unas 3 en recámara. Si te sobran muchas, la próxima vez subimos.',w:pw.w});
}
function workW(e){const a=advise(e);return a.w!==''&&a.w!=null?Number(a.w):0}
function preKind(e){
  if(!e||!wuOK(e)||SS.si!==0||SS.wOn)return null;
  if(setsFor(e).some(x=>x&&x.r))return null;
  if(DB.sess[T()]?.wu?.[e.id])return null;
  if((SS.preSkip||[]).includes(e.id))return null;
  if(!lastFor(e.id))return'probe';
  if(wuOn(e)&&wuW(e,workW(e))>0)return'warm';
  return null;
}
/* aviso discreto si el ejercicio carga una zona que cuidas */
function careLine(e){const cz=careZones(e);return cz.length?'<p class="fn amb" style="margin-top:6px">Cuidas '+zTxt(cz)+': empieza suave y para si molesta.</p>':''}
function preHtml(e,pk){
  const key=pk+':'+e.id,probe=pk==='probe',ww=workW(e);
  if(SS.wKey!==key||SS.w==null){SS.w=probe?probeStart(e):wuW(e,ww);SS.wKey=key;SS.pn=1}
  const txt=probe
    ?'<b>Primera vez con este ejercicio.</b> Busquemos tu peso: haz '+PROBE_REPS+' repeticiones tranquilas y dime cómo ha ido. Buscamos uno con el que llegues a '+e.lo+' repeticiones'+(e.side?' por lado':'')+' dejando 3 en recámara.'+(SS.pn>=4?' <b>No hace falta afinar del todo</b>: si dudas, quédate con el más ligero.':'')
    :'Antes de la serie 1: <b>'+WU_REPS+' repeticiones tranquilas</b> con la mitad de tu peso de hoy ('+fmtSp(ww)+'&nbsp;kg). Prepara el movimiento sin cansarte.';
  return '<h1 class="lt balance" style="margin-top:26px">'+esc(e.n)+'</h1>'+
    '<div class="row" style="margin-top:14px;gap:12px;align-items:center"><div class="grow" style="min-width:0"><span class="pill '+(probe?'tint':'amb')+'">'+(probe?'Busca tu peso · prueba '+SS.pn:'Calentamiento')+'</span></div>'+
      (e.k&&e.k.length?'<button class="pill" style="height:32px;padding:0 12px;border-radius:16px;background:var(--fill2);color:var(--label);font-size:13px" onclick="openExSheet('+SS.day+','+SS.ei+')">'+ic('book',15)+'Técnica</button>':'')+'</div>'+
    '<div class="card row" style="margin-top:20px;padding:14px 16px;gap:13px;align-items:flex-start"><span class="ic soft" style="width:34px;height:34px;border-radius:50%;display:grid;place-items:center">'+ic(probe?'bolt':'flame',17)+'</span>'+
      '<div class="grow"><p class="sb">'+txt+'</p>'+careLine(e)+'</div></div>'+
    '<div style="flex:1 1 0;min-height:24px"></div><div style="display:flex;flex-direction:column;align-items:center"><p class="fn l2 caps semi">Peso</p><div class="row" style="gap:22px;margin-top:6px">'+
      '<button class="step" id="ssWm" onclick="adjW(-1)" aria-label="Quitar peso">'+ic('minus',22,2.4)+'</button><div class="row" style="align-items:baseline;gap:4px;justify-content:center"><input id="ssW" class="big rnd" type="number" inputmode="decimal" step="any" placeholder="0" value="'+(SS.w==null?'':SS.w)+'" oninput="SS.w=this.value===\'\'?null:parseFloat(this.value);fitW(this)" aria-label="Peso en kilos" style="width:150px;text-align:center;background:none;border:0;outline:none;padding:0"><span class="t3 l2">kg</span></div>'+
      '<button class="step" id="ssWp" onclick="adjW(1)" aria-label="Añadir peso">'+ic('plus',22,2.4)+'</button></div></div>'+
    '<p class="sb l2 center num" style="margin-top:36px"><span class="semi" style="color:var(--label)">'+(probe?PROBE_REPS:WU_REPS)+' reps'+(e.side?' por lado':'')+'</span> · sin apurar · no cuenta como serie</p><div style="flex:1.7 1 0"></div>'+
    '<div class="foot">'+(probe
      ?'<div class="row" style="gap:10px"><button class="btn sec grow" onclick="probeAdj(-1)">'+ic('minus',18,2.4)+'Pesado · bajo</button><button class="btn sec grow" onclick="probeAdj(1)">'+ic('plus',18,2.4)+'Fácil · subo</button></div>'+
        '<button class="btn pri lg" onclick="preDone()">'+ic('check',22,2.6)+'Este es mi peso</button><button class="btn tx" onclick="preSkip()">Ya sé qué peso usar</button>'
      :'<button class="btn pri lg" onclick="preDone()">'+ic('check',22,2.6)+'Calentamiento hecho</button><button class="btn tx" onclick="preSkip()">Saltar calentamiento</button>')+'</div>';
}
/* tanteo: «Fácil» sube, «Pesado» baja, siempre en pesos de tu material; no se anota nada hasta «Este es mi peso» */
function probeAdj(d){
  const e=curEx();if(!(SS.w>0))SS.w=probeStart(e);
  SS.w=probeStep(e,SS.w,d);SS.pn=(SS.pn||1)+1;renderSession();
  say((d>0?'Sube a ':'Baja a ')+spkKg(SS.w)+'. Prueba '+SS.pn);
}
function logPre(e,val){
  const d=T();DB.sess[d]=DB.sess[d]||{day:SS.day,ex:{}};DB.sess[d].day=SS.day;
  DB.sess[d].wu=DB.sess[d].wu||{};DB.sess[d].wu[e.id]=val;save();
}
function preDone(){
  const e=curEx(),pk=preKind(e);if(!pk)return;
  if(!(SS.w>0)){toast('Pon el peso que has usado');return}
  logPre(e,pk==='probe'?{w:SS.w,r:PROBE_REPS,p:1}:{w:SS.w,r:WU_REPS});
  SS.preK=pk;SS.wKey=null;SS.w=pk==='probe'?SS.w:null;           // al tantear, ese es tu peso para la serie 1
  SS.ann=null;SS.last=0;SS.sw=false;SS.bg=false;SS.preRest=true;
  const rest=pk==='probe'?90:60;SS.prevL=null;SS.ph='rest';SS.tTot=rest;SS.tEnd=Date.now()+rest*1000;startTick();renderSession();renderAcc();
}
function preSkip(){const e=curEx();SS.preSkip=(SS.preSkip||[]).concat(e.id);SS.wKey=null;SS.w=null;renderSession();renderAcc()}
/* calentamiento: lo activa cada uno en cada ejercicio (hoja del ejercicio o menú de la sesión) */
function wuToggle(id){
  DB.wu=DB.wu||{};const on=!DB.wu[id];if(on)DB.wu[id]=1;else delete DB.wu[id];save();
  drawSheet();say(on?'Calentamiento activado':'Calentamiento desactivado');
  if(SS.on&&!SS.min&&curEx()&&curEx().id===id&&SS.ph==='set'){SS.wKey=null;SS.w=null;renderSession()}
}
function wuCell(e){
  const on=!!(DB.wu||{})[e.id];
  return '<button class="cell" role="switch" aria-checked="'+on+'" onclick="wuToggle(\''+e.id+'\')"><div class="cb" style="padding-left:2px"><div class="tt"><p class="bd">Serie de calentamiento</p><p class="fn l2">'+WU_REPS+' reps con la mitad del peso, antes de la serie 1</p></div><span class="sw'+(on?' on':'')+'" aria-hidden="true"></span></div></button>';
}
/* peso de referencia de un ejercicio: la mediana de lo anotado en sus últimas 8 sesiones (un error suelto no la mueve) */
function refW(e){
  const v=[];let n=0;
  for(const d of Object.keys(DB.sess).sort().reverse()){
    const a=DB.sess[d]?.ex?.[e.id];if(!Array.isArray(a))continue;
    const w=a.filter((x,i)=>x&&x.r&&x.w>0&&!(d===T()&&i===SS.si)).map(x=>Number(x.w));
    if(w.length){v.push(...w);if(++n>=8)break}
  }
  if(!v.length)return 0;v.sort((a,b)=>a-b);return v[Math.floor(v.length/2)];
}
/* un peso que parece un error de tecleo: más de 500 kg, o más del doble de lo habitual y al menos 10 kg por encima */
function oddW(e,w){const m=refW(e);return w>500||(m>0&&w>m*2&&w-m>=10)}
function askW(e,w){
  const m=refW(e),kg=x=>String(x).replace('.',',')+' kg';
  openSheet(()=>({title:'¿'+kg(w)+'?',body:'<div class="pad stack" style="padding-bottom:calc(env(safe-area-inset-bottom) + 24px)">'+
    '<p class="bd l2 center balance" style="padding:0 8px">'+(m>0?'En <b>'+esc(exName(e.id))+'</b> sueles mover unos <b class="num">'+kg(m)+'</b>. Puede que se haya colado una cifra.':'Es más de lo que carga casi cualquier máquina. Puede que se haya colado una cifra.')+'</p>'+
    '<button class="btn pri" onclick="fixW()">Corregir</button>'+
    '<button class="btn sec" onclick="okW()">Sí, son '+kg(w)+'</button></div>'}));
}
function fixW(){closeSheet();const el=$('ssW');if(el){el.focus();el.select()}}
function okW(){SS.wOk=curEx().id+':'+SS.w;closeSheet();doneSet()}
function swToggle(){
  const e=curEx();
  if(!SS.wOn){dropBgRest();SS.wOn=true;SS.wStart=Date.now();renderSession();startTick();return}
  const el=Math.floor((Date.now()-SS.wStart)/1000);SS.wOn=false;
  if(el<1){renderSession();return}
  logSet(e,SS.si,{r:el});afterSet(e);
}
function afterSet(e){
  const p=PLAN[SS.day];SS.ann={e,si:SS.si};SS.wOn=false;SS.bg=false;
  if(SS.si>=nSteps(e)-1&&nextPend()<0){SS.last=1;SS.ph='rest';SS.tEnd=0;stopTimer();ding();renderSession();renderAcc();return}
  SS.last=0;const first=e.side&&SS.si%2===0;SS.sw=first;
  const rest=first?20:e.r;
  if(rest>0){SS.prevL=null;SS.ph='rest';SS.tTot=rest;SS.tEnd=Date.now()+rest*1000;startTick();renderSession();renderAcc()}
  else{advance();renderSession();renderAcc()}
}
function advance(){
  const p=PLAN[SS.day],e=curEx();stopTimer();SS.tEnd=0;SS.sw=false;SS.bg=false;
  if(SS.preRest){SS.preRest=false;SS.ph='set';SS.ann=null;return}   // tras tantear o calentar, a la serie 1 del mismo ejercicio
  if(SS.si<nSteps(e)-1){SS.si++}
  else if(nextPend()>=0){SS.past=SS.past||[];if(!SS.past.includes(SS.ei))SS.past.push(SS.ei);const ni=nextPend();SS.ei=ni;SS.si=firstStep(ni);SS.w=null;SS.mins=null;SS.sp=null;SS.wAcc=0;SS.cDone=false}
  else{SS.ph='done';return}
  SS.ph='set';SS.ann=null;
}
function skipSet(){const p=PLAN[SS.day],e=curEx();if(SS.si>=nSteps(e)-1&&nextPend()<0){finishSession();return}SS.wOn=false;advance();renderSession();renderAcc()}
function addRest(s){SS.tEnd+=s*1000;SS.tTot+=s;SS.prevL=null;tick();say('Quedan '+spkT(Math.ceil((SS.tEnd-Date.now())/1000)))}
function endRest(){advance();renderSession();renderAcc()}
function startTick(){stopTimer();SS.tI=setInterval(tick,250);tick()}
function stopTimer(){clearInterval(SS.tI);SS.tI=null}
function tick(){
  if(SS.paused)return;
  a11yTick();
  const c=$('ssClock');if(c)c.textContent=mmss(activeMs()/1000);
  if(SS.bg&&SS.tEnd){
    const L=Math.max(0,(SS.tEnd-Date.now())/1000),t=$('bgT'),a=$('bgArc');
    if(t){t.textContent=(L<=10?'Prepárate · ':'Descanso · ')+mmss(Math.ceil(L));t.style.color=restTxt(L)}if(a){const C=2*Math.PI*11;a.setAttribute('stroke-dashoffset',-C*(1-L/SS.tTot));a.setAttribute('stroke',restCol(L))}
    restBuzz(L);
    if(L<=0){ding();say('Descanso terminado',true);endBgRest(true)}else if(!SS.wOn)renderAcc();
    if(!SS.wOn)return;
  }
  if(SS.ph==='set'&&SS.wOn&&curEx().spd){
    const el=cEl(),tg=SS.mins*60,t=$('cT'),a=$('cArc'),l=$('cL');
    if(t)t.textContent=mmss(el);if(a){const C=2*Math.PI*80;a.setAttribute('stroke-dashoffset',C*(1-Math.min(1,el/tg)))}if(l)l.textContent=cLab(el,tg);
    if(el>=tg&&!SS.cDone){SS.cDone=true;ding();say('Objetivo de cardio cumplido',true)}
    renderAcc();return;
  }
  if(SS.ph==='set'&&SS.wOn){
    const e=curEx(),el=Math.floor((Date.now()-SS.wStart)/1000),t=$('swT'),a=$('swArc');
    if(t)t.textContent=mmss(el);if(a){const C=2*Math.PI*88;a.setAttribute('stroke-dashoffset',C*(1-Math.min(1,el/(lightGoal(e)||e.hi))))}
    const l=$('swL');if(l)l.textContent=segLab(e,el);
    renderAcc();return;
  }
  if(SS.ph!=='rest'||!SS.tEnd)return;
  const L=Math.max(0,(SS.tEnd-Date.now())/1000),t=$('rT'),a=$('rArc');
  if(t){t.textContent=mmss(Math.ceil(L));t.style.color=restTxt(L)}
  if(a){const C=2*Math.PI*82;a.setAttribute('stroke-dashoffset',-C*(1-L/SS.tTot));a.setAttribute('stroke',restCol(L))}
  const rl=$('rL');if(rl)rl.textContent=L<=10?'Prepárate':'de '+mmss(SS.tTot);
  restBuzz(L);
  renderAcc();
  if(L<=0){ding();advance();if(SS.min)say('Descanso terminado',true);if(!SS.min)renderSession();renderAcc();if(SS.ph==='set'&&!SS.min)keepAwake(true)}
}
/* pantalla de pausa: todo quieto; «Seguir» en lima, como en Neiro */
function pausedWhat(){
  const e=curEx();if(!e)return'';
  if(SS.ph==='rest'&&SS.tEnd)return 'Descanso · quedan '+mmss(Math.ceil(Math.max(0,(SS.tEnd-SS.pauseAt)/1000)));
  if(SS.ph==='rest'&&SS.last)return 'Última serie hecha';
  const setN=e.side?Math.floor(SS.si/2)+1:SS.si+1;
  if(e.spd&&(SS.wOn||SS.wAcc))return esc(e.n)+' · '+mmss(cEl())+' de cardio';
  if(e.seg&&SS.wOn)return esc(e.n)+' · '+mmss(Math.floor((SS.pauseAt-SS.wStart)/1000));
  return esc(e.n)+' · serie '+setN+' de '+e.s;
}
function renderPaused(){
  const bg=SS.bg&&SS.tEnd?'<p class="fn l2 center num" style="margin-top:6px">Descanso en marcha · quedan '+mmss(Math.ceil(Math.max(0,(SS.tEnd-SS.pauseAt)/1000)))+'</p>':'';
  $('session').innerHTML='<div class="fullin">'+sessHead()+'<div style="margin-top:10px">'+sessDots()+'</div>'+
    '<div style="flex:1 1 0;min-height:24px"></div><div style="display:flex;justify-content:center">'+dkStage('seiza',2)+'</div>'+
    '<h1 class="lt center" style="margin-top:22px">En pausa</h1><p class="sb l2 center num" style="margin-top:6px">'+pausedWhat()+'</p>'+bg+
    '<p class="fn l3 center" style="margin-top:14px">El reloj y el descanso están detenidos.<br>Este rato no cuenta como entrenamiento.</p>'+
    '<div style="flex:1.3 1 0"></div><div class="foot"><button class="btn pri lg" onclick="resumeSession()">'+ic('play',20)+'Seguir</button><button class="btn tx" onclick="finishSession()">Terminar la sesión</button></div></div>';a11ySess();
}
/* salir sin terminar: lo anotado se guarda y el reloj se queda donde estaba; al volver hoy, sigue desde ahí */
function exitSession(){freezeClock();SS.paused=false;sessPersist(true);stopTimer();clearInterval(SS.cI);SS.on=false;SS.min=false;$('session').classList.remove('on');keepAwake(false);closeSheet();render()}
/* empezar de cero o descartar (por ejemplo, si te equivocas de rutina o anotas mal al empezar):
   se borra lo anotado hoy en esta rutina y el reloj vuelve a cero. Siempre con confirmación. */
function sessLogged(){const ex=DB.sess[T()]?.ex||{};return PLAN[SS.day].ex.reduce((n,e)=>n+(ex[e.id]||[]).filter(x=>x&&x.r).length,0)}
const loggedTxt=n=>n?'Se borran '+(n===1?'la serie anotada':'las '+n+' series anotadas')+' hoy en esta rutina. ':'';
function wipeToday(){
  const d=T(),s=DB.sess[d];if(!s)return;
  PLAN[SS.day].ex.forEach(e=>{if(s.ex)delete s.ex[e.id];if(s.wu)delete s.wu[e.id]});
  if(!s.ex||!Object.keys(s.ex).length)delete DB.sess[d];
  save();
}
function askRestart(){const n=sessLogged();confirmSheet('Empezar de cero',loggedTxt(n)+'El reloj vuelve a 0:00 y empiezas por el primer ejercicio.'+(n?' <b>No se puede deshacer.</b>':''),'Empezar de cero','restartSession()',true)}
function askDiscard(){const n=sessLogged();confirmSheet('Descartar la sesión',loggedTxt(n)+'La sesión no cuenta en tu semana.'+(n?' <b>No se puede deshacer.</b>':''),'Descartar','discardSession()',true)}
function restartSession(){
  const day=SS.day;wipeToday();stopTimer();clearInterval(SS.cI);SS.tEnd=0;SS.on=false;PREF.set('sess',null);closeSheet();
  openSession(day);toast('Sesión desde cero');
}
function discardSession(){wipeToday();SS.tEnd=0;closeSession();toast('Sesión descartada')}
function finishSession(){
  if(SS.paused){const sh=Date.now()-SS.pauseAt;if(SS.tEnd)SS.tEnd+=sh;SS.paused=false;SS.pauseAt=0}
  freezeClock();const d=T();if(DB.sess[d]){DB.sess[d].dur=activeMin();save()}
  sessPersist();stopTimer();SS.bg=false;SS.tEnd=0;SS.ph='done';SS.last=0;renderSession();renderAcc()}
function renderDone(){
  const d=T(),p=PLAN[SS.day],s=sessStats(d),mins=DB.sess[d]?.dur||activeMin();
  const R=prData(),news=Object.keys(R).filter(id=>R[id].d===d&&(SS.R0[id]==null||R[id].v>SS.R0[id]));
  const P=planWeek(),done=Object.keys(P.map).length,nx=nextSession(P),eb=blkEndsToday(),cb=eb&&blkNew(eb)?eb:0;
  $('session').innerHTML='<div class="fullin"><div style="display:flex;justify-content:center;margin-top:28px">'+dkStage('cheer',3)+'</div>'+
    '<h1 class="t1 center" style="margin-top:22px">Sesión completada</h1><p class="sb l2 center" style="margin-top:4px">'+esc(p.n)+' · '+mins+' min · '+done+' de '+dayKeys().length+' esta semana</p>'+
    '<div class="stack" style="margin-top:22px"><div class="card row" style="gap:0">'+[['Series',s.n,''],['Volumen',fmtNum(s.ton),' kg'],['Tiempo',mins,' min']].map(([l,v,u],i)=>
      '<div class="grow center" style="padding:13px 8px 12px'+(i?';border-left:.5px solid var(--sep)':'')+'"><p class="fn l2">'+l+'</p><p class="t2 num">'+v+'<span class="sb l3 semi">'+u+'</span></p></div>').join('')+'</div>'+
    news.slice(0,3).map(id=>'<div class="card row" style="padding:14px 16px;gap:13px"><span class="ic tint" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center">'+ic('trophy',22)+'</span><div class="grow"><p class="fn ink semi">Nuevo récord</p><p class="hl num">'+esc(exName(id))+' · '+esc(R[id].lbl)+'</p></div></div>').join('')+
    (cb?'<div class="card row ce-tease" style="padding:14px 16px;gap:13px"><span class="ic tint" style="width:40px;height:40px;border-radius:12px;display:grid;place-items:center">'+ic('star',20)+'</span><div class="grow"><p class="fn ink semi">Último entreno del bloque '+cb+'</p><p class="hl">Has completado las 12 semanas</p></div></div>'
      :(nx?'<div class="card row" style="padding:14px 16px;gap:13px"><span class="ic gray" style="width:34px;height:34px;border-radius:10px;display:grid;place-items:center">'+ic('cal',18)+'</span><div class="grow"><p class="fn l2">Próxima sesión</p><p class="hl">'+esc(PLAN[nx.n].n)+' · '+nx.when+'</p></div></div>':''))+
    '</div><div class="foot">'+(cb?'<button class="btn pri lg" onclick="closeSession();openCele('+cb+')">'+ic('star',18)+'Ver mis 12 semanas</button><button class="btn tx" onclick="closeSession()">Ahora no</button>'
      :'<button class="btn pri lg" onclick="closeSession()">Listo</button>')+'</div></div>';a11ySess();
}
function openSessMenu(){
  const p=PLAN[SS.day],log=DB.sess[T()]?.ex||{};
  openSheet(()=>({title:'Sesión',body:'<div class="pad"><p class="ghead" role="heading" aria-level="2" style="padding-left:16px">Ir a un ejercicio</p><div class="group">'+p.ex.map((e,i)=>{const dn=(log[e.id]||[]).filter(x=>x&&x.r).length;
      return '<button class="cell" onclick="jumpTo('+i+')"><span class="exn'+(dn>=nSteps(e)?' done':'')+'">'+(dn>=nSteps(e)?ic('check',14,2.8):(i+1))+'</span><div class="cb"><div class="tt"><p class="bd ell">'+esc(e.n)+'</p><p class="fn l2">'+dn+' de '+nSteps(e)+' series</p></div>'+(i===SS.ei?'<span class="pill tint">Ahora</span>':'')+'</div></button>'}).join('')+'</div>'+
    (()=>{const e=curEx();return e&&e.inc>0&&!e.bw?'<p class="ghead" role="heading" aria-level="2" style="padding-left:16px;margin-top:18px">'+esc(e.n)+'</p><div class="group"><div class="cell static"><div class="cb" style="padding-left:2px"><span class="tt bd">Salto de peso</span><button class="mini" style="background:var(--fill2)" onclick="incEdit('+SS.day+','+SS.ei+',-1)" aria-label="Bajar el salto de peso, ahora '+String(e.inc).replace('.',',')+' kilos">'+ic('minus',16,2.4)+'</button><span class="hl num" style="min-width:56px;text-align:center">'+String(e.inc).replace('.',',')+' kg</span><button class="mini" style="background:var(--fill2)" onclick="incEdit('+SS.day+','+SS.ei+',1)" aria-label="Subir el salto de peso, ahora '+String(e.inc).replace('.',',')+' kilos">'+ic('plus',16,2.4)+'</button></div></div></div><p class="gfoot" style="padding-left:16px">'+(isMaq(e)?'Lo que sube la placa de la máquina.':'Lo que va de un disco o una mancuerna a la siguiente.')+'</p>':''})()+
    (()=>{const e=curEx();return wuOK(e)?'<div class="group" style="margin-top:'+(e.inc>0&&!e.bw?'10px':'18px')+'">'+wuCell(e)+'</div>':''})()+
    '<div class="group" style="margin-top:18px"><button class="cell" onclick="'+(SS.paused?'closeSheet();resumeSession()':'pauseSession()')+'"><span class="ic soft">'+ic(SS.paused?'play':'pause',16)+'</span><div class="cb"><div class="tt"><p class="bd">'+(SS.paused?'Seguir':'Pausar la sesión')+'</p><p class="fn l2">El reloj y el descanso se detienen</p></div></div></button>'+
    '<button class="cell" onclick="closeSheet();finishSession()"><span class="ic soft">'+ic('check',17,2.6)+'</span><div class="cb"><span class="tt bd">Terminar la sesión ahora</span></div></button>'+
    '<button class="cell" onclick="exitSession()"><span class="ic gray">'+ic('out',17)+'</span><div class="cb"><div class="tt"><p class="bd">Salir</p><p class="fn l2">Lo anotado se guarda; puedes continuar luego</p></div></div></button></div>'+
    '<div class="group" style="margin-top:18px"><button class="cell" onclick="askRestart()"><span class="ic gray">'+ic('redo',17)+'</span><div class="cb"><div class="tt"><p class="bd">Empezar de cero</p><p class="fn l2">Borra lo anotado hoy y el reloj vuelve a 0:00</p></div></div></button>'+
    '<button class="cell" onclick="askDiscard()"><span class="ic red">'+ic('trash',17)+'</span><div class="cb"><div class="tt"><p class="bd red">Descartar la sesión</p><p class="fn l2">Como si no la hubieras empezado</p></div></div></button></div></div>'}));
}
function jumpTo(i){
  if(SS.paused){SS.paused=false;SS.pauseAt=0;SS.runAt=Date.now();sessPersist();keepAwake(true)}
  const e=PLAN[SS.day].ex[i],s=setsFor(e);stopTimer();SS.tEnd=0;SS.bg=false;SS.ei=i;SS.si=0;SS.preRest=false;SS.wKey=null;
  for(let j=0;j<nSteps(e);j++){SS.si=j;if(!(s[j]&&s[j].r))break}
  SS.ph='set';SS.ann=null;SS.last=0;SS.w=null;SS.mins=null;SS.sp=null;SS.wAcc=0;SS.cDone=false;SS.wOn=false;closeSheet();renderSession();renderAcc();
}
function renderAcc(){
  const a=$('acc'),on=SS.on&&SS.min&&started;a.hidden=!on;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('with-acc',on));
  if(!on)return;
  const e=curEx(),rest=(SS.ph==='rest'||SS.bg)&&SS.tEnd,L=rest?Math.max(0,(SS.tEnd-(SS.paused?SS.pauseAt:Date.now()))/1000):0,C=2*Math.PI*16.5;
  const pct=rest?L/SS.tTot:(SS.ph==='done'?1:0);
  a.innerHTML='<div class="ring" style="width:40px;height:40px"><svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16.5" fill="none" stroke="var(--fill)" stroke-width="4"/>'+
    '<circle cx="20" cy="20" r="16.5" fill="none" stroke="'+(rest?restCol(L):'var(--tint)')+'" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+C+'" stroke-dashoffset="'+(-C*(1-pct))+'"/></svg>'+
    '<div class="in">'+(rest&&!SS.paused?'':ic(SS.ph==='done'?'check':(SS.paused?'pause':'play'),15))+'</div></div>'+
    '<div class="grow"><p class="fn semi num">'+(SS.ph==='done'?'Sesión completada':SS.paused?'En pausa · '+mmss(activeMs()/1000):(rest?'Descanso · '+mmss(Math.ceil(L)):(SS.wOn?(e&&e.spd?'Cardio · '+mmss(cEl()):'Serie en marcha'):(e&&e.spd&&SS.wAcc?'Cardio en pausa · '+mmss(cEl()):'Siguiente serie'))))+'</p><p class="c1 l2 ell">'+esc(PLAN[SS.day].n)+' · '+esc(e?e.n:'')+'</p></div>'+
    '<span class="btn sec sm" style="height:38px" aria-hidden="true">Abrir</span>';
  a.setAttribute('aria-label','Abrir la sesión. '+a.querySelector('.grow').textContent.replace(/(\d+):(\d\d)/,(m,x,y)=>spkT(+x*60+ +y)));
}

/* tamaño bloqueado, como una app: sin pellizcar para ampliar ni doble toque (Safari ignora user-scalable) */
['gesturestart','gesturechange'].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),{passive:false}));
document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
/* ═════ ARRANQUE ═════ */
function showApp(){
  $('welcome').classList.remove('on');$('tabbar').hidden=false;$('btnMe').hidden=false;$('btnTheme').hidden=false;applyTheme();
}
async function startApp(localDB){
  started=true;load();
  if(localDB&&!DB.plan&&localDB.plan){DB=mergeDefaults(localDB);DB._ts=Date.now();DB._dirty=true;writeLocal()}
  buildPlan();applyLook();
  if(CLOUD&&USER){await pull();buildPlan()}
  if(!(DB.profile&&DB.profile.done)){$('welcome').classList.remove('on');openOnb();return}
  showApp();go('hoy');
  const st=PREF.get('sess',null);
  if(st&&!st.out&&st.d===T()&&PLAN[st.n]&&setsDoneToday(st.n)<totalSets(st.n)){openSession(st.n);minimizeSession()}
}
function boot(){
  applyTheme();
  if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('sw.js').catch(()=>{});
  document.addEventListener('visibilitychange',()=>{
    if(!started)return;
    if(document.visibilityState==='hidden'){if(DB._dirty||pushT)push()}
    else{if(SS.on&&!SS.min)keepAwake(true);if(SS.on)tick();if(T()!==curDate)render();pull().then(ch=>{if(ch){buildPlan();render()}})}
  });
  window.addEventListener('online',()=>{if(started&&DB._dirty)push()});
  if(CLOUD&&window.supabase){
    sb=window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    sb.auth.onAuthStateChange((ev,ses)=>{setTimeout(()=>onAuth(ev,ses),0)});
    return;
  }
  if(S.get(KEY+'_mode')==='local')startApp();else showWelcome();
}
boot();
