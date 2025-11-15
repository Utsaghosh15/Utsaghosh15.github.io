export function ExperienceSection() {
  const experiences = [
    {
      company: 'Springboard Incubators Inc.',
      title: 'Software Engineer',
      date: 'May 2023 - Present',
      description: 'Built and scaled an AI-powered e-learning platform for 100K+ users, delivering secure video streaming, responsive dashboards, and real-time learning analytics.',
      highlights: [
        'Scaled platform from 5K to 100K+ users, enhancing performance and reliability',
        'Architected adaptive bitrate video streaming using AWS S3, CloudFront, reducing buffering by 40%',
        'Built AI-powered learning assistant using LangChain and OpenAI API',
        'Developed React.js + TypeScript dashboards improving page load speed by 35%',
        'Reduced deployment times from hours to under 15 minutes via CI/CD',
      ],
    },
    {
      company: 'Boneflare Wellness',
      title: 'Full Stack Engineer',
      date: 'May 2020 - Dec 2021',
      description: 'Developed full-stack healthcare analytics tools for real-time patient monitoring, improving data performance and deployment efficiency.',
      highlights: [
        'Built responsive React + TypeScript dashboard for healthcare analytics',
        'Refactored legacy JavaScript into modular TypeScript components, reducing bugs by 35%',
        'Optimized API workflows and caching, cutting latency by 30%',
        'Implemented CI/CD pipelines with GitHub Actions reducing deployment time by 40%',
      ],
    },
    {
      company: 'Atoll Solutions',
      title: 'Software Engineer',
      date: 'June 2018 - April 2020',
      description: 'Engineered scalable geospatial tracking systems for 300K+ devices, optimizing APIs and dashboards for high performance.',
      highlights: [
        'Scaled asset tracking system from 2K to 300K+ active users',
        'Re-architected Google Maps API integrations reducing latency by 60%',
        'Migrated to Node.js microservices with Redis caching achieving sub-200ms response time',
        'Built interactive D3.js and Recharts dashboards for 100K+ tracked devices',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-8 lg:px-12" style={{ backgroundColor: 'var(--experience-bg)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-foreground">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{exp.company}</h3>
                  <p className="text-lg text-primary font-semibold">{exp.title}</p>
                </div>
                <p className="text-muted-foreground font-medium">{exp.date}</p>
              </div>

              <p className="text-muted-foreground mb-4">{exp.description}</p>

              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
