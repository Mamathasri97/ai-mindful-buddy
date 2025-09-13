import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
}

export const StreakTracker = ({ currentStreak, longestStreak, totalEntries }: StreakTrackerProps) => {
  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your wellness journey today!";
    if (currentStreak < 3) return "Great start! Keep it up!";
    if (currentStreak < 7) return "Building a healthy habit!";
    if (currentStreak < 14) return "Amazing consistency!";
    return "You're a wellness champion! 🌟";
  };

  const getStreakColor = () => {
    if (currentStreak === 0) return "text-muted-foreground";
    if (currentStreak < 3) return "text-warning-foreground";
    if (currentStreak < 7) return "text-success";
    return "text-primary";
  };

  return (
    <Card className="rounded-2xl bg-gradient-warm border-wellness-warm/20 shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Flame className={cn("w-5 h-5", getStreakColor())} />
          Wellness Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={cn(
            "text-4xl font-bold mb-2 transition-colors",
            getStreakColor()
          )}>
            {currentStreak}
          </div>
          <p className="text-sm text-muted-foreground">
            {currentStreak === 1 ? "day" : "days"} in a row
          </p>
        </div>

        <div className="bg-card/60 rounded-xl p-3 space-y-2">
          <p className={cn(
            "text-sm font-medium text-center",
            getStreakColor()
          )}>
            {getStreakMessage()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-warning-foreground" />
            <div>
              <div className="text-sm font-medium">{longestStreak}</div>
              <div className="text-xs text-muted-foreground">Best streak</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <div className="text-sm font-medium">{totalEntries}</div>
              <div className="text-xs text-muted-foreground">Total entries</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};