import Image from 'next/image'
import type { SVGProps } from 'react'

const YouTube = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 180">
    <path
      fill="#FFF"
      d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
    />
    <path fill="red" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
  </svg>
)

type Props = {
  nombre?: string
  nombreSEO?: string
  mensaje?: string
  imagen?: string
  enlace?: string
  tiempo?: string
}

export default function SCR98Etiqueta({
  nombre = 'SCR98',
  nombreSEO = 'SCR98',
  mensaje = 'Suscríbete, es gratis 😎',
  imagen = '/SCR98-YT.avif',
  enlace = 'https://www.youtube.com/@SCR98?sub_confirmation=1',
  tiempo = 'ahora',
}: Props) {
  return (
    <a
      href={enlace}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="flex items-center bg-muted/60 border sm:border-[1.5px] md:border-2 border-orange-300 dark:border-orange-500 rounded-full w-full max-w-42.5 sm:max-w-63.75 md:max-w-85 p-1 sm:p-1.5 md:p-2 pr-2.5 sm:pr-3.75 md:pr-5 shadow-md shadow-amber-500/10 gap-1.5 sm:gap-2.25 md:gap-3"
    >
      <div className="relative shrink-0">
        <Image
          src={imagen}
          alt={nombreSEO}
          width={64}
          height={64}
          className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover"
        />

        <div className="absolute bottom-0 -right-1 bg-[red] w-2.5 sm:w-3.75 md:w-5 rounded-sm flex items-center justify-center  px-0.5 sm:px-0.75 md:px-1 py-0.75 sm:py-[4.5px] md:py-1.5">
          <YouTube />
        </div>
      </div>

      <div className="flex flex-col flex-1 pl-0.5 sm:pl-0.75 md:pl-1">
        <div className="flex justify-between items-baseline w-full">
          <span className="font-bold text-[9px] sm:text-[13.5px] md:text-lg text-card-foreground leading-[0.625] sm:leading-[0.9375] md:leading-tight">
            {nombre}
          </span>

          <span className="text-card-foreground/40 text-[7px] sm:text-[10.5px] md:text-sm font-medium">
            {tiempo}
          </span>
        </div>

        <span className="text-[8.5px] sm:text-[12.75px] md:text-[17px] text-card-foreground -mt-px sm:-mt-[1.5px] md:-mt-0.5">
          {mensaje}
        </span>
      </div>
    </a>
  )
}
