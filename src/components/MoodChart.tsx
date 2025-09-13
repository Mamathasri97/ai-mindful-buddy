import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";

// Mock data for the chart
const mockMoodData = [
  { day: "Mon", mood: 4, date: "Mar 18" },
  { day: "Tue", mood: 3, date: "Mar 19" },
  { day: "Wed", mood: 5, date: "Mar 20" },
  { day: "Thu", mood: 2, date: "Mar 21" },
  { day: "Fri", mood: 4, date: "Mar 22" },
  { day: "Sat", mood: 5, date: "Mar 23" },
  { day: "Sun", mood: 3, date: "Mar 24" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const moodLabels = {
      5: "Excellent 😄",
      4: "Good 😊", 
      3: "Neutral 😐",
      2: "Low 😔",
      1: "Very Low 😢"
    };
    
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-3 shadow-medium">
        <p className="font-medium">{data.date}</p>
        <p className="text-primary font-semibold">
          {moodLabels[data.mood as keyof typeof moodLabels]}
        </p>
      </div>
    );
  }
  return null;
};

export const MoodChart = () => {
  const averageMood = mockMoodData.reduce((sum, day) => sum + day.mood, 0) / mockMoodData.length;
  const trend = mockMoodData[mockMoodData.length - 1].mood > mockMoodData[0].mood ? "up" : "down";

  return (
    <Card className="rounded-2xl bg-card/60 backdrop-blur-sm border-border/50 shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Mood Trends
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Last 7 days
          </div>
          <div>
            Avg: {averageMood.toFixed(1)}/5
          </div>
          <div className={`flex items-center gap-1 ${trend === 'up' ? 'text-success' : 'text-warning-foreground'}`}>
            <TrendingUp className={`w-4 h-4 ${trend === 'down' ? 'rotate-180' : ''}`} />
            {trend === 'up' ? 'Improving' : 'Declining'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockMoodData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                domain={[1, 5]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                ticks={[1, 2, 3, 4, 5]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};