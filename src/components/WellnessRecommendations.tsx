import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Heart, Brain, Coffee, Moon, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SentimentType } from "./SentimentDisplay";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  color: string;
}

const recommendations: Record<SentimentType, Recommendation[]> = {
  positive: [
    {
      id: "celebrate",
      title: "Celebrate Your Success",
      description: "Take a moment to acknowledge your achievements today. Share your positive energy with friends!",
      icon: Heart,
      category: "Gratitude",
      color: "text-success"
    },
    {
      id: "maintain",
      title: "Keep the Momentum",
      description: "You're doing great! Consider planning tomorrow to maintain this positive mindset.",
      icon: Lightbulb,
      category: "Planning",
      color: "text-wellness-accent"
    }
  ],
  neutral: [
    {
      id: "energize",
      title: "Boost Your Energy",
      description: "Try a 5-minute walk or some light stretching to refresh your mind and body.",
      icon: Coffee,
      category: "Movement",
      color: "text-warning-foreground"
    },
    {
      id: "connect",
      title: "Connect with Others",
      description: "Reach out to a friend or family member. Social connection can improve your mood.",
      icon: Heart,
      category: "Social",
      color: "text-wellness-primary"
    }
  ],
  negative: [
    {
      id: "breathe",
      title: "Deep Breathing Exercise",
      description: "Take 10 deep breaths. Inhale for 4 counts, hold for 4, exhale for 6. You've got this.",
      icon: Brain,
      category: "Mindfulness",
      color: "text-wellness-accent"
    },
    {
      id: "rest",
      title: "Rest & Recharge",
      description: "Consider taking a warm bath, listening to calming music, or getting some extra sleep tonight.",
      icon: Moon,
      category: "Self-Care",
      color: "text-primary"
    }
  ]
};

interface WellnessRecommendationsProps {
  sentiment: SentimentType;
}

export const WellnessRecommendations = ({ sentiment }: WellnessRecommendationsProps) => {
  const currentRecommendations = recommendations[sentiment];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Personalized Recommendations</h3>
        <Badge variant="secondary" className="capitalize">
          {sentiment} mood
        </Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {currentRecommendations.map((rec, index) => {
          const Icon = rec.icon;
          return (
            <Card 
              key={rec.id} 
              className={cn(
                "rounded-2xl border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-medium transition-all duration-300 animate-slide-up",
                `animation-delay-${index * 100}`
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full bg-accent/20",
                    rec.color
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">{rec.title}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {rec.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};