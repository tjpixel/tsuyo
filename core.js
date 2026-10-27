/* Tsuyo · núcleo compartido con NEXA Fit (copiado sin cambios de su index.html).
   Catálogo, plantillas, planificación semanal, progresión y formato de datos. */

/* ═════ CATÁLOGO DE EJERCICIOS ═════
   Campos: n nombre · g grupo · s series · lo/hi rango · r descanso (s) · inc incremento de carga (kg)
   side por lado · seg por tiempo · min en minutos · spd anota km/h · bw peso corporal · opt peso opcional
   tip consejo corto · prog cómo progresar sin carga · k claves técnicas */
const GROUPS=['Pierna','Glúteo','Pecho','Espalda','Hombro','Brazos','Core','Cardio'];
const EXC={
 // ── PIERNA
 sentadilla:{n:'Sentadilla con barra',g:'Pierna',s:4,lo:6,hi:10,r:180,inc:2.5,tip:'Compuesto pesado: nunca al fallo',k:['Barra sobre los trapecios, no sobre el cuello','Pies a la anchura de hombros, puntas algo hacia fuera','Inspira y bloquea el abdomen antes de bajar','Rodillas en la dirección de los pies','Baja hasta donde mantengas la espalda neutra','Sube empujando el suelo con todo el pie']},
 goblet:{n:'Sentadilla goblet',g:'Pierna',s:3,lo:10,hi:14,r:120,inc:2,tip:'Ideal para aprender el patrón de sentadilla',k:['Mancuerna o kettlebell pegada al pecho','Codos por dentro de las rodillas al bajar','Pecho alto y espalda neutra','Talones siempre apoyados','Sube sin perder la postura del tronco']},
 prensa:{n:'Prensa de piernas',g:'Pierna',s:3,lo:8,hi:12,r:150,inc:5,tip:'Pies más altos = más glúteo; más bajos = más cuádriceps',k:['Espalda y caderas pegadas al respaldo','Pies a la anchura de caderas','Rodillas alineadas con los dedos','Baja controlando hasta profundidad cómoda','Extiende sin bloquear las rodillas','No despegues la pelvis abajo']},
 hack:{n:'Sentadilla hack en máquina',g:'Pierna',s:3,lo:8,hi:12,r:150,inc:5,k:['Espalda apoyada en todo el recorrido','Pies a la anchura de caderas en el centro de la plataforma','Baja controlando, rodillas siguiendo los pies','Sube sin bloquear las rodillas arriba']},
 zancada:{n:'Zancadas con mancuernas',g:'Pierna',s:3,lo:8,hi:12,r:120,inc:2,side:1,k:['Paso largo y estable','Tronco erguido, mancuernas a los lados','Baja hasta que la rodilla de atrás casi toque el suelo','Rodilla delantera en línea con el pie','Empuja con el talón de delante para subir']},
 bulgara:{n:'Sentadilla búlgara',g:'Pierna',s:3,lo:8,hi:12,r:120,inc:2,side:1,k:['Empeine de atrás sobre un banco','Pie delantero lo bastante adelantado','Baja en vertical, sin rebotar','Rodilla delantera en línea con el pie','Tronco algo inclinado para más glúteo']},
 extcuad:{n:'Extensión de cuádriceps',g:'Pierna',s:3,lo:12,hi:15,r:90,inc:5,k:['Eje de la máquina alineado con la rodilla','Rodillo justo encima del tobillo','Espalda pegada al respaldo','Extiende del todo y aprieta un segundo','Baja lento']},
 femoral:{n:'Curl femoral',g:'Pierna',s:3,lo:10,hi:15,r:90,inc:5,k:['Rodillo a la altura de los tobillos','Rodillas alineadas con el eje de la máquina','Caderas pegadas al banco','Talones hacia los glúteos','Baja lento hasta extender']},
 rumano:{n:'Peso muerto rumano',g:'Pierna',s:3,lo:8,hi:12,r:150,inc:2.5,tip:'Bisagra de cadera: la espalda no se redondea',k:['Barra o mancuernas pegadas a las piernas','Rodillas ligeramente flexionadas y fijas','Lleva la cadera atrás, no hacia abajo','Espalda neutra en todo el recorrido','Baja hasta notar tensión en los isquios','Sube apretando glúteos, sin hiperextender']},
 gemelo:{n:'Elevación de gemelos',g:'Pierna',s:3,lo:10,hi:15,r:75,inc:5,k:['Punta del pie en el borde de la plataforma','Baja del todo para estirar','Sube a puntillas y aguanta un segundo','Sin rebote abajo']},
 // ── GLÚTEO
 hipth:{n:'Hip thrust',g:'Glúteo',s:3,lo:8,hi:12,r:150,inc:5,tip:'Máquina si la hay; con barra usa almohadilla',k:['Escápulas en el banco, nunca el cuello','Pies a la anchura de caderas','Costillas abajo y core activo','Empuja con los talones','Extiende hasta alinear hombros, cadera y rodillas','No hiperextiendas la lumbar arriba']},
 puente:{n:'Puente de glúteo a una pierna',g:'Glúteo',s:3,lo:10,hi:14,r:75,inc:5,side:1,opt:1,prog:'Añade un <b>disco sobre la cadera</b> y vuelve al extremo bajo del rango.',tip:'Sin peso hasta llegar al tope del rango en todas las series',k:['Un solo pie apoyado, talón cerca del glúteo','La otra pierna extendida y estable','Pelvis neutra: no gires la cadera','Empuja con el talón','Caderas niveladas arriba','Baja lento sin perder tensión']},
 kickb:{n:'Patada de glúteo en polea',g:'Glúteo',s:3,lo:12,hi:15,r:75,inc:5,side:1,k:['Sujétate para el equilibrio','Pelvis estable: no la gires','Patada atrás hasta alinear pierna y tronco','Aprieta el glúteo sin arquear la espalda','Regresa controlando']},
 abduc:{n:'Abducción de cadera en máquina',g:'Glúteo',s:3,lo:12,hi:16,r:75,inc:5,k:['Espalda apoyada o tronco algo inclinado adelante','Separa las rodillas con control','Aguanta un segundo fuera','Vuelta lenta y sin rebote']},
 // ── PECHO
 banca:{n:'Press banca con barra',g:'Pecho',s:4,lo:6,hi:10,r:180,inc:2.5,tip:'Usa topes o un compañero que te asista',k:['Ojos bajo la barra, escápulas juntas y abajo','Pies firmes en el suelo','Agarre algo más ancho que los hombros','Baja la barra a la parte baja del pecho','Codos a 45-70° del torso','Empuja hacia arriba y algo hacia atrás']},
 pressmanc:{n:'Press inclinado con mancuernas',g:'Pecho',s:3,lo:8,hi:12,r:150,inc:2,k:['Banco a 30-45°','Escápulas retraídas','Baja hasta notar estiramiento en el pecho','Muñecas encima de los codos','Sube juntando ligeramente las mancuernas']},
 pressp:{n:'Press de pecho en máquina',g:'Pecho',s:3,lo:10,hi:14,r:120,inc:5,k:['Asas a la altura del pecho','Toda la espalda apoyada','Escápulas retraídas y fijas','Codos a 45-60° del torso','Extiende sin bloquear los codos']},
 aperturas:{n:'Aperturas en máquina o polea',g:'Pecho',s:3,lo:12,hi:15,r:90,inc:5,k:['Codos ligeramente flexionados y fijos','Pecho abierto, hombros abajo','Abre hasta notar estiramiento','Cierra apretando el pecho, no los brazos']},
 flexiones:{n:'Flexiones',g:'Pecho',s:3,lo:8,hi:15,r:90,inc:0,bw:1,prog:'Haz más lento el descenso, eleva los pies o añade un chaleco.',tip:'Si no salen, apoya las manos en un banco',k:['Manos algo más anchas que los hombros','Cuerpo en línea de hombros a talones','Codos a unos 45° del torso','Baja hasta casi tocar el suelo con el pecho','No dejes caer la cadera']},
 // ── ESPALDA
 dominadas:{n:'Dominadas (o asistidas)',g:'Espalda',s:3,lo:6,hi:10,r:150,inc:0,bw:1,prog:'Reduce la asistencia o añade lastre.',k:['Agarre algo más ancho que los hombros','Hombros abajo antes de tirar','Lleva el pecho hacia la barra','Sin balanceo','Baja hasta extender casi del todo']},
 jalon:{n:'Jalón al pecho',g:'Espalda',s:3,lo:10,hi:14,r:120,inc:5,k:['Muslos bien fijados','Pecho alto y hombros abajo','Tira a la altura de la clavícula','Codos abajo y hacia atrás','Nunca detrás de la cabeza']},
 remobarra:{n:'Remo con barra',g:'Espalda',s:3,lo:8,hi:12,r:150,inc:2.5,k:['Bisagra de cadera, espalda neutra','Tronco a unos 45°','Tira de la barra hacia el ombligo','Codos cerca del torso','Baja sin redondear la espalda']},
 remo:{n:'Remo en máquina',g:'Espalda',s:3,lo:10,hi:14,r:120,inc:5,k:['Pecho apoyado o alto','Tira las manillas al abdomen','Codos cerca del torso y hacia atrás','Junta escápulas sin encoger los hombros','No redondees la espalda']},
 remopolea:{n:'Remo en polea baja',g:'Espalda',s:3,lo:10,hi:14,r:120,inc:5,k:['Rodillas algo flexionadas','Tronco quieto, sin balancearte','Tira hacia el abdomen','Junta las escápulas al final','Estira los brazos sin redondear la espalda']},
 remomanc:{n:'Remo con mancuerna a una mano',g:'Espalda',s:3,lo:10,hi:12,r:90,inc:2,side:1,k:['Mano y rodilla apoyadas en el banco','Espalda plana','Tira la mancuerna hacia la cadera','Codo pegado al cuerpo','Baja estirando sin girar el tronco']},
 facepull:{n:'Face pull en polea',g:'Espalda',s:3,lo:12,hi:15,r:75,inc:5,k:['Polea a la altura de la cara','Tira de la cuerda hacia la frente','Separa las manos al final','Codos altos','Vuelta controlada']},
 // ── HOMBRO
 militar:{n:'Press militar',g:'Hombro',s:3,lo:6,hi:10,r:150,inc:2.5,k:['De pie o sentado con respaldo','Glúteos y abdomen apretados','Barra o mancuernas a la altura de la clavícula','Empuja en vertical, la cabeza pasa por debajo','No arquees la lumbar']},
 pressh:{n:'Press de hombro en máquina',g:'Hombro',s:3,lo:10,hi:12,r:120,inc:5,k:['Asiento: asas a la altura de los hombros','Espalda apoyada','Empuja sin bloquear los codos','Baja controlando']},
 laterales:{n:'Elevaciones laterales',g:'Hombro',s:3,lo:12,hi:16,r:75,inc:1,k:['Codos ligeramente flexionados','Eleva hasta la altura del hombro','No eleves los hombros hacia las orejas','Sin impulso ni balanceo','Baja lento']},
 // ── BRAZOS
 curl:{n:'Curl de bíceps',g:'Brazos',s:3,lo:10,hi:14,r:75,inc:1,k:['Codos pegados al cuerpo','Sube sin balancear el tronco','Aprieta arriba','Baja lento hasta extender']},
 triceps:{n:'Extensión de tríceps en polea',g:'Brazos',s:3,lo:10,hi:14,r:75,inc:2.5,k:['Codos pegados al costado','Solo se mueve el antebrazo','Extiende del todo abajo','Vuelve sin despegar los codos']},
 // ── CORE
 plancha:{n:'Plancha',g:'Core',s:3,lo:30,hi:45,r:75,inc:0,seg:1,bw:1,prog:'Sube la dificultad: eleva un pie o alarga la palanca.',k:['Codos justo bajo los hombros','Cuerpo en línea de hombros a talones','Aprieta abdomen y glúteos','Pelvis neutra: ni hundir ni arquear','Respiración constante']},
 plancL:{n:'Plancha lateral',g:'Core',s:3,lo:20,hi:35,r:60,inc:0,seg:1,side:1,bw:1,prog:'Pies apilados o eleva el brazo libre.',k:['Codo justo bajo el hombro','Eleva la cadera hasta alinear cabeza, tronco y pies','Aprieta los glúteos','No dejes caer la pelvis']},
 crunchpol:{n:'Crunch en polea alta',g:'Core',s:3,lo:12,hi:16,r:75,inc:5,k:['Arrodillado, cuerda junto a la cabeza','Caderas fijas: no te sientes hacia atrás','El movimiento sale del tronco, no de los brazos','Lleva el esternón hacia el pubis','Exhala al contraer']},
 elevp:{n:'Elevación de piernas colgado',g:'Core',s:3,lo:10,hi:14,r:75,inc:0,bw:1,prog:'Estira más las piernas o baja más lento.',k:['Hombros activos, deprimidos','Sube con el abdomen: la pelvis bascula arriba','Sin balanceo ni impulso','Baja lento y controlado']},
 deadbug:{n:'Dead bug',g:'Core',s:3,lo:8,hi:12,r:60,inc:0,bw:1,side:1,prog:'Hazlo más lento o con brazos y piernas más extendidos.',k:['Lumbar pegada al suelo todo el rato','Brazo y pierna contrarios a la vez','Exhala al extender','Si la lumbar se despega, acorta el recorrido']},
 // ── CARDIO
 cardio:{n:'Cardio continuo',g:'Cardio',s:1,lo:20,hi:20,r:0,inc:0,seg:1,min:1,spd:1,tip:'Progresa en velocidad, no en minutos',k:['Ritmo constante y sostenible','Postura erguida y core activo','No te apoyes en las barras','Si no puedes hablar, baja la intensidad']},
 // ── ATLÉTICOS (fuerza útil para cualquier deporte)
 stepup:{n:'Subida al banco (step-up)',g:'Pierna',s:3,lo:8,hi:12,r:90,inc:2,side:1,k:['Banco a la altura de la rodilla o algo menos','Todo el pie apoyado arriba','Sube empujando con la pierna de arriba, no impulsándote con la de abajo','Rodilla en línea con el pie','Baja lento y controlado']},
 salto:{n:'Salto al cajón',g:'Pierna',s:3,lo:4,hi:6,r:90,inc:0,bw:1,prog:'Sube la altura del cajón poco a poco, sin perder un aterrizaje suave.',tip:'Calidad, no cansancio: para antes de que el salto pierda altura',k:['Cajón bajo para empezar','Brazos atrás y salta extendiendo cadera y rodillas','Aterriza suave, con las rodillas en línea con los pies','Baja del cajón andando, no saltando','Descansa lo necesario: cada salto debe ser explosivo']},
 swing:{n:'Swing con kettlebell',g:'Glúteo',s:3,lo:12,hi:15,r:90,inc:4,tip:'Es un movimiento de cadera, no una sentadilla',k:['Pies algo más anchos que la cadera','Bisagra de cadera: la kettlebell pasa entre las piernas','Golpe de cadera y glúteos para proyectarla','Los brazos solo guían, no levantan','Arriba, cuerpo recto y abdomen firme','Espalda neutra en todo momento']},
 pallof:{n:'Press Pallof',g:'Core',s:3,lo:10,hi:12,r:60,inc:2.5,side:1,tip:'Core que resiste el giro: el tronco no debe rotar',k:['Polea a la altura del pecho, de lado a ella','Pies a la anchura de caderas, rodillas algo flexionadas','Agarre con las dos manos pegado al pecho','Extiende los brazos al frente sin dejar que el tronco gire','Aguanta 2 segundos y vuelve']},
 colgado:{n:'Colgarse de la barra',g:'Espalda',s:3,lo:20,hi:40,r:75,inc:0,seg:1,bw:1,prog:'Cuélgate de una mano o añade peso con un cinturón.',tip:'Agarre, hombros y espalda: muy útil para casi cualquier deporte',k:['Agarre completo, pulgar alrededor de la barra','Hombros activos: no te quedes colgado de las articulaciones','Cuerpo quieto, sin balanceo','Si molesta el hombro, apoya los pies y descarga peso']},
 cardiof:{n:'Cardio final',g:'Cardio',s:1,lo:10,hi:10,r:0,inc:0,seg:1,min:1,spd:1,tip:'Suave, para cerrar la sesión',k:['Ritmo cómodo','Puedes hablar con frases completas','Postura erguida']}
};
// imágenes disponibles en img/ (las que no existan se ocultan solas)
const IMG={plancha:'img/plancha.webp',femoral:'img/femoral.webp',elevp:'img/elevp.webp',jalon:'img/jalon.webp',pressp:'img/pressp.webp',plancL:'img/plancL.webp',hipth:'img/hipth.webp',prensa:'img/prensa.webp',puente:'img/puente.webp',remo:'img/remo.webp',kickb:'img/kickb.webp',cardio:'img/cardio25.webp',cardiof:'img/cardio25.webp',laterales:'img/latmanc.webp',crunchpol:'img/crunchpol.webp'};

