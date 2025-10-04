import { useAnalyticsStore } from '@/hooks/use-analytics-data';
import { useShallow } from 'zustand/react/shallow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DynamicIcon } from '@/components/DynamicIcon';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
export function AnalyticsPage() {
  const { dashboardData, isLoading } = useAnalyticsStore(
    useShallow((state) => ({
      dashboardData: state.dashboardData,
      isLoading: state.isLoading,
    }))
  );
  const renderKpiCards = () => {
    if (isLoading || !dashboardData) {
      return [...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-24 mt-1" />
          </CardContent>
        </Card>
      ));
    }
    return dashboardData?.kpis.map((kpi) => (
      <Card key={kpi.title}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
          <DynamicIcon name={kpi.icon} className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpi.value}</div>
          <p className="text-xs text-muted-foreground">{kpi.change}</p>
        </CardContent>
      </Card>
    ));
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Your business performance at a glance.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{renderKpiCards()}</div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {isLoading || !dashboardData ? <Skeleton className="h-[300px] w-full" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData?.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading || !dashboardData ? <Skeleton className="h-[300px] w-full" /> : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={dashboardData?.leadSources} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {dashboardData?.leadSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline Funnel</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          {isLoading || !dashboardData ? <Skeleton className="h-[300px] w-full" /> : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData?.pipelineFunnel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}