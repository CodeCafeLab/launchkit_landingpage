"use client";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-background z-10">
                <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-primary/20 rounded-full blur-[200px] opacity-60 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/4 -translate-y-1/4 bg-accent/20 rounded-full blur-[150px] opacity-50 animate-pulse-slow"></div>
            </div>
            <div className="container relative z-20 mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-300">
                        Build, Launch, and Scale Your Digital Vision
                    </h1>
                    <p className="text-lg text-muted-foreground md:text-xl">
                        We transform innovative ideas into powerful web solutions. Partner with us to craft exceptional user experiences that drive growth and set you apart.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => scrollToSection('contact')} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Start Your Project
                        </Button>
                        <Button onClick={() => scrollToSection('portfolio')} size="lg" variant="outline">
                            See Our Work
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Add these to globals.css if they don't exist
/*
@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.7; transform: scale(1.1) rotate(5deg); }
}

.animate-pulse {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
*/