/* ═════ PLANTILLAS ═════
   d: días [nombre, [ids]] · prio: qué días conservar primero si no caben todos · av: días de la semana sugeridos (0=D) */
const TPLS={
 ini3:{n:'Iniciación en máquinas',tag:'3 días · cuerpo completo',lvl:'Principiante',
  h:'Todo en máquinas guiadas: fácil de aprender y suave para muñecas y espalda. Buena opción si nunca has entrenado o vuelves de una pausa.',
  goals:['salud','grasa','musculo'],lv:['n0','n1'],av:[1,3,5],prio:[1,2,3],d:[
   ['Cuerpo completo A',['prensa','pressp','jalon','femoral','plancha']],
   ['Cuerpo completo B',['hack','remo','pressh','abduc','crunchpol']],
   ['Cuerpo completo C',['prensa','pressp','remopolea','extcuad','plancL','cardiof']]]},
 fb3:{n:'Cuerpo completo',tag:'3 días · peso libre',lvl:'Principiante-intermedio',
  h:'Los básicos con barra y mancuernas tres veces por semana. Mucha frecuencia por grupo muscular y sesiones de unos 60 min.',
  goals:['fuerza','musculo','salud'],lv:['n1','n2'],av:[1,3,5],prio:[1,2,3],d:[
   ['Fuerza A',['sentadilla','banca','remobarra','femoral','plancha']],
   ['Fuerza B',['rumano','militar','jalon','zancada','elevp']],
   ['Fuerza C',['goblet','pressmanc','remomanc','hipth','laterales','deadbug']]]},
 tpm4:{n:'Torso / Pierna en máquinas',tag:'4 días',lvl:'Cualquier nivel',
  h:'Cuatro días alternando tren superior e inferior, casi todo en máquinas. Volumen suficiente para ganar músculo, fácil de aprender y amable con las articulaciones.',
  goals:['musculo','salud','grasa'],lv:['n0','n1','n2'],av:[1,2,4,5],prio:[1,2,3,4],d:[
   ['Pierna A',['prensa','femoral','extcuad','abduc','gemelo']],
   ['Torso A',['pressp','jalon','pressh','remo','curl','triceps']],
   ['Pierna B',['hack','hipth','femoral','kickb','plancL']],
   ['Torso B',['aperturas','remopolea','laterales','facepull','crunchpol']]]},
 tp4:{n:'Torso / Pierna',tag:'4 días · peso libre',lvl:'Intermedio',
  h:'Alterna días de tren superior e inferior con los básicos de barra. Más volumen por sesión y más descanso para cada grupo.',
  goals:['fuerza','musculo'],lv:['n2'],av:[1,2,4,5],prio:[1,2,3,4],d:[
   ['Pierna A',['sentadilla','rumano','prensa','femoral','gemelo']],
   ['Torso A',['banca','remobarra','militar','jalon','curl','triceps']],
   ['Pierna B',['hipth','bulgara','extcuad','femoral','plancL']],
   ['Torso B',['pressmanc','dominadas','pressp','remopolea','laterales','facepull']]]},
 glu4:{n:'Glúteo y pierna',tag:'4 días',lvl:'Principiante-intermedio',
  h:'Prioriza glúteo y pierna sin olvidar el torso: dos días de tren inferior, uno de torso y core, y uno de cuerpo completo. Hip thrust dos veces por semana.',
  goals:['musculo','grasa'],lv:['n1','n2'],av:[1,2,4,5],prio:[1,2,4,3],d:[
   ['Pierna y glúteo',['hipth','prensa','bulgara','femoral','abduc']],
   ['Torso y core',['pressp','remo','jalon','laterales','crunchpol','plancha']],
   ['Glúteo y cardio',['puente','kickb','rumano','plancL','cardio']],
   ['Cuerpo completo',['hipth','goblet','remopolea','pressmanc','cardiof']]]},
 grasa4:{n:'Pérdida de grasa',tag:'4 días · fuerza + cardio',lvl:'Cualquier nivel',
  h:'Tres días de fuerza de cuerpo completo para conservar el músculo mientras pierdes grasa, y un día de cardio y core. Sesiones ágiles con un final de cardio suave.',
  goals:['grasa','salud'],lv:['n0','n1','n2'],av:[1,2,4,5],prio:[1,2,4,3],d:[
   ['Fuerza A',['goblet','pressp','remo','hipth','cardiof']],
   ['Fuerza B',['prensa','jalon','pressh','kickb','cardiof']],
   ['Cardio y core',[{id:'cardio',lo:30,hi:30},'plancha','pallof','deadbug','plancL']],
   ['Fuerza C',['hack','pressmanc','remopolea','femoral','laterales','cardiof']]]},
 atl3:{n:'Atlético',tag:'3 días · para tu deporte',lvl:'Principiante-intermedio',
  h:'Fuerza útil para cualquier deporte (pádel, fútbol, carrera, artes marciales…): potencia, trabajo a una pierna, cadera, core que resiste giros y agarre. Si ya entrenas tu deporte varios días, haz solo las dos primeras sesiones.',
  goals:['deporte','fuerza','salud'],lv:['n1','n2'],av:[1,3,5],prio:[1,2,3],d:[
   ['Potencia y fuerza',['salto','sentadilla','remomanc','pallof','colgado']],
   ['Cadera y una pierna',['swing','bulgara','pressmanc','dominadas','plancL']],
   ['Estabilidad',['stepup','rumano','militar','remopolea','deadbug']]]},
 fb2:{n:'Mínimo eficaz',tag:'2 días · cuerpo completo',lvl:'Cualquier nivel',
  h:'Para semanas con poco tiempo o como complemento de otro deporte. Dos sesiones bien hechas mantienen y mejoran la fuerza.',
  goals:['salud','deporte','fuerza'],lv:['n0','n1','n2'],av:[2,5],prio:[1,2],d:[
   ['Sesión A',['goblet','pressmanc','remo','femoral','plancha']],
   ['Sesión B',['rumano','pressh','jalon','zancada','crunchpol']]]}
};
/* recomienda según objetivo, experiencia y días disponibles */
function tplScore(k,p,nd){
  const t=TPLS[k],td=t.d.length;let sc=0;
  sc-=3*Math.abs(td-nd);if(td>nd)sc-=2;            // que quepa en los días que tienes
  const gi=(t.goals||[]).indexOf(p.goal);if(gi>=0)sc+=5-gi;   // el objetivo principal de la plantilla pesa más
  if(p.lvl&&t.lv)sc+=t.lv.includes(p.lvl)?3:-5;
  return sc;
}
function rankTpls(p,nd,withScore){
  p=p||{};nd=nd||((DB.cfg&&DB.cfg.avail)||[1,3,5]).length;
  const r=Object.keys(TPLS).map((k,i)=>({k,sc:tplScore(k,p,nd),i})).sort((a,b)=>b.sc-a.sc||a.i-b.i);
  return withScore?r:r.map(x=>x.k);
}
/* recomendada + "también encaja" si la segunda queda a 1 punto o menos */
function tplBadges(p,nd){
  const r=rankTpls(p,nd,true),o={};
  if(!p||!p.goal)return o;
  o[r[0].k]='rec';if(r[1]&&r[0].sc-r[1].sc<=1)o[r[1].k]='also';
  return o;
}
const TYPES={
 peso:{n:'Con carga (kg)',d:{s:3,lo:8,hi:12,r:120,inc:2.5}},
 corporal:{n:'Peso corporal (reps)',d:{s:3,lo:8,hi:15,r:90,inc:0,bw:1}},
 tiempo:{n:'Por tiempo (segundos)',d:{s:3,lo:20,hi:40,r:60,inc:0,seg:1,bw:1}},
 cardio:{n:'Cardio (minutos)',d:{s:1,lo:20,hi:20,r:0,inc:0,seg:1,min:1,spd:1}}
};
const EDITABLE=['s','lo','hi','r','side'];   // Tsuyo: «side» permite hacer por lados un ejercicio del catálogo

