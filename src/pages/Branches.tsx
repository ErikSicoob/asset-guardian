import { Building2, MapPin, Package, Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { branches, assets } from '@/data/mockData';

export default function Branches() {
  const getAssetCountByBranch = (branchId: string) => {
    return assets.filter((a) => a.branchId === branchId).length;
  };

  const getTotalValueByBranch = (branchId: string) => {
    return assets
      .filter((a) => a.branchId === branchId)
      .reduce((sum, a) => sum + a.accountingValue, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Filiais</h1>
          <p className="text-muted-foreground">
            Gerencie as filiais da empresa
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Filial
        </Button>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {branches.map((branch, index) => (
          <div
            key={branch.id}
            className="bg-card border rounded-xl p-5 space-y-4 hover:shadow-card-hover transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{branch.name}</p>
                  <p className="text-sm text-primary font-mono">{branch.code}</p>
                </div>
              </div>
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
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {branch.address && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {branch.address}
              </div>
            )}

            <div className="pt-3 border-t grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Ativos</p>
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">
                    {getAssetCountByBranch(branch.id)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Valor Total</p>
                <p className="font-semibold text-foreground text-sm">
                  {formatCurrency(getTotalValueByBranch(branch.id))}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
