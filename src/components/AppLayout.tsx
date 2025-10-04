import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
interface AppLayoutProps {
  children: React.ReactNode;
}
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-muted/40 flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 sm:px-6 lg:px-8 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster richColors closeButton />
    </div>
  );
}