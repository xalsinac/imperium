/**
 * Dataset curado de grandes imperios y dinastías de la historia.
 * Estructura pensada para ampliarse o editarse fácilmente.
 *
 * Campos:
 * - id: identificador único
 * - name: nombre en español
 * - startYear: año de inicio (negativo = a.C.)
 * - endYear: año de fin (negativo = a.C.)
 * - peakStart: año de inicio de la edad de oro
 * - peakEnd: año de fin de la edad de oro
 * - peakAreaKm2: extensión máxima aproximada en millones de km²
 * - government: 'absolute_monarchy' | 'constrained_monarchy' | 'feudal_monarchy' | 'autocracy' | 'stratocracy' | 'theocracy'
 * - collapse: 'external' | 'internal' | 'economics' | 'leadership' | 'overstretch' | 'mixed'
 * - capital: capital(es) principal(es)
 * - region: región geográfica
 * - summary: breve descripción histórica y causas de su caída
 * - isFiction: booleano opcional (para separar easter eggs de los datos reales)
 */

export const GOVERNMENT_TYPES = {
  absolute_monarchy: {
    label: 'Monarquía absoluta',
    group: 'Monarquía',
    color: '#8c6d1f',
    description: 'El monarca concentra el poder político sin límites legales o constitucionales.'
  },
  constrained_monarchy: {
    label: 'Monarquía limitada',
    group: 'Monarquía',
    color: '#2e6f40',
    description: 'El poder del monarca está acotado por parlamentos, cartas o instituciones.'
  },
  feudal_monarchy: {
    label: 'Monarquía feudal',
    group: 'Monarquía',
    color: '#b48a3e',
    description: 'Autoridad descentralizada basada en pactos de vasallaje y nobleza territorial.'
  },
  autocracy: {
    label: 'Autocracia',
    group: 'Autocracia',
    color: '#1b6b7a',
    description: 'Poder concentrado en un solo gobernante o aparato estatal centralizado.'
  },
  stratocracy: {
    label: 'Estratocracia',
    group: 'Estratocracia',
    color: '#a82c2c',
    description: 'Gobierno dominado directamente por el estamento militar y la expansión armada.'
  },
  theocracy: {
    label: 'Teocracia',
    group: 'Teocracia',
    color: '#c85a17',
    description: 'Autoridad política legitimada y ejercida en nombre de una institución religiosa.'
  }
};

export const COLLAPSE_REASONS = {
  external: {
    label: 'Conflicto externo',
    icon: 'swords',
    description: 'Invasiones, derrotas militares o presión de potencias rivales.'
  },
  internal: {
    label: 'Conflicto interno',
    icon: 'fracture',
    description: 'Guerras civiles, rebeliones, secesiones o luchas dinásticas.'
  },
  economics: {
    label: 'Crisis económica',
    icon: 'coins',
    description: 'Bancarrota fiscal, inflación, pérdida de rutas comerciales o colapso agrario.'
  },
  leadership: {
    label: 'Crisis de liderazgo',
    icon: 'crown',
    description: 'Sucesiones débiles, corrupción cortesana o incapacidad de gobierno.'
  },
  overstretch: {
    label: 'Sobreextensión',
    icon: 'expand',
    description: 'Territorio demasiado vasto para administrarlo, defenderlo y financiarlo.'
  },
  mixed: {
    label: 'Causas mixtas',
    icon: 'layers',
    description: 'Combinación simultánea de factores internos, externos y económicos.'
  }
};

