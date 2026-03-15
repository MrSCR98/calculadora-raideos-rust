'use client'

import type { PasoCrafteo } from '@/lib/recetas'
import { IMAGENES_MATERIALES, RECETAS } from '@/lib/recetas'
import { Hammer } from 'lucide-react'
import Image from 'next/image'
import { useIdioma } from './proveedores'

interface PropsPasosCrafteo {
  pasos: PasoCrafteo[]
}

// Mapa inverso: nombre espanol de receta -> id de receta
function crearMapaInversoNombres(): Record<string, string> {
  const mapa: Record<string, string> = {}
  for (const [id, receta] of Object.entries(RECETAS)) {
    mapa[receta.nombre] = id
  }
  return mapa
}

const MAPA_NOMBRE_A_ID = crearMapaInversoNombres()

export function PasosCrafteo({ pasos }: PropsPasosCrafteo) {
  const { t } = useIdioma()

  if (pasos.length === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <Hammer className="h-5 w-5 text-primary" />
        {t.pasosCrafteo}
      </h3>
      <div className="space-y-3">
        {pasos.map((paso, indice) => {
          const idReceta = MAPA_NOMBRE_A_ID[paso.item]
          const nombreTraducido = idReceta
            ? t.nombresRecetas[idReceta] || paso.item
            : paso.item
          const imagenReceta = idReceta ? RECETAS[idReceta]?.imagen : undefined

          return (
            <div
              key={`${paso.item}-${indice}`}
              className="rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {indice + 1}
                </span>
                {imagenReceta && (
                  <Image
                    src={imagenReceta}
                    alt={nombreTraducido}
                    width={28}
                    height={28}
                    className="rounded-sm object-cover"
                  />
                )}
                <span className="truncate font-semibold text-card-foreground">
                  {nombreTraducido}
                </span>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-sm text-secondary-foreground">
                  {t.craftear}{' '}
                  <span className="font-bold text-primary">
                    {paso.crafteos}x
                  </span>
                </span>
                <span className="rounded-md bg-accent/80 px-2 py-0.5 text-sm text-accent-foreground">
                  {t.obtener} <span className="font-bold">{paso.cantidad}</span>
                </span>
              </div>
              <div className="ml-9 flex flex-wrap gap-2">
                {Object.entries(paso.materiales).map(([material, cantidad]) => (
                  <span
                    key={material}
                    className="flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground"
                  >
                    {IMAGENES_MATERIALES[material] && (
                      <Image
                        src={IMAGENES_MATERIALES[material]}
                        alt={material}
                        width={16}
                        height={16}
                        className="rounded-sm object-cover"
                      />
                    )}
                    {t.materiales[material] || material}:{' '}
                    <span className="font-bold text-foreground">
                      {cantidad.toLocaleString()}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
