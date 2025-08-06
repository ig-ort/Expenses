// src/domains/banks/types/card.ts
import { ApiResponseData, ApiResponsePaginatedData } from '@/types/shared/api';
import { BaseEntity } from '@/types/shared/base-entity';

// Tipo principal con posibles funciones utilitarias
export interface Card extends BaseEntity {
  card_id: string;
  name: string;
  last_four_digits: string;
  expiration_date?: string;
  credit_limit?: string;
  cutoff_day?: string;
  payment_day?: string;
  payment_due_days?: string;
  bank_account_id: string;
  card_type_id: string;
}


// Solo declaraciones de tipo
export type CardResponse = ApiResponseData<Card>;
export type CardListResponse = ApiResponsePaginatedData<Card[]>;