export const EMPIRES = [
  {
    id: 'akkadian',
    name: 'Imperio acadio',
    startYear: -2334,
    endYear: -2154,
    peakStart: -2290,
    peakEnd: -2215,
    peakAreaKm2: 0.8,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Acad',
    region: 'Mesopotamia',
    summary: 'Considerado el primer imperio territorial de la historia, fundado por Sargón de Acad. Unificó las ciudades-estado sumerias antes de sucumbir ante sequías e invasiones guti.'
  },
  {
    id: 'neosumerian',
    name: 'Imperio neosumerio (Ur III)',
    startYear: -2112,
    endYear: -2004,
    peakStart: -2094,
    peakEnd: -2030,
    peakAreaKm2: 0.3,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Ur',
    region: 'Mesopotamia',
    summary: 'Renacimiento imperial sumerio bajo la Tercera Dinastía de Ur. Destacó por su burocracia escrita y el Código de Ur-Nammu antes de caer ante elamitas y amorreos.'
  },
  {
    id: 'egypt_new',
    name: 'Imperio Nuevo de Egipto',
    startYear: -1550,
    endYear: -1077,
    peakStart: -1479,
    peakEnd: -1213,
    peakAreaKm2: 1.0,
    government: 'theocracy',
    collapse: 'mixed',
    capital: 'Tebas / Menfis / Pi-Ramsés',
    region: 'Valle del Nilo y Levante',
    summary: 'Época de máximo esplendor faraónico con Hatshepsut, Tutmosis III y Ramsés II. Se debilitó por crisis económicas, divisiones sacerdotales y los Pueblos del Mar.'
  },
  {
    id: 'carthaginian',
    name: 'Imperio cartaginés',
    startYear: -814,
    endYear: -146,
    peakStart: -480,
    peakEnd: -264,
    peakAreaKm2: 0.3,
    government: 'constrained_monarchy',
    collapse: 'external',
    capital: 'Cartago',
    region: 'Mediterráneo occidental',
    summary: 'República marítima y comercial fenicia que dominó el norte de África, Hispania y las islas del Mediterráneo occidental hasta ser destruida por Roma en las guerras púnicas.'
  },
  {
    id: 'neobabylonian',
    name: 'Imperio neobabilónico',
    startYear: -626,
    endYear: -539,
    peakStart: -605,
    peakEnd: -562,
    peakAreaKm2: 0.5,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Babilonia',
    region: 'Mesopotamia y Levante',
    summary: 'Renacimiento monumental y astronómico de Babilonia bajo Nabopolasar y Nabucodonosor II. Fue conquistado por el Imperio aqueménida de Ciro el Grande.'
  },
  {
    id: 'chola',
    name: 'Imperio chola',
    startYear: -300,
    endYear: 1279,
    peakStart: 985,
    peakEnd: 1070,
    peakAreaKm2: 3.6,
    government: 'absolute_monarchy',
    collapse: 'internal',
    capital: 'Thanjavur',
    region: 'Sur de la India y Sudeste Asiático',
    summary: 'Una de las dinastías más longevas de la historia; construyó una potente armada que proyectó su influencia cultural y comercial hasta Sumatra y la península malaya.'
  },
  {
    id: 'parthian',
    name: 'Imperio parto',
    startYear: -247,
    endYear: 224,
    peakStart: -124,
    peakEnd: 50,
    peakAreaKm2: 2.8,
    government: 'feudal_monarchy',
    collapse: 'internal',
    capital: 'Ctesifonte / Hecatómpilo',
    region: 'Persia y Mesopotamia',
    summary: 'Gran rival oriental de Roma gracias a su caballería pesada y el control de la Ruta de la Seda. Las guerras dinásticas facilitaron su relevo por los sasánidas.'
  },
  {
    id: 'kushan',
    name: 'Imperio kushán',
    startYear: 30,
    endYear: 375,
    peakStart: 127,
    peakEnd: 230,
    peakAreaKm2: 2.0,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Purushapura / Bagram',
    region: 'Asia Central y norte de la India',
    summary: 'Encrucijada comercial entre Roma, China y la India; impulsó el arte grecobudista de Gandhara y la difusión del budismo hacia Asia Oriental.'
  },
  {
    id: 'aksum',
    name: 'Imperio de Aksum',
    startYear: 100,
    endYear: 940,
    peakStart: 320,
    peakEnd: 550,
    peakAreaKm2: 1.25,
    government: 'absolute_monarchy',
    collapse: 'economics',
    capital: 'Aksum',
    region: 'Cuerno de África y Mar Rojo',
    summary: 'Potencia comercial africana con moneda propia que conectaba el Índico con el Mediterráneo. Perdió sus rutas marítimas y sufrió aislamiento económico.'
  },
  {
    id: 'frankish',
    name: 'Imperio franco (carolingio)',
    startYear: 481,
    endYear: 843,
    peakStart: 768,
    peakEnd: 814,
    peakAreaKm2: 1.2,
    government: 'feudal_monarchy',
    collapse: 'internal',
    capital: 'Aquisgrán',
    region: 'Europa Occidental',
    summary: 'Culminó bajo Carlomagno, unificando gran parte de Europa occidental e impulsando el renacimiento carolingio antes de dividirse en el Tratado de Verdún.'
  },
  {
    id: 'seljuk',
    name: 'Imperio selyúcida',
    startYear: 1037,
    endYear: 1194,
    peakStart: 1072,
    peakEnd: 1092,
    peakAreaKm2: 3.9,
    government: 'feudal_monarchy',
    collapse: 'internal',
    capital: 'Nishapur / Isfahán',
    region: 'Oriente Próximo y Asia Central',
    summary: 'Confederación turco-persa que revitalizó el mundo islámico suní y abrió Anatolia a la población túrquica. Se fragmentó en múltiples sultanatos rivales.'
  },
  {
    id: 'mali',
    name: 'Imperio de Malí',
    startYear: 1235,
    endYear: 1600,
    peakStart: 1312,
    peakEnd: 1350,
    peakAreaKm2: 1.1,
    government: 'feudal_monarchy',
    collapse: 'internal',
    capital: 'Niani / Tombuctú',
    region: 'África Occidental',
    summary: 'Controló las rutas transaharianas del oro y la sal y convirtió Tombuctú en centro universitario islámico bajo Mansa Musa.'
  },
  {
    id: 'vijayanagara',
    name: 'Imperio vijayanagara',
    startYear: 1336,
    endYear: 1646,
    peakStart: 1509,
    peakEnd: 1529,
    peakAreaKm2: 0.36,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Hampi',
    region: 'Sur de la India',
    summary: 'Bastión cultural y comercial del sur de la India. Su capital Hampi fue una de las mayores urbes del mundo hasta su derrota en la batalla de Talikota.'
  },
  {
    id: 'timurid',
    name: 'Imperio timúrida',
    startYear: 1370,
    endYear: 1507,
    peakStart: 1380,
    peakEnd: 1447,
    peakAreaKm2: 4.4,
    government: 'autocracy',
    collapse: 'internal',
    capital: 'Samarcanda / Herat',
    region: 'Asia Central y Persia',
    summary: 'Fundado por Tamerlán, dio lugar al brillante renacimiento timúrida en ciencias y arquitectura en Samarcanda antes de fragmentarse por guerras sucesorias.'
  },
  {
    id: 'songhai',
    name: 'Imperio songhai',
    startYear: 1464,
    endYear: 1591,
    peakStart: 1493,
    peakEnd: 1528,
    peakAreaKm2: 1.4,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Gao',
    region: 'África Occidental',
    summary: 'El mayor imperio del África occidental precolonial, sucesor de Malí en el valle del Níger. Cayó ante una expedición marroquí equipada con armas de fuego.'
  },
  {
    id: 'safavid',
    name: 'Imperio safávida',
    startYear: 1501,
    endYear: 1736,
    peakStart: 1588,
    peakEnd: 1629,
    peakAreaKm2: 2.9,
    government: 'theocracy',
    collapse: 'internal',
    capital: 'Tabriz / Isfahán',
    region: 'Persia',
    summary: 'Forjó la identidad moderna de Irán y consolidó el islam chií como religión estatal, alcanzando su apogeo artístico bajo el sah Abás el Grande.'
  },
  {
    id: 'dutch',
    name: 'Imperio neerlandés',
    startYear: 1602,
    endYear: 1975,
    peakStart: 1630,
    peakEnd: 1700,
    peakAreaKm2: 3.7,
    government: 'constrained_monarchy',
    collapse: 'overstretch',
    capital: 'Ámsterdam',
    region: 'Global (Indias Orientales, Caribe y África)',
    summary: 'Articulado por compañías comerciales como la VOC, dominó el comercio de especias y las finanzas europeas en el siglo XVII antes de ceder ante potencias mayores.'
  },
  {
    id: 'austro_hungarian',
    name: 'Imperio austrohúngaro',
    startYear: 1867,
    endYear: 1918,
    peakStart: 1870,
    peakEnd: 1914,
    peakAreaKm2: 0.68,
    government: 'constrained_monarchy',
    collapse: 'mixed',
    capital: 'Viena / Budapest',
    region: 'Europa Central',
    summary: 'Monarquía dual plurinacional de gran efervescencia cultural y científica en Viena y Praga. Se disolvió tras la derrota en la Primera Guerra Mundial.'
  },
  {
    id: 'hittite',
    name: 'Imperio hitita',
    startYear: -1600,
    endYear: -1178,
    peakStart: -1350,
    peakEnd: -1250,
    peakAreaKm2: 0.5,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Hattusa',
    region: 'Anatolia',
    summary: 'Gran potencia de la Edad del Bronce y rival de Egipto. Desapareció abruptamente durante el colapso generalizado de la Edad del Bronce y las invasiones de los Pueblos del Mar.'
  },
  {
    id: 'assyrian',
    name: 'Imperio neoasirio',
    startYear: -911,
    endYear: -609,
    peakStart: -745,
    peakEnd: -630,
    peakAreaKm2: 1.4,
    government: 'stratocracy',
    collapse: 'overstretch',
    capital: 'Nínive / Assur',
    region: 'Oriente Próximo',
    summary: 'Maquinaria militar pionera en el uso del hierro y la administración provincial. La revuelta conjunta de Babilonia y Media desbordó sus fronteras.'
  },
  {
    id: 'achaemenid',
    name: 'Imperio aqueménida',
    startYear: -550,
    endYear: -330,
    peakStart: -522,
    peakEnd: -465,
    peakAreaKm2: 5.5,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Persépolis / Susa',
    region: 'Persia y Oriente Próximo',
    summary: 'El primer imperio persa destacó por su red de calzadas, satrapías y tolerancia cultural. Cayó ante las campañas de Alejandro Magno.'
  },
  {
    id: 'macedonian',
    name: 'Imperio macedonio',
    startYear: -336,
    endYear: -301,
    peakStart: -331,
    peakEnd: -323,
    peakAreaKm2: 5.2,
    government: 'autocracy',
    collapse: 'leadership',
    capital: 'Pela / Babilonia',
    region: 'Mediterráneo oriental y Asia',
    summary: 'Forjado en apenas una década por Alejandro Magno desde Grecia hasta el Indo. Tras su muerte sin sucesor claro, se fragmentó entre sus generales (diádocos).'
  },
  {
    id: 'mauryan',
    name: 'Imperio maurya',
    startYear: -322,
    endYear: -185,
    peakStart: -268,
    peakEnd: -232,
    peakAreaKm2: 5.0,
    government: 'absolute_monarchy',
    collapse: 'internal',
    capital: 'Pataliputra',
    region: 'Subcontinente indio',
    summary: 'Unificó casi toda la India bajo Chandragupta y Ashoka, quien impulsó el budismo y la administración centralizada. Se debilitó tras su muerte por crisis internas.'
  },
  {
    id: 'seleucid',
    name: 'Imperio seléucida',
    startYear: -312,
    endYear: -63,
    peakStart: -301,
    peakEnd: -240,
    peakAreaKm2: 3.9,
    government: 'stratocracy',
    collapse: 'overstretch',
    capital: 'Antioquía',
    region: 'Oriente Próximo',
    summary: 'El mayor estado sucesor de Alejandro en Asia. Perdió sus provincias orientales frente a Partia y terminó absorbido por la República romana.'
  },
  {
    id: 'han',
    name: 'Dinastía Han',
    startYear: -202,
    endYear: 220,
    peakStart: -141,
    peakEnd: 88,
    peakAreaKm2: 6.5,
    government: 'absolute_monarchy',
    collapse: 'internal',
    capital: 'Chang’an / Luoyang',
    region: 'Asia Oriental',
    summary: 'Consolidó la identidad cultural china, abrió la Ruta de la Seda e instauró el confucianismo estatal. Las rebeliones internas y los señores de la guerra la dividieron.'
  },
  {
    id: 'roman',
    name: 'Imperio romano',
    startYear: -27,
    endYear: 476,
    peakStart: 96,
    peakEnd: 180,
    peakAreaKm2: 5.0,
    government: 'autocracy',
    collapse: 'mixed',
    capital: 'Roma / Rávena',
    region: 'Europa y Mediterráneo',
    summary: 'Transformó el derecho, la ingeniería y la lengua de Europa. Su mitad occidental cayó tras siglos de crisis fiscal, guerras civiles y presiones migratorias.'
  },
  {
    id: 'sassanian',
    name: 'Imperio sasánida',
    startYear: 224,
    endYear: 651,
    peakStart: 531,
    peakEnd: 622,
    peakAreaKm2: 3.5,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Ctesifonte',
    region: 'Persia',
    summary: 'Último gran imperio persa preislámico y gran rival de Bizancio. Agotado tras décadas de guerra bizantino-sasánida, sucumbió ante la expansión árabe.'
  },
  {
    id: 'gupta',
    name: 'Imperio gupta',
    startYear: 320,
    endYear: 550,
    peakStart: 375,
    peakEnd: 455,
    peakAreaKm2: 3.5,
    government: 'feudal_monarchy',
    collapse: 'external',
    capital: 'Pataliputra',
    region: 'India',
    summary: 'Edad de oro clásica de la ciencia, las matemáticas (el cero decimal) y el arte indio. Debilitado por las invasiones de los hunos heftalitas.'
  },
  {
    id: 'byzantine',
    name: 'Imperio bizantino',
    startYear: 395,
    endYear: 1453,
    peakStart: 527,
    peakEnd: 565,
    peakAreaKm2: 2.8,
    government: 'autocracy',
    collapse: 'external',
    capital: 'Constantinopla',
    region: 'Mediterráneo oriental',
    summary: 'Continuación oriental de Roma durante más de un milenio. Preservó el legado grecorromano hasta la conquista otomana de Constantinopla.'
  },
  {
    id: 'tang',
    name: 'Dinastía Tang',
    startYear: 618,
    endYear: 907,
    peakStart: 626,
    peakEnd: 755,
    peakAreaKm2: 5.4,
    government: 'absolute_monarchy',
    collapse: 'internal',
    capital: 'Chang’an',
    region: 'Asia Oriental',
    summary: 'Época cosmopolita de auge poético, tecnológico y comercial en China. La rebelión de An Lushan marcó un declive irreversible.'
  },
  {
    id: 'umayyad',
    name: 'Califato omeya',
    startYear: 661,
    endYear: 750,
    peakStart: 705,
    peakEnd: 732,
    peakAreaKm2: 11.1,
    government: 'theocracy',
    collapse: 'internal',
    capital: 'Damasco',
    region: 'Oriente Medio, Norte de África e Iberia',
    summary: 'Primer gran califato hereditario; extendió el mundo islámico desde la península ibérica hasta el valle del Indo antes de ser derrocado por los abasíes.'
  },
  {
    id: 'abbasid',
    name: 'Califato abasí',
    startYear: 750,
    endYear: 1258,
    peakStart: 786,
    peakEnd: 861,
    peakAreaKm2: 11.1,
    government: 'theocracy',
    collapse: 'external',
    capital: 'Bagdad',
    region: 'Oriente Medio',
    summary: 'Protagonizó la Edad de Oro islámica de la ciencia y la traducción en Bagdad. Tras siglos de fragmentación política, fue destruido por los mongoles.'
  },
  {
    id: 'khmer',
    name: 'Imperio jemer',
    startYear: 802,
    endYear: 1431,
    peakStart: 1113,
    peakEnd: 1218,
    peakAreaKm2: 1.0,
    government: 'theocracy',
    collapse: 'mixed',
    capital: 'Angkor',
    region: 'Sudeste Asiático',
    summary: 'Construyó el complejo hidráulico y templario de Angkor Wat. Colapsó por cambios climáticos, agotamiento de infraestructuras y presión del reino de Ayutthaya.'
  },
  {
    id: 'holy_roman',
    name: 'Sacro Imperio Romano',
    startYear: 962,
    endYear: 1806,
    peakStart: 1155,
    peakEnd: 1250,
    peakAreaKm2: 1.0,
    government: 'feudal_monarchy',
    collapse: 'external',
    capital: 'Viena / Praga (itinerante)',
    region: 'Europa Central',
    summary: 'Compleja confederación de reinos, ducados y ciudades libres en Europa central. Disuelto formalmente tras las derrotas frente a Napoleón.'
  },
  {
    id: 'song',
    name: 'Dinastía Song',
    startYear: 960,
    endYear: 1279,
    peakStart: 1000,
    peakEnd: 1126,
    peakAreaKm2: 3.1,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Kaifeng / Hangzhou',
    region: 'Asia Oriental',
    summary: 'Revolucionó la economía con el papel moneda, la imprenta móvil y la brújula. Fue derrotada militarmente primero por los yurchen y luego por Kublai Kan.'
  },
  {
    id: 'mongol',
    name: 'Imperio mongol',
    startYear: 1206,
    endYear: 1368,
    peakStart: 1260,
    peakEnd: 1294,
    peakAreaKm2: 24.0,
    government: 'autocracy',
    collapse: 'overstretch',
    capital: 'Karakórum / Janbalic',
    region: 'Eurasia',
    summary: 'El mayor imperio terrestre contiguo de la historia, fundado por Gengis Kan. Su enorme extensión derivó en cuatro kanatos rivales.'
  },
  {
    id: 'ottoman',
    name: 'Imperio otomano',
    startYear: 1299,
    endYear: 1922,
    peakStart: 1520,
    peakEnd: 1566,
    peakAreaKm2: 5.2,
    government: 'absolute_monarchy',
    collapse: 'mixed',
    capital: 'Estambul',
    region: 'Mediterráneo, Balcanes y Oriente Medio',
    summary: 'Puente entre Europa y Asia durante seis siglos. Tras estancarse frente a las potencias industriales europeas, desapareció tras la Primera Guerra Mundial.'
  },
  {
    id: 'ming',
    name: 'Dinastía Ming',
    startYear: 1368,
    endYear: 1644,
    peakStart: 1402,
    peakEnd: 1435,
    peakAreaKm2: 6.5,
    government: 'absolute_monarchy',
    collapse: 'internal',
    capital: 'Nankín / Pekín',
    region: 'Asia Oriental',
    summary: 'Reconstruyó la Gran Muralla y financió las expediciones marítimas de Zheng He. Crisis fiscales, hambrunas y revueltas campesinas abrieron paso a los manchúes.'
  },
  {
    id: 'portuguese',
    name: 'Imperio portugués',
    startYear: 1415,
    endYear: 1999,
    peakStart: 1500,
    peakEnd: 1580,
    peakAreaKm2: 10.4,
    government: 'absolute_monarchy',
    collapse: 'overstretch',
    capital: 'Lisboa',
    region: 'Global (América, África y Asia)',
    summary: 'Primer imperio marítimo global basado en factorías comerciales y Brasil. Sufrió la competencia neerlandesa y británica y cerró su ciclo con la descolonización.'
  },
  {
    id: 'aztec',
    name: 'Imperio mexica (azteca)',
    startYear: 1428,
    endYear: 1521,
    peakStart: 1486,
    peakEnd: 1519,
    peakAreaKm2: 0.22,
    government: 'feudal_monarchy',
    collapse: 'external',
    capital: 'Tenochtitlan',
    region: 'Mesoamérica',
    summary: 'Triple Alianza centrada en el valle de México, con avanzada ingeniería lacustre y tributación regional. Cayó ante la conquista española y sus aliados indígenas.'
  },
  {
    id: 'inca',
    name: 'Imperio inca',
    startYear: 1438,
    endYear: 1533,
    peakStart: 1471,
    peakEnd: 1525,
    peakAreaKm2: 2.0,
    government: 'absolute_monarchy',
    collapse: 'external',
    capital: 'Cusco',
    region: 'Andes sudamericanos',
    summary: 'El mayor estado de la América precolombina, articulado por el Qhapaq Ñan y los quipus. Debilitado por una guerra civil sucesoria justo a la llegada española.'
  },
  {
    id: 'spanish',
    name: 'Imperio español',
    startYear: 1492,
    endYear: 1898,
    peakStart: 1556,
    peakEnd: 1640,
    peakAreaKm2: 13.7,
    government: 'absolute_monarchy',
    collapse: 'economics',
    capital: 'Madrid / Valladolid',
    region: 'Global (América, Europa y Pacífico)',
    summary: 'Conectó por primera vez América, Europa y Asia bajo una misma corona. Las guerras europeas, la inflación crónica y las independencias americanas precipitaron su fin.'
  },
  {
    id: 'mughal',
    name: 'Imperio mogol',
    startYear: 1526,
    endYear: 1857,
    peakStart: 1556,
    peakEnd: 1707,
    peakAreaKm2: 4.0,
    government: 'absolute_monarchy',
    collapse: 'internal',
    capital: 'Agra / Delhi',
    region: 'Subcontinente indio',
    summary: 'Unificó casi toda la India y dejó obras cumbre como el Taj Mahal. Las guerras internas y el avance de los maratas y británicos lo redujeron a un poder simbólico.'
  },
  {
    id: 'french',
    name: 'Imperio colonial francés',
    startYear: 1534,
    endYear: 1962,
    peakStart: 1880,
    peakEnd: 1939,
    peakAreaKm2: 11.5,
    government: 'constrained_monarchy',
    collapse: 'mixed',
    capital: 'París',
    region: 'Global (África, América y Asia)',
    summary: 'Abarcó dos grandes ciclos coloniales en América, África y el Sudeste Asiático. Se desintegró tras la Segunda Guerra Mundial y las guerras de Indochina y Argelia.'
  },
  {
    id: 'british',
    name: 'Imperio británico',
    startYear: 1583,
    endYear: 1997,
    peakStart: 1880,
    peakEnd: 1922,
    peakAreaKm2: 35.5,
    government: 'constrained_monarchy',
    collapse: 'economics',
    capital: 'Londres',
    region: 'Global',
    summary: 'El mayor imperio de la historia por superficie y población. El coste económico de dos guerras mundiales y los movimientos independentistas aceleraron su disolución.'
  },
  {
    id: 'qing',
    name: 'Dinastía Qing',
    startYear: 1644,
    endYear: 1912,
    peakStart: 1735,
    peakEnd: 1796,
    peakAreaKm2: 14.7,
    government: 'absolute_monarchy',
    collapse: 'internal',
    capital: 'Pekín',
    region: 'Asia Oriental',
    summary: 'Última dinastía imperial china; duplicó el territorio tradicional de China. Colapsó tras las Guerras del Opio, la rebelión Taiping y la Revolución de 1911.'
  },
  {
    id: 'russian',
    name: 'Imperio ruso',
    startYear: 1721,
    endYear: 1917,
    peakStart: 1855,
    peakEnd: 1905,
    peakAreaKm2: 22.8,
    government: 'autocracy',
    collapse: 'internal',
    capital: 'San Petersburgo',
    region: 'Eurasia y Norteamérica',
    summary: 'Se expandió desde Europa Oriental hasta el Pacífico y Alaska. La crisis social, la industrialización tardía y la Primera Guerra Mundial desembocaron en la Revolución de 1917.'
  },
  {
    id: 'japanese',
    name: 'Imperio del Japón',
    startYear: 1868,
    endYear: 1945,
    peakStart: 1931,
    peakEnd: 1942,
    peakAreaKm2: 7.4,
    government: 'stratocracy',
    collapse: 'external',
    capital: 'Tokio',
    region: 'Asia-Pacífico',
    summary: 'Rápida potencia industrial surgida de la Era Meiji que derivó en militarismo expansivo. Fue derrotado en la Segunda Guerra Mundial.'
  },
  {
    id: 'eastern_bloc',
    name: 'Bloque del Este (URSS)',
    startYear: 1945,
    endYear: 1991,
    peakStart: 1955,
    peakEnd: 1975,
    peakAreaKm2: 23.4,
    government: 'autocracy',
    collapse: 'economics',
    capital: 'Moscú',
    region: 'Eurasia y Europa del Este',
    summary: 'Esfera geopolítica encabezada por la Unión Soviética durante la Guerra Fría. El estancamiento económico, la carrera armamentística y las reformas internas llevaron a su disolución.'
  },
  {
    id: 'klingon',
    name: 'Imperio klingon (Ficción)',
    startYear: -250,
    endYear: 1970,
    peakStart: 900,
    peakEnd: 1500,
    peakAreaKm2: 12.0,
    government: 'stratocracy',
    collapse: 'economics',
    capital: 'Qo’noS',
    region: 'Cuadrante Beta (Star Trek)',
    summary: 'Guiño de ficción incluido en el gráfico original. Su duración ficticia extrema (2.220 años) sirve además para ilustrar cómo un outlier mal acotado rompe las escalas visuales.',
    isFiction: true
  }
];

