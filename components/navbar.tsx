'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/Utsha_Ghosh_Resume.pdf');
      if (!response.ok) {
        console.error('Failed to fetch resume:', response.statusText);
        alert('Unable to download resume. Please try again later.');
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Utsha_Ghosh_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Error downloading resume. Please try again.');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">UG</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="cursor-pointer text-foreground hover:text-primary transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('learning-articles')}
            className="cursor-pointer text-foreground hover:text-primary transition-colors"
          >
            Learning Articles
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="cursor-pointer text-foreground hover:text-primary transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="cursor-pointer text-foreground hover:text-primary transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="cursor-pointer text-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Resume Button */}
        <div className="hidden md:block">
          <button
            onClick={handleDownloadResume}
            className="cursor-pointer bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Download Resume
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="cursor-pointer md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-3 space-y-3">
            <button
              onClick={() => scrollToSection('about')}
              className="cursor-pointer block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('learning-articles')}
              className="cursor-pointer block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Learning Articles
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="cursor-pointer block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="cursor-pointer block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="cursor-pointer block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <button
              onClick={handleDownloadResume}
              className="cursor-pointer block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Download Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
