'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { BookOpen, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const roles = ['AI Engineer', 'Full-Stack Engineer', 'DevOps Engineer'];

// Latest article previews
const articlePreviews = [
  {
    id: 1,
    title: 'Hugging Face',
    excerpt: 'Hugging Face is the most popular platform for working with transformer-based models like BERT, GPT, T5, LLaMA, Whisper, and many others...',
  },
  {
    id: 2,
    title: 'Model Microservices',
    excerpt: 'A Model Microservice is a dedicated backend service built specifically to run inference for an AI model. Instead of bundling the model inside the main app, it runs independently...',
  },
  {
    id: 3,
    title: 'Retraining Models Using Hugging Face',
    excerpt: 'Retraining (fine-tuning) a model on Hugging Face means taking a pretrained model and adapting it to a new dataset or domain-specific task...',
  },
  {
    id: 4,
    title: 'LLM (Large Language Models)',
    excerpt: 'Large Language Models are advanced neural networks trained on massive datasets that enable machines to understand, generate, and reason with human language...',
  },
  {
    id: 5,
    title: 'LLD Design (Low-Level Design)',
    excerpt: 'Low-Level Design focuses on creating class diagrams, method structures, data models, and object interactions. It converts high-level architecture into technical blueprints...',
  },
  {
    id: 6,
    title: 'HLD Design (High-Level Design)',
    excerpt: 'High-Level Design describes the overall architecture of a system—covering modules, services, APIs, databases, caching layers, load balancing, security, and integration points...',
  },
  {
    id: 7,
    title: 'OOPs Concepts',
    excerpt: 'Object-Oriented Programming concepts like Encapsulation, Abstraction, Inheritance, and Polymorphism form the backbone of modern software engineering...',
  },
];

export function AboutSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const latestArticlesScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const scrollToArticles = () => {
    const element = document.getElementById('learning-articles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const checkLatestArticlesScroll = () => {
    if (latestArticlesScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = latestArticlesScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkLatestArticlesScroll();
    const container = latestArticlesScrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkLatestArticlesScroll);
      window.addEventListener('resize', checkLatestArticlesScroll);
      return () => {
        container.removeEventListener('scroll', checkLatestArticlesScroll);
        window.removeEventListener('resize', checkLatestArticlesScroll);
      };
    }
  }, []);

  const scrollLatestArticles = (direction: 'left' | 'right') => {
    if (latestArticlesScrollRef.current) {
      const container = latestArticlesScrollRef.current;
      const scrollAmount = direction === 'left' ? -600 : 600;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className="py-20 md:py-16 px-6 md:px-8 lg:px-12" style={{ backgroundColor: 'var(--about-bg)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header with Name and Latest Articles */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
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

          {/* Right: Latest Articles Preview - Aligned with name */}
          <div className="w-full md:w-auto md:max-w-[600px]">
            <div className="mb-4">
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">Latest Articles</p>
            </div>
            
            {/* Horizontal Scrollable Container with 2-Row Grid - Showing first 4 articles, scrollable for more */}
            <div className="relative">
              {/* Left Scroll Button */}
              {canScrollLeft && (
                <button
                  onClick={() => scrollLatestArticles('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur border border-border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg cursor-pointer hidden md:flex items-center justify-center"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Right Scroll Button */}
              {canScrollRight && (
                <button
                  onClick={() => scrollLatestArticles('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur border border-border rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg cursor-pointer hidden md:flex items-center justify-center"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}

              <div 
                ref={latestArticlesScrollRef}
                className="overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
              <div className="flex gap-6 min-w-max">
                {/* Page 1: First 4 articles in 2x2 grid */}
                <div className="shrink-0 snap-center w-full md:w-auto">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Row 1: First 2 articles */}
                    {articlePreviews.slice(0, 2).map((article) => (
                      <button
                        key={article.id}
                        onClick={scrollToArticles}
                        className="cursor-pointer w-[240px] md:w-[260px] bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary transition-all group text-left"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                    
                    {/* Row 2: Next 2 articles */}
                    {articlePreviews.slice(2, 4).map((article) => (
                      <button
                        key={article.id}
                        onClick={scrollToArticles}
                        className="cursor-pointer w-[240px] md:w-[260px] bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary transition-all group text-left"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                            <BookOpen className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page 2: Remaining articles in 2x2 grid */}
                {articlePreviews.length > 4 && (
                  <div className="shrink-0 snap-center w-full md:w-auto">
                    <div className="grid grid-cols-2 gap-4">
                      {articlePreviews.slice(4, 7).map((article, idx) => (
                        <button
                          key={article.id}
                          onClick={scrollToArticles}
                          className={`cursor-pointer w-[240px] md:w-[260px] bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary transition-all group text-left ${
                            idx === 2 ? 'col-span-2 md:col-span-1' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                              <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {article.title}
                              </h4>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5">
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


      </div>
    </section>
  );
}
