import { Lightbulb, Wrench, Rocket, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const processSteps = [
  {
    icon: Lightbulb,
    title: "Discovery & Strategy",
    description: "We start by understanding your vision, goals, and target audience to create a comprehensive project roadmap and strategy.",
  },
  {
    icon: Wrench,
    title: "Design & Development",
    description: "Our team designs a beautiful, intuitive UI and writes clean, scalable code to bring your vision to life with precision and craft.",
  },
  {
    icon: Rocket,
    title: "Testing & Launch",
    description: "We rigorously test every aspect of the application to ensure it's bug-free, secure, and performant before deploying it to the world.",
  },
  {
    icon: RefreshCw,
    title: "Support & Iteration",
    description: "Our partnership doesn't end at launch. We provide ongoing support and work with you to iterate and improve based on user feedback.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            Our Process
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            A Journey to Digital Excellence
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We follow a structured and transparent process to ensure your project is a success from start to finish.
          </p>
        </div>
        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
           <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border md:left-1/4 md:right-1/4 lg:left-1/8 lg:right-1/8 hidden sm:block"></div>
          {processSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4 border-4 border-background z-10">
                <step.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
