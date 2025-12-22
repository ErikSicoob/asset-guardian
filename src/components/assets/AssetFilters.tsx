import { useState } from 'react';
import { Search, Filter, X, ScanBarcode, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { branches, categories, sectors } from '@/data/mockData';
import { AssetStatus } from '@/types/asset';

interface AssetFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  status: string;
  category: string;
  branch: string;
  sector: string;
}

const statusOptions: { value: AssetStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'maintenance', label: 'Em Manutenção' },
  { value: 'written-off', label: 'Baixado' },
];

export function AssetFilters({ onSearch, onFilterChange }: AssetFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    status: 'all',
    category: 'all',
    branch: 'all',
    sector: 'all',
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: 'all',
      category: 'all',
      branch: 'all',
      sector: 'all',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por código, plaqueta, nome do bem..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filtros
            {hasActiveFilters && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                {Object.values(filters).filter((v) => v !== 'all').length}
              </span>
            )}
          </Button>

          <Button variant="outline" className="gap-2">
            <ScanBarcode className="h-4 w-4" />
            <span className="hidden sm:inline">Ler Plaqueta</span>
          </Button>

          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Importar</span>
          </Button>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-card border rounded-lg p-4 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Filtros Avançados</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-1"
                onClick={clearFilters}
              >
                <X className="h-3 w-3" />
                Limpar filtros
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Status
              </label>
              <Select
                value={filters.status}
                onValueChange={(v) => handleFilterChange('status', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Categoria
              </label>
              <Select
                value={filters.category}
                onValueChange={(v) => handleFilterChange('category', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Filial (PA)
              </label>
              <Select
                value={filters.branch}
                onValueChange={(v) => handleFilterChange('branch', v)}
              >
                <SelectTrigger>
                  <SelectValue />
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

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Setor
              </label>
              <Select
                value={filters.sector}
                onValueChange={(v) => handleFilterChange('sector', v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Setores</SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
