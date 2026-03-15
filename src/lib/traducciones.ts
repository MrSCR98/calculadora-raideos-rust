export type Idioma = 'es' | 'va' | 'en'

export const IDIOMAS_DISPONIBLES: { id: Idioma; nombre: string }[] = [
  { id: 'es', nombre: 'Español' },
  { id: 'va', nombre: 'Valencià / Català' },
  { id: 'en', nombre: 'English' },
]

export interface Traducciones {
  // Cabecera
  tituloApp: string
  tituloAppMovil: string
  subtituloApp: string

  // Tema
  temaClaro: string
  temaOscuro: string
  temaAuto: string

  // Pestanas
  pestanaCalcular: string
  pestanaInventario: string

  // Modo 1
  seleccionaExplosivos: string
  reiniciar: string
  porCraft: string

  // Resumen materiales
  materialesNecesarios: string
  materialesBase: string
  materialesBaseFarmear: string
  crafteosIntermedios: string
  crafteosIntermediosDesc: string
  materialesCrafteoFinal: string
  materialesCrafteoFinalDesc: string
  resultadoFinal: string
  resultadoFinalDesc: string
  seleccionaParaVer: string
  materialesUsaras: string

  // Pasos de crafteo
  pasosCrafteo: string
  craftear: string
  obtener: string

  // Modo 2
  tusMateriales: string
  modoInfinito: string
  modoExacto: string
  modoInfinitoDesc: string
  materialesCriticosNota: string
  maximoCraftear: string
  seleccionaCraftear: string
  introduceMaterialCritico: string

  // Tarjeta
  max: string
  disp: string

  // Footer
  creadoPor: string
  ayudaEn: string

  // Materiales
  materiales: Record<string, string>

  // Nombres recetas (se usan para los nombres de los items)
  nombresRecetas: Record<string, string>

  //SCR98Etiqueta
  scrEtiquetaNombreGratis: string
  scrEtiquetaNombreSEOGratis: string
  scrEtiquetaMensajeGratis: string
  scrEtiquetaTiempoGratis: string

  scrEtiquetaNombreDinero: string
  scrEtiquetaNombreSEODinero: string
  scrEtiquetaMensajeDinero: string
  scrEtiquetaTiempoDinero: string
}

const ES: Traducciones = {
  tituloApp: 'Calculadora de Raideos para Rust',
  tituloAppMovil: 'Calculadora Rust',
  subtituloApp: 'Calcula los materiales necesarios para tus raids',
  temaClaro: 'Claro',
  temaOscuro: 'Oscuro',
  temaAuto: 'Auto',
  pestanaCalcular: 'Calcular Materiales',
  pestanaInventario: '¿Qué Puedo Hacer?',
  seleccionaExplosivos: 'Selecciona los explosivos',
  reiniciar: 'Reiniciar',
  porCraft: 'por craft',
  materialesNecesarios: 'Materiales Totales Necesarios',
  materialesBase: 'Materiales Base',
  materialesBaseFarmear: 'Materiales base que necesitas farmear:',
  crafteosIntermedios: 'Crafteos Intermedios',
  crafteosIntermediosDesc: 'Esto es lo que craftearás con los materiales base:',
  materialesCrafteoFinal: 'Materiales para Crafteo Final',
  materialesCrafteoFinalDesc:
    'Materiales necesarios para craftear los explosivos finales:',
  resultadoFinal: 'Resultado Final',
  resultadoFinalDesc: 'Los explosivos que obtendrás:',
  seleccionaParaVer: 'Selecciona explosivos para ver los materiales necesarios',
  materialesUsaras: 'Materiales que Usarás',
  pasosCrafteo: 'Pasos de Crafteo',
  craftear: 'Craftear',
  obtener: 'Obtener',
  tusMateriales: 'Tus Materiales',
  modoInfinito: 'Modo Infinito',
  modoExacto: 'Modo Exacto',
  modoInfinitoDesc:
    'Azufre, Pólvora, Explosivos y Granada de Lata nunca son infinitos (limitan el crafteo). Los demás materiales sin valor se consideran infinitos.',
  materialesCriticosNota:
    'Materiales críticos: deben tener un valor para calcular el máximo.',
  maximoCraftear: 'Máximo que puedes craftear',
  seleccionaCraftear: 'Selecciona lo que quieres craftear',
  introduceMaterialCritico:
    'Introduce al menos un material crítico (Azufre, Pólvora, Explosivos o Granada de Lata) para calcular el máximo que puedes craftear.',
  max: 'Máx',
  disp: 'Disp',
  creadoPor: 'Creado por',
  ayudaEn: 'Si deseas mejorar la página, el código está disponible en',
  materiales: {
    azufre: 'Azufre',
    carbonVegetal: 'Carbón Vegetal',
    fragmentosMetal: 'Fragmentos de Metal',
    combustibleGradoBajo: 'Combustible de Grado Bajo',
    tela: 'Tela',
    basuraElectronica: 'Basura Electrónica',
    tuberiaMetal: 'Tubería de Metal',
    cuerda: 'Cuerda',
    alijoPequeno: 'Alijo Pequeño',
    tanquePropanoVacio: 'Tanque de Propano Vacío',
    polvora: 'Pólvora',
    explosivos: 'Explosivos',
    granadaLata: 'Granada de Lata',
  },
  nombresRecetas: {
    polvora: 'Pólvora',
    explosivo: 'Explosivos',
    granadaLata: 'Granada de Lata',
    alijoPequeno: 'Alijo Pequeño',
    c4: 'Carga Explosiva con Temporizador',
    misil: 'Misil',
    misilAltaVelocidad: 'Misil de Alta Velocidad',
    misilIncendiario: 'Misil Incendiario',
    municionExplosiva: 'Munición Explosiva del Calibre 5.56',
    bolsaExplosiva: 'Bolsa Explosiva',
    bombaPropano: 'Bomba Explosiva de Propano',
  },
  scrEtiquetaNombreGratis: 'SCR98',
  scrEtiquetaNombreSEOGratis: 'SCR98',
  scrEtiquetaMensajeGratis: 'Suscríbete, es gratis 😎',
  scrEtiquetaTiempoGratis: 'ahora',
  scrEtiquetaNombreDinero: 'Donar a SCR98 €',
  scrEtiquetaNombreSEODinero: 'SCR98',
  scrEtiquetaMensajeDinero: 'Apoya al desarrollo 💰💵',
  scrEtiquetaTiempoDinero: '€€€',
}

