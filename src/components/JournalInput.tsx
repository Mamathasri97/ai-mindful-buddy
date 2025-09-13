import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalInputProps {
  journalText: string;
  onJournalChange: (text: string) => void;
  onSubmit: () => void;
  isAnalyzing?: boolean;
}

export const JournalInput = ({ 
  journalText, 
  onJournalChange, 
  onSubmit, 
  isAnalyzing = false 
}: JournalInputProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          placeholder="How was your day? Share your thoughts and feelings..."
          value={journalText}
          onChange={(e) => onJournalChange(e.target.value)}
          className="min-h-[120px] resize-none rounded-2xl border-border/50 bg-card/60 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
          maxLength={500}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {journalText.length}/500
        </div>
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={!journalText.trim() || isAnalyzing}
        className={cn(
          "w-full rounded-2xl bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-medium hover:shadow-glow",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isAnalyzing ? (
          <>
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Analyzing...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Analyze Mood
          </>
        )}
      </Button>
    </div>
  );
};