// ========================================
// CONFIGURACION DE RECETAS - FACIL DE EDITAR
// ========================================

export interface Receta {
  id: string
  nombre: string
  nombreCorto: string
  imagen: string
  cantidadCrafteo: number
  esIntermedio?: boolean
  requiere: {
    azufre?: number
    carbonVegetal?: number
    fragmentosMetal?: number
    combustibleGradoBajo?: number
    tela?: number
    basuraElectronica?: number
    tuberiaMetal?: number
    cuerda?: number
    tanquePropanoVacio?: number
    polvora?: number
    explosivos?: number
    granadaLata?: number
    alijoPequeno?: number
  }
}

// ========================================
// RECETAS
// ========================================

export const RECETAS: Record<string, Receta> = {
  polvora: {
    id: 'polvora',
    nombre: 'Polvora',
    nombreCorto: 'Polvora',
    imagen: '/images/gunpowder.avif',
    cantidadCrafteo: 10,
    esIntermedio: true,
    requiere: { carbonVegetal: 30, azufre: 20 },
  },
  explosivo: {
    id: 'explosivo',
    nombre: 'Explosivos',
    nombreCorto: 'Explosivos',
    imagen: '/images/explosives.avif',
    cantidadCrafteo: 1,
    esIntermedio: true,
    requiere: {
      polvora: 50,
      combustibleGradoBajo: 3,
      azufre: 10,
      fragmentosMetal: 10,
    },
  },
  granadaLata: {
    id: 'granadaLata',
    nombre: 'Granada de Lata',
    nombreCorto: 'Granada de Lata',
    imagen: '/images/grenade.beancan.avif',
    cantidadCrafteo: 1,
    esIntermedio: true,
    requiere: { polvora: 60, fragmentosMetal: 20 },
  },
  alijoPequeno: {
    id: 'alijoPequeno',
    nombre: 'Alijo Pequeno',
    nombreCorto: 'Alijo Pequeno',
    imagen: '/images/stash.small.avif',
    cantidadCrafteo: 1,
    esIntermedio: true,
    requiere: { tela: 10 },
  },
  c4: {
    id: 'c4',
    nombre: 'Carga Explosiva con Temporizador',
    nombreCorto: 'Carga Explosiva con Temporizador',
    imagen: '/images/explosive.timed.avif',
    cantidadCrafteo: 1,
    requiere: { explosivos: 20, tela: 5, basuraElectronica: 2 },
  },
  misil: {
    id: 'misil',
    nombre: 'Misil',
    nombreCorto: 'Misil',
    imagen: '/images/ammo.rocket.basic.avif',
    cantidadCrafteo: 1,
    requiere: { tuberiaMetal: 2, polvora: 150, explosivos: 10 },
  },
  misilAltaVelocidad: {
    id: 'misilAltaVelocidad',
    nombre: 'Misil de Alta Velocidad',
    nombreCorto: 'Misil de Alta Velocidad',
    imagen: '/images/ammo.rocket.hv.avif',
    cantidadCrafteo: 1,
    requiere: { tuberiaMetal: 1, polvora: 100 },
  },
  misilIncendiario: {
    id: 'misilIncendiario',
    nombre: 'Misil Incendiario',
    nombreCorto: 'Misil Incendiario',
    imagen: '/images/ammo.rocket.fire.avif',
    cantidadCrafteo: 1,
    requiere: { tuberiaMetal: 2, polvora: 150, combustibleGradoBajo: 75 },
  },
  municionExplosiva: {
    id: 'municionExplosiva',
    nombre: 'Municion Explosiva del Calibre 5.56',
    nombreCorto: 'Municion Explosiva del Calibre 5.56',
    imagen: '/images/ammo.rifle.explosive.avif',
    cantidadCrafteo: 2,
    requiere: { fragmentosMetal: 10, polvora: 20, azufre: 10 },
  },
  bolsaExplosiva: {
    id: 'bolsaExplosiva',
    nombre: 'Bolsa Explosiva',
    nombreCorto: 'Bolsa Explosiva',
    imagen: '/images/explosive.satchel.avif',
    cantidadCrafteo: 1,
    requiere: { granadaLata: 4, alijoPequeno: 1, cuerda: 1 },
  },
  bombaPropano: {
    id: 'bombaPropano',
    nombre: 'Bomba Explosiva de Propano',
    nombreCorto: 'Bomba Explosiva de Propano',
    imagen: '/images/catapult.ammo.explosive.avif',
    cantidadCrafteo: 1,
    requiere: { tanquePropanoVacio: 1, polvora: 450, combustibleGradoBajo: 20 },
  },
}

