import { Code, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold font-headline">CodecCafe</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CodecCafe. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
            <Github className="h-5 w-5" />
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
