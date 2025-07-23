
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import {
  Loader2, Zap, Code, Star, Users, Cloud, CheckCircle, Smartphone, PenTool, GitBranch, Server, FastForward, Scaling, UserCheck, Eye, Menu, X,
  ChevronDown, Linkedin, Twitter, Github, CreditCard, Banknote, Landmark, Check
} from "lucide-react";

import { classifyLead, type ClassifyLeadOutput } from "@/ai/flows/classify-lead";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


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
  { icon: <Code className="h-10 w-10 text-primary" />, title: "Full Stack Development", description: "End-to-end web solutions, from database to user interface, built with cutting-edge technologies." },
  { icon: <GitBranch className="h-10 w-10 text-primary" />, title: "Product Engineering", description: "Transforming your vision into a market-ready product with a focus on scalability and user experience." },
  { icon: <Smartphone className="h-10 w-10 text-primary" />, title: "Mobile App Development", description: "Native and cross-platform mobile applications that deliver a seamless experience on iOS and Android." },
  { icon: <PenTool className="h-10 w-10 text-primary" />, title: "UI/UX Design", description: "Intuitive and beautiful user interfaces designed to engage and delight your customers." },
  { icon: <Cloud className="h-10 w-10 text-primary" />, title: "Cloud and DevOps", description: "Automated infrastructure and deployment pipelines for reliable and efficient software delivery." },
  { icon: <Zap className="h-10 w-10 text-primary" />, title: "AI Integration", description: "Leverage the power of AI to build intelligent features and automate your business processes." },
];

const whyChooseUs = [
    { icon: <FastForward className="h-8 w-8 text-primary" />, title: "Fast Delivery", description: "We employ agile methodologies to ensure your project is delivered on time, without compromising quality." },
    { icon: <Scaling className="h-8 w-8 text-primary" />, title: "Scalable Solutions", description: "Our architecture is designed for growth, ensuring your application can handle increasing user loads." },
    { icon: <UserCheck className="h-8 w-8 text-primary" />, title: "Experienced Team", description: "Our developers are experts in their fields, dedicated to building robust and innovative software." },
    { icon: <Eye className="h-8 w-8 text-primary" />, title: "Transparent Process", description: "We believe in clear communication, providing you with regular updates and complete visibility." },
];

const techStack = [ "react", "nodejs", "mongodb", "mysql", "nextjs", "tailwindcss", "docker", "kubernetes", "typescript", "figma", "go", "python" ];

