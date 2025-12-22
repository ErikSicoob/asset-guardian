import { cn } from '@/lib/utils';
import { AssetStatus } from '@/types/asset';

const statusConfig: Record<AssetStatus, { label: string; className: string }> = {
  active: {
    label: 'Ativo',
    className: 'bg-status-active-bg text-status-active',
  },
  inactive: {
    label: 'Inativo',
    className: 'bg-status-inactive-bg text-status-inactive',
  },
  maintenance: {
    label: 'Em Manutenção',
    className: 'bg-status-maintenance-bg text-status-maintenance',
  },
  'written-off': {
    label: 'Baixado',
    className: 'bg-status-written-off-bg text-status-written-off',
  },
};

interface StatusBadgeProps {
  status: AssetStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {config.label}
    </span>
  );
}