export const WIKI_SLUGS = {
  akkadian: 'Imperio_acadio',
  neosumerian: 'Tercera_Dinast%C3%ADa_de_Ur',
  egypt_new: 'Imperio_Nuevo_de_Egipto',
  carthaginian: 'Cartago',
  neobabylonian: 'Imperio_neobabil%C3%B3nico',
  chola: 'Imperio_chola',
  parthian: 'Imperio_parto',
  kushan: 'Imperio_kush%C3%A1n',
  aksum: 'Reino_de_Aksum',
  frankish: 'Imperio_carolingio',
  seljuk: 'Imperio_sely%C3%BAcida',
  mali: 'Imperio_de_Mal%C3%AD',
  vijayanagara: 'Imperio_vijayanagara',
  timurid: 'Imperio_tim%C3%BArida',
  songhai: 'Imperio_songhai',
  safavid: 'Imperio_saf%C3%A1vida',
  dutch: 'Imperio_neerland%C3%A9s',
  austro_hungarian: 'Imperio_austroh%C3%BAngaro',
  hittite: 'Imperio_hitita',
  assyrian: 'Imperio_neoasirio',
  achaemenid: 'Imperio_aquem%C3%A9nida',
  macedonian: 'Imperio_macedonio',
  mauryan: 'Imperio_maurya',
  seleucid: 'Imperio_sel%C3%A9ucida',
  han: 'Dinast%C3%ADa_Han',
  roman: 'Imperio_romano',
  sassanian: 'Imperio_sas%C3%A1nida',
  gupta: 'Imperio_gupta',
  byzantine: 'Imperio_bizantino',
  tang: 'Dinast%C3%ADa_Tang',
  umayyad: 'Califato_omeya',
  abbasid: 'Califato_abas%C3%AD',
  khmer: 'Imperio_jemer',
  holy_roman: 'Sacro_Imperio_Romano_Germ%C3%A1nico',
  song: 'Dinast%C3%ADa_Song',
  mongol: 'Imperio_mongol',
  ottoman: 'Imperio_otomano',
  ming: 'Dinast%C3%ADa_Ming',
  portuguese: 'Imperio_portugu%C3%A9s',
  aztec: 'Imperio_mexica',
  inca: 'Imperio_incaico',
  spanish: 'Imperio_espa%C3%B1ol',
  mughal: 'Imperio_mogol',
  french: 'Imperio_colonial_franc%C3%A9s',
  british: 'Imperio_brit%C3%A1nico',
  qing: 'Dinast%C3%ADa_Qing',
  russian: 'Imperio_ruso',
  japanese: 'Imperio_del_Jap%C3%B3n',
  eastern_bloc: 'Bloque_del_Este',
  klingon: 'Klingon'
};

