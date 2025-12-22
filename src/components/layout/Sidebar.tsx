import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Building2,
  Wrench,
  ArrowRightLeft,
  FileText,
  Users,
  Settings,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { branches } from '@/data/mockData';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Ativos', href: '/assets', icon: Package },
  { name: 'Filiais', href: '/branches', icon: Building2 },
  { name: 'Manutenções', href: '/maintenance', icon: Wrench },
  { name: 'Movimentações', href: '/movements', icon: ArrowRightLeft },
  { name: 'Relatórios', href: '/reports', icon: FileText },
];

const adminNavigation = [
  { name: 'Usuários', href: '/users', icon: Users },
  { name: 'Logs de Acesso', href: '/logs', icon: Shield },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

interface SidebarProps {
  selectedBranch: string;
  onBranchChange: (branchId: string) => void;
}

export function Sidebar({ selectedBranch, onBranchChange }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
        )}
        onClick={() => setIsMobileOpen(false)}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && <span>{item.name}</span>}
      </Link>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <Package className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="font-semibold text-sidebar-foreground">Patrimônios</h1>
            <p className="text-xs text-sidebar-foreground/60">Gestão de Ativos</p>
          </div>
        )}
      </div>

      {/* Branch Selector */}
      {!isCollapsed && (
        <div className="px-4 py-4 border-b border-sidebar-border">
          <label className="text-xs font-medium text-sidebar-foreground/60 mb-2 block">
            Filial Atual
          </label>
          <Select value={selectedBranch} onValueChange={onBranchChange}>
            <SelectTrigger className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
              <SelectValue placeholder="Selecionar filial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Filiais</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.code} - {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>

        {!isCollapsed && (
          <div className="pt-6">
            <p className="px-3 text-xs font-semibold text-sidebar-foreground/40 uppercase tracking-wider mb-2">
              Administração
            </p>
            <div className="space-y-1">
              {adminNavigation.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className={cn(
          'flex items-center gap-3 px-3 py-2',
          isCollapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 rounded-full bg-sidebar-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-primary">AD</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                Admin User
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                admin@empresa.com
              </p>
            </div>
          )}
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full bg-sidebar z-40 transition-all duration-300',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <SidebarContent />

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-sm hidden lg:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronDown
            className={cn(
              'h-3 w-3 transition-transform',
              isCollapsed ? '-rotate-90' : 'rotate-90'
            )}
          />
        </Button>
      </aside>

      {/* Spacer */}
      <div className={cn(
        'hidden lg:block transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )} />
    </>
  );
}
