export type AssetStatus = 'active' | 'inactive' | 'maintenance' | 'written-off';

export type UserRole = 'admin' | 'manager' | 'user';

export interface Branch {
  id: string;
  code: string;
  name: string;
  address?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Sector {
  id: string;
  name: string;
  branchId: string;
}

export interface Asset {
  id: string;
  code: string;
  tag: string; // Plaqueta
  name: string;
  description?: string;
  categoryId: string;
  category?: Category;
  branchId: string;
  branch?: Branch;
  sectorId: string;
  sector?: Sector;
  acquisitionDate: string;
  accountingValue: number;
  currentValue?: number;
  status: AssetStatus;
  observations?: string;
  photos?: string[];
  documents?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Movement {
  id: string;
  assetId: string;
  fromBranchId: string;
  toBranchId: string;
  fromSectorId: string;
  toSectorId: string;
  date: string;
  reason: string;
  userId: string;
  createdAt: string;
}

export interface Maintenance {
  id: string;
  assetId: string;
  type: 'preventive' | 'corrective';
  description: string;
  cost: number;
  date: string;
  nextDate?: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  provider?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string;
  active: boolean;
  createdAt: string;
}

export interface AccessLog {
  id: string;
  userId: string;
  action: string;
  details?: string;
  ip?: string;
  timestamp: string;
}

export interface DashboardStats {
  totalAssets: number;
  activeAssets: number;
  inactiveAssets: number;
  maintenanceAssets: number;
  writtenOffAssets: number;
  totalValue: number;
  idleAssets: number;
  costBySector: { sector: string; cost: number }[];
  assetsByCategory: { category: string; count: number }[];
  assetsByBranch: { branch: string; count: number }[];
}
