"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "CodecCafe delivered a product that exceeded our expectations. Their attention to detail and commitment to quality is unparalleled. We saw a 200% increase in user engagement after the launch.",
    name: "Sarah Johnson",
    title: "CEO, Innovate Inc.",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait"
  },
  {
    quote:
      "The team at CodecCafe is incredibly talented and professional. They transformed our outdated system into a modern, efficient platform. The project was completed on time and on budget.",
    name: "Michael Chen",
    title: "CTO, Tech Solutions",
    avatar: "https://placehold.co/100x100.png",
    hint: "man portrait"
  },
  {
    quote:
      "Working with CodecCafe was a game-changer for our startup. Their expertise in both design and development helped us launch an MVP that secured our first round of funding.",
    name: "Emily Rodriguez",
    title: "Founder, StartUpX",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman face"
  },
    {
    quote:
      "Their process is transparent and collaborative. We were always in the loop and felt like a true partner throughout the development cycle. Highly recommended!",
    name: "David Lee",
    title: "Product Manager, Creative Co.",
    avatar: "https://placehold.co/100x100.png",
    hint: "man face"
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            What Our Clients Say
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We're proud to have happy clients. Here's what they have to say about their experience working with us.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2">
                <div className="p-1">
                  <Card className="h-full bg-background/50">
                    <CardContent className="flex flex-col justify-between h-full p-6 space-y-4">
                      <p className="text-lg italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 pt-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
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
  );
}