function exBase(id){return EXC[id]||(DB.cex||{})[id]||null}
function exResolve(ref){
  const b=exBase(ref.id);if(!b)return null;
  const o=Object.assign({},b,{id:ref.id});
  EDITABLE.forEach(k=>{if(ref[k]!=null)o[k]=ref[k]});
  const mi=(DB.inc||{})[ref.id];if(mi&&o.inc>0&&!o.bw)o.inc=mi;   // salto real de la máquina/discos del usuario
  if(o.lo>o.hi)o.hi=o.lo;
  return o;
}
function exName(id){const b=exBase(id);return b?b.n:id}
function planFromTpl(key){
  const t=TPLS[key];
  return{src:key,prio:t.prio.slice(),days:t.d.map(([n,ids])=>({n,ex:ids.map(x=>typeof x==='string'?{id:x}:Object.assign({},x))}))};
}
const INC_OPTS=[0.5,1,1.25,2,2.5,3,4,5,6,7,7.5,8,10,12.5,15,20];
let PLAN={};
function buildPlan(){
  PLAN={};
  (DB.plan?.days||[]).forEach((d,i)=>{PLAN[i+1]={n:d.n||('Día '+(i+1)),ex:(d.ex||[]).map(exResolve).filter(Boolean)}});
}
const dayKeys=()=>Object.keys(PLAN).map(Number);
const validDay=n=>(n&&PLAN[n])?n:0;
function prioDays(){
  const ks=dayKeys(),p=(DB.plan?.prio||[]).filter(d=>ks.includes(d));
  return p.concat(ks.filter(d=>!p.includes(d)));
}

