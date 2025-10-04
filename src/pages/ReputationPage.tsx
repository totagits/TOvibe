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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Star, MessageSquare } from "lucide-react";
import { useReputationStore } from "@/hooks/use-reputation-data";
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )}
      />
    ))}
  </div>
);
export function ReputationPage() {
  const { reviews, stats, isLoading } = useReputationStore(
    useShallow((state) => ({
      reviews: state.reviews,
      stats: state.stats,
      isLoading: state.isLoading,
    }))
  );
  const getSourceIcon = (source: string) => {
    if (source.toLowerCase() === 'google') return 'https://www.google.com/s2/favicons?domain=google.com';
    if (source.toLowerCase() === 'facebook') return 'https://www.google.com/s2/favicons?domain=facebook.com';
    return 'https://www.google.com/s2/favicons?domain=example.com';
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reputation</h1>
          <p className="text-muted-foreground">Monitor and manage your online reviews.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Send Review Request
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-24" /> : (
              <>
                <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">out of 5 stars</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : (
              <>
                <div className="text-2xl font-bold">{stats.totalReviews}</div>
                <p className="text-xs text-muted-foreground">across all platforms</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reply</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? <Skeleton className="h-8 w-16" /> : (
              <>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">reviews need a response</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Incoming Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Review</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell className="hidden lg:table-cell"><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-10" /></TableCell>
                  </TableRow>
                ))
              ) : (
                reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={review.authorAvatarUrl} alt={review.authorName} />
                          <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{review.authorName}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <img src={getSourceIcon(review.source)} alt={review.source} className="h-3 w-3" />
                            {review.source}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-sm">
                      <p className="truncate">{review.content}</p>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <RatingStars rating={review.rating} />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{new Date(review.createdAt).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem>Reply</DropdownMenuItem>
                          <DropdownMenuItem>View Original</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}