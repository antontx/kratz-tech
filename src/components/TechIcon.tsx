import type { SVGProps, ComponentType } from 'react'

// SVGL icons
import { ReactLight } from '@/components/ui/svgs/reactLight'
import { Angular } from '@/components/ui/svgs/angular'
import { Typescript } from '@/components/ui/svgs/typescript'
import { Python } from '@/components/ui/svgs/python'
import { Postgresql } from '@/components/ui/svgs/postgresql'
import { Docker } from '@/components/ui/svgs/docker'
import { Vercel } from '@/components/ui/svgs/vercel'
import { Prisma } from '@/components/ui/svgs/prisma'
import { Fastapi } from '@/components/ui/svgs/fastapi'
import { Tailwindcss } from '@/components/ui/svgs/tailwindcss'
import { NextjsIconDark } from '@/components/ui/svgs/nextjsIconDark'
import { AwsLight } from '@/components/ui/svgs/awsLight'
import { Trpc } from '@/components/ui/svgs/trpc'
import { Openai } from '@/components/ui/svgs/openai'
import { Nodejs } from '@/components/ui/svgs/nodejs'
import { MongodbIconLight } from '@/components/ui/svgs/mongodbIconLight'

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>

// Fallback paths for icons not in SVGL
const fallbackPaths: Record<string, string> = {
  langchain: 'M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.5L17.5 7.5 12 10.5 6.5 7.5 12 4.5zM6 9l5 2.5v7L6 16V9zm12 0v7l-5 2.5v-7L18 9z',
  openaiAlt: 'M22.28 9.37a5.83 5.83 0 0 0-.51-4.79 5.91 5.91 0 0 0-6.37-2.82 5.88 5.88 0 0 0-4.41-1.97A5.91 5.91 0 0 0 5.4 3.36a5.83 5.83 0 0 0-3.9 2.83 5.91 5.91 0 0 0 .73 6.94 5.83 5.83 0 0 0 .51 4.79 5.91 5.91 0 0 0 6.37 2.82 5.88 5.88 0 0 0 4.41 1.97 5.91 5.91 0 0 0 5.59-3.57 5.83 5.83 0 0 0 3.9-2.83 5.91 5.91 0 0 0-.73-6.94zm-8.78 12.4a4.42 4.42 0 0 1-2.85-1.03l.14-.08 4.73-2.73a.77.77 0 0 0 .39-.67v-6.67l2 1.15a.07.07 0 0 1 .04.05v5.53a4.46 4.46 0 0 1-4.45 4.45z',
  matplotlib: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
  mnist: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z',
  lambda: 'M14.63 7.18l-2.97 8.23-2.46-6.81H6.82l3.6 9.13c.17.43.35.77.56 1.01.21.25.51.37.92.37.41 0 .71-.12.92-.37.21-.24.39-.58.56-1.01l4.3-10.55h-3.05z M5.45 3L2 21h3.17l.93-4.85h3.14L7.45 3H5.45z',
  dynamodb: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z',
  s3: 'M20.9 10.78l-1-.09-.4-.74.62-.79c.24-.3.2-.73-.08-.99l-1.2-1.1a.75.75 0 0 0-1-.05l-.77.59-.8-.35-.15-.98a.75.75 0 0 0-.74-.63h-1.64a.75.75 0 0 0-.74.63l-.15.98-.8.35-.77-.59a.75.75 0 0 0-1 .05l-1.2 1.1a.75.75 0 0 0-.08.99l.62.79-.4.74-1 .09a.75.75 0 0 0-.66.74v1.55c0 .37.28.7.66.74l1 .09.4.74-.62.79a.75.75 0 0 0 .08.99l1.2 1.1c.27.25.7.28 1 .05l.77-.59.8.35.15.98c.05.37.38.63.74.63h1.64c.37 0 .7-.26.74-.63l.15-.98.8-.35.77.59c.3.23.72.2 1-.05l1.2-1.1c.28-.26.32-.7.08-.99l-.62-.79.4-.74 1-.09a.75.75 0 0 0 .66-.74v-1.55a.75.75 0 0 0-.66-.74zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
  bedrock: 'M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.35 3.53L12 11.24 5.65 7.71 12 4.18zM5 9.06l6 3.33v6.35l-6-3.33V9.06zm14 6.35l-6 3.33v-6.35l6-3.33v6.35z',
  apigateway: 'M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z',
  jupyter: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  numpy: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  default: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
}

// Map tech names to SVGL components
const svglIconMap: Record<string, SvgComponent> = {
  react: ReactLight,
  'react dashboard': ReactLight,
  angular: Angular,
  'angular app': Angular,
  'next.js': NextjsIconDark,
  'next.js app': NextjsIconDark,
  nextjs: NextjsIconDark,
  typescript: Typescript,
  python: Python,
  postgresql: Postgresql,
  postgres: Postgresql,
  docker: Docker,
  vercel: Vercel,
  prisma: Prisma,
  'prisma orm': Prisma,
  fastapi: Fastapi,
  tailwind: Tailwindcss,
  'tailwind css': Tailwindcss,
  aws: AwsLight,
  trpc: Trpc,
  'trpc api': Trpc,
  openai: Openai,
  'node.js': Nodejs,
  nodejs: Nodejs,
  mongodb: MongodbIconLight,
}

// Map tech names to fallback paths
const fallbackIconMap: Record<string, string> = {
  'aws lambda': fallbackPaths.lambda,
  lambda: fallbackPaths.lambda,
  dynamodb: fallbackPaths.dynamodb,
  s3: fallbackPaths.s3,
  'api gateway': fallbackPaths.apigateway,
  bedrock: fallbackPaths.bedrock,
  langchain: fallbackPaths.langchain,
  'jupyter notebook': fallbackPaths.jupyter,
  numpy: fallbackPaths.numpy,
  matplotlib: fallbackPaths.matplotlib,
  'mnist dataset': fallbackPaths.mnist,
}

export function TechIcon({ name, className = '' }: { name: string; className?: string }) {
  const normalized = name.toLowerCase()
  const SvglIcon = svglIconMap[normalized]

  if (SvglIcon) {
    return <SvglIcon className={`w-4 h-4 ${className}`} />
  }

  const fallbackPath = fallbackIconMap[normalized] || fallbackPaths.default

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-4 h-4 ${className}`}
    >
      <path d={fallbackPath} />
    </svg>
  )
}
