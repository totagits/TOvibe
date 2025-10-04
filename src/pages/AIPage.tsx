import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentStudioTab } from "@/components/ai/ContentStudioTab";
import { PredictiveScoringTab } from "@/components/ai/PredictiveScoringTab";
export function AIPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Studio</h1>
        <p className="text-muted-foreground">Leverage AI to enhance your marketing and sales efforts.</p>
      </div>
      <Tabs defaultValue="content-studio" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="content-studio">Content Studio</TabsTrigger>
          <TabsTrigger value="predictive-scoring">Predictive Scoring</TabsTrigger>
        </TabsList>
        <TabsContent value="content-studio" className="mt-6">
          <ContentStudioTab />
        </TabsContent>
        <TabsContent value="predictive-scoring" className="mt-6">
          <PredictiveScoringTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}