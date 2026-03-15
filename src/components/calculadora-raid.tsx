'use client'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  agruparMaterialesCrafteoFinal,
  agruparPasosCrafteo,
  calcularMateriales,
  calcularMaximoExplosivos,
  calcularTodosDisponibles,
  EXPLOSIVOS_FINALES,
  IMAGENES_MATERIALES,
  MATERIALES_CRITICOS,
  RECETAS,
  type PasoCrafteo,
} from '@/lib/recetas'
import { Bomb, Calculator, Package, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { BarraSuperior } from './barra-superior'
import { PasosCrafteo } from './pasos-crafteo'
import { useIdioma } from './proveedores'
import { ResumenMateriales } from './resumen-materiales'
import SCR98Etiqueta from './scr98-etiqueta'
import { TarjetaExplosivo } from './tarjeta-explosivo'

const MATERIALES_ENTRADA = [
  'azufre',
  'carbonVegetal',
  'fragmentosMetal',
  'combustibleGradoBajo',
  'tela',
  'basuraElectronica',
  'tuberiaMetal',
  'cuerda',
  'tanquePropanoVacio',
]

const INTERMEDIOS_ENTRADA = ['polvora', 'explosivos', 'granadaLata']

export function CalculadoraRaid() {
  const { t } = useIdioma()

  // === Modo 1 ===
  const [cantidadesModo1, setCantidadesModo1] = useState<
    Record<string, number>
  >(Object.fromEntries(EXPLOSIVOS_FINALES.map((id) => [id, 0])))

  // === Modo 2 ===
  const [modoInfinito, setModoInfinito] = useState(true)
  const [misMateriales, setMisMateriales] = useState<
    Record<string, number | null>
  >(Object.fromEntries(MATERIALES_ENTRADA.map((id) => [id, null])))
  const [misIntermedios, setMisIntermedios] = useState<
    Record<string, number | null>
  >(Object.fromEntries(INTERMEDIOS_ENTRADA.map((id) => [id, null])))
  const [cantidadesModo2, setCantidadesModo2] = useState<
    Record<string, number>
  >(Object.fromEntries(EXPLOSIVOS_FINALES.map((id) => [id, 0])))

  // ===========================
  // MODO 1: Calculos
  // ===========================
  const resultadosModo1 = useMemo(() => {
    const todosBase: Record<string, number> = {}
    const todosIntermedios: Record<string, number> = {}
    const todosPasos: PasoCrafteo[] = []
    const todosItemsFinales: Record<string, number> = {}

    for (const [id, cantidad] of Object.entries(cantidadesModo1)) {
      if (cantidad > 0) {
        const resultado = calcularMateriales(id, cantidad)
        for (const [mat, cant] of Object.entries(resultado.materialesBase)) {
          todosBase[mat] = (todosBase[mat] || 0) + cant
        }
        for (const [mat, cant] of Object.entries(
          resultado.materialesIntermedios
        )) {
          todosIntermedios[mat] = (todosIntermedios[mat] || 0) + cant
        }
        todosPasos.push(...resultado.pasos)
        todosItemsFinales[id] = (todosItemsFinales[id] || 0) + cantidad
      }
    }

    return {
      materialesBase: todosBase,
      materialesIntermedios: todosIntermedios,
      materialesCrafteoFinal: agruparMaterialesCrafteoFinal(cantidadesModo1),
      itemsFinales: todosItemsFinales,
      pasos: agruparPasosCrafteo(todosPasos),
    }
  }, [cantidadesModo1])

  // ===========================
  // MODO 2: Materiales efectivos
  // ===========================
  const materialesEfectivos = useMemo(() => {
    const resultado: Record<string, number> = {}
    for (const material of MATERIALES_ENTRADA) {
      const valor = misMateriales[material]
      const esCritico = MATERIALES_CRITICOS.includes(material)
      if (esCritico) {
        resultado[material] = valor ?? 0
      } else {
        resultado[material] =
          modoInfinito && valor === null ? 9999999 : (valor ?? 0)
      }
    }
    return resultado
  }, [misMateriales, modoInfinito])

  const intermediosEfectivos = useMemo(() => {
    const resultado: Record<string, number> = {}
    for (const material of INTERMEDIOS_ENTRADA) {
      const valor = misIntermedios[material]
      const esCritico = MATERIALES_CRITICOS.includes(material)
      if (esCritico) {
        resultado[material] = valor ?? 0
      } else {
        resultado[material] =
          modoInfinito && valor === null ? 9999999 : (valor ?? 0)
      }
    }
    return resultado
  }, [misIntermedios, modoInfinito])

  const maximosAbsolutos = useMemo(() => {
    return calcularMaximoExplosivos(materialesEfectivos, intermediosEfectivos)
  }, [materialesEfectivos, intermediosEfectivos])

  const disponibles = useMemo(() => {
    return calcularTodosDisponibles(
      cantidadesModo2,
      materialesEfectivos,
      intermediosEfectivos
    )
  }, [cantidadesModo2, materialesEfectivos, intermediosEfectivos])

  const resultadosModo2 = useMemo(() => {
    const todosBase: Record<string, number> = {}
    const todosIntermedios: Record<string, number> = {}
    const todosPasos: PasoCrafteo[] = []
    const todosItemsFinales: Record<string, number> = {}

    const intermediosCalculo: Record<string, number> = {}
    for (const [mat, val] of Object.entries(misIntermedios)) {
      intermediosCalculo[mat] = val ?? 0
    }

    for (const [id, cantidad] of Object.entries(cantidadesModo2)) {
      if (cantidad > 0) {
        const resultado = calcularMateriales(id, cantidad, intermediosCalculo)
        for (const [mat, cant] of Object.entries(resultado.materialesBase)) {
          todosBase[mat] = (todosBase[mat] || 0) + cant
        }
        for (const [mat, cant] of Object.entries(
          resultado.materialesIntermedios
        )) {
          todosIntermedios[mat] = (todosIntermedios[mat] || 0) + cant
        }
        todosPasos.push(...resultado.pasos)
        todosItemsFinales[id] = (todosItemsFinales[id] || 0) + cantidad
      }
    }

    return {
      materialesBase: todosBase,
      materialesIntermedios: todosIntermedios,
      materialesCrafteoFinal: agruparMaterialesCrafteoFinal(cantidadesModo2),
      itemsFinales: todosItemsFinales,
      pasos: agruparPasosCrafteo(todosPasos),
    }
  }, [cantidadesModo2, misIntermedios])

  // ===========================
  // Manejadores
  // ===========================
  const manejarCambioModo1 = (id: string, cantidad: number) => {
    setCantidadesModo1((prev) => ({ ...prev, [id]: cantidad }))
  }

  const manejarCambioMaterial = (id: string, valor: number | null) => {
    setMisMateriales((prev) => ({ ...prev, [id]: valor }))
    setCantidadesModo2(
      Object.fromEntries(EXPLOSIVOS_FINALES.map((i) => [i, 0]))
    )
  }

  const manejarCambioIntermedio = (id: string, valor: number | null) => {
    setMisIntermedios((prev) => ({ ...prev, [id]: valor }))
    setCantidadesModo2(
      Object.fromEntries(EXPLOSIVOS_FINALES.map((i) => [i, 0]))
    )
  }

  const manejarCambioModo2 = (id: string, nuevaCantidad: number) => {
    const receta = RECETAS[id]
    if (!receta) return
    const paso = receta.cantidadCrafteo

    const ajustado = Math.round(nuevaCantidad / paso) * paso
    const yaSeleccionado = cantidadesModo2[id] || 0
    const dispRestante = disponibles[id] || 0
    const limiteTotal = yaSeleccionado + dispRestante
    const limiteAjustado = Math.floor(limiteTotal / paso) * paso

    const limitado = Math.max(0, Math.min(ajustado, limiteAjustado))
    setCantidadesModo2((prev) => ({ ...prev, [id]: limitado }))
  }

  const reiniciarModo1 = () => {
    setCantidadesModo1(
      Object.fromEntries(EXPLOSIVOS_FINALES.map((id) => [id, 0]))
    )
  }

  const reiniciarModo2 = () => {
    setMisMateriales(
      Object.fromEntries(MATERIALES_ENTRADA.map((id) => [id, null]))
    )
    setMisIntermedios(
      Object.fromEntries(INTERMEDIOS_ENTRADA.map((id) => [id, null]))
    )
    setCantidadesModo2(
      Object.fromEntries(EXPLOSIVOS_FINALES.map((id) => [id, 0]))
    )
  }

  const tieneMaterialCritico = useMemo(() => {
    for (const material of MATERIALES_CRITICOS) {
      if (
        MATERIALES_ENTRADA.includes(material) &&
        misMateriales[material] !== null &&
        misMateriales[material]! > 0
      )
        return true
      if (
        INTERMEDIOS_ENTRADA.includes(material) &&
        misIntermedios[material] !== null &&
        misIntermedios[material]! > 0
      )
        return true
    }
    return false
  }, [misMateriales, misIntermedios])

  return (
    <div className="mx-auto max-w-6xl p-3 sm:p-4 md:p-6">
      {/* Cabecera */}
      <div className="mb-5 sm:mb-8">
        <div className="mb-3 flex items-start justify-between sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Bomb className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
            {/* <Image
              src="/SCR98-RUST.avif"
              alt="SCR98"
              width={32}
              height={32}
              className="rounded-full object-cover h-8 w-8 sm:h-10 sm:w-10"
            /> */}
            <h1 className="text-balance font-bold text-foreground text-2xl sm:text-3xl md:text-4xl">
              <span className="sr-only lg:not-sr-only lg:inline">
                {t.tituloApp}
              </span>
              <span className="lg:hidden" aria-hidden="true">
                {t.tituloAppMovil}
              </span>
            </h1>
          </div>
          <BarraSuperior />
        </div>
        <p className="mb-4 sm:mb-6 text-sm text-muted-foreground sm:text-base">
          {t.subtituloApp}
        </p>

        <div className="flex gap-4 flex-row flex-wrap items-center justify-center">
          <SCR98Etiqueta
            nombre={t.scrEtiquetaNombreGratis}
            nombreSEO={t.scrEtiquetaNombreSEOGratis}
            mensaje={t.scrEtiquetaMensajeGratis}
            tiempo={t.scrEtiquetaTiempoGratis}
          />
          <SCR98Etiqueta
            nombre={t.scrEtiquetaNombreDinero}
            nombreSEO={t.scrEtiquetaNombreSEODinero}
            mensaje={t.scrEtiquetaMensajeDinero}
            tiempo={t.scrEtiquetaTiempoDinero}
            enlace="https://www.youtube.com/@SCR98/join"
          />
        </div>
      </div>

      <Tabs defaultValue="calcular" className="w-full">
        <TabsList className="mb-4 grid !h-auto w-full grid-cols-2 gap-1 p-1 sm:mb-6">
          <TabsTrigger
            value="calcular"
            className="flex items-center gap-1 px-2 py-2 text-xs sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{t.pestanaCalcular}</span>
          </TabsTrigger>
          <TabsTrigger
            value="inventario"
            className="flex items-center gap-1 px-2 py-2 text-xs sm:gap-2 sm:px-4 sm:text-sm"
          >
            <Package className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{t.pestanaInventario}</span>
          </TabsTrigger>
        </TabsList>

        {/* MODO 1 */}
        <TabsContent value="calcular" className="space-y-4 sm:space-y-6">
          <div className="rounded-lg border border-border bg-card p-3 shadow-sm sm:p-4">
            <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-semibold text-foreground sm:text-lg">
                {t.seleccionaExplosivos}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={reiniciarModo1}
                className="w-full bg-transparent sm:w-auto"
              >
                <RotateCcw className="mr-1 h-3 w-3" />
                {t.reiniciar}
              </Button>
            </div>
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {EXPLOSIVOS_FINALES.map((id) => (
                <TarjetaExplosivo
                  key={id}
                  id={id}
                  cantidad={cantidadesModo1[id] || 0}
                  alCambiarCantidad={manejarCambioModo1}
                  compacto
                />
              ))}
            </div>
          </div>
          <ResumenMateriales
            materialesBase={resultadosModo1.materialesBase}
            materialesIntermedios={resultadosModo1.materialesIntermedios}
            materialesCrafteoFinal={resultadosModo1.materialesCrafteoFinal}
            itemsFinales={resultadosModo1.itemsFinales}
          />
          <PasosCrafteo pasos={resultadosModo1.pasos} />
        </TabsContent>

        {/* MODO 2 */}
        <TabsContent value="inventario" className="space-y-4 sm:space-y-6">
          <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-card p-3 shadow-sm sm:p-4">
            <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-semibold text-foreground sm:text-lg">
                {t.tusMateriales}
              </h2>
              <div className="flex items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <span className="text-xs text-muted-foreground sm:text-sm">
                    {modoInfinito ? t.modoInfinito : t.modoExacto}
                  </span>
                  <Switch
                    checked={modoInfinito}
                    onCheckedChange={setModoInfinito}
                  />
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={reiniciarModo2}
                  className="bg-transparent"
                >
                  <RotateCcw className="mr-1 h-3 w-3" />
                  {t.reiniciar}
                </Button>
              </div>
            </div>

            {modoInfinito && (
              <div className="mb-3 rounded-md bg-amber-50 dark:bg-amber-900/20 p-2 text-xs text-amber-700 dark:text-amber-300 sm:text-sm">
                <strong>{t.modoInfinito}:</strong> {t.modoInfinitoDesc}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
              {[...MATERIALES_ENTRADA, ...INTERMEDIOS_ENTRADA].map(
                (material) => {
                  const esIntermedio = INTERMEDIOS_ENTRADA.includes(material)
                  const valor = esIntermedio
                    ? misIntermedios[material]
                    : misMateriales[material]
                  const esCritico = MATERIALES_CRITICOS.includes(material)
                  const esInfinito =
                    modoInfinito && valor === null && !esCritico
                  return (
                    <div key={material} className="flex flex-col gap-1">
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        {IMAGENES_MATERIALES[material] && (
                          <Image
                            src={IMAGENES_MATERIALES[material]}
                            alt={material}
                            width={18}
                            height={18}
                            className="shrink-0 rounded-sm object-cover"
                          />
                        )}
                        <span className="truncate">
                          {t.materiales[material] || material}
                        </span>
                        {esCritico && (
                          <span className="text-amber-600 dark:text-amber-400">
                            *
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        value={valor ?? ''}
                        placeholder={esInfinito ? 'Inf' : '0'}
                        onChange={(e) => {
                          const v = e.target.value
                          const parsed =
                            v === '' ? null : Math.max(0, parseInt(v) || 0)
                          if (esIntermedio) {
                            manejarCambioIntermedio(material, parsed)
                          } else {
                            manejarCambioMaterial(material, parsed)
                          }
                        }}
                        className={`rounded-md border px-2 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none sm:px-3 sm:py-2 ${
                          esInfinito
                            ? 'border-amber-300 dark:border-amber-600 bg-amber-50/50 dark:bg-amber-900/30'
                            : esCritico && valor === null
                              ? 'border-amber-400 dark:border-amber-500 bg-amber-100/50 dark:bg-amber-900/40'
                              : 'border-border bg-input'
                        }`}
                        min={0}
                      />
                    </div>
                  )
                }
              )}
            </div>

            {modoInfinito && (
              <p className="mt-2 text-xs text-muted-foreground">
                * {t.materialesCriticosNota}
              </p>
            )}
          </div>

          {tieneMaterialCritico && (
            <div className="rounded-lg border border-primary/30 bg-card p-3 shadow-sm sm:p-4">
              <h2 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
                {t.maximoCraftear}
              </h2>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                {EXPLOSIVOS_FINALES.map((id) => {
                  const maximo = maximosAbsolutos[id] || 0
                  const maximoMostrar = maximo > 99999 ? '99999+' : maximo
                  const receta = RECETAS[id]
                  return (
                    <div
                      key={id}
                      className="flex flex-col items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-900/20 p-2 sm:p-3"
                    >
                      <div className="flex flex-row items-center justify-center gap-1 w-full">
                        {receta?.imagen && (
                          <Image
                            src={receta.imagen}
                            alt={receta.nombre}
                            width={24}
                            height={24}
                            className="rounded-sm object-cover"
                          />
                        )}
                        <p className="truncate text-center text-xs text-muted-foreground min-w-0">
                          {t.nombresRecetas[id] || receta?.nombre}
                        </p>
                      </div>

                      <p className="text-lg font-bold text-primary sm:text-xl">
                        {maximoMostrar}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {!tieneMaterialCritico && (
            <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                {t.introduceMaterialCritico}
              </p>
            </div>
          )}

          {tieneMaterialCritico && (
            <div className="rounded-lg border border-border bg-card p-3 shadow-sm sm:p-4">
              <div className="mb-3 sm:mb-4">
                <h2 className="text-base font-semibold text-foreground sm:text-lg">
                  {t.seleccionaCraftear}
                </h2>
              </div>
              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {EXPLOSIVOS_FINALES.map((id) => (
                  <TarjetaExplosivo
                    key={id}
                    id={id}
                    cantidad={cantidadesModo2[id] || 0}
                    cantidadMaxima={maximosAbsolutos[id] || 0}
                    disponibleRestante={disponibles[id] || 0}
                    alCambiarCantidad={manejarCambioModo2}
                    deshabilitado={(maximosAbsolutos[id] || 0) === 0}
                    compacto
                  />
                ))}
              </div>
            </div>
          )}

          {Object.values(cantidadesModo2).some((v) => v > 0) && (
            <>
              <ResumenMateriales
                materialesBase={resultadosModo2.materialesBase}
                materialesIntermedios={resultadosModo2.materialesIntermedios}
                materialesCrafteoFinal={resultadosModo2.materialesCrafteoFinal}
                itemsFinales={resultadosModo2.itemsFinales}
                titulo={t.materialesUsaras}
              />
              <PasosCrafteo pasos={resultadosModo2.pasos} />
            </>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-6 rounded-lg border border-border bg-card p-3 text-center text-xs text-muted-foreground shadow-sm sm:mt-8 sm:p-4 sm:text-sm">
        <p className="leading-relaxed">
          {t.creadoPor}{' '}
          <a
            href="https://www.youtube.com/@SCR98"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="rounded bg-amber-100 dark:bg-amber-800/40 px-1.5 py-0.5 text-amber-700 dark:text-amber-300"
          >
            SCR98
          </a>
          . {t.ayudaEn}{' '}
          <a
            href="https://github.com/MrSCR98/calculadora-raideos-rust"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="rounded bg-amber-100 dark:bg-amber-800/40 px-1.5 py-0.5 text-amber-700 dark:text-amber-300"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  )
}
