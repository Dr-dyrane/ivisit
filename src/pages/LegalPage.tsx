import React from 'react';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';

interface LegalPageProps {
  title: string;
  content: React.ReactNode;
}

export const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
  return (
    <div className="min-h-screen pt-40 pb-32 bg-background transition-colors duration-300">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h1 className="text-5xl font-black text-foreground mb-4 tracking-tighter uppercase">{title}</h1>
            <div className="h-1 w-20 bg-primary rounded-full" />
            <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-muted-foreground/50">Official Protocol Document • IVISIT COMMAND</p>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tight prose-headings:uppercase prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg prose-p:font-light
            prose-li:text-muted-foreground prose-li:text-lg prose-li:font-light
            prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-6
            space-y-8">
            {content}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LegalPage;
