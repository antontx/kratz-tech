import { createFileRoute } from '@tanstack/react-router'
import { Mail, Github, Linkedin } from 'lucide-react'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const projects = [
    { name: 'AI Assistant for Vehicle Testing', desc: 'AWS · Python · Angular · TypeScript', year: '2025' },
    { name: 'LLM Evaluation Dashboard', desc: '1st Place BMW Hackathon · AWS', year: '2024' },
    { name: 'Business Dashboard', desc: 'Paperwork management & form generation', year: '2025' },
    { name: 'Neural Network for Digit Recognition', desc: 'Python · Deep Learning', year: '2023' },
  ]

  const awards = [
    { name: 'Dr. Hans Riegel Prize', org: '1st Place CS · Johannes Gutenberg University', year: '2023' },
    { name: 'German CS Competition', org: '1st Prize · BWINF', year: '2023' },
    { name: 'BMW Hackathon', org: '1st Place · Full Week', year: '2024' },
    { name: 'AWS GameDay @ BMW', org: '1st Place', year: '2024' },
  ]

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
          <p className="text-xs tracking-[0.3em] text-gray-600 mb-6">[ PROJECTS ]</p>
          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.name} className="group cursor-pointer">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xl text-white group-hover:text-gray-400 transition-colors">{p.name}</h3>
                  <span className="text-gray-700 text-sm">{p.year}</span>
                </div>
                <p className="text-gray-600 text-sm">{p.desc}</p>
              </div>
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
      </div>
    </div>
  )
}
