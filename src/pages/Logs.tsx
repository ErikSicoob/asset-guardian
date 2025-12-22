import { Shield, Search, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockLogs = [
  {
    id: '1',
    userId: '1',
    userName: 'Admin User',
    action: 'LOGIN',
    details: 'Login realizado com sucesso',
    ip: '192.168.1.100',
    timestamp: '2024-01-15T14:30:00Z',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Maria Silva',
    action: 'CREATE',
    details: 'Criou novo ativo: Notebook Dell Latitude',
    ip: '192.168.1.101',
    timestamp: '2024-01-15T10:15:00Z',
  },
  {
    id: '3',
    userId: '1',
    userName: 'Admin User',
    action: 'UPDATE',
    details: 'Atualizou status do ativo ATI-001 para "Em Manutenção"',
    ip: '192.168.1.100',
    timestamp: '2024-01-15T09:30:00Z',
  },
  {
    id: '4',
    userId: '3',
    userName: 'João Santos',
    action: 'EXPORT',
    details: 'Exportou relatório de ativos por setor',
    ip: '192.168.1.102',
    timestamp: '2024-01-14T16:45:00Z',
  },
  {
    id: '5',
    userId: '2',
    userName: 'Maria Silva',
    action: 'DELETE',
    details: 'Removeu documento do ativo MOV-002',
    ip: '192.168.1.101',
    timestamp: '2024-01-14T14:20:00Z',
  },
  {
    id: '6',
    userId: '1',
    userName: 'Admin User',
    action: 'LOGOUT',
    details: 'Sessão encerrada',
    ip: '192.168.1.100',
    timestamp: '2024-01-14T18:00:00Z',
  },
];

const actionConfig: Record<string, { label: string; className: string }> = {
  LOGIN: { label: 'Login', className: 'bg-status-active-bg text-status-active' },
  LOGOUT: { label: 'Logout', className: 'bg-secondary text-muted-foreground' },
  CREATE: { label: 'Criação', className: 'bg-primary/10 text-primary' },
  UPDATE: { label: 'Atualização', className: 'bg-status-maintenance-bg text-status-maintenance' },
  DELETE: { label: 'Exclusão', className: 'bg-status-inactive-bg text-status-inactive' },
  EXPORT: { label: 'Exportação', className: 'bg-accent text-accent-foreground' },
};

export default function Logs() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logs de Acesso</h1>
          <p className="text-muted-foreground">
            Registro de todas as ações realizadas no sistema
          </p>
        </div>
      </div>

      {/* LGPD Notice */}
      <div className="bg-accent/50 border border-accent rounded-xl p-4 flex items-start gap-3">
        <Shield className="h-5 w-5 text-accent-foreground mt-0.5" />
        <div>
          <p className="font-medium text-foreground">Conformidade LGPD</p>
          <p className="text-sm text-muted-foreground">
            Todos os acessos e ações são registrados em conformidade com a Lei Geral de Proteção de Dados.
            Os logs são mantidos por 5 anos e podem ser auditados a qualquer momento.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por usuário, ação ou detalhes..."
            className="pl-10 h-10"
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Ações</SelectItem>
            <SelectItem value="LOGIN">Login</SelectItem>
            <SelectItem value="LOGOUT">Logout</SelectItem>
            <SelectItem value="CREATE">Criação</SelectItem>
            <SelectItem value="UPDATE">Atualização</SelectItem>
            <SelectItem value="DELETE">Exclusão</SelectItem>
            <SelectItem value="EXPORT">Exportação</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="date"
            className="h-10 pl-10 pr-4 rounded-md border border-input bg-background text-foreground"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Data/Hora
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Usuário
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ação
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Detalhes
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  IP
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className="hover:bg-muted/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      {formatDate(log.timestamp)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {log.userName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        actionConfig[log.action]?.className || 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {actionConfig[log.action]?.label || log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground max-w-xs truncate block">
                      {log.details}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono text-muted-foreground">{log.ip}</span>
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
