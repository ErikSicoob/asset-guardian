import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AssetTable } from '@/components/assets/AssetTable';
import { AssetFilters, FilterValues } from '@/components/assets/AssetFilters';
import { assets as mockAssets } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterValues>({
    status: 'all',
    category: 'all',
    branch: 'all',
    sector: 'all',
  });

  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          asset.code.toLowerCase().includes(query) ||
          asset.tag.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query) ||
          (asset.description?.toLowerCase().includes(query) ?? false);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status !== 'all' && asset.status !== filters.status) {
        return false;
      }

      // Category filter
      if (filters.category !== 'all' && asset.categoryId !== filters.category) {
        return false;
      }

      // Branch filter
      if (filters.branch !== 'all' && asset.branchId !== filters.branch) {
        return false;
      }

      // Sector filter
      if (filters.sector !== 'all' && asset.sectorId !== filters.sector) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ativos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os ativos patrimoniais
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link to="/assets/new">
            <Plus className="h-4 w-4" />
            Novo Ativo
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <AssetFilters
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
      />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredAssets.length} ativo(s) encontrado(s)
        </p>
      </div>

      {/* Table */}
      <AssetTable assets={filteredAssets} />
    </div>
  );
}