export const EXPLOSIVOS_FINALES = [
  'c4',
  'misil',
  'misilAltaVelocidad',
  'misilIncendiario',
  'municionExplosiva',
  'bolsaExplosiva',
  'granadaLata',
  'bombaPropano',
]

const IDS_INTERMEDIOS = ['polvora', 'explosivos', 'granadaLata', 'alijoPequeno']

export const MATERIALES_INTERMEDIOS = ['polvora', 'explosivos', 'granadaLata']

// Materiales criticos: estos NUNCA son infinitos
export const MATERIALES_CRITICOS = [
  'azufre',
  'polvora',
  'explosivos',
  'granadaLata',
]

// Imagenes de cada material (los nombres se obtienen de traducciones.ts)
export const IMAGENES_MATERIALES: Record<string, string> = {
  azufre: '/images/sulfur.avif',
  carbonVegetal: '/images/charcoal.avif',
  fragmentosMetal: '/images/metal.fragments.avif',
  combustibleGradoBajo: '/images/lowgradefuel.avif',
  tela: '/images/cloth.avif',
  basuraElectronica: '/images/techparts.avif',
  tuberiaMetal: '/images/metalpipe.avif',
  cuerda: '/images/rope.avif',
  alijoPequeno: '/images/stash.small.avif',
  tanquePropanoVacio: '/images/propanetank.avif',
  polvora: '/images/gunpowder.avif',
  explosivos: '/images/explosives.avif',
  granadaLata: '/images/grenade.beancan.avif',
}

// ========================================
// FUNCIONES DE CALCULO
// ========================================

export interface PasoCrafteo {
  item: string
  cantidad: number
  crafteos: number
  materiales: Record<string, number>
}

export interface ResultadoCalculo {
  materialesBase: Record<string, number>
  materialesIntermedios: Record<string, number>
  materialesCrafteoFinal: Record<string, number>
  pasos: PasoCrafteo[]
}

