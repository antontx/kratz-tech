// Monotone tech icons (simplified, single-path where possible)
const techIcons: Record<string, string> = {
  // Frameworks & Libraries
  react: 'M14.23 12.004a.75.75 0 0 1-.152-.495c0-2.078-2.456-4.008-6.078-4.008s-6.078 1.93-6.078 4.008c0 .17-.052.34-.152.495C.93 12.866 0 14.082 0 15.5 0 18.538 3.582 21 8 21s8-2.462 8-5.5c0-1.418-.93-2.634-1.77-3.496ZM8 19c-3.314 0-6-1.343-6-3s2.686-3 6-3 6 1.343 6 3-2.686 3-6 3Zm0-14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z M8 10c-4.418 0-8 2.015-8 4.5S3.582 19 8 19s8-2.015 8-4.5S12.418 10 8 10Zm0 7c-2.761 0-5-1.12-5-2.5S5.239 12 8 12s5 1.12 5 2.5S10.761 17 8 17Z',
  angular: 'M8 0L0 2.91l1.22 10.59L8 18l6.78-4.5L16 2.91 8 0Zm0 2.21l5.22 1.89-.89 7.74L8 14.66l-4.33-2.82-.89-7.74L8 2.21Zm0 1.58L4.89 9.12h1.85L8 6.69l1.26 2.43h1.85L8 3.79Z',
  vue: 'M8 2L1 14h2.5L8 6.5 12.5 14H15L8 2Zm0 4l-3 6h6l-3-6Z',
  nextjs: 'M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM6.5 4v5.5l4-3.5v5.5h1V5.5l-4 3.5V4h-1Z',
  typescript: 'M0 2v12h16V2H0Zm10.5 9.5v-1h2v-3h1v4h-3Zm-6.5-4h1.5v4h1v-4H8v-1H4v1Z',
  python: 'M8 0C5.24 0 4 1.14 4 2.5V4h4v.5H3C1.34 4.5 0 5.84 0 7.5v1c0 1.66 1.34 3 3 3h1v-1.5c0-1.1.9-2 2-2h4c1.1 0 2-.9 2-2v-3C12 1.14 10.76 0 8 0ZM5.5 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM8 16c2.76 0 4-1.14 4-2.5V12H8v-.5h5c1.66 0 3-1.34 3-3v-1c0-1.66-1.34-3-3-3h-1v1.5c0 1.1-.9 2-2 2H6c-1.1 0-2 .9-2 2v3c0 1.86 1.24 3 4 3Zm2.5-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z',
  nodejs: 'M8 0l7 4v8l-7 4-7-4V4l7-4Zm0 1.5L2 5v6l6 3.5 6-3.5V5L8 1.5ZM6 6h4v1H7v3h3v1H6V6Z',

  // Cloud & Infrastructure
  aws: 'M4.5 7.5C3.67 7.5 3 8.17 3 9c0 .38.14.73.38 1L8 14l4.62-4c.24-.27.38-.62.38-1 0-.83-.67-1.5-1.5-1.5-.47 0-.89.22-1.16.56L8 11l-2.34-2.94A1.49 1.49 0 0 0 4.5 7.5ZM8 2L1 6v4l7 4 7-4V6L8 2Z',
  docker: 'M15 6.5c-.3-.2-.9-.3-1.4-.2-.2-1-.8-1.5-1.6-1.9l-.3-.2-.2.3c-.3.5-.4 1-.3 1.5.1.4.3.8.6 1.1-.5.3-1.5.4-1.8.4H.5l-.1.5c-.1.8 0 1.7.3 2.5.4 1 1 1.8 1.9 2.3 1 .5 2.5.8 4.1.6.6 0 1.2-.1 1.8-.3.7-.2 1.4-.5 2-.9.5-.4 1-.8 1.4-1.3.6-.8 1-1.7 1.2-2.7h.4c.8 0 1.3-.3 1.6-.6.2-.2.3-.4.4-.6l.1-.3-.2-.2ZM2 8h1.3v1.2H2V8Zm1.8 0h1.3v1.2H3.8V8Zm0-1.5h1.3V7.7H3.8V6.5Zm1.7 1.5h1.3v1.2H5.5V8Zm0-1.5h1.3V7.7H5.5V6.5Zm1.8 1.5h1.3v1.2H7.3V8Zm0-1.5h1.3V7.7H7.3V6.5Zm1.8 1.5h1.3v1.2H9V8Zm0-1.5h1.3V7.7H9V6.5Zm0-1.5h1.3V6.2H9V5Z',
  vercel: 'M8 1L15 14H1L8 1Z',
  lambda: 'M2 14h2l2-4 2 4h2l-3-6 3-6H8L6 6 4 2H2l3 6-3 6Z',

  // Databases
  postgresql: 'M12.5 3c-.8-.6-1.8-1-3-1-.9 0-1.8.2-2.5.5-.2-.1-.5-.2-.8-.2C4.5 2.3 3 3.6 3 5.2c0 .3 0 .6.1.9C2.4 6.8 2 7.8 2 9c0 2.2 1.8 4 4 4 .4 0 .7 0 1-.1.4.4 1 .6 1.5.6 1.1 0 2-.7 2.4-1.6.3.1.6.1 1 .1 1.9 0 3.4-1.3 3.9-3.1.5-.3.9-.8.9-1.4 0-2-1.5-3.7-3.5-4.2l-.7-.3ZM10 11c-.5 0-1-.4-1-.9V9h2v1.1c0 .5-.4.9-1 .9Z',
  mongodb: 'M8 0C6 0 4.3.8 3.2 2.2 1.8 3.8 1 6 1 8.5c0 3.6 2.4 6.6 5.7 7.4.4.1.8-.2.8-.6v-1.7c-2.3.5-2.8-1-2.8-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .4.4.7.8.6C12.6 15.1 15 12.1 15 8.5c0-2.5-.8-4.7-2.2-6.3C11.7.8 10 0 8 0Z',
  dynamodb: 'M3 3v10l5 3 5-3V3L8 0 3 3Zm5 11.5L4 12V5l4 2v7.5ZM4.5 4L8 2l3.5 2L8 6 4.5 4ZM12 12l-4 2.5V7l4-2v7Z',

  // Tools & Services
  prisma: 'M13.2 13.9 8.1 1.6c-.2-.5-.9-.6-1.2-.1L1 13.1c-.2.4 0 .9.5 1l11.2 1c.5 0 .8-.4.5-.8v-.4ZM8 4l3.5 8.5H4.8L8 4Z',
  fastapi: 'M8 0L1 4v8l7 4 7-4V4L8 0Zm2 10.5L8 12l-2-1.5V7l2-1.5L10 7v3.5Z',
  tailwind: 'M8 3c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.3 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3-.9-1-2-2.2-4.3-2.2ZM3 9c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3.9 1 2 2.2 4.3 2.2 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C7.4 10.2 6.4 9 3 9Z',
  trpc: 'M8 0l8 4v8l-8 4-8-4V4l8-4Zm0 2.5L2.5 5v6L8 13.5l5.5-2.5V5L8 2.5ZM8 5l3 1.5v3L8 11l-3-1.5v-3L8 5Z',
  langchain: 'M4 2v12h8V2H4Zm6 10H6V4h4v8ZM2 4v8l1.5 1.5V5.5L2 4Zm10.5 1.5v6L14 10V6l-1.5-.5Z',

  // ML/AI
  openai: 'M14.5 8c0-3.6-2.9-6.5-6.5-6.5S1.5 4.4 1.5 8s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5ZM8 3c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1s-1-.4-1-1V4c0-.6.4-1 1-1Zm0 8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1Z',
  bedrock: 'M3 2v12l5 3 5-3V2L8 0 3 2Zm5 13L4 13V4l4 2v9Zm4-2-4 2V6l4-2v9Z',

  // Generic
  default: 'M3 3h10v10H3V3Zm1 1v8h8V4H4Z',
}