const WDL=['D','L','M','X','J','V','S'];
const dstr=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const shiftD=(s,n)=>{const d=new Date(s+'T00:00:00');d.setDate(d.getDate()+n);return dstr(d)};
const wdOf=s=>new Date(s+'T00:00:00').getDay();
function overlapDays(a,b){if(!PLAN[a]||!PLAN[b])return 0;const A=new Set(PLAN[a].ex.map(e=>e.id));return PLAN[b].ex.filter(e=>A.has(e.id)).length}
function weekDates(){
  const d=new Date(T()+'T00:00:00');d.setDate(d.getDate()-((d.getDay()+6)%7));
  const ws=dstr(d);return Array.from({length:7},(_,i)=>shiftD(ws,i));
}
function sessDone(dt){
  const s=DB.sess[dt];
  return !!(s&&s.day&&Object.values(s.ex||{}).some(a=>a.some(x=>x&&x.r)));
}
function planWeek(){
  const week=weekDates(),hoy=T(),skips=DB.skips||{},av=DB.cfg.avail||[1,3,5];
  const map={};week.forEach(dt=>{if(sessDone(dt))map[dt]=DB.sess[dt].day});
  const done=Object.values(map);
  const pend=dayKeys().filter(d=>!PLAN[d].ex.length?false:!done.includes(d));
  const free=week.filter(dt=>dt>=hoy&&av.includes(wdOf(dt))&&!map[dt]&&!skips[dt]);
  const sched={},placed=[];
  // la prioridad decide QUÉ entra si no cabe todo; el orden natural decide CUÁNDO
  const keep=prioDays().filter(d=>pend.includes(d)).slice(0,free.length).sort((a,b)=>a-b);
  keep.forEach(d=>{
    let spot=null;
    for(const dt of free){
      if(sched[dt])continue;
      const pb=map[shiftD(dt,-1)]||sched[shiftD(dt,-1)];
      const pa=map[shiftD(dt,1)]||sched[shiftD(dt,1)];
      if((pb&&overlapDays(pb,d)>=2)||(pa&&overlapDays(pa,d)>=2))continue;
      spot=dt;break;
    }
    if(!spot)for(const dt of free){if(!sched[dt]){spot=dt;break}}
    if(spot){sched[spot]=d;placed.push(d)}
  });
  return {week,map,sched,pend,noFit:pend.filter(d=>!placed.includes(d)),free,skips};
}
function todayDay(){
  if(DB.cfg.force!=null)return validDay(DB.cfg.force);
  const P=planWeek();return validDay(P.map[T()]||P.sched[T()]||0);
}
function skipToday(){
  const P=planWeek(),d=P.sched[T()];
  if(!d){toast('Hoy no hay sesión asignada');return}
  DB.skips=DB.skips||{};DB.skips[T()]=d;DB.cfg.force=null;save();renderHoy();
  const Q=planWeek(),nx=Object.keys(Q.sched).find(k=>Q.sched[k]===d);
  toast(nx?'Día '+d+' movido a '+WDL[wdOf(nx)]+' '+nx.slice(8):'Día '+d+' no cabe esta semana');
}
function unskipToday(){
  if(DB.skips)delete DB.skips[T()];
  save();renderHoy();toast('Marca retirada');
}

