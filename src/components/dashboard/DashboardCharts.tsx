import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { dashboardStats } from '@/data/mockData';

const COLORS = [
  'hsl(217, 91%, 50%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(0, 84%, 60%)',
  'hsl(280, 67%, 50%)',
];

export function CostBySectorChart() {
  return (
    <div className="bg-card rounded-xl border p-5 animate-slide-up">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Custo por Setor
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dashboardStats.costBySector} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              tickFormatter={(value) =>
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  notation: 'compact',
                }).format(value)
              }
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="sector"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={100}
            />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(value)
              }
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Bar
              dataKey="cost"
              fill="hsl(var(--primary))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AssetsByCategoryChart() {
  return (
    <div className="bg-card rounded-xl border p-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Ativos por Categoria
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dashboardStats.assetsByCategory}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              paddingAngle={4}
              label={({ name, percent }) =>
                `${name.split(' ')[0]} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={false}
            >
              {dashboardStats.assetsByCategory.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AssetsByBranchChart() {
  return (
    <div className="bg-card rounded-xl border p-5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Ativos por Filial
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dashboardStats.assetsByBranch}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="branch"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => value.split(' - ')[0]}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
