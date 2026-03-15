'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IDIOMAS_DISPONIBLES, type Idioma } from '@/lib/traducciones'
import { ChevronDown, Monitor, Moon, Sun } from 'lucide-react'
import { useIdioma, useTema } from './proveedores'

const OPCIONES_TEMA = [
  { id: 'claro' as const, icono: Sun, temaColor: 'temaClaro' as const },
  { id: 'oscuro' as const, icono: Moon, temaColor: 'temaOscuro' as const },
  { id: 'auto' as const, icono: Monitor, temaColor: 'temaAuto' as const },
]

export function BarraSuperior() {
  const { tema, cambiarTema } = useTema()
  const { idioma, t, cambiarIdioma } = useIdioma()

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
                onClick={() => cambiarTema(opcion.id)}
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
              onClick={() => cambiarIdioma(opcion.id as Idioma)}
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
