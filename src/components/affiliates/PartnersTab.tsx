import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useAffiliatesStore } from "@/hooks/use-affiliates-data";
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export function PartnersTab() {
  const { partners, isLoading } = useAffiliatesStore(
    useShallow((state) => ({ partners: state.partners, isLoading: state.isLoading }))
  );
  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Referral link copied to clipboard!");
  };
  return (
    <div className="animate-fade-in">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Partner</TableHead>
              <TableHead>Referral Link</TableHead>
              <TableHead className="hidden md:table-cell text-center">Clicks</TableHead>
              <TableHead className="hidden md:table-cell text-center">Conversions</TableHead>
              <TableHead className="text-right">Earnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-12 mx-auto" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-6 w-12 mx-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-6 w-16 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : (
              partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={partner.avatarUrl} />
                        <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{partner.name}</p>
                        <p className="text-sm text-muted-foreground">{partner.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground truncate">{partner.referralLink}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(partner.referralLink)}>
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">{partner.stats.clicks}</TableCell>
                  <TableCell className="hidden md:table-cell text-center">{partner.stats.conversions}</TableCell>
                  <TableCell className="text-right font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(partner.stats.earnings)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}