export function calcularMateriales(
  idItem: string,
  cantidad: number,
  intermediosDisponibles: Record<string, number> = {}
): ResultadoCalculo {
  const materialesBase: Record<string, number> = {}
  const materialesIntermedios: Record<string, number> = {}
  const materialesCrafteoFinal: Record<string, number> = {}
  const pasos: PasoCrafteo[] = []
  const necesidadesIntermedias: Record<string, number> = {}
  const intermediosRestantes = { ...intermediosDisponibles }

  const receta = RECETAS[idItem]
  if (!receta || cantidad <= 0) {
    return {
      materialesBase,
      materialesIntermedios,
      materialesCrafteoFinal,
      pasos,
    }
  }

  const crafteosNecesarios = Math.ceil(cantidad / receta.cantidadCrafteo)
  const cantidadReal = crafteosNecesarios * receta.cantidadCrafteo

  const pasoFinal: PasoCrafteo = {
    item: receta.nombre,
    cantidad: cantidadReal,
    crafteos: crafteosNecesarios,
    materiales: {},
  }

  for (const [material, cantidadRequerida] of Object.entries(receta.requiere)) {
    const totalNecesario = (cantidadRequerida as number) * crafteosNecesarios
    pasoFinal.materiales[material] = totalNecesario
    materialesCrafteoFinal[material] =
      (materialesCrafteoFinal[material] || 0) + totalNecesario

    if (IDS_INTERMEDIOS.includes(material)) {
      const disponible = intermediosRestantes[material] || 0
      const usarDelInventario = Math.min(disponible, totalNecesario)
      const fabricar = totalNecesario - usarDelInventario
      intermediosRestantes[material] = disponible - usarDelInventario
      if (fabricar > 0) {
        necesidadesIntermedias[material] =
          (necesidadesIntermedias[material] || 0) + fabricar
      }
      materialesIntermedios[material] =
        (materialesIntermedios[material] || 0) + totalNecesario
    } else {
      materialesBase[material] =
        (materialesBase[material] || 0) + totalNecesario
    }
  }

  pasos.push(pasoFinal)

  const procesarIntermedio = (idIntermedio: string, necesario: number) => {
    const idReceta = idIntermedio === 'explosivos' ? 'explosivo' : idIntermedio
    const recetaInt = RECETAS[idReceta]
    if (!recetaInt || necesario <= 0) return

    const crafteosInt = Math.ceil(necesario / recetaInt.cantidadCrafteo)

    const paso: PasoCrafteo = {
      item: recetaInt.nombre,
      cantidad: crafteosInt * recetaInt.cantidadCrafteo,
      crafteos: crafteosInt,
      materiales: {},
    }

    for (const [material, cantidadRequerida] of Object.entries(
      recetaInt.requiere
    )) {
      const totalNecesario = (cantidadRequerida as number) * crafteosInt
      paso.materiales[material] = totalNecesario

      if (IDS_INTERMEDIOS.includes(material)) {
        const disponible = intermediosRestantes[material] || 0
        const usarDelInventario = Math.min(disponible, totalNecesario)
        const fabricar = totalNecesario - usarDelInventario
        intermediosRestantes[material] = disponible - usarDelInventario
        if (fabricar > 0) {
          necesidadesIntermedias[material] =
            (necesidadesIntermedias[material] || 0) + fabricar
        }
        materialesIntermedios[material] =
          (materialesIntermedios[material] || 0) + totalNecesario
      } else {
        materialesBase[material] =
          (materialesBase[material] || 0) + totalNecesario
      }
    }

    pasos.unshift(paso)
  }

  if (necesidadesIntermedias.alijoPequeno)
    procesarIntermedio('alijoPequeno', necesidadesIntermedias.alijoPequeno)
  if (necesidadesIntermedias.explosivos)
    procesarIntermedio('explosivos', necesidadesIntermedias.explosivos)
  if (necesidadesIntermedias.granadaLata)
    procesarIntermedio('granadaLata', necesidadesIntermedias.granadaLata)
  if (necesidadesIntermedias.polvora)
    procesarIntermedio('polvora', necesidadesIntermedias.polvora)

  return {
    materialesBase,
    materialesIntermedios,
    materialesCrafteoFinal,
    pasos,
  }
}

export function agruparPasosCrafteo(pasos: PasoCrafteo[]): PasoCrafteo[] {
  const agrupados: Record<string, PasoCrafteo> = {}

  for (const paso of pasos) {
    if (agrupados[paso.item]) {
      agrupados[paso.item].cantidad += paso.cantidad
      agrupados[paso.item].crafteos += paso.crafteos
      for (const [material, cantidad] of Object.entries(paso.materiales)) {
        agrupados[paso.item].materiales[material] =
          (agrupados[paso.item].materiales[material] || 0) + cantidad
      }
    } else {
      agrupados[paso.item] = { ...paso, materiales: { ...paso.materiales } }
    }
  }

  const orden = ['Polvora', 'Alijo Pequeno', 'Granada de Lata', 'Explosivos']
  return Object.values(agrupados).sort((a, b) => {
    const indA = orden.indexOf(a.item)
    const indB = orden.indexOf(b.item)
    if (indA === -1 && indB === -1) return 0
    if (indA === -1) return 1
    if (indB === -1) return -1
    return indA - indB
  })
}

export function agruparMaterialesCrafteoFinal(
  itemsSeleccionados: Record<string, number>
): Record<string, number> {
  const agrupados: Record<string, number> = {}
  for (const [idItem, cantidad] of Object.entries(itemsSeleccionados)) {
    if (cantidad <= 0) continue
    const receta = RECETAS[idItem]
    if (!receta) continue
    const crafteosNecesarios = Math.ceil(cantidad / receta.cantidadCrafteo)
    for (const [material, cantidadRequerida] of Object.entries(
      receta.requiere
    )) {
      agrupados[material] =
        (agrupados[material] || 0) +
        (cantidadRequerida as number) * crafteosNecesarios
    }
  }
  return agrupados
}

// ========================================
// CALCULO DE MATERIALES BASE TOTALES
// Resuelve todos los intermedios recursivamente
// ========================================

export function resolverMaterialesBase(
  idItem: string,
  cantidad: number,
  intermediosInventario: Record<string, number> = {}
): Record<string, number> {
  const resultado = calcularMateriales(idItem, cantidad, intermediosInventario)
  return resultado.materialesBase
}

