import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactsTab } from "@/components/crm/ContactsTab";
import { DealsPipelineTab } from "@/components/crm/DealsPipelineTab";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export function CrmPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM</h1>
          <p className="text-muted-foreground">Manage your customer relationships.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Tabs defaultValue="deals" className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="deals">Deals Pipeline</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>
        <TabsContent value="deals" className="flex-grow mt-4">
          <DealsPipelineTab />
        </TabsContent>
        <TabsContent value="contacts" className="flex-grow mt-4">
          <ContactsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}