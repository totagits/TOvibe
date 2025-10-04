import {
  LayoutDashboard,
  Users,
  Inbox,
  Bot,
  FileText,
  Calendar,
  BookOpen,
  BarChart2,
  Settings,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  Star,
  KanbanSquare,
  ShoppingCart,
  Handshake,
  Sparkles,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/hooks/use-auth';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/crm', icon: Users, label: 'CRM' },
  { to: '/inbox', icon: Inbox, label: 'Unified Inbox' },
  { to: '/automation', icon: Bot, label: 'Automation' },
  { to: '/pages', icon: FileText, label: 'Pages & Funnels' },
  { to: '/scheduler', icon: Calendar, label: 'Scheduler' },
  { to: '/reputation', icon: Star, label: 'Reputation' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/projects', icon: KanbanSquare, label: 'Projects' },
  { to: '/ecommerce', icon: ShoppingCart, label: 'E-commerce' },
  { to: '/affiliates', icon: Handshake, label: 'Affiliates' },
  { to: '/ai', icon: Sparkles, label: 'AI Studio' },
  { to: '/analytics', icon: BarChart2, label: 'Analytics' },
];
export function Sidebar() {
  const organization = useAuthStore((state) => state.organization);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const NavItem = ({ to, icon: Icon, label }: typeof navItems[0]) => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                isActive && 'bg-muted text-primary',
                isCollapsed && 'justify-center'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
          </NavLink>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
  return (
    <div className={cn("relative hidden border-r bg-background md:block transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6">
              <rect width="256" height="256" fill="none"></rect>
              <path d="M48,88H208a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96A8,8,0,0,1,48,88Z" opacity="0.2"></path>
              <path d="M88,124a36,36,0,1,1-36,36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
              <path d="M168,124a36,36,0,1,1,36,36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
              <line x1="40" y1="216" x2="40" y2="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
              <path d="M216,96v88a32,32,0,0,1-32,32H72a32,32,0,0,1-32-32" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
              <path d="M160,40.2V80a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V40.2A64.2,64.2,0,0,1,48,88" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
            </svg>
            {!isCollapsed && <span className="">TOTAG Nexus</span>}
          </NavLink>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => <NavItem key={item.to} {...item} />)}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
            <NavItem to="/settings" icon={Settings} label="Settings" />
            <NavItem to="/support" icon={LifeBuoy} label="Support" />
          </nav>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-16 h-8 w-8 rounded-full"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
}