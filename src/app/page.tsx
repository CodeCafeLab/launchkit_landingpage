

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import {
  Loader2, Zap, Code, Star, Users, Cloud, CheckCircle, Smartphone, PenTool, GitBranch, Server, FastForward, Scaling, UserCheck, Eye, Menu, X,
  Linkedin, Twitter, Github, Instagram, ArrowRight, BrainCircuit, Lightbulb, ShieldCheck, DollarSign, Settings, Search, LineChart, CreditCard, Lock, Check, ShoppingCart
} from "lucide-react";

import { classifyLead, type ClassifyLeadOutput } from "@/ai/flows/classify-lead";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import image1 from './CF-FF_ADS_CAROUSEL-1080-x-1080-px-2-e1745984599904-1024x996.webp'
import image2 from './CF-FF_ADS_CAROUSEL-1080-x-1080-px-5-1-1-1024x855.webp'
import image3 from './CF-FF_ADS_CAROUSEL.webp'
import image4 from './FF-FULLVIEW1-e1746439033331-1536x1395.webp'

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide some details about your project."),
});

type FormData = z.infer<typeof formSchema>;

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
    {children}
  </a>
);

const services = [
  { icon: <GitBranch className="h-8 w-8 text-primary" />, title: "Product Engineering", description: "End-to-end development of your product, from ideation and architecture to deployment and scaling." },
  { icon: <Smartphone className="h-8 w-8 text-primary" />, title: "Mobile App Development", description: "Beautiful and performant iOS and Android apps that your users will love." },
  { icon: <PenTool className="h-8 w-8 text-primary" />, title: "UI/UX Design", description: "Crafting intuitive and engaging user experiences that drive conversions and delight users." },
  { icon: <Code className="h-8 w-8 text-primary" />, title: "Web App Development", description: "Robust and scalable web applications built with modern frameworks like React and Next.js." },
  { icon: <Cloud className="h-8 w-8 text-primary" />, title: "DevOps and Cloud", description: "Streamlining your development and deployment process for faster, more reliable releases." },
  { icon: <BrainCircuit className="h-8 w-8 text-primary" />, title: "AI & ML Integration", description: "Leverage the power of AI to build intelligent, data-driven applications." },
];

const whyChooseUs = [
  { icon: <FastForward className="h-8 w-8 text-primary" />, title: "Agile Approach", description: "We use agile methodologies to deliver high-quality software quickly and efficiently." },
  { icon: <UserCheck className="h-8 w-8 text-primary" />, title: "Tech Experts", description: "Our team of experienced engineers are experts in the latest technologies and best practices." },
  { icon: <DollarSign className="h-8 w-8 text-primary" />, title: "Affordable Pricing", description: "We offer competitive pricing to help you build your dream product without breaking the bank." },
  { icon: <Eye className="h-8 w-8 text-primary" />, title: "Transparent Communication", description: "We believe in open and honest communication, keeping you updated every step of the way." },
  { icon: <Scaling className="h-8 w-8 text-primary" />, title: "Scalable Solutions", description: "We build solutions that can grow with your business, ensuring long-term success." },
  { icon: <Server className="h-8 w-8 text-primary" />, title: "Dedicated Support", description: "Our team is here to support you, providing maintenance and assistance whenever you need it." },
];

