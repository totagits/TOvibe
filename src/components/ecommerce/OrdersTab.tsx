import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEcommerceStore } from "@/hooks/use-ecommerce-data";
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useCrmStore } from "@/hooks/use-crm-data";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
export function OrdersTab() {
  const { orders, isLoading } = useEcommerceStore(
    useShallow((state) => ({ orders: state.orders, isLoading: state.isLoading }))
  );
  const { contacts, isLoading: contactsLoading } = useCrmStore(
    useShallow((state) => ({ contacts: state.contacts, isLoading: state.isLoading }))
  );
  const contactsById = useMemo(() => new Map(contacts.map(c => [c.id, c])), [contacts]);
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'fulfilled': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'outline';
    }
  };
  return (
    <div className="animate-fade-in">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || contactsLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-6 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : (
              orders.map((order) => {
                const customer = contactsById.get(order.contactId);
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id.split('_')[1]}</TableCell>
                    <TableCell>{customer?.name || 'Unknown Customer'}</TableCell>
                    <TableCell className="hidden md:table-cell">{format(new Date(order.orderDate), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(getStatusBadgeVariant(order.status))}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}