// ========================================
// CALCULO DE MAXIMO - BUSQUEDA BINARIA
// ========================================

export function calcularMaximoUno(
  idExplosivo: string,
  materialesDisponibles: Record<string, number>,
  intermediosInventario: Record<string, number> = {}
): number {
  const receta = RECETAS[idExplosivo]
  if (!receta) return 0

  let bajo = 0
  let alto = 50000

  // Primero verificar si al menos se puede hacer 1
  const materialesParaUno = resolverMaterialesBase(
    idExplosivo,
    receta.cantidadCrafteo,
    { ...intermediosInventario }
  )
  let puedeHacerUno = true
  for (const [mat, necesario] of Object.entries(materialesParaUno)) {
    if ((materialesDisponibles[mat] || 0) < necesario) {
      puedeHacerUno = false
      break
    }
  }
  if (!puedeHacerUno) return 0

  while (bajo < alto) {
    const medio = Math.ceil((bajo + alto) / 2)
    // Ajustar medio al multiplo de cantidadCrafteo
    const medioAjustado =
      Math.ceil(medio / receta.cantidadCrafteo) * receta.cantidadCrafteo
    const materialesNecesarios = resolverMaterialesBase(
      idExplosivo,
      medioAjustado,
      { ...intermediosInventario }
    )

    let puedeFabricar = true
    for (const [mat, necesario] of Object.entries(materialesNecesarios)) {
      if ((materialesDisponibles[mat] || 0) < necesario) {
        puedeFabricar = false
        break
      }
    }

    if (puedeFabricar) {
      bajo = medioAjustado
      if (bajo >= alto) break
    } else {
      alto = medioAjustado - receta.cantidadCrafteo
    }
  }

  return Math.max(
    0,
    Math.floor(bajo / receta.cantidadCrafteo) * receta.cantidadCrafteo
  )
}

export function calcularMaximoExplosivos(
  materiales: Record<string, number>,
  intermedios: Record<string, number> = {}
): Record<string, number> {
  const resultado: Record<string, number> = {}
  for (const idExplosivo of EXPLOSIVOS_FINALES) {
    resultado[idExplosivo] = calcularMaximoUno(
      idExplosivo,
      materiales,
      intermedios
    )
  }
  return resultado
}

// ========================================
// CALCULO DE DISPONIBLE RESTANTE
// Calcula cuantos MAS de un explosivo puedes fabricar
// descontando los materiales que ya gastan los OTROS seleccionados
// ========================================

export function calcularTodosDisponibles(
  seleccionActual: Record<string, number>,
  materialesBase: Record<string, number>,
  intermediosInventario: Record<string, number> = {}
): Record<string, number> {
  const resultado: Record<string, number> = {}

  for (const idExplosivo of EXPLOSIVOS_FINALES) {
    // Paso 1: Calcular materiales base gastados por TODOS LOS OTROS seleccionados
    const gastadosPorOtros: Record<string, number> = {}
    for (const [otroId, otraCantidad] of Object.entries(seleccionActual)) {
      if (otroId === idExplosivo || otraCantidad <= 0) continue
      const gastado = resolverMaterialesBase(otroId, otraCantidad, {
        ...intermediosInventario,
      })
      for (const [mat, cant] of Object.entries(gastado)) {
        gastadosPorOtros[mat] = (gastadosPorOtros[mat] || 0) + cant
      }
    }

    // Paso 2: Restar lo gastado por otros de los materiales disponibles
    const materialesRestantes: Record<string, number> = {}
    for (const [mat, cant] of Object.entries(materialesBase)) {
      materialesRestantes[mat] = Math.max(
        0,
        cant - (gastadosPorOtros[mat] || 0)
      )
    }

    // Paso 3: Calcular maximo con los materiales restantes
    const maxConRestantes = calcularMaximoUno(
      idExplosivo,
      materialesRestantes,
      intermediosInventario
    )

    // Paso 4: El disponible es el max con restantes MENOS lo ya seleccionado de este
    const yaSeleccionado = seleccionActual[idExplosivo] || 0
    resultado[idExplosivo] = Math.max(0, maxConRestantes - yaSeleccionado)
  }

  return resultado
}
