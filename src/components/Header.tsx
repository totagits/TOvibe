import {
  Bell,
  ChevronDown,
  PlusCircle,
  Search,
  User,
  Briefcase,
  FileText,
  KanbanSquare,
  MessageSquare } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from "../hooks/use-auth";
import { useShallow } from 'zustand/react/shallow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
export function Header() {
  const { user, accounts, currentAccountId, setCurrentAccountId, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      accounts: state.accounts,
      currentAccountId: state.currentAccountId,
      setCurrentAccountId: state.setCurrentAccountId,
      logout: state.logout
    }))
  );
  const location = useLocation();
  const createMenuItems = useMemo(() => {
    const path = location.pathname;
    const items = [
    { icon: User, label: 'New Contact', path: '/crm' },
    { icon: Briefcase, label: 'New Deal', path: '/crm' },
    { icon: FileText, label: 'New Page', path: '/pages' },
    { icon: KanbanSquare, label: 'New Project', path: '/projects' },
    { icon: MessageSquare, label: 'New Post', path: '/social' }];

    if (path.startsWith('/crm')) {
      return items.filter((item) => item.path === '/crm');
    }
    if (path.startsWith('/pages')) {
      return items.filter((item) => item.path === '/pages');
    }
    if (path.startsWith('/projects')) {
      return items.filter((item) => item.path === '/projects');
    }
    if (path.startsWith('/social')) {
      return items.filter((item) => item.path === '/social');
    }

    return items.slice(0, 2);
  }, [location.pathname]);
  const currentAccount = accounts.find((acc) => acc.id === currentAccountId);
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />

      </div>
      <div className="flex items-center gap-4">
        <Select value={currentAccountId || ''} onValueChange={setCurrentAccountId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select account">
              {currentAccount?.name || 'Select an account'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) =>
            <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Create
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Create New</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {createMenuItems.map((item) =>
            <DropdownMenuItem key={item.label}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 flex items-center gap-2 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline-block">{user?.name}</span>
              <ChevronDown className="h-4 w-4 hidden sm:inline-block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>);

}