
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image, { StaticImageData } from "next/image";
import {
  Loader2, Zap, Code, Star, Users, Cloud, CheckCircle, Smartphone, PenTool, GitBranch, Server, FastForward, Scaling, UserCheck, Eye,
  ArrowRight, BrainCircuit, Lightbulb, ShieldCheck, DollarSign, MinusCircle, Download, ShoppingCart
} from "lucide-react";

import { classifyLead, type ClassifyLeadInput, type ClassifyLeadOutput } from "@/ai/flows/classify-lead";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide some details about your project."),
});

type FormData = z.infer<typeof formSchema>;

const orderFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  address: z.string().min(10, "Please enter a valid address."),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

const services = [
  { icon: <GitBranch className="h-8 w-8 text-primary" />, title: "Product Engineering", description: "End-to-end development of your product, from ideation and architecture to deployment and scaling." },
  { icon: <Smartphone className="h-8 w-8 text-primary" />, title: "Mobile App Development", description: "Beautiful and performant iOS and Android apps that your users will love." },
  { icon: <PenTool className="h-8 w-8 text-primary" />, title: "UI/UX Design", description: "Crafting intuitive and engaging user experiences that drive conversions and delight users." },
  { icon: <Code className="h-8 w-8 text-primary" />, title: "Web App Development", description: "Robust and scalable web applications built with modern frameworks like React and Next.js." },
  { icon: <Cloud className="h-8 w-8 text-primary" />, title: "DevOps and Cloud", description: "Streamlining your development and deployment process for faster, more reliable releases." },
  { icon: <BrainCircuit className="h-8 w-8 text-primary" />, title: "AI & ML Integration", description: "Leverage the power of AI to build intelligent, data-driven applications." },
];

const whyChooseUs = [
  { icon: <FastForward className="h-6 w-6 text-primary" />, title: "Agile Approach", description: "We use agile methodologies to deliver high-quality software quickly and efficiently." },
  { icon: <UserCheck className="h-6 w-6 text-primary" />, title: "Tech Experts", description: "Our team of experienced engineers are experts in the latest technologies and best practices." },
  { icon: <DollarSign className="h-6 w-6 text-primary" />, title: "Affordable Pricing", description: "We offer competitive pricing to help you build your dream product without breaking the bank." },
  { icon: <Eye className="h-6 w-6 text-primary" />, title: "Transparent Communication", description: "We believe in open and honest communication, keeping you updated every step of the way." },
];

