'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const roles = ['AI Engineer', 'Full-Stack Engineer', 'DevOps Engineer'];

export function AboutSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const speed = isDeleting ? 30 : 50;

    if (!isDeleting && displayedText === currentRole) {
      const timer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timer);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section id="about" className="py-20 md:py-19 px-6 md:px-8 lg:px-12" style={{ backgroundColor: 'var(--about-bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header with Name and Profile Picture */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          {/* Left: Name and Rotating Text */}
          <div className="flex-1">
            <p className="text-muted-foreground mb-2">Hi, I'm</p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Utsha Ghosh</h1>
            <div className="h-10 flex items-center">
              <p className="text-xl md:text-2xl text-black font-semibold min-h-8">
                {displayedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>

          {/* Right: Profile Picture */}
          <div className="flex-shrink-0">
          </div>
        </div>

        {/* Rest of Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Summary */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Full-Stack Software Engineer with experience developing scalable, high-performance web applications across diverse domains. Strong focus on clean architecture, user experience, and building reliable, data-driven solutions that drive business impact.
            </p>

            {/* Skill Groups */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Full-Stack Engineer</h3>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Node.js', 'Express.js', 'GraphQL', 'PostgreSQL', 'MongoDB'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-card text-foreground rounded-full text-sm font-medium border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">AI Engineer</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'LangChain', 'OpenAI API', 'Vector Databases', 'RAG Pipelines', 'Prompt Engineering'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-card text-foreground rounded-full text-sm font-medium border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">DevOps & Cloud</h3>
                <div className="flex flex-wrap gap-2">
                  {['AWS', 'Docker', 'CI/CD', 'GitHub Actions', 'Redis', 'Load Balancing', 'CloudWatch'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-card text-foreground rounded-full text-sm font-medium border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="cursor-pointer px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                View Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="cursor-pointer px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right Column - Avatar */}
          <div className="flex items-center justify-center md:-mt-50">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border">
              <div className="text-7xl font-bold text-primary">UG</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
