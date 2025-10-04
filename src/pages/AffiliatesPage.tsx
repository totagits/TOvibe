import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProgramsTab } from "@/components/affiliates/ProgramsTab";
import { PartnersTab } from "@/components/affiliates/PartnersTab";
export function AffiliatesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Affiliates</h1>
          <p className="text-muted-foreground">Manage your affiliate programs and partners.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Program
        </Button>
      </div>
      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="programs" className="mt-6">
          <ProgramsTab />
        </TabsContent>
        <TabsContent value="partners" className="mt-6">
          <PartnersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}