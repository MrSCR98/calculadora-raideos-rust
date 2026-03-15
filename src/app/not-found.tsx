import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-3.5rem-3.5rem)] text-center flex flex-col items-center justify-center gap-4">
      <div className="flex flex-row items-center space-x-2 font-medium">
        <h2 className="text-xl border-r-2 border-neutral-500 pr-2">404</h2>
        <h2>No se pudo encontrar esta página.</h2>
      </div>
      <Link
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-100 rounded-2xl h-10 m-[1px] px-4"
        href="/"
      >
        Volver al inicio
      </Link>
    </main>
  )
}
