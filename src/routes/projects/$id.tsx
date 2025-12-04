import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink, Calendar, Layers } from 'lucide-react'
import { getProjectById, projects } from '@/lib/data'
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram'

export const Route = createFileRoute('/projects/$id')({
  component: ProjectDetailPage,
  loader: ({ params }) => {
    const project = getProjectById(params.id)
    if (!project) {
      throw notFound()
    }
    return { project }
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
        <p className="text-gray-500 mb-8">The project you're looking for doesn't exist.</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    </div>
  ),
})

function ProjectDetailPage() {
  const { project } = Route.useLoaderData()

  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      {/* Header */}
      <div className="border-b border-gray-800 p-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Projects
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs tracking-[0.3em] text-gray-600">[ PROJECT ]</span>
          <span className="flex items-center gap-1 text-gray-600 text-sm">
            <Calendar className="w-3 h-3" />
            {project.year}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">{project.name}</h1>
        <p className="text-gray-400 max-w-3xl text-lg leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="border-b border-gray-800 p-12">
        <p className="text-xs tracking-[0.3em] text-gray-600 mb-6">[ TECH STACK ]</p>
        <div className="flex flex-wrap gap-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 bg-[#0f0f0f] border border-gray-800 rounded-lg text-gray-400 text-sm hover:border-gray-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="border-b border-gray-800 p-12">
        <div className="flex items-center gap-2 mb-6">
          <Layers className="w-4 h-4 text-gray-600" />
          <p className="text-xs tracking-[0.3em] text-gray-600">[ ARCHITECTURE ]</p>
        </div>
        <div className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-6">
          <ArchitectureDiagram
            nodes={project.architecture.nodes}
            connections={project.architecture.connections}
          />
        </div>
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className="border-b border-gray-800 p-12">
          <p className="text-xs tracking-[0.3em] text-gray-600 mb-6">[ HIGHLIGHTS ]</p>
          <ul className="space-y-3">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-gray-700 mt-1">—</span>
                <span className="text-gray-400">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <div className="p-12">
        <div className="flex justify-between items-center">
          {prevProject ? (
            <Link
              to="/projects/$id"
              params={{ id: prevProject.id }}
              className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <p className="text-xs text-gray-600 mb-1">Previous</p>
                <p className="text-sm">{prevProject.name}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to="/projects/$id"
              params={{ id: nextProject.id }}
              className="group flex items-center gap-3 text-gray-500 hover:text-white transition-colors"
            >
              <div className="text-right">
                <p className="text-xs text-gray-600 mb-1">Next</p>
                <p className="text-sm">{nextProject.name}</p>
              </div>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