function freshDB(){return{v:2,_ts:0,profile:{},plan:null,cex:{},inc:{},sess:{},skips:{},supp:{},diet:{},bodyEnc:null,cfg:{
  start:'',k:2000,p:120,f:65,c:220,avail:[1,3,5],force:null,mods:{diet:false,body:false},supps:[]
}}}
function mergeDefaults(o){
  const d=freshDB();o=o||{};
  const r=Object.assign(d,o);
  r.cfg=Object.assign(freshDB().cfg,o.cfg||{});
  r.cfg.mods=Object.assign({diet:false,body:false},(o.cfg||{}).mods||{});
  ['cex','inc','sess','skips','supp','diet','profile'].forEach(k=>{if(!r[k]||typeof r[k]!=='object')r[k]={}});
  delete r.body;                                  // las medidas nunca viajan en claro
  return sanitizeDB(r);
}
/* Todo lo que entra (copia local, nube o archivo importado) se valida campo a campo:
   solo pasan números donde van números y textos limpios donde van textos. Evita inyección de código
   a través de un archivo de rutina compartido y protege de datos corruptos. */
const RX_ID=/^[A-Za-z0-9_-]{1,40}$/,RX_DATE=/^\d{4}-\d{2}-\d{2}$/,RX_B64=/^[A-Za-z0-9+/=]{0,3000000}$/;
const sNum=(v,min,max)=>{const n=typeof v==='number'?v:parseFloat(v);return isFinite(n)?Math.min(max,Math.max(min,n)):undefined};
const sStr=(v,max)=>String(v==null?'':v).replace(/[<>"'&\\`]/g,'').trim().slice(0,max);
const isObj=o=>o&&typeof o==='object'&&!Array.isArray(o);
function sanitizeDB(r){
  const out={v:2,_ts:sNum(r._ts,0,9e15)||0};if(r._dirty)out._dirty=true;
  // perfil
  const pf=isObj(r.profile)?r.profile:{};out.profile={};
  if(pf.name)out.profile.name=sStr(pf.name,30);
  if(['m','f','x'].includes(pf.sex))out.profile.sex=pf.sex;
  const h=sNum(pf.h,120,230);if(h)out.profile.h=Math.round(h);
  if(['grasa','musculo','fuerza','salud','deporte'].includes(pf.goal))out.profile.goal=pf.goal;
  if(['n0','n1','n2'].includes(pf.lvl))out.profile.lvl=pf.lvl;
  if(pf.done)out.profile.done=1;
  if(isObj(pf.deshi)&&window.Deshi)out.profile.deshi=Deshi.cleanLook(pf.deshi);
  // rutina
  out.plan=null;
  if(isObj(r.plan)&&Array.isArray(r.plan.days)){
    const days=r.plan.days.slice(0,6).filter(isObj).map((d,i)=>({n:sStr(d.n,40)||('Día '+(i+1)),
      ex:(Array.isArray(d.ex)?d.ex:[]).filter(x=>isObj(x)&&RX_ID.test(x.id)).slice(0,25).map(x=>{
        const o={id:x.id};[['s',1,10],['lo',1,999],['hi',1,999],['r',0,600],['side',0,1]].forEach(([k,a,b])=>{const v=sNum(x[k],a,b);if(v!=null)o[k]=Math.round(v)});return o})}));
    if(days.length)out.plan={src:sStr(r.plan.src,20).replace(/[^a-z0-9_]/gi,'')||'custom',edited:!!r.plan.edited,
      prio:(Array.isArray(r.plan.prio)?r.plan.prio:[]).map(Number).filter(n=>n>=1&&n<=days.length),days};
  }
  // ejercicios propios
  out.cex={};
  if(isObj(r.cex))Object.entries(r.cex).slice(0,200).forEach(([id,e])=>{
    if(!RX_ID.test(id)||!isObj(e))return;
    const t=TYPES[e.t]?e.t:'peso',o=Object.assign({},TYPES[t].d,{n:sStr(e.n,60)||'Ejercicio',g:GROUPS.includes(e.g)?e.g:'Core',t,
      k:(Array.isArray(e.k)?e.k:[]).map(x=>sStr(x,140)).filter(Boolean).slice(0,12)});
    [['s',1,10],['lo',1,999],['hi',1,999],['r',0,600],['inc',0,50]].forEach(([k,a,b])=>{const v=sNum(e[k],a,b);if(v!=null)o[k]=v});
    if(e.side)o.side=1;if(e.del)o.del=1;out.cex[id]=o;
  });
  // salto de peso por ejercicio (lo que permite la máquina o los discos de su gimnasio)
  out.inc={};
  if(isObj(r.inc))Object.entries(r.inc).slice(0,300).forEach(([id,v])=>{const n=sNum(v,0.5,50);if(RX_ID.test(id)&&n)out.inc[id]=n});
  // sesiones
  out.sess={};
  if(isObj(r.sess))Object.entries(r.sess).forEach(([d,x])=>{
    if(!RX_DATE.test(d)||!isObj(x))return;
    const o={day:Math.round(sNum(x.day,0,6)||0),ex:{}};const du=sNum(x.dur,0,1440);if(du!=null)o.dur=Math.round(du);
    if(isObj(x.ex))Object.entries(x.ex).forEach(([id,sets])=>{
      if(!RX_ID.test(id)||!Array.isArray(sets))return;
      o.ex[id]=sets.slice(0,40).map(q=>{if(!isObj(q))return null;const z={};
        [['w',0,1000],['r',0,10000],['rir',0,10],['sp',0,50]].forEach(([k,a,b])=>{const v=sNum(q[k],a,b);if(v!=null)z[k]=v});return z});
    });
    out.sess[d]=o;
  });
  // saltos, suplementos marcados, dieta
  out.skips={};if(isObj(r.skips))Object.entries(r.skips).forEach(([d,v])=>{const n=sNum(v,1,6);if(RX_DATE.test(d)&&n)out.skips[d]=Math.round(n)});
  out.supp={};if(isObj(r.supp))Object.entries(r.supp).forEach(([d,v])=>{if(!RX_DATE.test(d)||!isObj(v))return;out.supp[d]={};
    Object.entries(v).forEach(([id,on])=>{if(RX_ID.test(id)&&on)out.supp[d][id]=true})});
  out.diet={};if(isObj(r.diet))Object.entries(r.diet).forEach(([d,v])=>{if(!RX_DATE.test(d)||!isObj(v))return;
    out.diet[d]={items:(Array.isArray(v.items)?v.items:[]).filter(isObj).slice(0,200).map(x=>({n:sStr(x.n,60)||'Alimento',k:sNum(x.k,0,10000)||0,p:sNum(x.p,0,1000)||0}))}});
  // medidas cifradas: solo base64
  const E=r.bodyEnc;out.bodyEnc=null;
  if(isObj(E)&&RX_B64.test(E.salt||'')&&RX_B64.test(E.iv||'')&&RX_B64.test(E.ct||''))
    out.bodyEnc={v:1,salt:E.salt,iter:Math.round(sNum(E.iter,100000,5000000)||310000),iv:E.iv,ct:E.ct};
  else if(isObj(E)&&RX_B64.test(E.salt||'')&&!E.ct)out.bodyEnc={v:1,salt:E.salt,iter:Math.round(sNum(E.iter,100000,5000000)||310000)};
  // ajustes
  const c=isObj(r.cfg)?r.cfg:{},f=freshDB().cfg;
  out.cfg={start:RX_DATE.test(c.start)?c.start:'',
    k:sNum(c.k,0,10000)??f.k,p:sNum(c.p,0,1000)??f.p,f:sNum(c.f,0,1000)??f.f,c:sNum(c.c,0,2000)??f.c,
    avail:(Array.isArray(c.avail)?c.avail:f.avail).map(Number).filter((n,i,a)=>n>=0&&n<=6&&Number.isInteger(n)&&a.indexOf(n)===i),
    force:c.force==null?null:Math.round(sNum(c.force,0,6)||0),
    mods:{diet:!!(c.mods&&c.mods.diet),body:!!(c.mods&&c.mods.body)},
    supps:(Array.isArray(c.supps)?c.supps:[]).filter(x=>isObj(x)&&RX_ID.test(x.id)).slice(0,30).map(x=>({id:x.id,t:sStr(x.t,40)||'Suplemento',s:sStr(x.s,60)})),
    tour:c.tour?1:0};
  if(!out.cfg.avail.length)out.cfg.avail=f.avail.slice();
  return out;
}
let DB=freshDB();
function load(){
  DB=freshDB();
  try{const r=S.get(uKey());if(r)DB=mergeDefaults(JSON.parse(r))}catch(e){}
}
function writeLocal(){try{S.set(uKey(),JSON.stringify(DB))}catch(e){}}
function save(){DB._ts=Date.now();DB._dirty=true;writeLocal();schedulePush()}
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const T=()=>today();

function weekNo(){
  if(!DB.cfg.start)return null;
  const s=new Date(DB.cfg.start+'T00:00:00'),n=new Date(T()+'T00:00:00');
  return Math.floor((n-s)/864e5/7)+1;
}
function wkOfDate(dt){
  if(!DB.cfg.start)return null;
  return Math.floor((new Date(dt+'T00:00:00')-new Date(DB.cfg.start+'T00:00:00'))/864e5/7)+1;
}
function isDeloadDate(dt){const w=wkOfDate(dt);return !!(w&&w>0&&((w-1)%12)+1===11)}
function blockInfo(){
  const w=weekNo();if(!w||w<1)return null;
  return{w,b:Math.floor((w-1)/12)+1,bw:((w-1)%12)+1};
}
function weekStartDate(w){return shiftD(DB.cfg.start,(w-1)*7)}
function phaseOf(b,bw){
  if(bw===11)return{k:'dl',n:'Semana ligera',h:'Mismos ejercicios y series al 60-70% del peso, RIR 4. La app ya te propone los pesos reducidos.'};
  if(bw===12)return{k:'rev',n:'Revisión',h:'Repasa tus récords en Progreso y decide qué 1–2 ejercicios cambiar para el siguiente bloque.'};
  if(b===1&&bw<=3)return{k:'learn',n:'Aprendizaje',h:'Técnica primero. Pesos conservadores, RIR 3-4.'};
  if(b>1&&bw===1)return{k:'learn',n:'Reentrada',h:'Vuelves de la semana ligera: recupera tus pesos a RIR 3.'};
  if(bw>=9)return{k:'slow',n:'Se frena',h:'Normal que cueste sumar. Mantener peso y reps ya es buen resultado.'};
  return{k:'prog',n:'Progresión',h:'Sube en cuanto llegues al tope del rango en todas las series.'};
}
function rirTarget(){
  const B=blockInfo();
  if(!B)return{r:'RIR 2',note:''};
  if(B.bw===11)return{r:'Semana ligera',note:'60-70% del peso, RIR 4'};
  if(B.b===1&&B.bw<=3)return{r:'RIR 3–4',note:'aprendiendo técnica'};
  if(B.b>1&&B.bw===1)return{r:'RIR 3',note:'reentrada'};
  return{r:'RIR 2',note:B.bw===12?'semana de revisión':''};
}

const nSteps=e=>e.s*(e.side?2:1);
const sideOf=(e,i)=>e.side?(i%2?'derecha':'izquierda'):'';
const setNo=(e,i)=>e.side?Math.floor(i/2)+1:i+1;

const fmtD=d=>{
  const [y,m,dd]=d.split('-');
  const ms=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  return parseInt(dd)+' '+ms[parseInt(m)-1];
};

function lastFor(id){
  const ks=Object.keys(DB.sess).sort().reverse();
  const hit=k=>{const s=DB.sess[k]?.ex?.[id];return(s&&s.some(x=>x&&x.r))?{d:k,sets:s}:null};
  // la referencia de progresión es la última sesión normal, no la de semana ligera
  for(const k of ks){if(k===curDate||isDeloadDate(k))continue;const r=hit(k);if(r)return r}
  for(const k of ks){if(k===curDate)continue;const r=hit(k);if(r)return r}
  return null;
}
/* repeticiones de la última vez; en ejercicios por lados se agrupan izquierda/derecha para no parecer el doble de series */
function repsTxt(e,sets){
  const d=(sets||[]).filter(x=>x&&x.r);if(!e.side)return d.map(x=>x.r).join(', ');
  const pr=[];for(let i=0;i<sets.length;i+=2){const a=sets[i]&&sets[i].r,b=sets[i+1]&&sets[i+1].r;if(a||b)pr.push([a||0,b||0])}
  if(pr.length&&pr.every(p=>p[0]===pr[0][0]&&p[1]===pr[0][0]))return pr[0][0]+' por lado'+(pr.length>1?' en las '+pr.length+' series':'');
  return pr.map(p=>p[0]+'/'+p[1]).join(', ')+' (izq./dcha.)';
}
/* peso que existe en la máquina: múltiplo del salto (placa 6 → 6, 12, 18…) */
const r2=x=>Math.round(x*100)/100;
function snapW(w,inc){if(!(inc>0)||!(w>0))return w;return r2(Math.max(inc,Math.round(w/inc)*inc))}
const offStep=(w,inc)=>inc>0&&w>0&&Math.abs(w/inc-Math.round(w/inc))>1e-6;
function advise(e){
  const L=lastFor(e.id);
  const u=e.seg?(e.min?'min':'seg'):'reps';
  if(!L)return{txt:e.spd?'Primera vez. Ritmo conversacional, RPE 5. Anota la velocidad.':(e.bw?'Primera vez. Haz '+e.lo+' repeticiones controladas y anota cuántas te salen limpias.':'Primera vez. Elige un peso con el que llegues a '+e.lo+' '+u+' a RIR 3.'),up:false,w:''};
  const done=L.sets.filter(x=>x&&x.r);
  const mx=Math.max(...done.map(x=>x.w||0));
  const allTop=done.length>=nSteps(e)&&done.every(x=>x.r>=e.hi);
  const Bd=blockInfo();
  if(Bd&&Bd.bw===11){
    if(e.spd)return{txt:'<b>Semana ligera.</b> Mismo tiempo a ritmo cómodo, RPE 4.',up:false,w:''};
    if(e.seg)return{txt:'<b>Semana ligera.</b> Unos 2/3 del tiempo habitual, lejos del límite.',up:false,w:''};
    if(e.bw||!e.inc||!mx)return{txt:'<b>Semana ligera.</b> Unas 2/3 de tus repeticiones habituales, RIR 4.',up:false,w:''};
    const lw=Math.max(e.inc,Math.round(mx*0.65/e.inc)*e.inc);
    return{txt:'<b>Semana ligera.</b> Usa <b>'+lw+' kg</b> (≈'+Math.round(lw/mx*100)+'% de '+mx+'), mismas series, RIR 4.',up:false,w:lw};
  }
  if(e.spd){
    const sp=done.map(x=>x.sp).filter(x=>x);
    if(!sp.length)return{txt:'Última vez: '+repsTxt(e,L.sets)+' min. Anota la velocidad para poder progresar.',up:false,w:''};
    return{txt:'Última vez '+Math.max(...sp)+' km/h durante '+done[0].r+' min. <b>Sube la velocidad, no los minutos.</b>',up:false,w:''};
  }
  if(e.bw){
    if(allTop)return{txt:'Techo alcanzado. '+(e.prog||'Sube la dificultad del movimiento.'),up:true,w:''};
    return{txt:'Última vez: '+repsTxt(e,L.sets)+(e.seg?' '+(e.min?'min':'s')+'. Aguanta un poco más cada vez hasta '+e.hi+' '+(e.min?'min':'s')+(e.side?' por lado':'')+' en todas las series.':'. Peso corporal — suma repeticiones.'),up:false,w:''};
  }
  if(e.opt&&!mx){
    if(allTop)return{txt:'Techo alcanzado. '+e.prog,up:true,w:e.inc};
    return{txt:'Última vez sin peso → '+repsTxt(e,L.sets)+'. <b>Sin disco</b>: suma repeticiones hasta '+e.hi+(e.side?' por lado':'')+'.',up:false,w:''};
  }
  if(allTop&&e.inc>0){const nw=snapW(mx+e.inc,e.inc);return{txt:'Techo alcanzado. Sube a <b>'+nw+' kg</b> y vuelve a '+e.lo+' '+u+'.',up:true,w:nw}}
  if(e.inc===0)return{txt:'Última vez: '+repsTxt(e,L.sets)+'. Suma '+(e.seg?(e.min?'minutos':'segundos'):'repeticiones')+'.',up:false,w:''};
  if(offStep(mx,e.inc)){const nw=snapW(mx,e.inc);return{txt:'Última vez '+mx+' kg → '+repsTxt(e,L.sets)+'. Tu máquina va de '+String(e.inc).replace('.',',')+' en '+String(e.inc).replace('.',',')+': ponte en <b>'+nw+' kg</b> y suma '+u+'.',up:false,w:nw}}
  return{txt:'Última vez '+mx+' kg → '+repsTxt(e,L.sets)+'. Mantén peso y suma '+u+'.',up:false,w:mx};
}

function prData(){
  const R={};
  Object.keys(DB.sess).sort().forEach(d=>{
    Object.entries(DB.sess[d].ex||{}).forEach(([id,sets])=>{
      const e=exBase(id);if(!e)return;
      (sets||[]).forEach(q=>{
        if(!q||!q.r)return;
        let v,lbl;
        if(e.spd){if(!q.sp)return;v=q.sp;lbl=q.sp+' km/h'}
        else if(e.seg){v=q.r;lbl=q.r+' s'}
        else if(e.bw||!q.w){v=q.r;lbl=q.r+' reps'}
        else{v=q.w*1000+q.r;lbl=q.w+' kg × '+q.r}
        if(!R[id]||v>R[id].v)R[id]={v,lbl,d};
      });
    });
  });
  return R;
}

const GOALS={
 grasa:{n:'Perder grasa',s:'Bajar % de grasa manteniendo el músculo',tips:[
  'Prioriza la fuerza: mantener tus pesos mientras comes algo menos es lo que protege el músculo.',
  'La cintura y la tendencia de varias semanas dicen más que la báscula de un día.',
  'Pierde como mucho un 0,5–1 % de tu peso por semana. Más rápido suele costar músculo.',
  'Proteína alta (1,6–2,2 g por kg) y caminar a diario suman tanto como el cardio.']},
 musculo:{n:'Ganar músculo',s:'Aumentar masa muscular',tips:[
  'Busca sumar repeticiones o peso cada semana: es la señal de que estás creciendo.',
  'Come un poco por encima de lo que gastas: unas 200–300 kcal más al día.',
  'Proteína: 1,6–2,2 g por kg al día, repartida en 3–4 tomas.',
  'Duerme 7–9 horas: el músculo se construye descansando.']},
 fuerza:{n:'Ganar fuerza',s:'Mover más peso en los ejercicios básicos',tips:[
  'Los básicos mandan: sentadilla, press banca, peso muerto y press militar.',
  'Descansa 2,5–3 minutos en los pesados para rendir en cada serie.',
  'Sube poco a poco: 2,5 kg en un básico es mucho a medio plazo.',
  'Técnica antes que carga, y nunca al fallo en los básicos.']},
 salud:{n:'Salud y forma',s:'Moverme, sentirme bien y mantenerme',tips:[
  'La constancia gana: 2–3 sesiones por semana mantenidas durante meses.',
  'Combina la fuerza con algo de cardio suave.',
  'Si un día vas justo, haz una sesión corta antes que no hacer nada.',
  'Escucha a tus articulaciones: el dolor no es esfuerzo.']},
 deporte:{n:'Rendir en mi deporte',s:'Preparación física para tu deporte: pádel, fútbol, carrera, artes marciales…',tips:[
  'El gimnasio complementa a tu deporte, no lo sustituye: no llegues agotado a tus entrenos o partidos.',
  'Prioriza la fuerza de piernas, cadera y espalda, el trabajo a una pierna y un core que resista giros.',
  'Evita la sesión más dura de pierna justo antes de un entreno o partido exigente.',
  'Si ya entrenas tu deporte 3 o más días, dos sesiones de fuerza bien hechas suelen bastar.']}
};
const LEVELS={n0:{n:'Nunca he entrenado',s:'Empiezo de cero o casi'},n1:{n:'Menos de 1 año',s:'Conozco las máquinas y algún básico'},n2:{n:'Más de 1 año',s:'Entreno con regularidad'}};
const SEXES={m:'Hombre',f:'Mujer',x:'Prefiero no decirlo'};
