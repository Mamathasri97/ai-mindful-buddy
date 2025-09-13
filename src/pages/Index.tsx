import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WellnessCard } from "@/components/WellnessCard";
import { MoodSelector } from "@/components/MoodSelector";
import { JournalInput } from "@/components/JournalInput";
import { SentimentDisplay, type SentimentType } from "@/components/SentimentDisplay";
import { WellnessRecommendations } from "@/components/WellnessRecommendations";
import { StreakTracker } from "@/components/StreakTracker";
import { MoodChart } from "@/components/MoodChart";
import { WellnessStats } from "@/components/WellnessStats";
import { Brain, Heart, BarChart3, Settings } from "lucide-react";
import heroImage from "@/assets/wellness-hero.jpg";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalText, setJournalText] = useState("");
  const [sentiment, setSentiment] = useState<SentimentType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Mock data for wellness stats
  const [streakData] = useState({
    currentStreak: 5,
    longestStreak: 12,
    totalEntries: 47
  });

  const [wellnessStats] = useState({
    monthlyPositiveDays: 18,
    improvementTrend: 15,
    consistencyScore: 78
  });

  const analyzeSentiment = async () => {
    if (!journalText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI sentiment analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple sentiment analysis simulation
    const positiveWords = ['good', 'great', 'happy', 'excellent', 'amazing', 'wonderful', 'excited', 'joy'];
    const negativeWords = ['bad', 'sad', 'terrible', 'awful', 'stressed', 'anxious', 'worried', 'tired'];
    
    const lowerText = journalText.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    let detectedSentiment: SentimentType;
    if (positiveCount > negativeCount) {
      detectedSentiment = "positive";
    } else if (negativeCount > positiveCount) {
      detectedSentiment = "negative";
    } else {
      detectedSentiment = "neutral";
    }
    
    setSentiment(detectedSentiment);
    setIsAnalyzing(false);
    setHasAnalyzed(true);
  };

  const getSentimentMessage = (sentiment: SentimentType) => {
    const messages = {
      positive: "That's wonderful! Your positive energy shines through. Keep nurturing those good vibes! ✨",
      neutral: "Thanks for sharing. Remember, neutral days are part of life's balance. You're doing great by checking in. 🌿",
      negative: "I hear you, and it's okay to have difficult days. You're brave for sharing your feelings. Here are some gentle suggestions to help. 💙"
    };
    return messages[sentiment];
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card/60 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-primary">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Student Wellness Monitor</h1>
            </div>
            <Button variant="ghost" size="sm" className="rounded-xl">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-in">
          <div className="relative overflow-hidden rounded-3xl shadow-glow">
            <img 
              src={heroImage} 
              alt="Peaceful wellness dashboard" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Your Personal AI-Powered Mental Wellness Companion
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Track your mood, gain insights, and receive personalized recommendations for better mental health
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid gap-4 md:grid-cols-3 animate-slide-up">
          <WellnessCard title="Today's Check-in" variant="gradient">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-white" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {selectedMood ? `${selectedMood}/5` : "—"}
                </div>
                <div className="text-white/80 text-sm">Mood Rating</div>
              </div>
            </div>
          </WellnessCard>
          
          <WellnessCard title="Current Streak" variant="warm">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🔥</div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {streakData.currentStreak}
                </div>
                <div className="text-muted-foreground text-sm">days in a row</div>
              </div>
            </div>
          </WellnessCard>
          
          <WellnessCard title="This Month">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              <div>
                <div className="text-2xl font-bold text-primary">
                  {wellnessStats.monthlyPositiveDays}
                </div>
                <div className="text-muted-foreground text-sm">positive days</div>
              </div>
            </div>
          </WellnessCard>
        </section>

        {/* Daily Check-in */}
        <section className="space-y-6">
          <WellnessCard title="Daily Mood Check-in">
            <div className="space-y-6">
              <MoodSelector 
                selectedMood={selectedMood}
                onMoodSelect={setSelectedMood}
              />
              
              <JournalInput
                journalText={journalText}
                onJournalChange={setJournalText}
                onSubmit={analyzeSentiment}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </WellnessCard>

          {/* Sentiment Analysis Results */}
          {hasAnalyzed && sentiment && (
            <div className="space-y-6">
              <SentimentDisplay
                sentiment={sentiment}
                confidence={0.85}
                message={getSentimentMessage(sentiment)}
              />
              
              <WellnessRecommendations sentiment={sentiment} />
            </div>
          )}
        </section>

        {/* Analytics Dashboard */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MoodChart />
          </div>
          <div>
            <StreakTracker
              currentStreak={streakData.currentStreak}
              longestStreak={streakData.longestStreak}
              totalEntries={streakData.totalEntries}
            />
          </div>
        </section>

        {/* Wellness Insights */}
        <section>
          <WellnessCard title="Monthly Insights">
            <WellnessStats
              monthlyPositiveDays={wellnessStats.monthlyPositiveDays}
              improvementTrend={wellnessStats.improvementTrend}
              consistencyScore={wellnessStats.consistencyScore}
            />
          </WellnessCard>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-success" />
            <span className="text-sm">
              Remember: Taking care of your mental health is a sign of strength, not weakness.
            </span>
          </div>
          <p className="text-xs">
            Your wellness journey matters. Every small step counts towards a healthier, happier you.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;