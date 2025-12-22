import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Barcode,
  Building2,
  FolderOpen,
  FileText,
  Image,
  Wrench,
  ArrowRightLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { assets, branches, categories, sectors, maintenances, movements } from '@/data/mockData';

export default function AssetDetail() {
  const { id } = useParams();
  const asset = assets.find((a) => a.id === id);

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Ativo não encontrado</h2>
        <Button asChild>
          <Link to="/assets">Voltar para lista</Link>
        </Button>
      </div>
    );
  }

  const branch = branches.find((b) => b.id === asset.branchId);
  const category = categories.find((c) => c.id === asset.categoryId);
  const sector = sectors.find((s) => s.id === asset.sectorId);
  const assetMaintenances = maintenances.filter((m) => m.assetId === asset.id);
  const assetMovements = movements.filter((m) => m.assetId === asset.id);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" className="w-fit gap-2" asChild>
          <Link to="/assets">
            <ArrowLeft className="h-4 w-4" />
            Voltar para lista
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{asset.name}</h1>
              <StatusBadge status={asset.status} />
            </div>
            <p className="text-muted-foreground">{asset.description}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-4 w-4" />
            <span className="text-xs font-medium">Código</span>
          </div>
          <p className="font-semibold text-foreground">{asset.code}</p>
        </div>

        <div className="bg-card border rounded-lg p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Barcode className="h-4 w-4" />
            <span className="text-xs font-medium">Plaqueta</span>
          </div>
          <p className="font-mono font-semibold text-foreground">{asset.tag}</p>
        </div>

        <div className="bg-card border rounded-lg p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-medium">Aquisição</span>
          </div>
          <p className="font-semibold text-foreground">{formatDate(asset.acquisitionDate)}</p>
        </div>

        <div className="bg-card border rounded-lg p-4 space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-medium">Valor Contábil</span>
          </div>
          <p className="font-semibold text-foreground">{formatCurrency(asset.accountingValue)}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="maintenance">Manutenções</TabsTrigger>
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Location Info */}
            <div className="bg-card border rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Localização
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Filial (PA)</span>
                  <span className="font-medium text-foreground">
                    {branch?.code} - {branch?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Setor</span>
                  <span className="font-medium text-foreground">{sector?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Endereço</span>
                  <span className="font-medium text-foreground">{branch?.address}</span>
                </div>
              </div>
            </div>

            {/* Category Info */}
            <div className="bg-card border rounded-xl p-5 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                Classificação
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Categoria</span>
                  <span className="font-medium text-foreground">{category?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Valor Atual</span>
                  <span className="font-medium text-foreground">
                    {asset.currentValue ? formatCurrency(asset.currentValue) : '-'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Depreciação</span>
                  <span className="font-medium text-foreground">
                    {asset.currentValue
                      ? formatCurrency(asset.accountingValue - asset.currentValue)
                      : '-'}
                  </span>
                </div>
              </div>
            </div>

            {/* Observations */}
            {asset.observations && (
              <div className="bg-card border rounded-xl p-5 space-y-4 lg:col-span-2">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Observações
                </h3>
                <p className="text-muted-foreground">{asset.observations}</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Histórico de Manutenções
              </h3>
              <Button size="sm">Nova Manutenção</Button>
            </div>
            {assetMaintenances.length > 0 ? (
              <div className="divide-y">
                {assetMaintenances.map((maintenance) => (
                  <div key={maintenance.id} className="p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{maintenance.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {maintenance.type === 'preventive' ? 'Preventiva' : 'Corretiva'} •{' '}
                        {formatDate(maintenance.date)} • {maintenance.provider}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">
                        {formatCurrency(maintenance.cost)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          maintenance.status === 'completed'
                            ? 'bg-status-active-bg text-status-active'
                            : maintenance.status === 'in-progress'
                            ? 'bg-status-maintenance-bg text-status-maintenance'
                            : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {maintenance.status === 'completed'
                          ? 'Concluída'
                          : maintenance.status === 'in-progress'
                          ? 'Em andamento'
                          : 'Agendada'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Nenhuma manutenção registrada
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="movements" className="space-y-4">
          <div className="bg-card border rounded-xl overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                Histórico de Movimentações
              </h3>
              <Button size="sm">Nova Movimentação</Button>
            </div>
            {assetMovements.length > 0 ? (
              <div className="divide-y">
                {assetMovements.map((movement) => {
                  const fromBranch = branches.find((b) => b.id === movement.fromBranchId);
                  const toBranch = branches.find((b) => b.id === movement.toBranchId);
                  return (
                    <div key={movement.id} className="p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-foreground">
                          {fromBranch?.code}
                        </span>
                        <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {toBranch?.code}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {movement.reason} • {formatDate(movement.date)}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                Nenhuma movimentação registrada
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Photos */}
            <div className="bg-card border rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  Fotos
                </h3>
                <Button size="sm" variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Image className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhuma foto anexada
                </p>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-card border rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Documentos
                </h3>
                <Button size="sm" variant="outline">
                  Adicionar
                </Button>
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Nenhum documento anexado
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