// Map technology names to icon keys
const techNameMap: Record<string, string> = {
  // React ecosystem
  'react': 'react',
  'react dashboard': 'react',

  // Angular
  'angular': 'angular',
  'angular app': 'angular',

  // Next.js
  'next.js': 'nextjs',
  'next.js app': 'nextjs',
  'nextjs': 'nextjs',

  // TypeScript
  'typescript': 'typescript',
  'ts': 'typescript',

  // Python
  'python': 'python',

  // Node
  'node': 'nodejs',
  'node.js': 'nodejs',
  'nodejs': 'nodejs',

  // AWS
  'aws': 'aws',
  'aws lambda': 'lambda',
  'lambda': 'lambda',
  's3': 'aws',
  'dynamodb': 'dynamodb',
  'bedrock': 'bedrock',
  'aws bedrock': 'bedrock',
  'api gateway': 'aws',

  // Databases
  'postgresql': 'postgresql',
  'postgres': 'postgresql',
  'mongodb': 'mongodb',
  'mongo': 'mongodb',

  // Tools
  'docker': 'docker',
  'vercel': 'vercel',
  'prisma': 'prisma',
  'prisma orm': 'prisma',
  'fastapi': 'fastapi',
  'tailwind': 'tailwind',
  'tailwind css': 'tailwind',
  'trpc': 'trpc',
  'trpc api': 'trpc',
  'langchain': 'langchain',

  // ML
  'openai': 'openai',
}

function getIconKey(tech: string): string {
  const normalized = tech.toLowerCase()
  return techNameMap[normalized] || 'default'
}

export function TechIcon({ name, className = '' }: { name: string; className?: string }) {
  const iconKey = getIconKey(name)
  const path = techIcons[iconKey] || techIcons.default

  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={`w-4 h-4 ${className}`}
    >
      <path d={path} fillRule="evenodd" />
    </svg>
  )
}