const testimonials = [
  { quote: "CodeCafe Labs delivered our platform ahead of schedule and beyond our expectations. Their team is professional, skilled, and a pleasure to work with.", name: "Sarah Johnson", company: "CEO, Innovate Inc.", avatar: "https://placehold.co/100x100.png", hint: "woman portrait" },
  { quote: "The mobile app they developed has received fantastic feedback from our users. The UI/UX is clean, and the performance is flawless.", name: "Michael Chen", company: "Founder, AppSphere", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
  { quote: "Their DevOps expertise streamlined our entire workflow, saving us countless hours and significantly reducing our server costs.", name: "Emily Rodriguez", company: "CTO, DataFlow", avatar: "https://placehold.co/100x100.png", hint: "woman face" },
];

const pricingPlans = [
    {
        name: "Developer",
        price: "$4,999",
        description: "For startups and small businesses ready to build their MVP.",
        features: ["1 Dedicated Developer", "Weekly Sprints", "Full-time availability", "Project Management", "UI/UX Design"],
        cta: "Get Started"
    },
    {
        name: "Team",
        price: "$8,999",
        description: "For growing businesses that need to scale their development.",
        features: ["2-3 Dedicated Developers", "Bi-weekly Sprints", "Full-time availability", "Dedicated Project Manager", "Advanced UI/UX & Prototyping"],
        cta: "Get Started",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations with complex requirements.",
        features: ["Custom Team Size", "Flexible Sprint Schedule", "24/7 Priority Support", "Dedicated Tech Lead & PM", "Full Product Lifecycle Management"],
        cta: "Contact Us"
    }
];

const faqs = [
    { q: "What is the typical timeline for a project?", a: "Project timelines vary based on complexity. A simple website might take 4-6 weeks, while a complex SaaS platform could take 6 months or more. We provide a detailed timeline after our initial discovery call." },
    { q: "How do you handle project management and communication?", a: "We use agile methodologies with regular sprint meetings. You'll have a dedicated project manager and access to a shared Slack channel and project management tool (like Jira or Trello) for real-time updates." },
    { q: "Do you provide support after the project is launched?", a: "Yes, we offer various support and maintenance packages to ensure your application remains secure, up-to-date, and performs optimally post-launch." },
    { q: "Can you work with an existing codebase?", a: "Absolutely. We can audit your existing code, identify areas for improvement, and take over development to add new features or fix issues." }
];

export default function Home() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassifyLeadOutput | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<(typeof pricingPlans[0]) | null>(null);

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
  
  const navLinks = [
      { name: 'Services', href: '#services' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Process', href: '#process' },
      { name: 'Tech Stack', href: '#tech-stack' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="w-full bg-background/80 border-b border-border/50 backdrop-blur-sm py-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <a href="#hero" className="flex items-center gap-2">
            <Code className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline">CodeCafe Labs</span>
          </a>
          <div className="flex-1 flex items-center justify-end gap-8">
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.name}</NavLink>)}
            </nav>
            <div className="hidden md:block">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Book a Free Demo</Button>
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
                            <Button onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }} className="mt-auto">Book a Free Demo</Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-grid-white/[0.05]" id="hero">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-headline tracking-tighter">
              Empower Your Business with <span className="text-primary">CodeCafe Labs</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Smart tech solutions for modern businesses. We build scalable, high-performance web and mobile applications to fuel your growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Book a Free Demo</Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>Know More</Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12" id="trusted-by">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-muted-foreground text-lg mb-8">Trusted by 100+ clients worldwide</h3>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60 grayscale">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Image key={i} src={`https://placehold.co/120x60.png/`} alt={`Client Logo ${i}`} width={120} height={60} data-ai-hint="company logo" />
                    ))}
                </div>
            </div>
        </section>

        <section className="w-full py-16 md:py-24" id="services">
            <div className="container mx-auto px-4">
                 <div className="text-center space-y-4 mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline">Your Tech Growth Partner</h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto">From concept to launch, we provide the technical expertise you need to succeed.</p>
                 </div>
                 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                     {services.map((service) => (
                         <Card key={service.title} className="bg-muted/30 border-border/50 p-6 flex flex-col items-start text-left hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 transform hover:-translate-y-2">
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

        <section className="w-full py-16 md:py-24 bg-muted/20" id="pricing">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Flexible Plans for Every Team</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Choose the right plan to match your project's needs and scale as you grow.</p>
                </div>
                <Dialog open={!!selectedPlan} onOpenChange={(open) => !open && setSelectedPlan(null)}>
                    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
                        {pricingPlans.map((plan) => (
                          <Card key={plan.name} className={`flex flex-col h-full bg-muted/30 border-border/50 hover:border-primary/50 transition-all duration-300 ${plan.popular ? 'border-primary/80 relative shadow-2xl shadow-primary/10' : ''}`}>
                            {plan.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>}
                            <CardHeader className="pt-10">
                                <CardTitle className="font-headline text-2xl mb-2">{plan.name}</CardTitle>
                                <CardDescription className="text-muted-foreground h-10">{plan.description}</CardDescription>
                                <div className="text-4xl font-bold pt-4">{plan.price}<span className="text-lg font-normal text-muted-foreground">/mo</span></div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <ul className="space-y-4">
                                  {plan.features.map(feature => (
                                      <li key={feature} className="flex items-center gap-3">
                                          <CheckCircle className="h-5 w-5 text-primary" />
                                          <span className="text-muted-foreground">{feature}</span>
                                      </li>
                                  ))}
                              </ul>
                            </CardContent>
                            <CardFooter>
                                {plan.price === 'Custom' ? (
                                   <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="w-full" size="lg">{plan.cta}</Button>
                                ) : (
                                  <DialogTrigger asChild>
                                    <Button onClick={() => setSelectedPlan(plan)} className="w-full" size="lg">{plan.cta}</Button>
                                  </DialogTrigger>
                                )}
                            </CardFooter>
                          </Card>
                        ))}
                    </div>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle className="font-headline text-2xl">Complete Your Purchase</DialogTitle>
                            <DialogDescription>
                                You've selected the <span className="font-bold text-primary">{selectedPlan?.name}</span> plan.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                            <div>
                                <h4 className="font-semibold mb-4">Payment Method</h4>
                                <RadioGroup defaultValue="card" className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="card" id="card" />
                                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer"><CreditCard/> Credit Card</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="paypal" id="paypal" />
                                        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer"><Landmark/> PayPal</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="bank" id="bank" />
                                        <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer"><Banknote/> Bank Transfer</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">Card Number</Label>
                                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2 col-span-2">
                                        <Label htmlFor="expiry">Expiry Date</Label>
                                        <Input id="expiry" placeholder="MM/YY" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvc">CVC</Label>
                                        <Input id="cvc" placeholder="123" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="name-on-card">Name on Card</Label>
                                    <Input id="name-on-card" placeholder="John Doe" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="pt-4">
                            <DialogClose asChild>
                            <Button size="lg" onClick={() => {
                                toast({
                                    title: "Payment Successful!",
                                    description: `Thank you for purchasing the ${selectedPlan?.name} plan.`,
                                });
                                setSelectedPlan(null); 
                            }}>
                                Pay {selectedPlan?.price}
                            </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-muted/20" id="process">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Us?</h2>
                        <p className="text-muted-foreground">We are more than just developers; we are your partners in innovation. We are committed to your success and dedicated to excellence.</p>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {whyChooseUs.map(item => (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg">{item.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-lg">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Image src="https://placehold.co/600x450.png" alt="Team working" width={600} height={450} className="rounded-lg shadow-2xl" data-ai-hint="team collaboration" />
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full py-16 md:py-24" id="tech-stack">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Tech Stack</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">We use modern, robust technologies to build solutions that stand the test of time.</p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {techStack.map(tech => (
                        <div key={tech} className="flex flex-col items-center gap-2 text-center text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                           <Image src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`} alt={tech} width={64} height={64} className="h-12 w-12 md:h-16 md:w-16 transition-transform duration-300 group-hover:scale-110" />
                           <span className="text-sm capitalize">{tech.replace('nodejs', 'Node.js').replace('nextjs', 'Next.js')}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-muted/20" id="testimonials">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Real stories from businesses we've helped empower.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-muted/30 border-border/50">
                  <CardContent className="p-6 flex flex-col items-start text-left">
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
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="contact">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center bg-muted/30 p-8 md:p-12 rounded-lg border-border/50">
                    <div className="space-y-6">
                         <h2 className="text-3xl md:text-4xl font-bold font-headline">Book a Free Demo</h2>
                         <p className="text-muted-foreground">Ready to start your project? Have a question? Fill out the form, and our team will get back to you within 24 hours to schedule your free, no-obligation demo and consultation.</p>
                         <div className="border-t border-border/50 pt-6 space-y-4">
                             <h3 className="font-semibold">Our Process:</h3>
                             <div className="flex items-center gap-4 text-muted-foreground"><span className="text-primary font-bold">1.</span> Submit the form with your project idea.</div>
                             <div className="flex items-center gap-4 text-muted-foreground"><span className="text-primary font-bold">2.</span> We'll email you to schedule a demo call.</div>
                             <div className="flex items-center gap-4 text-muted-foreground"><span className="text-primary font-bold">3.</span> We'll discuss your project and provide a proposal.</div>
                         </div>
                    </div>
                    <Card className="text-foreground bg-background shadow-2xl">
                        <CardContent className="p-6 lg:p-8">
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

        <section className="w-full py-16 md:py-24 bg-muted/20" id="faq">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
                </div>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                           <AccordionItem key={i} value={`item-${i}`}>
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

      <footer className="w-full bg-background border-t">
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <h4 className="font-semibold text-lg mb-2">About CodeCafe Labs</h4>
                    <p className="text-sm text-muted-foreground">We are a team of passionate developers and designers dedicated to building exceptional digital experiences.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2">Contact</h4>
                    <p className="text-sm text-muted-foreground">contact@codecafelabs.com</p>
                    <p className="text-sm text-muted-foreground">123 Tech Street, Silicon Valley, CA</p>
                </div>
                <div>
                    <h4 className="font-semibold text-lg mb-2">Follow Us</h4>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-6 w-6" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary"><Github className="h-6 w-6" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-6 w-6" /></a>
                    </div>
                </div>
            </div>
            <div className="border-t mt-8 pt-6 text-center">
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
    </div>
  );
}

    