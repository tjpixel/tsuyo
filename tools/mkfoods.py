# Genera foods.js a partir de la tabla Ciqual 2025 (Anses, licencia abierta Etalab).
# CSV: https://raw.githubusercontent.com/openfoodfacts/openfoodfacts-server/main/external-data/ciqual/ciqual/CIQUAL2025_FR_2025_11_03.csv
# Uso: python3 tools/mkfoods.py CIQUAL2025_FR_2025_11_03.csv foods.js
import csv,re,sys,json
src=sys.argv[1];out=sys.argv[2]
rows=list(csv.reader(open(src,encoding='utf-8'),delimiter='\t'))
h=[re.sub(r'\s+',' ',x) for x in rows[0]]
col=lambda p:[i for i,x in enumerate(h) if x.startswith(p)][0]
K,P,C,F=10,14,16,17
by={r[6]:r for r in rows[1:]}
def num(v):
  v=v.strip()
  if v in('-',''):return None
  if v.startswith('<') or v=='traces':return 0.0
  return float(v.replace(',','.'))
# grupo, código, nombre, gramos por defecto, unidad (nombre, g por unidad) o None
G={'P':'Carne, pescado y huevos','L':'Lácteos','V':'Legumbres, soja y frutos secos','C':'Cereales, pan y patata','F':'Fruta','H':'Verdura','A':'Grasas y otros'}
SEL=[
('P',36017,'Pechuga de pollo, cruda',110,None),('P',36018,'Pechuga de pollo, a la plancha',100,None),
('P',36024,'Muslo de pollo sin piel, crudo',110,None),('P',36304,'Pechuga de pavo, cruda',110,None),
('P',6250,'Ternera picada 5 % de grasa, cruda',110,None),('P',6254,'Ternera picada 15 % de grasa, cruda',110,None),
('P',6206,'Filete de ternera (cadera), crudo',110,None),('P',28204,'Solomillo de cerdo, crudo',110,None),
('P',26044,'Merluza, cruda',135,None),('P',26043,'Bacalao fresco, crudo',135,None),('P',26036,'Salmón, crudo',135,None),
('P',26065,'Sardina, cruda',135,None),('P',10007,'Gambas, cocidas',135,None),
('P',26039,'Atún al natural, lata, escurrido',100,None),('P',26179,'Atún en aceite de oliva, escurrido',100,None),
('P',26040,'Sardinas en aceite de oliva, escurridas',100,None),
('P',22000,'Huevo',58,('huevo',58)),('P',22010,'Huevo duro',58,('huevo',58)),
('P',28900,'Jamón cocido',100,None),('P',28845,'Jamón serrano',100,None),
('L',19041,'Leche semidesnatada',225,('vaso',225)),('L',19050,'Leche desnatada',225,('vaso',225)),('L',19023,'Leche entera',225,('vaso',225)),
('L',19593,'Yogur natural',125,('yogur',125)),('L',19594,'Yogur natural desnatado',125,('yogur',125)),('L',19860,'Yogur griego natural',125,('yogur',125)),
('L',19724,'Yogur o postre lácteo alto en proteína, natural',125,('envase',125)),
('L',19644,'Queso fresco batido 0 %',100,None),('L',19590,'Mozzarella',100,None),
('L',12115,'Queso emmental',50,None),('L',12747,'Queso de oveja semicurado',50,None),
('V',20359,'Lentejas, en crudo',70,None),('V',20360,'Lentejas, cocidas',100,None),
('V',20516,'Garbanzos, en crudo',70,None),('V',20507,'Garbanzos, cocidos',100,None),('V',20503,'Alubias rojas, cocidas',100,None),
('V',25621,'Hummus',100,None),('V',20904,'Tofu',100,None),('V',25598,'Seitán',100,None),('V',20591,'Soja texturizada, rehidratada',100,None),
('V',15000,'Almendras',25,('puñado',25)),('V',15005,'Nueces',25,('puñado',25)),('V',15053,'Cacahuetes tostados sin sal',25,('puñado',25)),
('V',15202,'Crema de cacahuete',100,None),
('C',9100,'Arroz blanco, en crudo',70,None),('C',9104,'Arroz blanco, cocido',100,None),('C',9102,'Arroz integral, en crudo',70,None),
('C',9810,'Pasta, en crudo',70,None),('C',9811,'Pasta, cocida',100,None),('C',9870,'Pasta integral, en crudo',70,None),
('C',7001,'Pan blanco (barra)',50,None),('C',7110,'Pan integral',50,None),('C',7200,'Pan de molde blanco',50,None),('C',7111,'Pan de molde integral',50,None),
('C',32140,'Copos de avena',35,None),('C',32141,'Muesli',35,None),('C',7352,'Tortitas de arroz integral',100,None),
('C',9341,'Quinoa, cocida',100,None),('C',4003,'Patata, cocida',175,None),('C',4102,'Boniato, cocido',100,None),
('F',13005,'Plátano',160,None),('F',13039,'Manzana',160,None),('F',13034,'Naranja',160,None),('F',13024,'Mandarina',160,None),
('F',13037,'Pera',160,None),('F',13021,'Kiwi',160,None),('F',13014,'Fresas',160,None),
('H',20385,'Tomate, crudo',175,None),('H',20031,'Lechuga',175,None),('H',20057,'Brócoli, crudo',175,None),('H',20059,'Espinacas, crudas',175,None),
('H',20020,'Calabacín, crudo',175,None),('H',20041,'Pimiento, crudo',175,None),('H',20009,'Zanahoria, cruda',175,None),('H',20061,'Judías verdes, crudas',175,None),
('H',20034,'Cebolla, cruda',100,None),
('A',17270,'Aceite de oliva virgen extra',9,('cucharada',9)),('A',13004,'Aguacate',100,None),('A',31074,'Chocolate negro 70 %',100,None),
]
L=[]
for g,code,n,dg,u in SEL:
  r=by[str(code)];k,p,c,f=[num(r[i]) for i in (K,P,C,F)]
  assert k is not None and p is not None,(code,n)
  o=[code,n,g,round(k),round(p,1),round(c or 0,1),round(f or 0,1),dg]
  if u:o.append(list(u))
  L.append(o)
js='''/* Tsuyo · alimentos de la lista propia.
   Valores por 100 g de la tabla Ciqual 2025 (Anses, Francia), licencia abierta Etalab: [código Ciqual, nombre, grupo, kcal, proteína g, hidratos g, grasa g, gramos por defecto, unidad opcional].
   Proteína = N × factor de Jones; energía según el Reglamento (UE) 1169/2011. «Trazas» y «< x» cuentan como 0.
   Gramos por defecto: la ración de referencia de la SENC (peso en crudo) cuando el alimento está en esa forma; si no, 100 g.
   Generado con un script a partir de CIQUAL2025_FR_2025_11_03.csv: no editar a mano las cifras. */
'use strict';
const FOOD_GROUPS='''+json.dumps(G,ensure_ascii=False)+''';
const FOODS='''+json.dumps(L,ensure_ascii=False,separators=(',',':')).replace('],[','],\n[')+''';
'''
open(out,'w',encoding='utf-8').write(js)
print(len(L))
