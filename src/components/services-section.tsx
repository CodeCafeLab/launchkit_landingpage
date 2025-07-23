import { Code2, Smartphone, PenTool, ServerCog } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Building robust, scalable, and high-performance websites and web applications tailored to your business needs.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Creating seamless and engaging mobile experiences for iOS and Android that your users will love.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "Designing intuitive and beautiful user interfaces that provide a delightful user experience and drive conversions.",
  },
  {
    icon: ServerCog,
    title: "DevOps & Cloud",
    description: "Automating your development pipeline and managing your cloud infrastructure for maximum efficiency and reliability.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            Our Services
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            What We Do
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We provide a complete suite of services to bring your digital products to life, from concept to launch and beyond.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 border-transparent hover:border-primary transition-all duration-300 bg-background/50 hover:bg-background">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