const VA: Traducciones = {
  tituloApp: 'Calculadora de Raids per a Rust',
  tituloAppMovil: 'Calculadora Rust',
  subtituloApp: 'Calcula els materials necessaris per a les teues raids',
  temaClaro: 'Clar',
  temaOscuro: 'Fosc',
  temaAuto: 'Auto',
  pestanaCalcular: 'Calcular Materials',
  pestanaInventario: 'Què Puc Fer?',
  seleccionaExplosivos: 'Selecciona els explosius',
  reiniciar: 'Reiniciar',
  porCraft: 'per craft',
  materialesNecesarios: 'Materials Totals Necessaris',
  materialesBase: 'Materials Base',
  materialesBaseFarmear: 'Materials base que necessites farmejar:',
  crafteosIntermedios: 'Craftejos Intermedis',
  crafteosIntermediosDesc: 'Això és el que craftejaràs amb els materials base:',
  materialesCrafteoFinal: 'Materials per al Crafteig Final',
  materialesCrafteoFinalDesc:
    'Materials necessaris per a craftejar els explosius finals:',
  resultadoFinal: 'Resultat Final',
  resultadoFinalDesc: 'Els explosius que obtindràs:',
  seleccionaParaVer:
    'Selecciona explosius per a veure els materials necessaris',
  materialesUsaras: 'Materials que Utilitzaràs',
  pasosCrafteo: 'Passos de Crafteig',
  craftear: 'Craftejar',
  obtener: 'Obtindre',
  tusMateriales: 'Els Teus Materials',
  modoInfinito: 'Mode Infinit',
  modoExacto: 'Mode Exacte',
  modoInfinitoDesc:
    'Sofre, Pólvora, Explosius i Granada de Llanda mai són infinits (limiten el crafteig). Els altres materials sense valor es consideren infinits.',
  materialesCriticosNota:
    'Materials crítics: han de tindre un valor per a calcular el màxim.',
  maximoCraftear: 'Màxim que pots craftejar',
  seleccionaCraftear: 'Selecciona el que vols craftejar',
  introduceMaterialCritico:
    'Introdueix almenys un material crític (Sofre, Pólvora, Explosius o Granada de Llanda) per a calcular el màxim que pots craftejar.',
  max: 'Màx',
  disp: 'Disp',
  creadoPor: 'Creat per',
  ayudaEn: 'Si vols millorar la pàgina, el codi està disponible a',
  materiales: {
    azufre: 'Sofre',
    carbonVegetal: 'Carbó Vegetal',
    fragmentosMetal: 'Fragments de Metall',
    combustibleGradoBajo: 'Combustible de Grau Baix',
    tela: 'Tela',
    basuraElectronica: 'Ferralla Electrònica',
    tuberiaMetal: 'Canonada de Metall',
    cuerda: 'Corda',
    alijoPequeno: 'Amagatall Petit',
    tanquePropanoVacio: 'Tanc de Propà Buit',
    polvora: 'Pólvora',
    explosivos: 'Explosius',
    granadaLata: 'Granada de Llanda',
  },
  nombresRecetas: {
    polvora: 'Pólvora',
    explosivo: 'Explosius',
    granadaLata: 'Granada de Llanda',
    alijoPequeno: 'Amagatall Petit',
    c4: 'Càrrega Explosiva amb Temporitzador',
    misil: 'Míssil',
    misilAltaVelocidad: "Míssil d'Alta Velocitat",
    misilIncendiario: 'Míssil Incendiari',
    municionExplosiva: 'Munició Explosiva del Calibre 5.56',
    bolsaExplosiva: 'Bossa Explosiva',
    bombaPropano: 'Bomba Explosiva de Propà',
  },
  scrEtiquetaNombreGratis: 'SCR98',
  scrEtiquetaNombreSEOGratis: 'SCR98',
  scrEtiquetaMensajeGratis: 'Subscriu-te, és gratis 😎',
  scrEtiquetaTiempoGratis: 'ara',
  scrEtiquetaNombreDinero: 'Donar a SCR98 €',
  scrEtiquetaNombreSEODinero: 'SCR98',
  scrEtiquetaMensajeDinero: 'Ajuda al projecte 💰💵',
  scrEtiquetaTiempoDinero: '€€€',
}

