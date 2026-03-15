'use client'

import { Button } from '@/components/ui/button'
import { RECETAS } from '@/lib/recetas'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import { useIdioma } from './proveedores'

interface PropsTarjetaExplosivo {
  id: string
  cantidad: number
  cantidadMaxima?: number
  disponibleRestante?: number
  alCambiarCantidad: (id: string, cantidad: number) => void
  deshabilitado?: boolean
  compacto?: boolean
}

export function TarjetaExplosivo({
  id,
  cantidad,
  cantidadMaxima,
  disponibleRestante,
  alCambiarCantidad,
  deshabilitado = false,
  compacto = false,
}: PropsTarjetaExplosivo) {
  const { t } = useIdioma()
  const receta = RECETAS[id]
  if (!receta) return null

  const paso = receta.cantidadCrafteo
  const nombreTraducido = t.nombresRecetas[id] || receta.nombre

  const tieneDisp =
    disponibleRestante !== undefined && cantidadMaxima !== undefined
  const limiteReal = tieneDisp
    ? cantidad + disponibleRestante
    : (cantidadMaxima ?? 99999)

  const puedeAumentar = !deshabilitado && cantidad + paso <= limiteReal
  const puedeDisminuir = !deshabilitado && cantidad > 0

  const manejarAumento = () => {
    if (puedeAumentar) {
      alCambiarCantidad(id, cantidad + paso)
    }
  }

  const manejarDisminucion = () => {
    alCambiarCantidad(id, Math.max(0, cantidad - paso))
  }

  const manejarCambioInput = (valor: number) => {
    alCambiarCantidad(id, valor)
  }

  const tieneMaximo = cantidadMaxima !== undefined && cantidadMaxima > 0
  const mostrarDisp = tieneDisp && tieneMaximo

  const formatNum = (n: number) => (n > 99999 ? '99999+' : n.toString())

  if (compacto) {
    return (
      <div
        className={`flex items-center gap-2 rounded-lg border bg-card p-2 shadow-sm transition-all sm:gap-3 sm:p-3 ${
          deshabilitado
            ? 'border-border opacity-60'
            : 'border-border hover:border-primary/50'
        }`}
      >
        {receta.imagen && (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-secondary sm:h-12 sm:w-12">
            <Image
              src={receta.imagen}
              alt={nombreTraducido}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xs font-semibold text-card-foreground sm:text-sm">
            {nombreTraducido}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
            {paso > 1 && (
              <span className="truncate text-scr-alerta-naranja">
                x{paso}/{t.porCraft}
              </span>
            )}
            {(tieneMaximo || mostrarDisp) && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                {tieneMaximo && (
                  <span className="text-primary">
                    {t.max}: {formatNum(cantidadMaxima ?? 0)}
                  </span>
                )}
                {mostrarDisp && (
                  <span
                    className={`font-medium ${disponibleRestante === 0 ? 'text-scr-alerta-rojo' : 'text-scr-alerta-verde'}`}
                  >
                    {t.disp}: {formatNum(disponibleRestante!)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent sm:h-8 sm:w-8"
            onClick={manejarDisminucion}
            disabled={!puedeDisminuir}
            aria-label="Disminuir"
          >
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => manejarCambioInput(parseInt(e.target.value) || 0)}
            className="w-16 rounded-md border border-border bg-input px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none sm:w-20"
            disabled={deshabilitado}
            min={0}
            step={paso}
            aria-label={`Cantidad ${nombreTraducido}`}
          />
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 bg-transparent sm:h-8 sm:w-8"
            onClick={manejarAumento}
            disabled={!puedeAumentar}
            aria-label="Aumentar"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-lg border bg-card p-3 shadow-sm transition-all sm:gap-3 sm:p-4 ${
        deshabilitado
          ? 'border-border opacity-60'
          : 'border-border hover:border-primary/50 hover:shadow-md'
      }`}
    >
      {receta.imagen && (
        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-secondary sm:h-16 sm:w-16">
          <Image
            src={receta.imagen}
            alt={nombreTraducido}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="text-center">
        <h3 className="text-xs font-semibold text-card-foreground sm:text-sm">
          {nombreTraducido}
        </h3>
        {paso > 1 && (
          <p className="truncate text-xs text-scr-alerta-naranja">
            x{paso} {t.porCraft}
          </p>
        )}
        {tieneMaximo && (
          <p className="text-xs font-medium text-primary">
            {t.max}: {formatNum(cantidadMaxima ?? 0)}
          </p>
        )}
        {mostrarDisp && (
          <p
            className={`text-xs font-medium ${disponibleRestante === 0 ? 'text-scr-alerta-rojo' : 'text-scr-alerta-verde'}`}
          >
            {t.disp}: {formatNum(disponibleRestante!)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent sm:h-8 sm:w-8"
          onClick={manejarDisminucion}
          disabled={!puedeDisminuir}
          aria-label="Disminuir"
        >
          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <input
          type="number"
          value={cantidad}
          onChange={(e) => manejarCambioInput(parseInt(e.target.value) || 0)}
          className="w-16 rounded-md border border-border bg-input px-2 py-1 text-center text-sm text-foreground focus:border-primary focus:outline-none sm:w-20"
          disabled={deshabilitado}
          min={0}
          step={paso}
          aria-label={`Cantidad ${nombreTraducido}`}
        />
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent sm:h-8 sm:w-8"
          onClick={manejarAumento}
          disabled={!puedeAumentar}
          aria-label="Aumentar"
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  )
}
