import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore } from "../hooks/use-auth";
import { useShallow } from "zustand/react/shallow";
import { useDashboardStore } from "@/hooks/use-dashboard-data";
import { useAnalyticsStore } from "../hooks/use-analytics-data";
import { Skeleton } from "@/components/ui/skeleton";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DynamicIcon } from "../components/DynamicIcon";
import { Activity as ActivityIcon } from "lucide-react";
export function DashboardPage() {
  const { user, currentAccountId, accounts } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      currentAccountId: state.currentAccountId,
      accounts: state.accounts
    }))
  );
  const { activities, isLoading: isActivitiesLoading } = useDashboardStore(
    useShallow((state) => ({
      activities: state.activities,
      isLoading: state.isLoading
    }))
  );
  const { dashboardData, isLoading: isAnalyticsLoading } = useAnalyticsStore(
    useShallow((state) => ({
      dashboardData: state.dashboardData,
      isLoading: state.isLoading
    }))
  );
  const currentAccount = accounts.find((acc) => acc.id === currentAccountId);
  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Here's a snapshot of {currentAccount?.name}.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Your revenue trend for the last 7 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {isAnalyticsLoading || !dashboardData ? <Skeleton className="h-[300px] w-full" /> :
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData?.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            }
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ActivityIcon className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>A log of recent actions in your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {isActivitiesLoading ?
                [...Array(5)].map((_, i) =>
                <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                ) :

                activities.map((activity) =>
                <div key={activity.id} className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={activity.user.avatarUrl} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          <span className="font-semibold">{activity.user.name}</span> {activity.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                )
                }
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>);

}