export const CIVILIZATIONAL_CONTEXT = {
  akkadian: {
    span: '~3500–539 a.C. (Tradición mesopotámica)',
    note: 'Aunque el imperio de Sargón duró 180 años, las instituciones urbanas, la escritura cuneiforme y los Estados mesopotámicos mantuvieron continuidad durante casi tres milenios.'
  },
  neosumerian: {
    span: '~3500–2004 a.C. (Civilización sumeria)',
    note: 'Ur III fue la última gran fase imperial sumeria, pero la cultura de sus ciudades-estado (Uruk, Ur, Lagash) se remontaba más de 1.500 años atrás.'
  },
  egypt_new: {
    span: '~3100–30 a.C. (Egipto faraónico: ~3.000 años)',
    note: 'El gráfico mide únicamente su fase imperial de máxima expansión exterior (473 años). Como reino y sistema teocrático faraónico, Egipto perduró más de tres milenios desde la unificación de Narmer hasta la anexión romana.'
  },
  neobabylonian: {
    span: '~1894–539 a.C. (Tradición babilónica)',
    note: 'La Babilonia imperial caldea duró menos de un siglo, pero Babilonia ya había sido potencia central desde Hammurabi (siglo XVIII a.C.).'
  },
  roman: {
    span: '753 a.C.–1453 d.C. (Tradición romana: ~2.200 años)',
    note: 'Aquí se refleja el Principado y Dominado hasta la caída de Occidente (503 años). Sumando la Monarquía, la República y la continuidad oriental bizantina, el Estado romano abarcó más de dos milenios.'
  },
  byzantine: {
    span: '27 a.C.–1453 d.C. (Continuidad imperial romana)',
    note: 'Sus ciudadanos se llamaban a sí mismos romanos (romaioi); es la continuación directa sin ruptura institucional del Imperio romano en Oriente.'
  },
  han: {
    span: '221 a.C.–1912 d.C. (Imperio chino: >2.100 años)',
    note: 'Han consolidó el modelo burocrático imperial chino inaugurado por Qin, que se prolongaría —entre dinastías— hasta la Revolución de 1911.'
  },
  tang: {
    span: '221 a.C.–1912 d.C. (Imperio chino)',
    note: 'Fase cosmopolita intermedia dentro de una tradición estatal china de más de dos milenios (y más de 3.500 años de civilización documentada).'
  },
  song: {
    span: '221 a.C.–1912 d.C. (Imperio chino)',
    note: 'Ciclo dinástico de gran innovación económica dentro de la continuidad imperial china.'
  },
  ming: {
    span: '221 a.C.–1912 d.C. (Imperio chino)',
    note: 'Restauración autóctona del sistema imperial chino tras el dominio mongol (dinastía Yuan).'
  },
  qing: {
    span: '221 a.C.–1912 d.C. (Imperio chino)',
    note: 'Última dinastía de un ciclo imperial continuo de más de dos milenios desde la unificación Qin.'
  },
  achaemenid: {
    span: '550 a.C.–1979 d.C. (Tradición estatal persa/iraní)',
    note: 'Inauguró la continuidad imperial persa que, con relevos dinásticos (partos, sasánidas, safávidas), marcó la historia de Irán durante más de 2.500 años.'
  },
  sassanian: {
    span: '550 a.C.–651 d.C. (Persia preislámica)',
    note: 'Última gran fase imperial irania preislámica, heredera directa de aqueménidas y partos.'
  },
  japanese: {
    span: '~Siglo VI d.C.–presente (Estado e institución imperial)',
    note: 'El Imperio del Japón moderno (Meiji a 1945) duró 77 años, pero la monarquía y el Estado japonés mantienen una continuidad cultural de más de 1.400 años.'
  },
  ottoman: {
    span: '1077–presente (Anatolia túrquica)',
    note: 'Heredero político de los selyúcidas de Rum en Anatolia; tras su disolución en 1922 dio paso directamente a la República de Turquía.'
  }
};
