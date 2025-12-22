import { Wrench, Plus, Calendar, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { maintenances, assets } from '@/data/mockData';

export default function Maintenance() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Concluída',
          icon: CheckCircle,
          className: 'bg-status-active-bg text-status-active',
        };
      case 'in-progress':
        return {
          label: 'Em andamento',
          icon: Clock,
          className: 'bg-status-maintenance-bg text-status-maintenance',
        };
      default:
        return {
          label: 'Agendada',
          icon: AlertCircle,
          className: 'bg-secondary text-muted-foreground',
        };
    }
  };

  const totalCost = maintenances.reduce((sum, m) => sum + m.cost, 0);
  const completedCount = maintenances.filter((m) => m.status === 'completed').length;
  const pendingCount = maintenances.filter((m) => m.status !== 'completed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manutenções</h1>
          <p className="text-muted-foreground">
            Gerencie manutenções preventivas e corretivas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Manutenção
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Manutenções</p>
              <p className="text-2xl font-bold text-foreground">{maintenances.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-maintenance-bg flex items-center justify-center">
              <Clock className="h-5 w-5 text-status-maintenance" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Custo Total</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(totalCost)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance List */}
      <div className="bg-card border rounded-xl overflow-hidden">
        <div className="divide-y">
          {maintenances.map((maintenance, index) => {
            const asset = assets.find((a) => a.id === maintenance.assetId);
            const statusConfig = getStatusConfig(maintenance.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={maintenance.id}
                className="p-4 hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        maintenance.type === 'preventive'
                          ? 'bg-status-maintenance-bg'
                          : 'bg-status-inactive-bg'
                      }`}
                    >
                      <Wrench
                        className={`h-6 w-6 ${
                          maintenance.type === 'preventive'
                            ? 'text-status-maintenance'
                            : 'text-status-inactive'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">
                        {maintenance.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {asset?.name || 'Ativo não encontrado'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(maintenance.date)}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded ${
                            maintenance.type === 'preventive'
                              ? 'bg-status-maintenance-bg text-status-maintenance'
                              : 'bg-status-inactive-bg text-status-inactive'
                          }`}
                        >
                          {maintenance.type === 'preventive' ? 'Preventiva' : 'Corretiva'}
                        </span>
                        {maintenance.provider && (
                          <span>{maintenance.provider}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {formatCurrency(maintenance.cost)}
                      </p>
                      {maintenance.nextDate && (
                        <p className="text-xs text-muted-foreground">
                          Próxima: {formatDate(maintenance.nextDate)}
                        </p>
                      )}
                    </div>
                    <span
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig.className}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
