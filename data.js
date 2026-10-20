/* Tsuyo · datos, cuentas y sincronización.
   Local primero: todo se guarda en el móvil al instante y, si hay cuenta, se sube a Supabase. */
'use strict';

/* ═════ CONFIGURACIÓN ═════ */
const CFG={
  supabaseUrl:'https://TU-PROYECTO.supabase.co',   // Project Settings → API → Project URL
  supabaseKey:'TU-CLAVE-PUBLICA',                   // clave "publishable" (pública: la protege RLS)
  table:'tsuyo_data',
  owner:'Telmo Rivas',
  ownerEmail:'nexafit.dojo@gmail.com',
  region:'Unión Europea (Fráncfort)',
  version:'0.1 · pruebas'
};
const CLOUD=!!(CFG.supabaseUrl&&CFG.supabaseKey&&!/TU-PROYECTO|TU-CLAVE/.test(CFG.supabaseUrl+CFG.supabaseKey));

/* ═════ ALMACÉN LOCAL (con respaldo en memoria) ═════ */
const S={
  ok:(()=>{try{localStorage.setItem('__t','1');localStorage.removeItem('__t');return true}catch(e){return false}})(),
  mem:{},
  get(k){if(this.ok){try{return localStorage.getItem(k)}catch(e){}}return this.mem[k]??null},
  set(k,v){if(this.ok){try{localStorage.setItem(k,v);return}catch(e){}}this.mem[k]=v},
  del(k){if(this.ok){try{localStorage.removeItem(k)}catch(e){}}delete this.mem[k]}
};
const KEY='tsuyo_v1';
let sb=null,USER=null;
const uKey=()=>KEY+'_'+(USER?USER.id:'local');
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ajustes de este dispositivo (no viajan con la cuenta) */
const PREF={
  get(k,d){try{const v=JSON.parse(S.get(KEY+'_pref')||'{}');return k in v?v[k]:d}catch(e){return d}},
  set(k,val){let v={};try{v=JSON.parse(S.get(KEY+'_pref')||'{}')}catch(e){}v[k]=val;S.set(KEY+'_pref',JSON.stringify(v))}
};
/* Plus simulado: en la app de iOS lo decidirá la compra en la App Store */
const isPlus=()=>!!PREF.get('plus',false);

/* ═════ SINCRONIZACIÓN ═════ */
let pushT=null,pushing=false,SYNC='';
function schedulePush(){
  if(!CLOUD||!USER)return;
  clearTimeout(pushT);SYNC='busy';pushT=setTimeout(push,1200);
}
async function push(){
  if(!CLOUD||!USER||!sb)return true;
  if(pushing){schedulePush();return false}
  pushing=true;clearTimeout(pushT);
  try{
    const payload=Object.assign({},DB);delete payload._dirty;
    const {error}=await sb.from(CFG.table).upsert({user_id:USER.id,data:payload,updated_at:new Date(DB._ts||Date.now()).toISOString()});
    if(error)throw error;
    DB._dirty=false;writeLocal();SYNC='ok';return true;
  }catch(e){DB._dirty=true;writeLocal();SYNC='err';return false}
  finally{pushing=false}
}
async function pull(){
  if(!CLOUD||!USER||!sb)return false;
  try{
    const {data,error}=await sb.from(CFG.table).select('data').eq('user_id',USER.id).maybeSingle();
    if(error)throw error;
    const remote=data&&data.data;
    if(remote&&(remote._ts||0)>(DB._ts||0)){
      if(SS.on)return false;                                   // no pisar una sesión en curso
      DB=DB._dirty?mergeData(DB,mergeDefaults(remote)):mergeDefaults(remote);
      if(DB._dirty){DB._ts=Date.now();writeLocal();await push()}else{DB._dirty=false;writeLocal()}
      SYNC='ok';return true;
    }
    if(!remote||DB._dirty||(DB._ts||0)>(remote._ts||0)){if(DB.plan||DB._ts)await push()}
    SYNC='ok';
  }catch(e){SYNC='err'}
  return false;
}
/* dos copias: rutina, perfil y ajustes de la remota; entrenos y saltos se unen día a día */
function mergeData(loc,rem){
  const out=JSON.parse(JSON.stringify(rem));
  const filled=a=>(a||[]).filter(x=>x&&x.r).length;
  Object.entries(loc.sess||{}).forEach(([d,ls])=>{
    const rs=out.sess[d];
    if(!rs){out.sess[d]=ls;return}
    const ex=Object.assign({},rs.ex);
    Object.entries(ls.ex||{}).forEach(([id,sets])=>{if(!ex[id]||filled(sets)>=filled(ex[id]))ex[id]=sets});
    out.sess[d]=Object.assign({},rs,{ex,day:ls.day||rs.day,dur:Math.max(ls.dur||0,rs.dur||0)||undefined});
  });
  Object.entries(loc.skips||{}).forEach(([d,v])=>{if(!out.skips[d])out.skips[d]=v});
  Object.entries(loc.cex||{}).forEach(([id,e])=>{if(!out.cex[id])out.cex[id]=e});
  out.inc=Object.assign({},out.inc||{},loc.inc||{});
  return mergeDefaults(out);
}

/* ═════ CUENTAS ═════ */
async function signIn(email,pass){
  const {error}=await sb.auth.signInWithPassword({email,password:pass});
  if(error)throw new Error(/confirm/i.test(error.message)?'Confirma tu email: revisa tu correo y la carpeta de spam.':'Email o contraseña incorrectos.');
}
async function signUp(email,pass){
  const redirect=location.origin+location.pathname;
  const {data,error}=await sb.auth.signUp({email,password:pass,options:{emailRedirectTo:redirect,data:{consent_at:new Date().toISOString()}}});
  if(error)throw new Error(/password/i.test(error.message)?'Contraseña demasiado débil. Prueba con una más larga.':'No se pudo crear la cuenta: '+error.message);
  return !!data.session;
}
async function resetPass(email){
  const {error}=await sb.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});
  if(error)throw new Error('No se pudo enviar: '+error.message);
}
async function deleteAccount(){
  if(CLOUD&&sb&&USER){
    const {error}=await sb.rpc('delete_my_account');
    if(error)throw new Error('No se pudo eliminar. Revisa tu conexión.');
    await sb.auth.signOut();
  }
  S.del(uKey());S.del(KEY+'_mode');USER=null;
}
