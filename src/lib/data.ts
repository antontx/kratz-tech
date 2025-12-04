export type ArchitectureNode = {
  id: string
  label: string
  icon: 'user' | 'browser' | 'server' | 'database' | 'cloud' | 'ml' | 'api' | 'queue' | 'file' | 'email' | 'code'
  layer: string  // which layer this belongs to
  column: number // position in layer (0 = left)
}

export type ArchitectureLayer = {
  id: string
  label: string
  level: number // row level (0 = top)
}

export type ArchitectureConnection = {
  from: string
  to: string
}

export type Project = {
  id: string
  name: string
  shortDesc: string
  year: string
  description: string
  technologies: string[]
  highlights?: string[]
  architecture: {
    layers: ArchitectureLayer[]
    nodes: ArchitectureNode[]
    connections: ArchitectureConnection[]
  }
}

export const projects: Project[] = [
  {
    id: 'ai-vehicle-testing',
    name: 'AI Assistant for Vehicle Testing',
    shortDesc: 'AWS · Python · Angular · TypeScript',
    year: '2025',
    description: 'An intelligent assistant that helps engineers with vehicle testing procedures, leveraging LLMs to provide context-aware guidance and automate documentation workflows.',
    technologies: ['AWS Lambda', 'Python', 'Angular', 'TypeScript', 'DynamoDB', 'S3', 'Bedrock', 'API Gateway'],
    highlights: [
      'Reduced testing documentation time by 60%',
      'Integrated with existing BMW testing infrastructure',
      'Natural language interface for complex queries'
    ],
    architecture: {
      layers: [
        { id: 'client', label: 'Client', level: 0 },
        { id: 'aws', label: 'AWS Cloud', level: 1 },
        { id: 'storage', label: 'Storage & AI', level: 2 },
      ],
      nodes: [
        { id: 'user', label: 'Engineer', icon: 'user', layer: 'client', column: 0 },
        { id: 'frontend', label: 'Angular App', icon: 'browser', layer: 'client', column: 1 },
        { id: 'api', label: 'API Gateway', icon: 'api', layer: 'aws', column: 0 },
        { id: 'lambda', label: 'Lambda', icon: 'server', layer: 'aws', column: 1 },
        { id: 'bedrock', label: 'Bedrock LLM', icon: 'ml', layer: 'storage', column: 0 },
        { id: 'dynamo', label: 'DynamoDB', icon: 'database', layer: 'storage', column: 1 },
        { id: 's3', label: 'S3', icon: 'file', layer: 'storage', column: 2 },
      ],
      connections: [
        { from: 'user', to: 'frontend' },
        { from: 'frontend', to: 'api' },
        { from: 'api', to: 'lambda' },
        { from: 'lambda', to: 'bedrock' },
        { from: 'lambda', to: 'dynamo' },
        { from: 'lambda', to: 's3' },
      ],
    },
  },
  {
    id: 'llm-evaluation',
    name: 'LLM Evaluation Dashboard',
    shortDesc: '1st Place BMW Hackathon · AWS',
    year: '2024',
    description: 'A comprehensive dashboard for evaluating and comparing different LLM models on custom datasets, featuring automated benchmarking, cost analysis, and performance metrics visualization.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'AWS', 'PostgreSQL', 'Docker', 'Langchain'],
    highlights: [
      'Won 1st Place at BMW Full-Week Hackathon',
      'Compare 10+ LLM models side-by-side',
      'Automated evaluation pipelines'
    ],
    architecture: {
      layers: [
        { id: 'client', label: 'Client', level: 0 },
        { id: 'backend', label: 'Backend', level: 1 },
        { id: 'services', label: 'Services', level: 2 },
      ],
      nodes: [
        { id: 'user', label: 'Data Scientist', icon: 'user', layer: 'client', column: 0 },
        { id: 'frontend', label: 'React Dashboard', icon: 'browser', layer: 'client', column: 1 },
        { id: 'api', label: 'FastAPI', icon: 'server', layer: 'backend', column: 0 },
        { id: 'db', label: 'PostgreSQL', icon: 'database', layer: 'backend', column: 1 },
        { id: 'queue', label: 'Task Queue', icon: 'queue', layer: 'services', column: 0 },
        { id: 'eval', label: 'Eval Engine', icon: 'code', layer: 'services', column: 1 },
        { id: 'llms', label: 'LLM APIs', icon: 'ml', layer: 'services', column: 2 },
      ],
      connections: [
        { from: 'user', to: 'frontend' },
        { from: 'frontend', to: 'api' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'queue' },
        { from: 'queue', to: 'eval' },
        { from: 'eval', to: 'llms' },
      ],
    },
  },
  {
    id: 'business-dashboard',
    name: 'Business Dashboard',
    shortDesc: 'Paperwork management & form generation',
    year: '2025',
    description: 'A full-stack business management solution for handling paperwork, generating invoices, and managing client relationships with automated workflows.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS', 'tRPC', 'Vercel'],
    highlights: [
      'Automated invoice generation',
      'Client portal with real-time updates',
      'PDF export and email integration'
    ],
    architecture: {
      layers: [
        { id: 'client', label: 'Client', level: 0 },
        { id: 'server', label: 'Server', level: 1 },
        { id: 'services', label: 'External Services', level: 2 },
      ],
      nodes: [
        { id: 'users', label: 'Users', icon: 'user', layer: 'client', column: 0 },
        { id: 'frontend', label: 'Next.js App', icon: 'browser', layer: 'client', column: 1 },
        { id: 'trpc', label: 'tRPC API', icon: 'api', layer: 'server', column: 0 },
        { id: 'prisma', label: 'Prisma ORM', icon: 'server', layer: 'server', column: 1 },
        { id: 'db', label: 'PostgreSQL', icon: 'database', layer: 'server', column: 2 },
        { id: 'pdf', label: 'PDF Generator', icon: 'file', layer: 'services', column: 0 },
        { id: 'email', label: 'Email Service', icon: 'email', layer: 'services', column: 1 },
      ],
      connections: [
        { from: 'users', to: 'frontend' },
        { from: 'frontend', to: 'trpc' },
        { from: 'trpc', to: 'prisma' },
        { from: 'prisma', to: 'db' },
        { from: 'trpc', to: 'pdf' },
        { from: 'trpc', to: 'email' },
      ],
    },
  },
  {
    id: 'neural-network-digits',
    name: 'Neural Network for Digit Recognition',
    shortDesc: 'Python · Deep Learning',
    year: '2023',
    description: 'A custom neural network implementation from scratch for recognizing handwritten digits, built without ML frameworks to understand deep learning fundamentals.',
    technologies: ['Python', 'NumPy', 'Matplotlib', 'MNIST Dataset', 'Jupyter Notebook'],
    highlights: [
      'Dr. Hans Riegel Prize Winner',
      '98% accuracy on MNIST test set',
      'Implemented backpropagation from scratch'
    ],
    architecture: {
      layers: [
        { id: 'data', label: 'Data', level: 0 },
        { id: 'network', label: 'Neural Network', level: 1 },
        { id: 'output', label: 'Output', level: 2 },
      ],
      nodes: [
        { id: 'mnist', label: 'MNIST Dataset', icon: 'database', layer: 'data', column: 0 },
        { id: 'input', label: 'Input Layer', icon: 'code', layer: 'network', column: 0 },
        { id: 'hidden1', label: 'Hidden Layer 1', icon: 'ml', layer: 'network', column: 1 },
        { id: 'hidden2', label: 'Hidden Layer 2', icon: 'ml', layer: 'network', column: 2 },
        { id: 'output', label: 'Output Layer', icon: 'code', layer: 'network', column: 3 },
        { id: 'train', label: 'Training Loop', icon: 'code', layer: 'output', column: 0 },
        { id: 'viz', label: 'Visualization', icon: 'browser', layer: 'output', column: 1 },
      ],
      connections: [
        { from: 'mnist', to: 'input' },
        { from: 'input', to: 'hidden1' },
        { from: 'hidden1', to: 'hidden2' },
        { from: 'hidden2', to: 'output' },
        { from: 'train', to: 'hidden1' },
        { from: 'output', to: 'viz' },
      ],
    },
  },
]

export const awards = [
  { name: 'Dr. Hans Riegel Prize', org: '1st Place CS · Johannes Gutenberg University', year: '2023' },
  { name: 'German CS Competition', org: '1st Prize · BWINF', year: '2023' },
  { name: 'BMW Hackathon', org: '1st Place · Full Week', year: '2024' },
  { name: 'AWS GameDay @ BMW', org: '1st Place', year: '2024' },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
