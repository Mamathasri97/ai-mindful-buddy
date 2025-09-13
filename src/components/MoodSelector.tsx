import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😄", label: "Excellent", value: 5, color: "text-wellness-accent" },
  { emoji: "😊", label: "Good", value: 4, color: "text-success" },
  { emoji: "😐", label: "Neutral", value: 3, color: "text-warning" },
  { emoji: "😔", label: "Low", value: 2, color: "text-orange-500" },
  { emoji: "😢", label: "Very Low", value: 1, color: "text-destructive" },
];

interface MoodSelectorProps {
  selectedMood: number | null;
  onMoodSelect: (mood: number) => void;
}

export const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-center text-foreground/80 font-medium">How are you feeling today?</h3>
      <div className="flex justify-center gap-3">
        {moods.map((mood) => (
          <Button
            key={mood.value}
            variant="ghost"
            size="lg"
            onClick={() => onMoodSelect(mood.value)}
            className={cn(
              "flex flex-col gap-2 h-auto py-4 px-3 rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-medium",
              selectedMood === mood.value 
                ? "bg-primary/10 border-2 border-primary shadow-glow scale-105" 
                : "hover:bg-accent/50 border border-border"
            )}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className={cn(
              "text-xs font-medium transition-colors",
              selectedMood === mood.value ? "text-primary" : "text-muted-foreground"
            )}>
              {mood.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};