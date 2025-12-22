import { useState } from 'react';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [selectedBranch, setSelectedBranch] = useState('all');

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
      />
      <main className="flex-1 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
