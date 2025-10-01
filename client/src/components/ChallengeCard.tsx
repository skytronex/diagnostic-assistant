import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Database, Eye, DollarSign, Scale, LucideIcon } from "lucide-react";
import { ChallengeArea } from "@shared/schema";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Database,
  Eye,
  DollarSign,
  Scale
};

interface ChallengeCardProps {
  id: ChallengeArea;
  title: string;
  icon: string;
  description: string;
  color: string;
  onExplore: (id: ChallengeArea) => void;
}

export default function ChallengeCard({ id, title, icon, description, color, onExplore }: ChallengeCardProps) {
  const Icon = iconMap[icon] || Shield;
  
  return (
    <Card className="hover-elevate transition-all duration-200" data-testid={`card-challenge-${id}`}>
      <CardHeader className="gap-4">
        <div className={`w-16 h-16 rounded-md bg-${color}/10 flex items-center justify-center`}>
          <Icon className={`w-8 h-8 text-${color}`} />
        </div>
        <div>
          <CardTitle className="text-xl mb-2" data-testid={`text-challenge-title-${id}`}>{title}</CardTitle>
          <CardDescription data-testid={`text-challenge-description-${id}`}>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onExplore(id)}
          data-testid={`button-explore-${id}`}
        >
          Explore Details
        </Button>
      </CardContent>
    </Card>
  );
}
