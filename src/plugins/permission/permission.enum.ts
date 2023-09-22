export enum PermissionType {
  'READ' = 'READ',
  'CREATE' = 'CREATE',
  'UPDATE' = 'UPDATE',
  'DELETE' = 'DELETE',
}

export enum SECTION {
  'USERS' = 'USERS',
  'ROLES' = 'ROLES',
  'PERMISSIONS' = 'PERMISSIONS',
  'CATEGORIES' = 'CATEGORIES',
  'PRODUCTS' = 'PRODUCTS',
  'ORDERS' = 'ORDERS',
}

export type PERMISSION = Record<SECTION, PermissionType>;
