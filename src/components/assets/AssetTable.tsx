import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Asset } from '@/types/asset';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { branches, categories, sectors } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface AssetTableProps {
  assets: Asset[];
}

export function AssetTable({ assets }: AssetTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getBranchName = (branchId: string) => {
    const branch = branches.find((b) => b.id === branchId);
    return branch ? branch.code : '-';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : '-';
  };

  const getSectorName = (sectorId: string) => {
    const sector = sectors.find((s) => s.id === sectorId);
    return sector ? sector.name : '-';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAssets = assets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-card rounded-xl border overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  PA
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Código
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Plaqueta
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Bem
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Categoria
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Setor
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Valor Contábil
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
            {paginatedAssets.map((asset, index) => (
              <tr
                key={asset.id}
                className={cn(
                  'hover:bg-muted/30 transition-colors',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">
                    {getBranchName(asset.branchId)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-muted-foreground">
                    {asset.code}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm bg-secondary px-2 py-0.5 rounded">
                    {asset.tag}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">{asset.name}</p>
                    {asset.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                        {asset.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {getCategoryName(asset.categoryId)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {getSectorName(asset.sectorId)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-foreground">
                    {formatCurrency(asset.accountingValue)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={asset.status} />
                </td>
                <td className="px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={`/assets/${asset.id}`} className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Visualizar
                        </Link>
                      </DropdownMenuItem>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
        <p className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, assets.length)} de{' '}
          {assets.length} registros
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
