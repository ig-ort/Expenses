import { ApiResponseData, ApiResponsePaginatedData } from '@/types/shared/api';
import { BaseEntity } from '@/types/shared/base-entity';

// Categorías predefinidas para gastos personales
export enum ExpenseCategory {
  FOOD = 'food',
  TRANSPORTATION = 'transportation',
  ENTERTAINMENT = 'entertainment',
  SHOPPING = 'shopping',
  HEALTH = 'health',
  EDUCATION = 'education',
  BILLS = 'bills',
  OTHER = 'other'
}

export interface Category extends BaseEntity {
  category_id: string;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  is_active: boolean;
  order?: number;
}

// Solo declaraciones de tipo
export type CategoryResponse = ApiResponseData<Category>;
export type CategoryListResponse = ApiResponsePaginatedData<Category[]>;