const techStack = [
  {
    name: 'React', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>React</title>
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2.48-8.474c-.247.644.12.918.452.918.423 0 .52-.379.52-.379s-.002-.004.288-1.077c.29-1.07.696-2.52.696-2.52s.023-.082.23-.082.23.082.23.082-.41 2.52-.697 2.52c-.286 0-.288 1.077-.288 1.077s.098.379.52.379c.333 0 .7-.274.453-.918-.248-.644-3.6-8.026-3.6-8.026s-.197-.477-.66-.477c-.464 0-1.897 1.898-1.897 1.898s-.33.398-.166.837c.165.438.837.166.837.166s2.583-2.35 2.807-2.61c.224-.26 1.108.918 1.108.918s-3.083 6.94-3.353 7.584zm4.96 0c.27-6.623-3.353-7.584-3.353-7.584s.885-1.178 1.108-.918c.224.26 2.807 2.61 2.807 2.61s.672.272.837-.166c.164-.44-.166-.837-.166-.837S14.077 3.5 14.077 3.5s-.196-.477-.66-.477c-.463 0-.66.477-.66.477s-3.354 7.38-3.602 8.026c-.246.644.12.918.453.918.422 0 .52-.379.52-.379s-.002-.004.288-1.077c.29-1.07.697-2.52.697-2.52s.023-.082.23-.082.23.082.23.082-.41 2.52-.697 2.52c-.286 0-.288 1.077-.288 1.077s.098.379.52.379c.333 0 .7-.274.453-.918z" />
      </svg>
    )
  },
  {
    name: 'Node.js', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>Node.js</title>
        <path d="M11.758 16.942c.818.433 1.778.691 2.795.691 2.836 0 4.908-1.928 4.908-5.328 0-3.26-1.95-5.263-4.63-5.263-.878 0-1.66.27-2.316.733V16.94zm2.14-12.82c5.094 0 8.652 3.42 8.652 8.934 0 5.48-3.52 8.814-8.494 8.814-1.258 0-2.44-.19-3.558-.58-.33-.12-.495-.45-.495-.8v-15.12c0-.39.264-.69.63-.69.878 0 1.63.06 2.262.11zM7.55 18.005c-.33 0-.594-.23-.594-.56V6.556c0-.33.264-.56.594-.56h1.948c.33 0 .594.23.594.56v10.89c0 .33-.264.56-.594.56H7.55zM2.33 12.01c0-1.35.396-2.57.99-3.56.76-1.26 1.948-2.04 3.4-2.04.56 0 1.023.12 1.453.33.263.12.363.39.363.66v10.88c0 .27-.1.54-.363.66-.43.21-.892.33-1.452.33-1.452 0-2.64-1-3.4-2.5-.594-1.02-.99-2.28-.99-3.76z" />
      </svg>
    )
  },
  {
    name: 'Next.js', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>Next.js</title>
        <path d="M12.984 12.984V24h2.232V12.984h-2.232zm-4.188 0V24h2.232V12.984H8.796zM15.22 0v10.752h2.232V0h-2.232zM7.428 5.46L3.936 24h2.328l1.8-9.372h.048L9.9 24h2.232L8.64 5.46H7.428z" />
      </svg>
    )
  },
  {
    name: 'MongoDB', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>MongoDB</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v.5h-5v-.5zm-2-2.45c-.29-.11-.59-.18-.9-.2-1.69-.17-3.1-1.69-3.1-3.35 0-1.84 1.49-3.33 3.33-3.33 1.02 0 1.94.46 2.58 1.2l-.78.78c-.45-.55-1.12-.88-1.8-.88-1.11 0-2.01.89-2.01 2.01s.89 2.01 2.01 2.01c.68 0 1.35-.33 1.8-.88l.78.78c-.64.74-1.56 1.2-2.58 1.2-.41 0-.8-.06-1.17-.18zm6.5-1.55c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    )
  },
  {
    name: 'MySQL', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>MySQL</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.76 13.91c-.42.23-.9.36-1.42.36-1.28 0-2.32-1.04-2.32-2.32v-5.9h1.4v5.52c0 .59.48 1.07 1.07 1.07.41 0 .78-.23 1.02-.57V8.05h1.4v7.86zm5.9-1.34c0-.75-.61-1.36-1.36-1.36h-2.1v2.72h2.1c.75 0 1.36-.61 1.36-1.36zm-3.46-4.52v2.72h2.1c.75 0 1.36-.61 1.36-1.36s-.61-1.36-1.36-1.36h-2.1zm2.1 7.2h-2.1V19h-1.4V8.05h3.5c1.55 0 2.8 1.25 2.8 2.8 0 .97-.5 1.82-1.25 2.33.91.4 1.55 1.31 1.55 2.41 0 1.55-1.25 2.8-2.8 2.8z" />
      </svg>
    )
  },
  {
    name: 'GraphQL', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>GraphQL</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.5 13.5l-2.5 1.5-3.5-6.5-1.5 2.5-1.5-1 4.5-8 7.5 4.5-3 5zm-13 0l2.5 1.5 3.5-6.5 1.5 2.5 1.5-1-4.5-8-7.5 4.5 3 5z" />
      </svg>
    )
  },
  {
    name: 'TypeScript', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>TypeScript</title>
        <path d="M1.5 0h21v24H1.5z" fill="#3178c6" />
        <path d="M12.582 12.354c.48.42.72.96.72 1.62 0 .72-.276 1.296-.828 1.728-.552.432-1.284.648-2.196.648H8.52V8.4h1.944c.84 0 1.5.18 1.98.54.48.36.72.84.72 1.44 0 .54-.228 1.008-.684 1.404l.108-.036zm-2.016-1.8c-.324-.24-.732-.36-1.224-.36H9.72v2.4h.6c.552 0 .996-.132 1.332-.396.336-.264.504-.636.504-1.116 0-.42-.168-.756-.504-1.008zM19.14 8.4v1.512h-2.4v8.016h-1.68V9.912h-2.4V8.4h6.48z" />
      </svg>
    )
  },
  {
    name: 'Docker', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>Docker</title>
        <path d="M22.128 7.072c-1.306-1.56-3.235-2.22-4.992-2.22-1.045 0-2.42.348-3.924 1.224l-.168-.12C11.556 4.912 9.756 4 7.8 4c-2.42 0-4.38 1.2-5.496 2.616C1.044 8.28.516 10.216.516 12.22c0 .3.024.6.072.888h14.424v-1.644h1.644v-1.632h1.644V8.2h1.632v-.564c0-.216-.012-.432-.036-.648l.228.084zM8.868 6.292c.28-.156.576-.228.864-.228s.588.072.864.228c.28.156.42.384.42.684s-.14.528-.42.684a.96.96 0 01-.864.228.96.96 0 01-.864-.228c-.28-.156-.42-.384-.42-.684s.14-.528.42-.684zm-3.156 0c.28-.156.576-.228.864-.228s.588.072.864.228c.28.156.42.384.42.684s-.14.528-.42.684a.96.96 0 01-.864.228.96.96 0 01-.864-.228c-.28-.156-.42-.384-.42-.684s.14-.528.42-.684zm0 2.436c.28-.156.576-.228.864-.228s.588.072.864.228c.28.156.42.384.42.684s-.14.528-.42.684a.96.96 0 01-.864.228.96.96 0 01-.864-.228c-.28-.156-.42-.384-.42-.684s.14-.528.42-.684zm3.156 0c.28-.156.576-.228.864-.228s.588.072.864.228c.28.156.42.384.42.684s-.14.528-.42.684a.96.96 0 01-.864.228.96.96 0 01-.864-.228c-.28-.156-.42-.384-.42-.684s.14-.528.42-.684zm-1.572 2.436c.28-.156.576-.228.864-.228s.588.072.864.228c.28.156.42.384.42.684s-.14.528-.42.684a.96.96 0 01-.864.228.96.96 0 01-.864-.228c-.28-.156-.42-.384-.42-.684s.14-.528.42-.684z" />
      </svg>
    )
  },
  {
    name: 'Kubernetes', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>Kubernetes</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.12 4.41l1.12 1.12 1.12-1.12 2.24 2.24-1.12 1.12 1.12 1.12-2.24 2.24-1.12-1.12-1.12 1.12-2.24-2.24 1.12-1.12-1.12-1.12zm0 7.18l-2.24-2.24 1.12-1.12-1.12-1.12L6.4 11.2l-1.12-1.12L3.04 12.3l1.12 1.12 1.12-1.12 2.24 2.24zm6.72 0l2.24-2.24-1.12-1.12 1.12-1.12 2.24 2.24 1.12-1.12 1.12 1.12-2.24 2.24z" />
      </svg>
    )
  },
  {
    name: 'AWS', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>Amazon Web Services</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 13.77c-.33.25-.72.4-1.17.4-1.07 0-1.94-.87-1.94-1.94v-3.66c0-1.07.87-1.94 1.94-1.94.45 0 .84.15 1.17.4l.23-.23V8.1h1.74v7.44h-1.74v-.23l-.23.23zm-.1-4.83c-.38-.38-.97-.61-1.6-.61-1.22 0-2.21.99-2.21 2.21v1.02c0 1.22.99 2.21 2.21 2.21.63 0 1.22-.23 1.6-.61V10.94zM18.8 14.5c0 1.94-1.57 3.5-3.5 3.5s-3.5-1.56-3.5-3.5 1.57-3.5 3.5-3.5 3.5 1.56 3.5 3.5zm-1.76 0c0-1.05-.85-1.9-1.9-1.9s-1.9.85-1.9 1.9.85 1.9 1.9 1.9 1.9-.85 1.9-1.9z" />
      </svg>
    )
  },
  {
    name: 'Google Cloud', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>Google Cloud</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.8 14.2c-1.33 0-2.4-1.07-2.4-2.4s1.07-2.4 2.4-2.4c.58 0 1.1.2 1.5.54l-1.5 1.5 1.5 1.5c-.4.34-.92.56-1.5.56zm3.6-1.2c-.34.34-.78.54-1.2.54-1.33 0-2.4-1.07-2.4-2.4s1.07-2.4 2.4-2.4c.42 0 .86.2 1.2.54l1.5-1.5c-.99-.99-2.33-1.6-3.8-1.6-2.76 0-5 2.24-5 5s2.24 5 5 5c1.47 0 2.81-.61 3.8-1.6l-1.5-1.5z" />
      </svg>
    )
  },
  {
    name: 'Firebase', icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
        <title>Firebase</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.09 5.59L12 12.5l-3.09-3.09 1.41-1.41L12 9.67l1.68-1.68 1.41 1.41L12 12.5l3.09 3.09-1.41 1.41L12 15.33l-1.68 1.68-1.41-1.41L12 12.5l-3.09-3.09z" />
      </svg>
    )
  },
];

