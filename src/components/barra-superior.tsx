'use client'

import { Tema, useIdioma, useTema } from '@/components/proveedores'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IDIOMAS_DISPONIBLES, type Idioma } from '@/lib/traducciones'
import { ChevronDown, Monitor, Moon, Sun } from 'lucide-react'

// AnimatedThemeToggler
import { useIsMobile } from '@/hooks/use-mobile'
import { useCallback, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'

const OPCIONES_TEMA = [
  { id: 'claro' as const, icono: Sun, temaColor: 'temaClaro' as const },
  { id: 'oscuro' as const, icono: Moon, temaColor: 'temaOscuro' as const },
  { id: 'auto' as const, icono: Monitor, temaColor: 'temaAuto' as const },
]

export function BarraSuperior() {
  // const { tema, cambiarTema } = useTema()
  const { idioma, t, cambiarIdioma } = useIdioma()

  // AnimatedThemeToggler
  const { tema, temaActivo, cambiarTema } = useTema()
  const isMobile = useIsMobile()

  const animarTransicionCircular = useCallback(
    (source: HTMLElement, aplicarCambio: () => void, duracion: number) => {
      const { top, left, width, height } = source.getBoundingClientRect()
      const x = left + width / 2
      const y = top + height / 2

      const viewportWidth = window.visualViewport?.width ?? window.innerWidth
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight

      const maxRadius = Math.hypot(
        Math.max(x, viewportWidth - x),
        Math.max(y, viewportHeight - y)
      )

      const startViewTransition = document.startViewTransition?.bind(document)

      if (typeof startViewTransition !== 'function') {
        aplicarCambio()
        return
      }

      const transition = startViewTransition(() => {
        flushSync(aplicarCambio)
      })

      transition?.ready?.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: duracion,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
    },
    []
  )

  const ejecutarCambioTemaConAnimacion = useCallback(
    (nuevoTema: Tema, event?: MouseEvent<HTMLElement>) => {
      if (nuevoTema === tema) return

      const temaVisualActual = temaActivo
      const temaVisualNuevo =
        nuevoTema === 'auto'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'oscuro'
            : 'claro'
          : nuevoTema

      const aplicarCambio = () => {
        cambiarTema(nuevoTema)
      }

      if (temaVisualNuevo === temaVisualActual) {
        aplicarCambio()
        return
      }

      const source = event?.currentTarget as HTMLElement | undefined
      if (!source) {
        aplicarCambio()
        return
      }

      const duracion = isMobile
        ? 300 // movil
        : 400 // ordenador
      animarTransicionCircular(source, aplicarCambio, duracion)
    },
    [tema, temaActivo, cambiarTema, isMobile, animarTransicionCircular]
  )

  const ejecutarCambioIdiomaConAnimacion = useCallback(
    (nuevoIdioma: Idioma, event?: MouseEvent<HTMLElement>) => {
      if (nuevoIdioma === idioma) return

      const aplicarCambio = () => {
        cambiarIdioma(nuevoIdioma)
      }

      const source = event?.currentTarget as HTMLElement | undefined
      if (!source) {
        aplicarCambio()
        return
      }

      const duracion = isMobile
        ? 300 // movil
        : 400 // ordenador
      animarTransicionCircular(source, aplicarCambio, duracion)
    },
    [idioma, cambiarIdioma, isMobile, animarTransicionCircular]
  )

  const temaActual =
    OPCIONES_TEMA.find((o) => o.id === tema) || OPCIONES_TEMA[0]
  const IconoTema = temaActual.icono

  return (
    <div className="flex items-center gap-2">
      {/* Selector de tema */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 bg-transparent"
            aria-label="Tema de Color"
          >
            <IconoTema className="h-4 w-4" />
            <span className="hidden sm:inline">{t[temaActual.temaColor]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-1 p-1">
          {OPCIONES_TEMA.map((opcion) => {
            const Icono = opcion.icono
            return (
              <DropdownMenuItem
                key={opcion.id}
                // AnimatedThemeToggler
                onClick={(e) => ejecutarCambioTemaConAnimacion(opcion.id, e)}
                // onClick={() => cambiarTema(opcion.id)}
                className={
                  tema === opcion.id ? 'bg-accent text-accent-foreground' : ''
                }
              >
                <Icono className="mr-2 h-4 w-4 text-current" />
                {t[opcion.temaColor]}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selector de idioma */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 bg-transparent"
          >
            <span className="text-sm">{idioma.toUpperCase()}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="space-y-1 p-1">
          {IDIOMAS_DISPONIBLES.map((opcion) => (
            <DropdownMenuItem
              key={opcion.id}
              // onClick={() => cambiarIdioma(opcion.id as Idioma)}
              // AnimatedThemeToggler
              onClick={(e) =>
                ejecutarCambioIdiomaConAnimacion(opcion.id as Idioma, e)
              }
              className={
                idioma === opcion.id ? 'bg-accent text-accent-foreground' : ''
              }
            >
              <span className="mr-2 font-mono text-xs">
                {opcion.id.toUpperCase()}
              </span>
              {opcion.nombre}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
