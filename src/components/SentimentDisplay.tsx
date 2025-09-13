import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart, Smile, Meh, Frown } from "lucide-react";

export type SentimentType = "positive" | "neutral" | "negative";

interface SentimentDisplayProps {
  sentiment: SentimentType;
  confidence: number;
  message: string;
}

const sentimentConfig = {
  positive: {
    icon: Smile,
    color: "bg-success text-success-foreground",
    bgColor: "bg-success/10",
    textColor: "text-success",
  },
  neutral: {
    icon: Meh,
    color: "bg-warning text-warning-foreground",
    bgColor: "bg-warning/10",
    textColor: "text-warning-foreground",
  },
  negative: {
    icon: Frown,
    color: "bg-destructive text-destructive-foreground",
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
  },
};

export const SentimentDisplay = ({ sentiment, confidence, message }: SentimentDisplayProps) => {
  const config = sentimentConfig[sentiment];
  const Icon = config.icon;

  return (
    <div className={cn(
      "p-6 rounded-2xl border transition-all duration-300 animate-slide-up",
      config.bgColor
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "p-2 rounded-full",
          config.color
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize font-medium">
            {sentiment}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {Math.round(confidence * 100)}% confidence
          </span>
        </div>
      </div>
      
      <p className={cn(
        "text-sm leading-relaxed",
        config.textColor
      )}>
        {message}
      </p>
    </div>
  );
};