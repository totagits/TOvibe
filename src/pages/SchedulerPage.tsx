import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, User, Video } from "lucide-react";
import { useSchedulerStore } from '@/hooks/use-scheduler-data';
import { useShallow } from 'zustand/react/shallow';
import { Skeleton } from '@/components/ui/skeleton';
import { format, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCrmStore } from '@/hooks/use-crm-data';
export function SchedulerPage() {
  const { bookings, isLoading, selectedDate, setSelectedDate } = useSchedulerStore(
    useShallow((state) => ({
      bookings: state.bookings,
      isLoading: state.isLoading,
      selectedDate: state.selectedDate,
      setSelectedDate: state.setSelectedDate,
    }))
  );
  const { contacts, isLoading: contactsLoading } = useCrmStore(
    useShallow((state) => ({
      contacts: state.contacts,
      isLoading: state.isLoading,
    }))
  );
  const contactsById = useMemo(() => {
    return new Map(contacts.map(c => [c.id, c]));
  }, [contacts]);
  const todaysBookings = useMemo(() => {
    return bookings
      .filter(booking => isSameDay(new Date(booking.startTime), selectedDate))
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [bookings, selectedDate]);
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scheduler</h1>
          <p className="text-muted-foreground">Manage your bookings and appointments.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-2 md:p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || new Date())}
              className="p-0 [&_td]:w-14 [&_td]:h-14 [&_th]:w-14"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Appointments for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[450px]">
              <div className="space-y-4">
                {isLoading || contactsLoading ? (
                  [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)
                ) : todaysBookings.length > 0 ? (
                  todaysBookings.map(booking => {
                    const contact = contactsById.get(booking.contactId);
                    return (
                      <div key={booking.id} className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col items-center">
                          <p className="font-semibold text-sm">{format(new Date(booking.startTime), 'h:mm a')}</p>
                          <p className="text-xs text-muted-foreground">30 min</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{booking.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={contact?.avatarUrl} />
                              <AvatarFallback>{contact?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{contact?.name || 'Unknown Contact'}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Video className="h-4 w-4" />
                            <span>Google Meet</span>
                          </div>
                        </div>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-muted-foreground py-10">
                    <p>No appointments scheduled for this day.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}