const EN: Traducciones = {
  tituloApp: 'Rust Raid Calculator',
  tituloAppMovil: 'Rust Calculator',
  subtituloApp: 'Calculate the materials needed for your raids',
  temaClaro: 'Light',
  temaOscuro: 'Dark',
  temaAuto: 'Auto',
  pestanaCalcular: 'Calculate Materials',
  pestanaInventario: 'What Can I Make?',
  seleccionaExplosivos: 'Select explosives',
  reiniciar: 'Reset',
  porCraft: 'per craft',
  materialesNecesarios: 'Total Materials Needed',
  materialesBase: 'Base Materials',
  materialesBaseFarmear: 'Base materials you need to farm:',
  crafteosIntermedios: 'Intermediate Crafts',
  crafteosIntermediosDesc:
    'This is what you will craft with the base materials:',
  materialesCrafteoFinal: 'Final Craft Materials',
  materialesCrafteoFinalDesc: 'Materials needed to craft the final explosives:',
  resultadoFinal: 'Final Result',
  resultadoFinalDesc: 'The explosives you will get:',
  seleccionaParaVer: 'Select explosives to see the materials needed',
  materialesUsaras: 'Materials You Will Use',
  pasosCrafteo: 'Crafting Steps',
  craftear: 'Craft',
  obtener: 'Get',
  tusMateriales: 'Your Materials',
  modoInfinito: 'Infinite Mode',
  modoExacto: 'Exact Mode',
  modoInfinitoDesc:
    'Sulfur, Gunpowder, Explosives and Beancan Grenade are never infinite (they limit crafting). Other materials without a value are considered infinite.',
  materialesCriticosNota:
    'Critical materials: must have a value to calculate the maximum.',
  maximoCraftear: 'Maximum you can craft',
  seleccionaCraftear: 'Select what you want to craft',
  introduceMaterialCritico:
    'Enter at least one critical material (Sulfur, Gunpowder, Explosives or Beancan Grenade) to calculate the maximum you can craft.',
  max: 'Max',
  disp: 'Avail',
  creadoPor: 'Created by',
  ayudaEn: 'If you want to improve the page, the code is available on',
  materiales: {
    azufre: 'Sulfur',
    carbonVegetal: 'Charcoal',
    fragmentosMetal: 'Metal Fragments',
    combustibleGradoBajo: 'Low Grade Fuel',
    tela: 'Cloth',
    basuraElectronica: 'Tech Trash',
    tuberiaMetal: 'Metal Pipe',
    cuerda: 'Rope',
    alijoPequeno: 'Small Stash',
    tanquePropanoVacio: 'Empty Propane Tank',
    polvora: 'Gunpowder',
    explosivos: 'Explosives',
    granadaLata: 'Beancan Grenade',
  },
  nombresRecetas: {
    polvora: 'Gunpowder',
    explosivo: 'Explosives',
    granadaLata: 'Beancan Grenade',
    alijoPequeno: 'Small Stash',
    c4: 'Timed Explosive Charge',
    misil: 'Rocket',
    misilAltaVelocidad: 'High Velocity Rocket',
    misilIncendiario: 'Incendiary Rocket',
    municionExplosiva: 'Explosive 5.56 Rifle Ammo',
    bolsaExplosiva: 'Satchel Charge',
    bombaPropano: 'Explosive Propane Bomb',
  },
  scrEtiquetaNombreGratis: 'SCR98',
  scrEtiquetaNombreSEOGratis: 'SCR98',
  scrEtiquetaMensajeGratis: 'Subscribe, it’s free 😎',
  scrEtiquetaTiempoGratis: 'now',
  scrEtiquetaNombreDinero: 'Donate to SCR98 €',
  scrEtiquetaNombreSEODinero: 'SCR98',
  scrEtiquetaMensajeDinero: 'Support the project 💰💵',
  scrEtiquetaTiempoDinero: '€€€',
}

const TRADUCCIONES_MAP: Record<Idioma, Traducciones> = {
  es: ES,
  va: VA,
  en: EN,
}

export function obtenerTraducciones(idioma: Idioma): Traducciones {
  return TRADUCCIONES_MAP[idioma] || ES
}
