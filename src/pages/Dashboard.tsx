import {
  Package,
  CheckCircle,
  XCircle,
  Wrench,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import {
  CostBySectorChart,
  AssetsByCategoryChart,
  AssetsByBranchChart,
} from '@/components/dashboard/DashboardCharts';
import { dashboardStats, assets, maintenances } from '@/data/mockData';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
    }).format(value);
  };

  const recentAssets = assets.slice(0, 5);
  const pendingMaintenances = maintenances.filter(
    (m) => m.status !== 'completed'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do patrimônio da empresa
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/assets/new">Novo Ativo</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Ativos"
          value={dashboardStats.totalAssets}
          subtitle="Ativos cadastrados"
          icon={Package}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Ativos Ativos"
          value={dashboardStats.activeAssets}
          subtitle="Em operação"
          icon={CheckCircle}
          variant="success"
        />
        <StatCard
          title="Em Manutenção"
          value={dashboardStats.maintenanceAssets}
          subtitle="Aguardando retorno"
          icon={Wrench}
          variant="warning"
        />
        <StatCard
          title="Valor Total"
          value={formatCurrency(dashboardStats.totalValue)}
          subtitle="Valor contábil"
          icon={DollarSign}
          variant="default"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Ativos Inativos"
          value={dashboardStats.inactiveAssets}
          icon={XCircle}
          variant="danger"
        />
        <StatCard
          title="Ativos Baixados"
          value={dashboardStats.writtenOffAssets}
          icon={AlertTriangle}
          variant="default"
        />
        <StatCard
          title="Ativos Ociosos"
          value={dashboardStats.idleAssets}
          subtitle="Sem movimentação"
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Crescimento"
          value="+15%"
          subtitle="vs. mês anterior"
          icon={TrendingUp}
          variant="success"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CostBySectorChart />
        <AssetsByCategoryChart />
        <AssetsByBranchChart />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assets */}
        <div className="bg-card rounded-xl border p-5 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Ativos Recentes
            </h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/assets">Ver todos</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {recentAssets.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {asset.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {asset.code} • {asset.tag}
                    </p>
                  </div>
                </div>
                <StatusBadge status={asset.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Pending Maintenance */}
        <div
          className="bg-card rounded-xl border p-5 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Manutenções Pendentes
            </h3>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/maintenance">Ver todas</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {pendingMaintenances.length > 0 ? (
              pendingMaintenances.map((maintenance) => {
                const asset = assets.find((a) => a.id === maintenance.assetId);
                return (
                  <div
                    key={maintenance.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          maintenance.type === 'preventive'
                            ? 'bg-status-maintenance-bg'
                            : 'bg-status-inactive-bg'
                        }`}
                      >
                        <Wrench
                          className={`h-5 w-5 ${
                            maintenance.type === 'preventive'
                              ? 'text-status-maintenance'
                              : 'text-status-inactive'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {asset?.name || 'Ativo não encontrado'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {maintenance.type === 'preventive'
                            ? 'Preventiva'
                            : 'Corretiva'}{' '}
                          • {new Date(maintenance.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        maintenance.status === 'in-progress'
                          ? 'bg-status-maintenance-bg text-status-maintenance'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {maintenance.status === 'in-progress'
                        ? 'Em andamento'
                        : 'Agendada'}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma manutenção pendente
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
