import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useCrmStore } from "@/hooks/use-crm-data";
import { useShallow } from 'zustand/react/shallow';
import { Contact } from '@shared/types';
import { Skeleton } from '@/components/ui/skeleton';
type SortKey = keyof Contact | 'ownerName';
export function ContactsTab() {
  const { contacts, isLoading } = useCrmStore(
    useShallow((state) => ({ contacts: state.contacts, isLoading: state.isLoading }))
  );
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);
  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const sortedAndFilteredContacts = useMemo(() => {
    let filtered = contacts.filter(c =>
      c.name.toLowerCase().includes(filter.toLowerCase()) ||
      c.email.toLowerCase().includes(filter.toLowerCase())
    );
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Contact];
        const bValue = b[sortConfig.key as keyof Contact];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [contacts, filter, sortConfig]);
  const renderSortArrow = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {[...Array(6)].map((_, i) => <TableHead key={i}><Skeleton className="h-5 w-full" /></TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(6)].map((_, j) => <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  return (
    <div className="animate-fade-in">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter contacts..."
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                <div className="flex items-center">Name {renderSortArrow('name')}</div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead onClick={() => handleSort('leadScore')} className="cursor-pointer hidden md:table-cell">
                <div className="flex items-center">Lead Score {renderSortArrow('leadScore')}</div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Tags</TableHead>
              <TableHead onClick={() => handleSort('lastTouchAt')} className="cursor-pointer hidden lg:table-cell">
                <div className="flex items-center">Last Contacted {renderSortArrow('lastTouchAt')}</div>
              </TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{contact.lifecycleStage.replace('_', ' ').toLocaleUpperCase()}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{contact.leadScore}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex gap-1">
                    {contact.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{new Date(contact.lastTouchAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}