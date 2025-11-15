import { Navbar } from '@/components/navbar';
import { AboutSection } from '@/components/about-section';
import { LearningArticlesSection } from '@/components/learning-articles-section';
import { ExperienceSection } from '@/components/experience-section';
import { ProjectsSection } from '@/components/projects-section';
import { ContactSection } from '@/components/contact-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <AboutSection />
      <LearningArticlesSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
