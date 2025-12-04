export type ArchitectureNode = {
  id: string
  label: string
  type: 'frontend' | 'backend' | 'database' | 'service' | 'cloud' | 'ml' | 'user'
  x: number
  y: number
}

export type ArchitectureConnection = {
  from: string
  to: string
  label?: string
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
        { id: 'user', label: 'Engineer', type: 'user', x: 50, y: 150 },
        { id: 'frontend', label: 'Angular App', type: 'frontend', x: 200, y: 150 },
        { id: 'api', label: 'API Gateway', type: 'cloud', x: 350, y: 150 },
        { id: 'lambda', label: 'Lambda\n(Python)', type: 'backend', x: 500, y: 100 },
        { id: 'bedrock', label: 'AWS Bedrock\n(LLM)', type: 'ml', x: 650, y: 100 },
        { id: 'dynamo', label: 'DynamoDB', type: 'database', x: 500, y: 220 },
        { id: 's3', label: 'S3 Bucket', type: 'cloud', x: 650, y: 220 },
      ],
      connections: [
        { from: 'user', to: 'frontend', label: 'interacts' },
        { from: 'frontend', to: 'api', label: 'REST' },
        { from: 'api', to: 'lambda', label: 'invoke' },
        { from: 'lambda', to: 'bedrock', label: 'prompt' },
        { from: 'lambda', to: 'dynamo', label: 'read/write' },
        { from: 'lambda', to: 's3', label: 'files' },
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
        { id: 'user', label: 'Data Scientist', type: 'user', x: 50, y: 150 },
        { id: 'frontend', label: 'React\nDashboard', type: 'frontend', x: 200, y: 150 },
        { id: 'api', label: 'FastAPI\nBackend', type: 'backend', x: 350, y: 150 },
        { id: 'eval', label: 'Evaluation\nEngine', type: 'service', x: 500, y: 80 },
        { id: 'llms', label: 'LLM APIs\n(OpenAI, Claude...)', type: 'ml', x: 650, y: 80 },
        { id: 'db', label: 'PostgreSQL', type: 'database', x: 500, y: 220 },
        { id: 'queue', label: 'Task Queue', type: 'service', x: 350, y: 280 },
      ],
      connections: [
        { from: 'user', to: 'frontend', label: 'uses' },
        { from: 'frontend', to: 'api', label: 'REST' },
        { from: 'api', to: 'eval', label: 'triggers' },
        { from: 'eval', to: 'llms', label: 'calls' },
        { from: 'api', to: 'db', label: 'stores' },
        { from: 'api', to: 'queue', label: 'enqueue' },
        { from: 'queue', to: 'eval', label: 'process' },
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
        { id: 'client', label: 'Client', type: 'user', x: 50, y: 100 },
        { id: 'admin', label: 'Admin', type: 'user', x: 50, y: 220 },
        { id: 'frontend', label: 'Next.js\nApp', type: 'frontend', x: 200, y: 150 },
        { id: 'trpc', label: 'tRPC\nAPI', type: 'backend', x: 350, y: 150 },
        { id: 'prisma', label: 'Prisma\nORM', type: 'service', x: 500, y: 150 },
        { id: 'db', label: 'PostgreSQL', type: 'database', x: 650, y: 150 },
        { id: 'pdf', label: 'PDF\nGenerator', type: 'service', x: 350, y: 280 },
        { id: 'email', label: 'Email\nService', type: 'cloud', x: 500, y: 280 },
      ],
      connections: [
        { from: 'client', to: 'frontend', label: 'portal' },
        { from: 'admin', to: 'frontend', label: 'manage' },
        { from: 'frontend', to: 'trpc', label: 'RPC' },
        { from: 'trpc', to: 'prisma' },
        { from: 'prisma', to: 'db' },
        { from: 'trpc', to: 'pdf', label: 'generate' },
        { from: 'trpc', to: 'email', label: 'send' },
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
        { id: 'input', label: 'Input Layer\n(784 pixels)', type: 'ml', x: 100, y: 150 },
        { id: 'hidden1', label: 'Hidden Layer 1\n(128 neurons)', type: 'ml', x: 280, y: 100 },
        { id: 'hidden2', label: 'Hidden Layer 2\n(64 neurons)', type: 'ml', x: 460, y: 100 },
        { id: 'output', label: 'Output Layer\n(10 classes)', type: 'ml', x: 640, y: 150 },
        { id: 'data', label: 'MNIST\nDataset', type: 'database', x: 100, y: 280 },
        { id: 'train', label: 'Training\nLoop', type: 'service', x: 370, y: 220 },
        { id: 'viz', label: 'Matplotlib\nViz', type: 'frontend', x: 640, y: 280 },
      ],
      connections: [
        { from: 'data', to: 'input', label: 'feed' },
        { from: 'input', to: 'hidden1', label: 'forward' },
        { from: 'hidden1', to: 'hidden2', label: 'ReLU' },
        { from: 'hidden2', to: 'output', label: 'softmax' },
        { from: 'train', to: 'hidden1', label: 'backprop' },
        { from: 'train', to: 'hidden2', label: 'backprop' },
        { from: 'output', to: 'viz', label: 'results' },
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
