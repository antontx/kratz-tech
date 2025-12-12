import { createFileRoute, Link } from '@tanstack/react-router'
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react'
import { projects, awards } from '@/lib/data'
import { fetchGitHubContributions } from '@/lib/github'
import { ContributionGrid } from '@/components/contribution-grid'

export const Route = createFileRoute('/')({
  component: App,
  loader: async () => {
    const contributions = await fetchGitHubContributions('antontx', 30)
    return { contributions }
  },
})

function App() {
  const { contributions } = Route.useLoaderData()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      {/* Hero - Full Width Split */}
      <div className="grid md:grid-cols-[400px_1fr] min-h-[70vh]">
        {/* Left - Photo & Identity */}
        <div className="bg-[#0f0f0f] p-12 flex flex-col justify-end border-r border-gray-800">
          <img
            src="/photo.jpg"
            alt="Nils Anton Kratz"
            className="w-40 h-40 object-cover mb-8 grayscale"
          />
          <p className="text-xs tracking-[0.3em] text-gray-600 mb-3">[ INTRO ]</p>
          <h1 className="text-4xl font-bold text-white mb-4">
            Nils Anton Kratz
          </h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            Data Science & AI @ BMW Group.<br />
            Building ML applications.<br />
            Munich, Germany.
          </p>
          <div className="flex gap-4">
            <a href="mailto:nils@kratz.tech" className="text-gray-600 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/antontx" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/nakratz/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right - Projects */}
        <div className="p-12 flex flex-col justify-end">
          <div className="flex justify-between items-center mb-6">
            <p className="text-xs tracking-[0.3em] text-gray-600">[ PROJECTS ]</p>
            <Link
              to="/projects"
              className="text-xs text-gray-600 hover:text-white transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-6">
            {projects.map((p) => (
              <Link
                key={p.id}
                to="/projects/$id"
                params={{ id: p.id }}
                className="group block"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl text-white group-hover:text-gray-400 transition-colors">{p.name}</h3>
                  <span className="text-gray-700 text-sm">{p.year}</span>
                </div>
                <p className="text-gray-600 text-sm">{p.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Awards - Full Width */}
      <div className="border-t border-gray-800">
        <div className="p-12">
          <p className="text-xs tracking-[0.3em] text-gray-600 mb-8">[ AWARDS ]</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {awards.map((a) => (
              <div key={a.name}>
                <p className="text-gray-700 text-sm mb-1">{a.year}</p>
                <h3 className="text-white font-medium mb-1">{a.name}</h3>
                <p className="text-gray-600 text-sm">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Links - Full Width Footer */}
      <div className="border-t border-gray-800 p-12">
        <p className="text-xs tracking-[0.3em] text-gray-600 mb-6">[ LINKS ]</p>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-wrap gap-8">
            <a href="mailto:nils@kratz.tech" className="text-gray-400 hover:text-white transition-colors">
              nils@kratz.tech
            </a>
            <a href="https://github.com/antontx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nakratz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
          <ContributionGrid data={contributions} />
        </div>
      </div>
    </div>
  )
}
