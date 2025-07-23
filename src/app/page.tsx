
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Zap, Rocket, Star, Linkedin, Users, TrendingUp, Target, Calendar, CheckCircle } from "lucide-react";
import Image from "next/image";

import { classifyLead, type ClassifyLeadOutput } from "@/ai/flows/classify-lead";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  company: z.string().min(2, "Company name must be at least 2 characters."),
});

type FormData = z.infer<typeof formSchema>;

const howItWorks = [
  {
    icon: <Target className="h-10 w-10 text-primary" />,
    title: "Targeted Profile Optimization",
    description: "We refine your LinkedIn profile to resonate with and attract your ideal high-value clients.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Automated Outreach Campaigns",
    description: "Our system connects with hundreds of potential clients daily, building a robust pipeline.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Appointment Setting",
    description: "We handle the follow-ups and nurture the leads, booking qualified meetings directly into your calendar.",
  },
];

const testimonials = [
  {
    quote: "We saw a 300% increase in qualified leads within the first two months. CatalystFlow is a game-changer.",
    name: "Sarah Johnson",
    company: "CEO, Innovatech",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait"
  },
  {
    quote: "Their system is incredibly efficient. We're now booking 8-10 high-value client meetings every single month.",
    name: "Michael Chen",
    company: "Founder, Quantum Solutions",
    avatar: "https://placehold.co/100x100.png",
    hint: "man portrait"
  },
];

export default function Home() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassifyLeadOutput | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setClassificationResult(null);

    try {
      const result = await classifyLead({
        name: values.name,
        email: values.email,
        projectDetails: `Lead from CatalystFlow landing page. Company: ${values.company}. Interested in LinkedIn lead generation.`,
      });
      setClassificationResult(result);
      setIsResultOpen(true);
      form.reset();
    } catch (error) {
      console.error("Failed to classify lead:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Could not submit your request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const getPriorityIcon = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return <Rocket className="h-5 w-5 text-destructive" />;
      case 'Medium':
        return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'Low':
        return <Star className="h-5 w-5 text-green-400" />;
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="w-full bg-background border-b py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">CatalystFlow</span>
          </div>
          <Button>Book a Call</Button>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-card" id="hero">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
                  We Help B2B Companies Get High-Value Clients from <span className="text-primary">LinkedIn</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  We build a predictable client acquisition engine that gets you 5-10 high-value clients every month—without spending a dime on ads.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Book a FREE Strategy Call
                    </Button>
                </div>
              </div>
              <div className="w-full">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image src="https://placehold.co/600x400.png" alt="Video thumbnail" width={600} height={400} className="rounded-lg shadow-2xl" data-ai-hint="business meeting" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-20 lg:py-24" id="process">
            <div className="container mx-auto px-4">
                 <div className="text-center space-y-4 mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Proven 3-Step Process</h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto">A systematic approach to fill your pipeline with qualified, ready-to-buy leads from LinkedIn.</p>
                 </div>
                 <div className="grid gap-8 md:grid-cols-3">
                     {howItWorks.map((step, index) => (
                         <Card key={index} className="text-center p-6 flex flex-col items-center">
                             <div className="p-4 bg-primary/10 rounded-full mb-4">
                                {step.icon}
                             </div>
                             <CardTitle className="font-headline text-xl mb-2">{step.title}</CardTitle>
                             <CardContent className="p-0 text-muted-foreground">{step.description}</CardContent>
                         </Card>
                     ))}
                 </div>
            </div>
        </section>

        {/* What you get Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-card" id="features">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">What You Get With CatalystFlow</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to build a powerful lead generation machine.</p>
                </div>
                <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline"><CheckCircle className="text-primary"/> A Done-For-You System</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>Dedicated Account Manager</li>
                                <li>Custom-Built Lead Funnel</li>
                                <li>Weekly Performance Reports</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-headline"><CheckCircle className="text-primary"/> Predictable Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                <li>5-10 Qualified Meetings Monthly</li>
                                <li>High-Value Client Acquisition</li>
                                <li>Scalable & Consistent ROI</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Don't Just Take Our Word For It</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-6 flex flex-col items-start text-left">
                    <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
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

        {/* CTA Form Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-primary text-primary-foreground" id="contact">
            <div className="container mx-auto px-4 text-center">
                 <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Get More Clients?</h2>
                 <p className="text-primary-foreground/80 max-w-2xl mx-auto mt-4 mb-8">Fill out the form below to book your FREE, no-obligation strategy call. Let's build your client acquisition machine.</p>
                <Card className="max-w-2xl mx-auto text-left text-foreground shadow-2xl">
                  <CardContent className="p-6 lg:p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Work Email</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. john@company.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Innovatech" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isSubmitting} className="w-full !mt-6" size="lg">
                          {isSubmitting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                          ) : ( "Book My Free Call" )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
            </div>
        </section>
      </main>

      <footer className="w-full bg-background border-t">
        <div className="container mx-auto px-4 py-8 text-center">
             <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CatalystFlow. All rights reserved.
            </p>
        </div>
      </footer>

      {/* AI Classification Result Dialog */}
      <AlertDialog open={isResultOpen} onOpenChange={setIsResultOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 font-headline">
              <Zap className="h-6 w-6 text-primary" />
              Strategy Call Booked!
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-left space-y-4">
              <p>
                Thanks for your interest! Your request for a free strategy call has been received. 
              </p>
              {classificationResult && (
                <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Lead Priority:</span>
                    <Badge variant={classificationResult.priority === 'High' ? 'destructive' : classificationResult.priority === 'Medium' ? 'secondary' : 'default'} className="flex items-center gap-2">
                       {getPriorityIcon(classificationResult.priority)}
                       {classificationResult.priority}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Analysis:</span>
                    <p className="text-sm text-muted-foreground mt-1">{classificationResult.classificationReason}</p>
                  </div>
                </div>
              )}
               <p>We'll be in touch via email within the next 24 hours to confirm your slot.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsResultOpen(false)}>
              Sounds Good!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
