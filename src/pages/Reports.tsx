import { FileText, Download, Calendar, Building2, FolderOpen, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { branches } from '@/data/mockData';

const reportTypes = [
  {
    id: 'assets-by-sector',
    name: 'Ativos por Setor',
    description: 'Lista de ativos agrupados por setor',
    icon: FolderOpen,
  },
  {
    id: 'assets-by-status',
    name: 'Ativos por Status',
    description: 'Lista de ativos agrupados por status',
    icon: CheckCircle,
  },
  {
    id: 'assets-by-branch',
    name: 'Ativos por Filial (PA)',
    description: 'Lista de ativos com PA, Código, Plaqueta, Bem, Observações',
    icon: Building2,
  },
  {
    id: 'maintenance-history',
    name: 'Histórico de Manutenções',
    description: 'Relatório completo de manutenções realizadas',
    icon: FileText,
  },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">
            Exporte relatórios em Excel para análise
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-foreground">Filtros do Relatório</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Filial (PA)
            </label>
            <Select defaultValue="all">
              <SelectTrigger>
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

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Data Inicial
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Data Final
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="date"
                className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportTypes.map((report, index) => (
          <div
            key={report.id}
            className="bg-card border rounded-xl p-5 hover:shadow-card-hover transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <report.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {report.description}
                  </p>
                </div>
              </div>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Excel
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Excel Format Info */}
      <div className="bg-accent/50 border border-accent rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-2">
          Formato do Relatório por PA
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          O relatório por filial segue o formato especificado com as seguintes colunas:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="px-4 py-2 text-left font-medium text-foreground">PA</th>
                <th className="px-4 py-2 text-left font-medium text-foreground">CÓDIGO</th>
                <th className="px-4 py-2 text-left font-medium text-foreground">PLAQUETA</th>
                <th className="px-4 py-2 text-left font-medium text-foreground">BEM</th>
                <th className="px-4 py-2 text-left font-medium text-foreground">OBSERVAÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 text-muted-foreground">PA001</td>
                <td className="px-4 py-2 text-muted-foreground">ATI-001</td>
                <td className="px-4 py-2 font-mono text-muted-foreground">000001</td>
                <td className="px-4 py-2 text-muted-foreground">Notebook Dell Latitude</td>
                <td className="px-4 py-2 text-muted-foreground">Uso do setor de TI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
