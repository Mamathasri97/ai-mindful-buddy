import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WellnessCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "warm";
}

export const WellnessCard = ({ title, children, className, variant = "default" }: WellnessCardProps) => {
  const getCardStyles = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-primary text-white border-0 shadow-glow";
      case "warm":
        return "bg-gradient-warm border-wellness-warm/20 shadow-soft";
      default:
        return "bg-card/60 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all duration-300";
    }
  };

  return (
    <Card className={cn(
      "rounded-2xl transition-all duration-300 hover:scale-[1.02] animate-fade-in",
      getCardStyles(),
      className
    )}>
      <CardHeader className="pb-3">
        <CardTitle className={cn(
          "text-lg font-semibold",
          variant === "gradient" ? "text-white" : "text-foreground"
        )}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
};