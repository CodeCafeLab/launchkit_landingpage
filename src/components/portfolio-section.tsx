import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with a custom CMS, payment gateway integration, and a responsive design for a seamless shopping experience.",
    image: "https://placehold.co/600x400.png",
    hint: "ecommerce website",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
  },
  {
    title: "SaaS Dashboard",
    description: "An analytics dashboard for a B2B software company, providing data visualization, user management, and reporting features.",
    image: "https://placehold.co/600x400.png",
    hint: "dashboard analytics",
    tags: ["React", "Node.js", "GraphQL", "D3.js"],
  },
  {
    title: "Mobile Banking App",
    description: "A secure and intuitive mobile app for a financial institution, featuring biometric login, fund transfers, and bill payments.",
    image: "https://placehold.co/600x400.png",
    hint: "mobile app",
    tags: ["React Native", "Firebase", "Redux", "Jest"],
  },
  {
    title: "AI-Powered Chatbot",
    description: "A customer service chatbot integrated into a corporate website, using natural language processing to handle user queries 24/7.",
    image: "https://placehold.co/600x400.png",
    hint: "chatbot interface",
    tags: ["Python", "Dialogflow", "Flask", "WebSocket"],
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            Our Portfolio
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            Crafted with Code and Creativity
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We've helped businesses of all sizes transform their digital presence. Here's a glimpse of our work.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden group transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]">
              <CardHeader className="p-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto aspect-video object-cover transition-transform group-hover:scale-105"
                  data-ai-hint={project.hint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-2xl mb-2">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground mb-4">{project.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
