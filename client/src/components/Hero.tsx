import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-[hsl(220,40%,20%)] to-[hsl(212,95%,45%)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="text-hero-title">
            Full-Stack AI Prompt Engineering for Healthcare
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
            Discover how F-S AIPE bridges critical healthcare challenges through intelligent prompt design, 
            security frameworks, and ethical AI implementation. Learn the strategies that healthcare 
            administrators need to deploy AI successfully.
          </p>
          <Button 
            size="lg" 
            className="bg-white/95 text-primary hover:bg-white backdrop-blur-sm border border-white/20"
            onClick={onExplore}
            data-testid="button-explore-challenges"
          >
            Explore All Five Challenges
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
