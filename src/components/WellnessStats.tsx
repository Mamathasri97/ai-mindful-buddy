import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smile, TrendingUp, Calendar, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface WellnessStatsProps {
  monthlyPositiveDays: number;
  improvementTrend: number;
  consistencyScore: number;
}

export const WellnessStats = ({ 
  monthlyPositiveDays, 
  improvementTrend, 
  consistencyScore 
}: WellnessStatsProps) => {
  const stats = [
    {
      title: "Positive Days",
      value: monthlyPositiveDays,
      suffix: " this month",
      icon: Smile,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Days with good/excellent mood"
    },
    {
      title: "Improvement",
      value: improvementTrend > 0 ? `+${improvementTrend}%` : `${improvementTrend}%`,
      suffix: " vs last month",
      icon: TrendingUp,
      color: improvementTrend > 0 ? "text-success" : "text-warning-foreground",
      bgColor: improvementTrend > 0 ? "bg-success/10" : "bg-warning/10",
      description: "Trend in overall wellness"
    },
    {
      title: "Consistency",
      value: `${consistencyScore}%`,
      suffix: " check-in rate",
      icon: Target,
      color: consistencyScore > 70 ? "text-primary" : "text-warning-foreground",
      bgColor: consistencyScore > 70 ? "bg-primary/10" : "bg-warning/10",
      description: "Regular wellness tracking"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Wellness Insights
      </h3>
      
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title}
              className={cn(
                "rounded-2xl border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-medium transition-all duration-300 animate-scale-in",
                `animation-delay-${index * 100}`
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "p-2 rounded-full",
                    stat.bgColor
                  )}>
                    <Icon className={cn("w-4 h-4", stat.color)} />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {stat.title}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className={cn(
                      "text-2xl font-bold",
                      stat.color
                    )}>
                      {stat.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};