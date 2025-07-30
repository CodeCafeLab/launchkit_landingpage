
"use client";

import { useState } from "react";
import Link from 'next/link';
import { Rocket, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from 'next/navigation';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode, onClick?: () => void }) => (
  <Link href={href} onClick={onClick} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
    {children}
  </Link>
);

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const handleBuyNowClick = () => {
    router.push('/checkout');
    if (isMobileMenuOpen) {
        setMobileMenuOpen(false);
    }
  }

  return (
    <header className="w-full bg-background/80 border-b border-border/50 backdrop-blur-sm py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Rocket className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline">BizTrack Suite</span>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => <NavLink key={link.name} href={link.href}>{link.name}</NavLink>)}
          </nav>
          <div className="hidden md:block ml-4">
            <Button onClick={handleBuyNowClick}>Buy Now</Button>
          </div>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background">
                <div className="flex flex-col h-full p-4">
                  <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setMobileMenuOpen(false)}>
                    <Rocket className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold font-headline">BizTrack Suite</span>
                  </Link>
                  <nav className="flex flex-col gap-6 text-lg">
                    {navLinks.map(link => (
                      <NavLink key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                        {link.name}
                      </NavLink>
                    ))}
                  </nav>
                  <Button onClick={handleBuyNowClick} className="mt-auto">Buy Now</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

    