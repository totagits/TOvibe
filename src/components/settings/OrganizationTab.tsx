import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/hooks/use-auth";
export function OrganizationTab() {
  const organization = useAuthStore((state) => state.organization);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization</CardTitle>
        <CardDescription>Manage your organization's branding and details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="org-name">Organization Name</Label>
          <Input id="org-name" defaultValue={organization?.name} />
        </div>
        <div className="space-y-2">
          <Label>Logo</Label>
          <div className="flex items-center gap-4">
            <img src={organization?.logoUrl} alt="logo" className="h-16 w-16 rounded-md object-contain bg-muted p-1" />
            <Input id="logo-upload" type="file" className="max-w-xs" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="primary-color">Primary Brand Color</Label>
          <div className="flex items-center gap-2">
            <Input
              id="primary-color"
              type="color"
              defaultValue={organization?.theme?.primaryColor || '#3b82f6'}
              className="w-12 h-10 p-1"
            />
            <Input
              defaultValue={organization?.theme?.primaryColor || '#3b82f6'}
              className="max-w-xs"
            />
          </div>
          <p className="text-sm text-muted-foreground">This color will be used for buttons, links, and other primary UI elements.</p>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save Branding</Button>
      </CardFooter>
    </Card>
  );
}