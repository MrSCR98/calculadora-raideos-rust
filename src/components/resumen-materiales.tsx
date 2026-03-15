'use client'

import { IMAGENES_MATERIALES, RECETAS } from '@/lib/recetas'
import Image from 'next/image'
import { useIdioma } from './proveedores'

function ImagenMaterial({ id, size = 20 }: { id: string; size?: number }) {
  const src = IMAGENES_MATERIALES[id] || RECETAS[id]?.imagen
  if (!src) return null
  return (
    <Image
      src={src}
      alt={id}
      width={size}
      height={size}
      className="rounded-sm object-cover"
    />
  )
}

interface PropsResumenMateriales {
  materialesBase: Record<string, number>
  materialesIntermedios?: Record<string, number>
  materialesCrafteoFinal?: Record<string, number>
  itemsFinales?: Record<string, number>
  titulo?: string
}

export function ResumenMateriales({
  materialesBase,
  materialesIntermedios = {},
  materialesCrafteoFinal = {},
  itemsFinales = {},
  titulo,
}: PropsResumenMateriales) {
  const { t } = useIdioma()
  const tituloMostrar = titulo || t.materialesNecesarios

  const entradasBase = Object.entries(materialesBase).filter(
    ([, cantidad]) => cantidad > 0
  )
  const entradasIntermedias = Object.entries(materialesIntermedios).filter(
    ([, cantidad]) => cantidad > 0
  )
  const entradasCrafteoFinal = Object.entries(materialesCrafteoFinal).filter(
    ([, cantidad]) => cantidad > 0
  )
  const entradasFinales = Object.entries(itemsFinales).filter(
    ([, cantidad]) => cantidad > 0
  )

  const nombreMaterial = (id: string) => t.materiales[id] || id

  if (
    entradasBase.length === 0 &&
    entradasIntermedias.length === 0 &&
    entradasFinales.length === 0
  ) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 text-center shadow-sm sm:p-6">
        <p className="text-sm text-muted-foreground sm:text-base">
          {t.seleccionaParaVer}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {entradasBase.length > 0 && (
        <div className="rounded-lg border border-amber-300 dark:border-amber-700 bg-card p-4 shadow-sm sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
            {tituloMostrar}
          </h3>
          <p className="mb-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm">
            {t.materialesBaseFarmear}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {entradasBase.map(([material, cantidad]) => (
              <div
                key={material}
                className="flex items-center gap-2 rounded-md bg-amber-50 dark:bg-amber-900/20 p-2 sm:gap-3 sm:p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-amber-100 dark:bg-amber-800/40 shadow-sm sm:h-10 sm:w-10">
                  <ImagenMaterial id={material} size={40} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">
                    {nombreMaterial(material)}
                  </p>
                  <p className="text-sm font-bold text-foreground sm:text-base">
                    {cantidad.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {entradasIntermedias.length > 0 && (
        <div className="rounded-lg border border-orange-300 dark:border-orange-700 bg-card p-4 shadow-sm sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
            {t.crafteosIntermedios}
          </h3>
          <p className="mb-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm">
            {t.crafteosIntermediosDesc}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {entradasIntermedias.map(([material, cantidad]) => (
              <div
                key={material}
                className="flex items-center gap-2 rounded-md bg-orange-50 dark:bg-orange-900/20 p-2 sm:gap-3 sm:p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-orange-100 dark:bg-orange-800/40 shadow-sm sm:h-10 sm:w-10">
                  <ImagenMaterial id={material} size={40} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">
                    {nombreMaterial(material)}
                  </p>
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400 sm:text-base">
                    {cantidad.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {entradasCrafteoFinal.length > 0 && (
        <div className="rounded-lg border border-rose-300 dark:border-rose-700 bg-card p-4 shadow-sm sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
            {t.materialesCrafteoFinal}
          </h3>
          <p className="mb-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm">
            {t.materialesCrafteoFinalDesc}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {entradasCrafteoFinal.map(([material, cantidad]) => (
              <div
                key={material}
                className="flex items-center gap-2 rounded-md bg-rose-50 dark:bg-rose-900/20 p-2 sm:gap-3 sm:p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-rose-100 dark:bg-rose-800/40 shadow-sm sm:h-10 sm:w-10">
                  <ImagenMaterial id={material} size={40} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">
                    {nombreMaterial(material)}
                  </p>
                  <p className="text-sm font-bold text-rose-600 dark:text-rose-400 sm:text-base">
                    {cantidad.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {entradasFinales.length > 0 && (
        <div className="rounded-lg border border-red-300 dark:border-red-700 bg-card p-4 shadow-sm sm:p-6">
          <h3 className="mb-3 text-base font-semibold text-foreground sm:mb-4 sm:text-lg">
            {t.resultadoFinal}
          </h3>
          <p className="mb-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm">
            {t.resultadoFinalDesc}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {entradasFinales.map(([id, cantidad]) => {
              const receta = RECETAS[id]
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 rounded-md bg-red-50 dark:bg-red-900/20 p-2 sm:gap-3 sm:p-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-red-100 dark:bg-red-800/40 shadow-sm sm:h-10 sm:w-10">
                    {receta?.imagen ? (
                      <Image
                        src={receta.imagen}
                        alt={receta.nombre}
                        width={40}
                        height={40}
                        className="rounded-sm object-cover"
                      />
                    ) : (
                      <ImagenMaterial id={id} size={40} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs text-muted-foreground">
                      {t.nombresRecetas[id] || receta?.nombre || id}
                    </p>
                    <p className="text-sm font-bold text-red-600 dark:text-red-400 sm:text-base">
                      {cantidad.toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
