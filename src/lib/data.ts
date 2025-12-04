export type ArchitectureNode = {
  id: string
  label: string
  level: number  // row level (0 = top)
  column: number // position in row (0 = left)
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
      nodes: [
        { id: 'user', label: 'Engineer', level: 0, column: 0 },
        { id: 'frontend', label: 'Angular App', level: 0, column: 1 },
        { id: 'api', label: 'API Gateway', level: 0, column: 2 },
        { id: 'lambda', label: 'Lambda', level: 0, column: 3 },
        { id: 'bedrock', label: 'AWS Bedrock', level: 1, column: 3 },
        { id: 'dynamo', label: 'DynamoDB', level: 1, column: 2 },
        { id: 's3', label: 'S3', level: 1, column: 1 },
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
      nodes: [
        { id: 'user', label: 'Data Scientist', level: 0, column: 0 },
        { id: 'frontend', label: 'React Dashboard', level: 0, column: 1 },
        { id: 'api', label: 'FastAPI', level: 0, column: 2 },
        { id: 'eval', label: 'Eval Engine', level: 0, column: 3 },
        { id: 'llms', label: 'LLM APIs', level: 0, column: 4 },
        { id: 'db', label: 'PostgreSQL', level: 1, column: 2 },
        { id: 'queue', label: 'Task Queue', level: 1, column: 3 },
      ],
      connections: [
        { from: 'user', to: 'frontend' },
        { from: 'frontend', to: 'api' },
        { from: 'api', to: 'eval' },
        { from: 'eval', to: 'llms' },
        { from: 'api', to: 'db' },
        { from: 'api', to: 'queue' },
        { from: 'queue', to: 'eval' },
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
      nodes: [
        { id: 'users', label: 'Client / Admin', level: 0, column: 0 },
        { id: 'frontend', label: 'Next.js App', level: 0, column: 1 },
        { id: 'trpc', label: 'tRPC API', level: 0, column: 2 },
        { id: 'prisma', label: 'Prisma ORM', level: 0, column: 3 },
        { id: 'db', label: 'PostgreSQL', level: 0, column: 4 },
        { id: 'pdf', label: 'PDF Generator', level: 1, column: 2 },
        { id: 'email', label: 'Email Service', level: 1, column: 3 },
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
      nodes: [
        { id: 'data', label: 'MNIST Dataset', level: 0, column: 0 },
        { id: 'input', label: 'Input Layer', level: 0, column: 1 },
        { id: 'hidden1', label: 'Hidden Layer 1', level: 0, column: 2 },
        { id: 'hidden2', label: 'Hidden Layer 2', level: 0, column: 3 },
        { id: 'output', label: 'Output Layer', level: 0, column: 4 },
        { id: 'train', label: 'Training Loop', level: 1, column: 2 },
        { id: 'viz', label: 'Visualization', level: 1, column: 4 },
      ],
      connections: [
        { from: 'data', to: 'input' },
        { from: 'input', to: 'hidden1' },
        { from: 'hidden1', to: 'hidden2' },
        { from: 'hidden2', to: 'output' },
        { from: 'train', to: 'hidden1' },
        { from: 'train', to: 'hidden2' },
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
