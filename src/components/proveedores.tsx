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
  tema: 'auto',
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
// LOCAL STORAGE
// ========================================
function leerLocalStorage(nombre: string): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(nombre)
}

function escribirLocalStorage(nombre: string, valor: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(nombre, valor)
}

// ========================================
// PROVEEDOR
// ========================================
export function Proveedores({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>('auto')
  const [temaActivo, setTemaActivo] = useState<'claro' | 'oscuro'>('claro')
  const [idioma, setIdioma] = useState<Idioma>('es')
  const [montado, setMontado] = useState(false)

  // Leer localStorage al montar
  useEffect(() => {
    const temaLocalStorage = leerLocalStorage('rust-calc-tema') as Tema | null
    const idiomaLocalStorage = leerLocalStorage(
      'rust-calc-idioma'
    ) as Idioma | null

    if (
      temaLocalStorage &&
      ['claro', 'oscuro', 'auto'].includes(temaLocalStorage)
    ) {
      setTema(temaLocalStorage)
    }
    if (idiomaLocalStorage && ['es', 'va', 'en'].includes(idiomaLocalStorage)) {
      setIdioma(idiomaLocalStorage)
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
    escribirLocalStorage('rust-calc-tema', nuevoTema)
  }, [])

  const cambiarIdioma = useCallback((nuevoIdioma: Idioma) => {
    setIdioma(nuevoIdioma)
    escribirLocalStorage('rust-calc-idioma', nuevoIdioma)
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

  // No renderizar nada hasta que localStorage esté sincronizado
  // El script inline en layout.tsx ya aplicó la clase dark,
  // así que al montar React ya tiene el tema correcto
  // Pero necesitamos esperar para tener el idioma correcto
  if (!montado) {
    return null
  }

  return (
    <ContextoTemaReact.Provider value={valorTema}>
      <ContextoIdiomaReact.Provider value={valorIdioma}>
        {children}
      </ContextoIdiomaReact.Provider>
    </ContextoTemaReact.Provider>
  )
}
