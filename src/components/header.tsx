"use client";

import Link from "next/link";
import { Code, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Process", id: "process" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold font-headline">CodecCafe</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
             <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="transition-colors hover:text-primary"
              >
                {link.name}
              </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button onClick={() => scrollToSection('contact')} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get a Quote
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
               <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
                <Code className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold font-headline">CodecCafe</span>
              </Link>
              {navLinks.map((link) => (
                 <SheetTrigger asChild key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-left font-medium transition-colors hover:text-primary"
                    >
                      {link.name}
                    </button>
                 </SheetTrigger>
              ))}
               <Button onClick={() => scrollToSection('contact')} variant="default" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                Get a Quote
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
