import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useSettingsStore } from "@/hooks/use-settings-data";
import { useShallow } from "zustand/react/shallow";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
export function BillingTab() {
  const { subscription, isLoading } = useSettingsStore(
    useShallow((state) => ({
      subscription: state.subscription,
      isLoading: state.isLoading,
    }))
  );
  if (isLoading || !subscription) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }
  const UsageBar = ({ title, used, limit }: { title: string; used: number; limit: number }) => (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{title}</span>
        <span><span className="font-medium">{used.toLocaleString()}</span> / {limit.toLocaleString()}</span>
      </div>
      <Progress value={(used / limit) * 100} />
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the <span className="font-semibold text-primary">{subscription.planName}</span>.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">${subscription.price}</span>
              <span className="text-muted-foreground">/ {subscription.interval}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your plan renews on {format(new Date(subscription.currentPeriodEnd), 'MMMM d, yyyy')}.
            </p>
            <Button>Upgrade Plan</Button>
            <Button variant="ghost">Cancel Subscription</Button>
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Your usage for the current billing period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UsageBar title="Contacts" used={subscription.usage.contacts.used} limit={subscription.usage.contacts.limit} />
            <UsageBar title="Users" used={subscription.usage.users.used} limit={subscription.usage.users.limit} />
            <UsageBar title="Emails Sent" used={subscription.usage.emails.used} limit={subscription.usage.emails.limit} />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <img src="/visa-logo.svg" alt="Visa" className="h-6" />
              <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Update Payment</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}