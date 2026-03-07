export type UserRole = 'CUSTOMER' | 'ADMIN' | 'MANAGER' | 'STAFF';
export type AddressType = 'HOME' | 'WORK' | 'OTHER';

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
  type: AddressType;
}

export interface User {
  id: string;
  phone: string;
  email?: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  isBlocked: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  addresses?: Address[];
}
