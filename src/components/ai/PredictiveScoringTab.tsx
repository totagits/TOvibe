import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAiStore } from '@/hooks/use-ai-data';
import { useCrmStore } from '@/hooks/use-crm-data';
import { useShallow } from 'zustand/react/shallow';
import { TrendingUp, TrendingDown, CheckCircle, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
export function PredictiveScoringTab() {
  const { contacts, isLoading: contactsLoading } = useCrmStore(useShallow(state => ({ contacts: state.contacts, isLoading: state.isLoading })));
  const { predictLeadScore, leadScore, isPredicting } = useAiStore();
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  useEffect(() => {
    if (contacts.length > 0 && !selectedContactId) {
      setSelectedContactId(contacts[0].id);
    }
  }, [contacts, selectedContactId]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContactId) {
      predictLeadScore(selectedContactId);
    }
  };
  const getScoreColor = (score: number) => {
    if (score > 75) return 'text-green-500';
    if (score > 40) return 'text-yellow-500';
    return 'text-red-500';
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Predictive Lead Scoring</CardTitle>
        <CardDescription>Use AI to predict the conversion probability of your leads.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-end gap-4 mb-6">
          <div className="space-y-2 flex-grow">
            <Label htmlFor="contact-select">Select a Contact</Label>
            <Select value={selectedContactId || ''} onValueChange={setSelectedContactId}>
              <SelectTrigger id="contact-select">
                <SelectValue placeholder="Select a contact to score" />
              </SelectTrigger>
              <SelectContent>
                {contactsLoading ? <SelectItem value="loading" disabled>Loading contacts...</SelectItem> :
                  contacts.map(contact => (
                    <SelectItem key={contact.id} value={contact.id}>{contact.name}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={isPredicting || !selectedContactId}>
            {isPredicting ? 'Scoring...' : 'Predict Score'}
          </Button>
        </form>
        {isPredicting ? (
          <div className="text-center p-8"><Skeleton className="h-48 w-48 rounded-full mx-auto" /></div>
        ) : leadScore ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <div className="relative h-48 w-48">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-muted/50"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="currentColor" strokeWidth="3"
                  />
                  <path
                    className={getScoreColor(leadScore.score)}
                    strokeDasharray={`${leadScore.score}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{leadScore.score}</span>
                  <span className="text-sm text-muted-foreground">Lead Score</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Key Factors:</h3>
              <ul className="space-y-2">
                {leadScore.reasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    {reason.positive ? <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" /> : <TrendingDown className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />}
                    <span>{reason.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300">Recommendation</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-400">{leadScore.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 text-muted-foreground">
            Select a contact and click "Predict Score" to see the AI analysis.
          </div>
        )}
      </CardContent>
    </Card>
  );
}