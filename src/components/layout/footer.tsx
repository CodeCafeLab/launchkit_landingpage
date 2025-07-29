
"use client";

import { Twitter, Github, Linkedin, Instagram } from "lucide-react";
import Link from 'next/link';

export function Footer() {
  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const footerLinks = [
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Shipping and Delivery", href: "/shipping-and-delivery" },
    { name: "Refund Policy", href: "/refund-policy" },
  ];

  return (
    <footer className="w-full bg-secondary border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h4 className="font-semibold text-lg mb-4">About BizTrack Suite</h4>
            <p className="text-sm text-muted-foreground">We are a team of passionate developers and designers dedicated to building exceptional digital experiences that drive business growth.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.name}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.map(link => (
                  <li key={link.name}><Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.name}</Link></li>
                ))}
              </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Github className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-6 w-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BizTrack Suite. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
