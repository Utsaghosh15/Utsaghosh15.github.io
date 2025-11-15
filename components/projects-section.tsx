import { Github } from 'lucide-react';

export function ProjectsSection() {
  const projects = [
    {
      name: 'Prompt Enhancer',
      type: 'Chrome Extension',
      tech: ['Next.js', 'Node.js/Express', 'MongoDB', 'Redis', 'OpenAI API', 'AWS'],
      description:
        'Chrome extension integrated directly into the ChatGPT textbox, providing one-click prompt enhancement with improved grammar, clarity, and context. Includes inline enhance button, side-by-side preview, and optional "use history" toggle.',
      github: 'https://github.com/Utsaghosh15',
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 px-6 md:px-8 lg:px-12" style={{ backgroundColor: 'var(--projects-bg)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-foreground">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary transition-all"
            >
              <div className="mb-4">
                <p className="text-sm text-primary font-semibold uppercase tracking-wide">{project.type}</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">{project.name}</h3>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
