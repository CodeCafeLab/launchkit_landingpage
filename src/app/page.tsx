
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Zap, Rocket, Star, Code, Award, BarChart, Users, Mail, Phone, MapPin } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  website: z.string().url("Please enter a valid URL."),
});

type FormData = z.infer<typeof formSchema>;

const services = [
  {
    title: "Search Engine Optimization",
    description: "Rank higher on Google and drive organic traffic.",
  },
  {
    title: "Google Ads (PPC)",
    description: "Get instant visibility and targeted leads.",
  },
  {
    title: "Social Media Marketing",
    description: "Engage your audience and build your brand.",
  },
  {
    title: "Web Development",
    description: "Create high-converting websites and landing pages.",
  },
];

const testimonials = [
  {
    quote: "CodecCafe's SEO strategy doubled our organic traffic in just 3 months. Incredible results!",
    name: "John Doe",
    company: "Tech Innovators",
    avatar: "https://placehold.co/100x100.png",
    hint: "man portrait"
  },
  {
    quote: "The PPC campaign they ran for us had a 5X ROI. Highly recommended for anyone serious about growth.",
    name: "Jane Smith",
    company: "Lifestyle Co.",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait"
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
      phone: "",
      website: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setClassificationResult(null);

    try {
      // Re-using the classifyLead flow, but we need to adapt the input.
      // We'll create projectDetails from the form values.
      const result = await classifyLead({
        name: values.name,
        email: values.email,
        projectDetails: `Lead from new landing page. Phone: ${values.phone}, Website: ${values.website}. Seeking digital marketing services.`,
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
      <header className="w-full bg-background border-b py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">CodecCafe</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+1 (234) 567-890</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
                  Get Your Business on the First Page of <span className="text-primary">Google</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  We are a results-driven digital marketing agency specializing in SEO, PPC, and Social Media. Let us help you dominate the search results and skyrocket your sales.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-semibold">Certified Google Partner</span>
                  </div>
                   <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-primary/10">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-semibold">Proven Results</span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Card className="p-6 lg:p-8 shadow-2xl">
                  <CardHeader className="p-0 mb-6 text-center">
                    <CardTitle className="text-2xl font-headline">Get a FREE Audit!</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
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
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Phone Number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://your-website.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isSubmitting} className="w-full !mt-6" size="lg">
                          {isSubmitting ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                          ) : ( "Get My Free Audit" )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4">
                 <div className="text-center space-y-4 mb-12">
                     <h2 className="text-3xl md:text-4xl font-bold font-headline">What We Do to Skyrocket Your Sales</h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto">We offer a comprehensive suite of digital marketing services designed to deliver measurable results and maximize your ROI.</p>
                 </div>
                 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                     {services.map((service, index) => (
                         <Card key={index} className="text-center p-6">
                             <CardTitle className="font-headline text-xl mb-2">{service.title}</CardTitle>
                             <CardContent className="p-0 text-muted-foreground">{service.description}</CardContent>
                         </Card>
                     ))}
                 </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Clients Say About Us</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background">
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
      </main>

      <footer className="w-full bg-background border-t">
        <div className="container mx-auto px-4 py-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
                <Code className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">CodecCafe</span>
            </div>
            <div className="flex justify-center items-center gap-6 flex-wrap">
                 <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> contact@codeccafe.com</div>
                 <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> +1 (234) 567-890</div>
                 <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> 123 Codec Way, Dev City</div>
            </div>
             <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} CodecCafe. All rights reserved.
            </p>
        </div>
      </footer>

      {/* AI Classification Result Dialog */}
      <AlertDialog open={isResultOpen} onOpenChange={setIsResultOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 font-headline">
              <Zap className="h-6 w-6 text-primary" />
              Inquiry Received!
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-left space-y-4">
              <p>
                Thanks for reaching out! Your request for a free audit has been received and our Smart Lead Tool has analyzed it.
              </p>
              {classificationResult && (
                <div className="p-4 border rounded-lg bg-muted/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Assigned Priority:</span>
                    <Badge variant={classificationResult.priority === 'High' ? 'destructive' : classificationResult.priority === 'Medium' ? 'secondary' : 'default'} className="flex items-center gap-2">
                       {getPriorityIcon(classificationResult.priority)}
                       {classificationResult.priority}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Reason:</span>
                    <p className="text-sm text-muted-foreground mt-1">{classificationResult.classificationReason}</p>
                  </div>
                </div>
              )}
               <p>We'll be in touch within 24 hours to discuss your free audit.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsResultOpen(false)}>
              Got it!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