const techStack = [
  { name: 'React', icon: 'https://cdn.worldvectorlogo.com/logos/react-2.svg', hint: 'React logo' },
  { name: 'Node.js', icon: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg', hint: 'Nodejs logo' },
  { name: 'Next.js', icon: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', hint: 'Nextjs logo' },
  { name: 'MongoDB', icon: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg', hint: 'MongoDB logo' },
  { name: 'MySQL', icon: 'https://cdn.worldvectorlogo.com/logos/mysql-6.svg', hint: 'MySQL logo' },
  { name: 'GraphQL', icon: 'https://cdn.worldvectorlogo.com/logos/graphql.svg', hint: 'GraphQL logo' },
  { name: 'TypeScript', icon: 'https://cdn.worldvectorlogo.com/logos/typescript.svg', hint: 'TypeScript logo' },
  { name: 'Docker', icon: 'https://cdn.worldvectorlogo.com/logos/docker.svg', hint: 'Docker logo' },
  { name: 'Kubernetes', icon: 'https://cdn.worldvectorlogo.com/logos/kubernetes.svg', hint: 'Kubernetes logo' },
  { name: 'AWS', icon: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg', hint: 'AWS logo' },
  { name: 'Google Cloud', icon: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg', hint: 'Google Cloud logo' },
  { name: 'Firebase', icon: 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg', hint: 'Firebase logo' },
];

const industries = ["EdTech", "FinTech", "Healthcare", "Logistics", "E-commerce", "SaaS", "Real Estate", "Travel"];

const testimonials = [
  { quote: "Working with BizTrack Suite was a game-changer for our business. Their team is incredibly talented and delivered a product that exceeded all our expectations. Highly recommended!", name: "Priya Sharma", company: "Founder, Edutech Innovations", avatar: "https://placehold.co/100x100.png", hint: "woman portrait" },
  { quote: "The professionalism and technical expertise of the BizTrack Suite team are top-notch. They transformed our vision into a reality with a seamless and efficient process.", name: "Rohan Gupta", company: "CEO, HealthFirst", avatar: "https://placehold.co/100x100.png", hint: "man portrait" },
  { quote: "I'm so impressed with the final product. The UI/UX is fantastic, and the app is incredibly fast and responsive. I couldn't be happier with the results.", name: "Anjali Mehta", company: "Product Manager, FinConnect", avatar: "https://placehold.co/100x100.png", hint: "woman face" },
  { quote: "The mobile app they developed for us is intuitive and has received amazing feedback from our users. The team at BizTrack Suite was responsive and a pleasure to work with.", name: "Sameer Khan", company: "Director, TravelSphere", avatar: "https://placehold.co/100x100.png", hint: "man face" },
];

const faqs = [
  { q: "What is your development process?", a: "We follow an agile development process that allows us to deliver high-quality software in short iterations. This includes discovery, design, development, testing, and deployment, with continuous feedback loops." },
  { q: "How much will my project cost?", a: "The cost of a project depends on its scope and complexity. We provide a detailed estimate after an initial discovery call where we understand your requirements. Our goal is to offer affordable and transparent pricing." },
  { q: "How long will it take to build my app?", a: "Timelines vary based on project complexity. A simple MVP might take 2-3 months, while a more feature-rich application could take 6 months or longer. We'll provide a detailed project timeline upfront." },
  { q: "Do you offer post-launch support?", a: "Yes, we offer ongoing support and maintenance packages to ensure your application runs smoothly and stays up-to-date with the latest security patches and technology updates." },
  { q: "Can you work with my existing team?", a: "Absolutely. We are happy to collaborate with your in-house team to augment your existing capabilities and ensure a smooth project delivery." },
];

interface HomeUIProps {
  image1: StaticImageData;
  image3: StaticImageData;
  image4: StaticImageData;
  client: StaticImageData;
  before: StaticImageData;
  after: StaticImageData;
}

export const HomeUI: React.FC<HomeUIProps> = ({ image1, image3, image4, client, before, after }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassifyLeadOutput | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState<OrderFormData | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });
  
  const orderForm = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: { fullName: "", email: "", address: "" },
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

  const handleBuyNowClick = () => {
    setOrderDetails(null);
    orderForm.reset();
    setCurrentStep(1);
    setOrderModalOpen(true);
  }
  
  function onOrderSubmit(values: OrderFormData) {
    setOrderDetails(values);
    setCurrentStep(2);
  }
  
  const handlePayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        toast({ title: "Payment Successful!", description: `Thank you for purchasing the Lifetime Access plan.` });
        setCurrentStep(3);
        setIsSubmitting(false);
    }, 2000);
  };
  
  const resetFlow = () => {
    setOrderModalOpen(false);
    setTimeout(() => {
        setCurrentStep(1);
        setOrderDetails(null);
        orderForm.reset();
    }, 500);
  }

  return (
    <>
        <section className="relative w-full bg-hero-gradient" id="hero">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] py-20">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-headline tracking-tighter">
                  Empower Your Business with <span className="text-primary">BizTrack Suite</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Launch your MVP 2x faster with our full-stack team. We build scalable apps for growing startups &amp; businesses.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" onClick={() => document.getElementById('payment')?.scrollIntoView({ behavior: 'smooth' })}>
                    Buy Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                    Explore More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image src={image3} alt="Code snippet" width={800} height={600} className="rounded-lg shadow-2xl mx-auto object-cover" data-ai-hint="code on screen" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="services">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Build, Launch &amp; Grow with Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">We offer a complete suite of services to bring your digital products to life, from initial concept to launch and beyond.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="bg-card border p-6 flex flex-col items-start text-left hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline text-xl mb-2">{service.title}</CardTitle>
                  <CardDescription className="p-0 text-muted-foreground">{service.description}</CardDescription>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-secondary" id="why-us">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Image src={image1} alt="Why Choose Us" width={600} height={600} className="rounded-lg shadow-2xl p-10" data-ai-hint="team working" />
              </div>
              <div className="space-y-8">
                <div className="text-left space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose BizTrack Suite?</h2>
                  <p className="text-muted-foreground max-w-2xl">We're not just a service provider; we're your dedicated partner in achieving digital excellence. Our commitment to quality, innovation, and client success sets us apart.</p>
                </div>
                <div className="space-y-6">
                  {whyChooseUs.map(item => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-full flex-shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-lg">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="industries">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Industries We Serve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our expertise spans across various industries, delivering tailored solutions that meet specific market needs.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              {industries.map(industry => (
                <div key={industry} className="py-2 px-6 bg-secondary border rounded-full text-lg font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary">
                  {industry}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-16 text-center">
          <div className="container mx-auto px-4 md:px-6 space-y-8">
            <Image src={image4} alt="App Screenshot" className="rounded-lg shadow-2xl mx-auto" data-ai-hint="app screenshot" />
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-secondary" id="tech-stack">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Tech Stack</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">We use a modern, robust, and scalable tech stack to build world-class applications.</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {techStack.map(tech => (
                <div key={tech.name} className="group flex flex-col items-center gap-3 text-center w-24">
                  <div className="grayscale group-hover:grayscale-0 transition-all duration-300">
                    <Image src={tech.icon} alt={`${tech.name} logo`} width={48} height={48} className="object-contain" data-ai-hint={tech.hint} />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">{tech.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24" id="testimonials">
          <div className="container mx-auto px-4 md:px-6">
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
                      <Card className="bg-card border h-full flex flex-col">
                        <CardContent className="p-6 flex flex-col items-start text-left flex-grow">
                          <Star className="w-5 h-5 text-yellow-400 mb-4" />
                          <p className="italic text-foreground mb-6 flex-grow">"{testimonial.quote.replace(/BizTrack Suite/g, 'BizTrack Suite')}"</p>
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

        <section className="w-full py-16 md:py-24 bg-secondary" id="payment">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
                  Your <span className="text-primary underline decoration-wavy decoration-from-font">one-time payment</span> grants lifetime access
                </h2>
                <p className="text-muted-foreground text-lg">
                  No subscriptions, No hassle. Love it or get your money back within 7 days.
                </p>
                <div className="p-4 bg-background border rounded-lg">
                  <p className="text-muted-foreground">If you ever run into any issues or get stuck, you're not alone—just email us at <a href="mailto:support@biztracksuite.com" className="text-primary hover:underline">support@biztracksuite.com</a></p>
                </div>
              </div>
              <Card className="bg-card border shadow-2xl shadow-primary/10">
                <CardHeader className="pb-4">
                  <CardTitle className="font-headline text-2xl">Join 1,000+ Businesses Who Transformed Their Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="my-4">
                    <span className="text-5xl font-bold mr-2">₹549</span>
                    <span className="text-2xl text-muted-foreground line-through">₹999</span>
                  </div>
                  <p className="text-primary font-semibold mb-6">40% OFFER WITH EVERYTHING INCLUDED</p>

                  <Button onClick={handleBuyNowClick} className="w-full text-lg" size="lg">
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

        <section className="w-full py-16 md:py-24" id="contact">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center bg-secondary p-8 md:p-12 rounded-lg border">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Build with BizTrack Suite?</h2>
                <p className="text-muted-foreground">Let's discuss your project over a free demo call. Fill out the form, and our team will get back to you within 24 hours.</p>
                <div className="border-t border-border pt-6 space-y-4">
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
                      <p className="text-xs text-center text-muted-foreground pt-2">
                        <ShieldCheck className="inline-block h-4 w-4 mr-1" />
                        Your data is 100% safe with us. We'll reach out in 24 hours.
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        <section className="w-full py-16 text-centerbg-secondary">
          <div className="container mx-auto px-4 md:px-6 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-100 border-2 border-red-500 rounded-2xl p-6 text-left">
                <h3 className="text-3xl font-bold text-red-500 mb-4 text-center">BEFORE</h3>
                <div className="bg-white rounded-lg shadow-inner p-4">
                  <Image src={before} alt="Messy workflow" className="rounded-lg shadow-lg" data-ai-hint="dashboard analytics" />
                </div>
                <ul className="mt-6 space-y-3 font-semibold text-lg text-red-700">
                  <li className="flex items-center gap-3"><MinusCircle className="h-6 w-6" /><span>2 hours/day on messy Excel sheets</span></li>
                  <li className="flex items-center gap-3"><MinusCircle className="h-6 w-6" /><span>Late payments &amp; client fights</span></li>
                  <li className="flex items-center gap-3"><MinusCircle className="h-6 w-6" /><span>Overwhelmed by 50+ tasks daily</span></li>
                </ul>
              </div>

              <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-6 text-left">
                <h3 className="text-3xl font-bold text-green-500 mb-4 text-center">AFTER</h3>
                <div className="bg-white rounded-lg shadow-inner p-4">
                  <Image src={after} alt="Organized workflow" className="rounded-lg shadow-lg" data-ai-hint="dashboard analytics" />
                </div>
                <ul className="mt-6 space-y-3 font-semibold text-lg text-green-700">
                  <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6" /><span>15-minute daily check-ins</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6" /><span>95% on-time payments</span></li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-6 w-6" /><span>Smart priority tagging surfaces critical tasks instantly</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-secondary" id="trusted-by">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-center text-foreground font-headline text-2xl font-bold mb-8">Trusted by 100+ Clients Across India</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Image key={i} src={client} alt={`Client Logo ${i}`} width={120} height={40} className="object-contain" data-ai-hint="company logo" />
              ))}
            </div>
          </div>
        </section>


        <section className="w-full py-16 md:py-24" id="faq">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Frequently Asked Questions</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b">
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

      <Dialog open={isOrderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="sm:max-w-md">
          {currentStep === 1 && (
            <>
              <DialogHeader>
                <DialogTitle>Order Information</DialogTitle>
                <DialogDescription>
                  Please provide your details to proceed with the order.
                </DialogDescription>
              </DialogHeader>
              <Form {...orderForm}>
                <form onSubmit={orderForm.handleSubmit(onOrderSubmit)} className="space-y-4">
                  <FormField control={orderForm.control} name="fullName" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={orderForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="e.g. john@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={orderForm.control} name="address" render={({ field }) => (
                    <FormItem><FormLabel>Shipping Address</FormLabel><FormControl><Textarea placeholder="Enter your full address" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <DialogFooter className="!mt-6">
                    <Button type="submit">Proceed to Payment</Button>
                  </DialogFooter>
                </form>
              </Form>
            </>
          )}

          {currentStep === 2 && (
            <>
              <DialogHeader>
                <DialogTitle>Simulated Payment</DialogTitle>
                <DialogDescription>
                  This is a simulated PhonePe payment gateway.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 text-center">
                 <p className="font-semibold">Total Amount: ₹549</p>
                 <p className="text-sm text-muted-foreground">Click below to "pay".</p>
                 <div className="my-6">
                    <Image src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg" alt="PhonePe Logo" width={150} height={50} className="mx-auto"/>
                 </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setCurrentStep(1)} variant="outline">Back</Button>
                <Button onClick={handlePayment} disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : "Pay ₹549"}
                </Button>
              </DialogFooter>
            </>
          )}
          
          {currentStep === 3 && orderDetails && (
             <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Order Successful!
                </DialogTitle>
                <DialogDescription>
                  Your order has been confirmed. You can download your files now.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Order Details</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p><strong>Full Name:</strong> {orderDetails.fullName}</p>
                        <p><strong>Email:</strong> {orderDetails.email}</p>
                        <p><strong>Address:</strong> {orderDetails.address}</p>
                        <p><strong>Amount Paid:</strong> ₹549</p>
                    </CardContent>
                </Card>
                 <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Files
                </Button>
              </div>
              <DialogFooter>
                <Button onClick={resetFlow}>Close</Button>
              </DialogFooter>
            </>
          )}

        </DialogContent>
      </Dialog>
    </>
  );
};
