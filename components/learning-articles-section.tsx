'use client';

import { useState, useRef, useEffect } from 'react';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Hugging Face',
    description: 'Hugging Face is the most popular platform for working with transformer-based models like BERT, GPT, T5, LLaMA, Whisper, and many others. It provides tools such as Transformers, Datasets, and Evaluate, which make it easy to train, fine-tune, deploy, and share machine learning models.',
    learning: 'I am currently learning how to use Hugging Face Pipelines, tokenizers, model loading, and dataset preparation to build NLP and multimodal AI applications. I am also exploring the Hub for open-source models and understanding how to push my own models.',
  },
  {
    id: 2,
    title: 'Model Microservices',
    description: 'A Model Microservice is a dedicated backend service built specifically to run inference for an AI model. Instead of bundling the model inside the main app, it runs independently—with its own API endpoints, scaling strategy, and resource usage (GPU/CPU).',
    learning: 'I am learning how to build model inference microservices using Python, FastAPI, Docker, and GPU-backed instances. The goal is to create scalable LLM and ML inference endpoints that can support batch requests, streaming outputs, load balancing, and monitoring.',
  },
  {
    id: 3,
    title: 'Retraining Models Using Hugging Face',
    description: 'Retraining (fine-tuning) a model on Hugging Face means taking a pretrained model and adapting it to a new dataset or domain-specific task. This drastically improves accuracy on specialized tasks like support queries, sentiment, classification, embeddings, or chat behavior.',
    learning: 'I am studying how to fine-tune transformer models using Trainer, custom training loops, evaluation metrics, and dataset tokenization pipelines. This includes learning about hyperparameters (epochs, learning rate, batch size), checkpointing, pushing models to the Hugging Face Hub, and setting up automated retraining workflows using microservices.',
  },
  {
    id: 4,
    title: 'LLM (Large Language Models)',
    description: 'Large Language Models are advanced neural networks trained on massive datasets that enable machines to understand, generate, and reason with human language. They power applications like chatbots, document summarization, code generation, and knowledge retrieval.',
    learning: "I'm learning how LLMs process tokens, attention mechanisms, embeddings, and how they can be optimized or fine-tuned for domain-specific tasks. Understanding LLMs is crucial as they form the foundation of modern AI applications and intelligent automation.",
  },
  {
    id: 5,
    title: 'LLD Design (Low-Level Design)',
    description: 'Low-Level Design focuses on creating class diagrams, method structures, data models, and object interactions. It converts high-level architecture into technical blueprints that developers can implement directly.',
    learning: "I'm learning LLD to improve my ability to design maintainable systems using OOP principles, design patterns, SOLID rules, and clean code practices. Strong LLD skills reduce bugs, improve scalability, and ensure long-term system stability.",
  },
  {
    id: 6,
    title: 'HLD Design (High-Level Design)',
    description: 'High-Level Design describes the overall architecture of a system—covering modules, services, APIs, databases, caching layers, load balancing, security, and integration points.',
    learning: 'I am studying HLD to understand how enterprise-level systems scale to millions of users while staying highly available and fault tolerant. Mastering HLD helps me build distributed systems, microservices, and SaaS applications that are modular, efficient, and resilient.',
  },
  {
    id: 7,
    title: 'OOPs Concepts',
    description: 'Object-Oriented Programming concepts like Encapsulation, Abstraction, Inheritance, and Polymorphism form the backbone of modern software engineering. They help organize code in a way that is reusable, modular, and easier to maintain.',
    learning: 'I am reviewing OOPs principles to strengthen my low-level design skills and to write cleaner architectures. Good OOPs understanding ensures better system extensibility, easier debugging, and more professional software engineering practices.',
  },
];

export function LearningArticlesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardElement = container.querySelector('[class*="snap-center"]') as HTMLElement;
      const cardWidth = cardElement ? cardElement.offsetWidth + 24 : 500; // 24 is gap-6 (1.5rem)
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="learning-articles" className="py-20 md:py-32 px-6 md:px-8 lg:px-12" style={{ backgroundColor: 'var(--learning-articles-bg, var(--background))' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <BookOpen className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-bold text-foreground">Learning Articles</h2>
        </div>

        {/* Horizontal Scrollable Container with Arrows */}
        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur border border-border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg cursor-pointer hidden md:flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/95 backdrop-blur border border-border rounded-full p-3 hover:bg-primary hover:text-primary-foreground transition-all shadow-lg cursor-pointer hidden md:flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex-shrink-0 w-full md:w-[500px] lg:w-[600px] snap-center"
              >
                <article className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-lg transition-shadow flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{article.title}</h3>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <p className="text-muted-foreground leading-relaxed">{article.description}</p>
                    
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">What I'm Learning</p>
                      <p className="text-muted-foreground leading-relaxed text-sm">{article.learning}</p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

