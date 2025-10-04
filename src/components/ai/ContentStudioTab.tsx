import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAiStore } from '@/hooks/use-ai-data';
import { Sparkles } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
export function ContentStudioTab() {
  const { generateContent, generatedContent, isGenerating } = useAiStore();
  const [contentType, setContentType] = useState('email_subject');
  const [prompt, setPrompt] = useState('A new offer for 20% off annual gym memberships.');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateContent(contentType, prompt);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Content Generator</CardTitle>
            <CardDescription>Describe what you want to create, and let AI do the rest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Select a content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email_subject">Email Subject Line</SelectItem>
                  <SelectItem value="email_body">Email Body</SelectItem>
                  <SelectItem value="social_post">Social Media Post</SelectItem>
                  <SelectItem value="blog_idea">Blog Post Idea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., A catchy subject line for a flash sale on fitness gear."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isGenerating}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI Output</CardTitle>
          <CardDescription>Your generated content will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[250px] bg-muted/50 rounded-md p-4 whitespace-pre-wrap font-mono text-sm">
          {isGenerating ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            generatedContent || "No content generated yet."
          )}
        </CardContent>
      </Card>
    </div>
  );
}