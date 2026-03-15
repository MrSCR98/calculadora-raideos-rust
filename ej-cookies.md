```ts
'use client'

import {
  obtenerTraducciones,
  type Idioma,
  type Traducciones,
} from '@/lib/traducciones'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// ========================================
// TEMA
// ========================================
type Tema = 'claro' | 'oscuro' | 'auto'

interface ContextoTema {
  tema: Tema
  temaActivo: 'claro' | 'oscuro' // El tema real aplicado (resuelve "auto")
  cambiarTema: (t: Tema) => void
}

const ContextoTemaReact = createContext<ContextoTema>({
  tema: 'claro',
  temaActivo: 'claro',
  cambiarTema: () => {},
})

export function useTema() {
  return useContext(ContextoTemaReact)
}

// ========================================
// IDIOMA
// ========================================
interface ContextoIdioma {
  idioma: Idioma
  t: Traducciones
  cambiarIdioma: (i: Idioma) => void
}

const ContextoIdiomaReact = createContext<ContextoIdioma>({
  idioma: 'es',
  t: obtenerTraducciones('es'),
  cambiarIdioma: () => {},
})

export function useIdioma() {
  return useContext(ContextoIdiomaReact)
}

// ========================================
// COOKIES
// ========================================
function leerCookie(nombre: string): string | null {
  if (typeof document === 'undefined') return null
  const coincidencia = document.cookie.match(
    new RegExp(`(?:^|; )${nombre}=([^;]*)`)
  )
  return coincidencia ? decodeURIComponent(coincidencia[1]) : null
}

function escribirCookie(nombre: string, valor: string) {
  const maxEdad = 60 * 60 * 24 * 365 // 1 ano
  document.cookie = `${nombre}=${encodeURIComponent(valor)};path=/;max-age=${maxEdad};SameSite=Lax`
}

// ========================================
// PROVEEDOR
// ========================================
export function Proveedores({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>('claro')
  const [temaActivo, setTemaActivo] = useState<'claro' | 'oscuro'>('claro')
  const [idioma, setIdioma] = useState<Idioma>('es')
  const [montado, setMontado] = useState(false)

  // Leer cookies al montar
  useEffect(() => {
    const temaCookie = leerCookie('rust-calc-tema') as Tema | null
    const idiomaCookie = leerCookie('rust-calc-idioma') as Idioma | null

    if (temaCookie && ['claro', 'oscuro', 'auto'].includes(temaCookie)) {
      setTema(temaCookie)
    }
    if (idiomaCookie && ['es', 'va', 'en'].includes(idiomaCookie)) {
      setIdioma(idiomaCookie)
    }
    setMontado(true)
  }, [])

  // Resolver tema activo y aplicar clase dark
  useEffect(() => {
    if (!montado) return

    let resuelto: 'claro' | 'oscuro' = 'claro'

    if (tema === 'auto') {
      const preferencia = window.matchMedia('(prefers-color-scheme: dark)')
      resuelto = preferencia.matches ? 'oscuro' : 'claro'

      const manejarCambio = (e: MediaQueryListEvent) => {
        const nuevoTema = e.matches ? 'oscuro' : 'claro'
        setTemaActivo(nuevoTema)
        if (nuevoTema === 'oscuro') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }

      preferencia.addEventListener('change', manejarCambio)
      setTemaActivo(resuelto)

      if (resuelto === 'oscuro') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      return () => preferencia.removeEventListener('change', manejarCambio)
    }

    resuelto = tema === 'oscuro' ? 'oscuro' : 'claro'
    setTemaActivo(resuelto)

    if (resuelto === 'oscuro') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [tema, montado])

  const cambiarTema = useCallback((nuevoTema: Tema) => {
    setTema(nuevoTema)
    escribirCookie('rust-calc-tema', nuevoTema)
  }, [])

  const cambiarIdioma = useCallback((nuevoIdioma: Idioma) => {
    setIdioma(nuevoIdioma)
    escribirCookie('rust-calc-idioma', nuevoIdioma)
  }, [])

  const t = useMemo(() => obtenerTraducciones(idioma), [idioma])

  const valorTema = useMemo(
    () => ({ tema, temaActivo, cambiarTema }),
    [tema, temaActivo, cambiarTema]
  )

  const valorIdioma = useMemo(
    () => ({ idioma, t, cambiarIdioma }),
    [idioma, t, cambiarIdioma]
  )

  // Evitar flash con tema incorrecto
  if (!montado) {
    return (
      <ContextoTemaReact.Provider value={valorTema}>
        <ContextoIdiomaReact.Provider value={valorIdioma}>
          {children}
        </ContextoIdiomaReact.Provider>
      </ContextoTemaReact.Provider>
    )
  }

  return (
    <ContextoTemaReact.Provider value={valorTema}>
      <ContextoIdiomaReact.Provider value={valorIdioma}>
        {children}
      </ContextoIdiomaReact.Provider>
    </ContextoTemaReact.Provider>
  )
}

```
