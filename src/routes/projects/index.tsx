import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { projects } from '@/lib/data'

export const Route = createFileRoute('/projects/')({ component: ProjectsPage })

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      {/* Header */}
      <div className="border-b border-gray-800 p-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <p className="text-xs tracking-[0.3em] text-gray-600 mb-3">[ PROJECTS ]</p>
        <h1 className="text-4xl font-bold text-white">All Projects</h1>
        <p className="text-gray-500 mt-4 max-w-2xl">
          A collection of projects showcasing full-stack development, machine learning,
          and cloud architecture.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="p-12">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.id}
              to="/projects/$id"
              params={{ id: project.id }}
              className="group block p-6 border border-gray-800 rounded-lg hover:border-gray-700 hover:bg-[#0f0f0f] transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-700 text-sm">{project.year}</span>
                <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-xl text-white font-medium mb-2 group-hover:text-gray-300 transition-colors">
                {project.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{project.shortDesc}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-gray-800/50 text-gray-500 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs text-gray-600">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
