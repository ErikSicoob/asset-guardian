import { ArrowRightLeft, Plus, Calendar, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { movements, assets, branches, sectors } from '@/data/mockData';

export default function Movements() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getBranchName = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    return branch ? `${branch.code} - ${branch.name}` : '-';
  };

  const getSectorName = (sectorId: string) => {
    const sector = sectors.find((s) => s.id === sectorId);
    return sector?.name || '-';
  };

  const getAssetName = (assetId: string) => {
    const asset = assets.find((a) => a.id === assetId);
    return asset?.name || '-';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Movimentações</h1>
          <p className="text-muted-foreground">
            Histórico de transferências entre filiais e setores
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Movimentação
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Movimentações</p>
              <p className="text-2xl font-bold text-foreground">{movements.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-maintenance-bg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-status-maintenance" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Este Mês</p>
              <p className="text-2xl font-bold text-foreground">0</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ativos Movimentados</p>
              <p className="text-2xl font-bold text-foreground">
                {new Set(movements.map((m) => m.assetId)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Movements List */}
      <div className="bg-card border rounded-xl overflow-hidden">
        {movements.length > 0 ? (
          <div className="divide-y">
            {movements.map((movement, index) => (
              <div
                key={movement.id}
                className="p-5 hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ArrowRightLeft className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">
                        {getAssetName(movement.assetId)}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-muted-foreground">De:</span>
                        <span className="font-medium text-foreground">
                          {getBranchName(movement.fromBranchId)}
                        </span>
                        <span className="text-muted-foreground">
                          ({getSectorName(movement.fromSectorId)})
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Para:</span>
                        <span className="font-medium text-foreground">
                          {getBranchName(movement.toBranchId)}
                        </span>
                        <span className="text-muted-foreground">
                          ({getSectorName(movement.toSectorId)})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-medium text-foreground">
                      {formatDate(movement.date)}
                    </span>
                    <p className="text-sm text-muted-foreground max-w-xs text-right">
                      {movement.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <ArrowRightLeft className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma movimentação registrada
            </h3>
            <p className="text-muted-foreground mb-4">
              As movimentações de ativos entre filiais aparecerão aqui
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Movimentação
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
