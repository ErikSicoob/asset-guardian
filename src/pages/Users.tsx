import { Users as UsersIcon, Plus, Shield, User, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { branches } from '@/data/mockData';

const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@empresa.com',
    role: 'admin',
    branchId: null,
    active: true,
    lastAccess: '2024-01-15T14:30:00Z',
  },
  {
    id: '2',
    name: 'Maria Silva',
    email: 'maria.silva@empresa.com',
    role: 'manager',
    branchId: '1',
    active: true,
    lastAccess: '2024-01-15T10:00:00Z',
  },
  {
    id: '3',
    name: 'João Santos',
    email: 'joao.santos@empresa.com',
    role: 'user',
    branchId: '2',
    active: true,
    lastAccess: '2024-01-14T16:45:00Z',
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@empresa.com',
    role: 'user',
    branchId: '1',
    active: false,
    lastAccess: '2024-01-10T09:00:00Z',
  },
];

const roleConfig = {
  admin: { label: 'Administrador', className: 'bg-destructive/10 text-destructive' },
  manager: { label: 'Gestor', className: 'bg-status-maintenance-bg text-status-maintenance' },
  user: { label: 'Usuário', className: 'bg-secondary text-muted-foreground' },
};

export default function Users() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getBranchName = (branchId: string | null) => {
    if (!branchId) return 'Todas';
    const branch = branches.find((b) => b.id === branchId);
    return branch ? branch.code : '-';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários e permissões do sistema
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      {/* Info Card */}
      <div className="bg-accent/50 border border-accent rounded-xl p-4 flex items-start gap-3">
        <Shield className="h-5 w-5 text-accent-foreground mt-0.5" />
        <div>
          <p className="font-medium text-foreground">Integração com Active Directory</p>
          <p className="text-sm text-muted-foreground">
            O sistema suporta integração com AD para autenticação centralizada.
            Entre em contato com o suporte para configurar.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UsersIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Usuários</p>
              <p className="text-2xl font-bold text-foreground">{mockUsers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-active-bg flex items-center justify-center">
              <User className="h-5 w-5 text-status-active" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Usuários Ativos</p>
              <p className="text-2xl font-bold text-foreground">
                {mockUsers.filter((u) => u.active).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Administradores</p>
              <p className="text-2xl font-bold text-foreground">
                {mockUsers.filter((u) => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Usuário
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Perfil
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Filial
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Último Acesso
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        roleConfig[user.role as keyof typeof roleConfig].className
                      }`}
                    >
                      {roleConfig[user.role as keyof typeof roleConfig].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {getBranchName(user.branchId)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(user.lastAccess)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        user.active
                          ? 'bg-status-active-bg text-status-active'
                          : 'bg-status-inactive-bg text-status-inactive'
                      }`}
                    >
                      {user.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Desativar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