const industries = ["EdTech", "FinTech", "Healthcare", "Logistics", "E-commerce", "SaaS", "Real Estate", "Travel"];

const testimonials = [
  { quote: "Working with CodeCafe Labs was a game-changer for our business. Their team is incredibly talented and delivered a product that exceeded all our expectations. Highly recommended!", name: "Priya Sharma", company: "Founder, Edutech Innovations", avatar: "https://placehold.co/100x100.png", hint: "woman portrait" },
  { quote: "The professionalism and technical expertise of the CodeCafe Labs team are top-notch. They transformed our vision into a reality with a seamless and efficient process.", name: "Rohan Gupta", company: "CEO, HealthFirst", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
  { quote: "I'm so impressed with the final product. The UI/UX is fantastic, and the app is incredibly fast and responsive. I couldn't be happier with the results.", name: "Anjali Mehta", company: "Product Manager, FinConnect", avatar: "https://placehold.co/100x100.png", hint: "woman face" },
  { quote: "The mobile app they developed for us is intuitive and has received amazing feedback from our users. The team at CodeCafe was responsive and a pleasure to work with.", name: "Sameer Khan", company: "Director, TravelSphere", avatar: "https://placehold.co/100x100.png", hint: "man face" },
];

const faqs = [
  { q: "What is your development process?", a: "We follow an agile development process that allows us to deliver high-quality software in short iterations. This includes discovery, design, development, testing, and deployment, with continuous feedback loops." },
  { q: "How much will my project cost?", a: "The cost of a project depends on its scope and complexity. We provide a detailed estimate after an initial discovery call where we understand your requirements. Our goal is to offer affordable and transparent pricing." },
  { q: "How long will it take to build my app?", a: "Timelines vary based on project complexity. A simple MVP might take 2-3 months, while a more feature-rich application could take 6 months or longer. We'll provide a detailed project timeline upfront." },
  { q: "Do you offer post-launch support?", a: "Yes, we offer ongoing support and maintenance packages to ensure your application runs smoothly and stays up-to-date with the latest security patches and technology updates." },
  { q: "Can you work with my existing team?", a: "Absolutely. We are happy to collaborate with your in-house team to augment your existing capabilities and ensure a smooth project delivery." },
  { q: "What makes CodeCafe Labs different from other agencies?", a: "Our key differentiators are our deep technical expertise, our commitment to transparent communication, and our focus on building long-term partnerships. We don't just build software; we build solutions that drive business growth." }
];

export default function Home() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassifyLeadOutput | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setClassificationResult(null);
    try {
      const result = await classifyLead({
        name: values.name,
        email: values.email,
        phone: values.phone,
        projectDetails: values.message,
      });
      setClassificationResult(result);
      setIsResultOpen(true);
      form.reset();
    } catch (error) {
      console.error("Failed to classify lead:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not submit your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCtaClick = () => {
    document.getElementById('payment')?.scrollIntoView({ behavior: 'smooth' });
  }

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#payment' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="w-full bg-background/80 border-b border-border/50 backdrop-blur-sm py-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <a href="#hero" className="flex items-center gap-2">
              <Code className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline">CodeCafe Labs</span>
            </a>
            <nav className="hidden md:flex items-center gap-4">
              {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.name}</NavLink>)}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button onClick={handleCtaClick}>Book a Free Demo</Button>
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
                    <a href="#hero" className="flex items-center gap-2 mb-8" onClick={() => setMobileMenuOpen(false)}>
                      <Code className="h-8 w-8 text-primary" />
                      <span className="text-2xl font-bold font-headline">CodeCafe Labs</span>
                    </a>
                    <nav className="flex flex-col gap-6 text-lg">
                      {navLinks.map(link => (
                        <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors">
                          {link.name}
                        </a>
                      ))}
                    </nav>
                    <Button onClick={() => { handleCtaClick(); setMobileMenuOpen(false); }} className="mt-auto">Book a Free Demo</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-hero-gradient" id="hero">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-headline tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              Empower Your Business with <span className="text-primary">CodeCafe Labs</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              We build future-ready digital solutions that drive growth, innovation, and success for your business.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleCtaClick}>
                Book a Free Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore More
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12" id="trusted-by">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-muted-foreground text-lg mb-8">Trusted by 100+ Clients Across India</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60 grayscale">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Image key={i} src={`https://placehold.co/120x60.png/`} alt={`Client Logo ${i}`} width={120} height={60} data-ai-hint="company logo" />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="services">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Build, Launch & Grow with Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">We offer a complete suite of services to bring your digital products to life, from initial concept to launch and beyond.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="bg-secondary/30 border-border/50 p-6 flex flex-col items-start text-left hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline text-xl mb-2">{service.title}</CardTitle>
                  <CardContent className="p-0 text-muted-foreground">{service.description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-secondary/20" id="payment">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
                  Your <span className="text-primary underline decoration-wavy decoration-from-font">one-time payment</span> grants lifetime access
                </h2>
                <p className="text-muted-foreground text-lg">
                  No subscriptions, No hassle. Love it or get your money back within 7 days.
                </p>
                <div className="p-4 bg-secondary/50 border border-border/50 rounded-lg">
                  <p className="text-muted-foreground">If you ever run into any issues or get stuck, you're not alone—just email us at <a href="mailto:support@codecafelabs.com" className="text-primary hover:underline">support@codecafelabs.com</a> for help</p>
                </div>
              </div>
              <Card className="bg-secondary/30 border-border/50 shadow-2xl shadow-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline text-2xl">Join 1,000+ Businesses Who Transformed Their Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="my-4">
                    <span className="text-5xl font-bold mr-2">₹549</span>
                    <span className="text-2xl text-muted-foreground line-through">₹999</span>
                  </div>
                  <p className="text-primary font-semibold mb-6">40% OFFER WITH EVERYTHING INCLUDED</p>

                  <Button onClick={() => setPaymentModalOpen(true)} className="w-full text-lg" size="lg">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Button>

                  <p className="text-center text-muted-foreground mt-4 text-sm font-semibold">7-Days Money Back Guarantee (No Questions Asked)</p>

                  <ul className="space-y-3 text-muted-foreground mt-6">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Lifetime access + updates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>In-depth tutorials and examples</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>7-day money-back guarantee</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        <section className="w-full py-16 md:py-24" id="why-us">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose CodeCafe Labs?</h2>
                <p className="text-muted-foreground">We're not just a service provider; we're your dedicated partner in achieving digital excellence. Our commitment to quality, innovation, and client success sets us apart.</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {whyChooseUs.map(item => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Image src="https://placehold.co/600x450.png" alt="Team discussing project" width={600} height={450} className="rounded-lg shadow-2xl" data-ai-hint="team collaboration" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-secondary/20" id="tech-stack">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Tech Stack</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">We use a modern, robust, and scalable tech stack to build world-class applications.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {techStack.map(tech => (
                <div key={tech.name} className="group flex flex-col items-center gap-3 text-center w-24">
                  <div className="fill-muted-foreground/80 group-hover:fill-primary transition-colors duration-300">
                    {tech.icon}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="industries">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">We've Worked With</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our expertise spans across various industries, delivering tailored solutions that meet specific market needs.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {industries.map(industry => (
                <div key={industry} className="py-2 px-6 bg-secondary/30 border border-border/50 rounded-full text-lg font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="w-full py-16 md:py-24 bg-secondary/20" id="testimonials">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from businesses we've helped empower.</p>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="bg-secondary/30 border-border/50 h-full flex flex-col">
                        <CardContent className="p-6 flex flex-col items-start text-left flex-grow">
                          <p className="italic text-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="contact">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center bg-secondary/20 p-8 md:p-12 rounded-lg border-border/50">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Have a different need?</h2>
                <p className="text-muted-foreground">Let's discuss your custom project. Fill out the form, and our team will get back to you within 24 hours to schedule your free, no-obligation consultation.</p>
                <div className="border-t border-border/50 pt-6 space-y-4">
                  <div className="flex items-center gap-4 text-muted-foreground"><CheckCircle className="h-5 w-5 text-primary" /> Submit the form with your project idea.</div>
                  <div className="flex items-center gap-4 text-muted-foreground"><CheckCircle className="h-5 w-5 text-primary" /> We'll email you to schedule a demo call.</div>
                  <div className="flex items-center gap-4 text-muted-foreground"><CheckCircle className="h-5 w-5 text-primary" /> Discuss your project and get a proposal.</div>
                </div>
              </div>
              <Card className="text-foreground bg-background shadow-2xl">
                <CardHeader>
                  <CardTitle>Book a Free Consultation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Work Email</FormLabel><FormControl><Input placeholder="e.g. john@company.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input placeholder="e.g. +1 234 567 8900" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>How can we help you?</FormLabel><FormControl><Textarea placeholder="Tell us about your project..." {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" disabled={isSubmitting} className="w-full !mt-6" size="lg">
                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</> : "Submit Request"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="faq">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/50">
                    <AccordionTrigger className="text-lg text-left hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full bg-secondary/20 border-t border-border/50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-lg mb-4">About CodeCafe Labs</h4>
              <p className="text-sm text-muted-foreground">We are a team of passionate developers and designers dedicated to building exceptional digital experiences.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <a href="mailto:contact@codecafelabs.com" className="text-sm text-muted-foreground hover:text-primary block">contact@codecafelabs.com</a>
              <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary block">+1 (234) 567-890</a>
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
          <div className="border-t border-border/50 mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CodeCafe Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AlertDialog open={isResultOpen} onOpenChange={setIsResultOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 font-headline">
              <CheckCircle className="h-6 w-6 text-primary" />
              Request Received!
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-left space-y-4">
              <p>Thanks for your interest! We've received your request and will be in touch within 24 hours to schedule your free demo.</p>
              {classificationResult && (
                <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                  <h4 className="font-semibold text-foreground">Internal Lead Analysis:</h4>
                  <p className="text-sm text-muted-foreground">Priority: <span className={classificationResult.priority === 'High' ? 'text-destructive' : classificationResult.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}>{classificationResult.priority}</span></p>
                  <p className="text-sm text-muted-foreground">{classificationResult.classificationReason}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsResultOpen(false)}>
              Awesome!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isPaymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              You're choosing the Lifetime Access plan for <strong>₹549</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <div className="relative">
                <Input id="card-number" placeholder="0000 0000 0000 0000" />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input id="expiry-date" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <div className="relative">
                  <Input id="cvc" placeholder="123" />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name-on-card">Name on Card</Label>
              <Input id="name-on-card" placeholder="John Doe" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full" onClick={() => {
              setPaymentModalOpen(false);
              toast({ title: "Payment Successful!", description: `Thank you for purchasing the Lifetime Access plan.` });
            }}>
              Pay ₹549
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
