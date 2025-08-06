// src/domains/banks/types/bank.ts
import { ApiResponseData, ApiResponsePaginatedData } from '@/types/shared/api';
import { BaseEntity } from '@/types/shared/base-entity';

// Tipo principal con posibles funciones utilitarias
export interface Bank extends BaseEntity {
  bank_id: string;
  name: string;
  code: string;
  description?: string;
}


// Solo declaraciones de tipo
export type BankResponse = ApiResponseData<Bank>;
export type BankListResponse = ApiResponsePaginatedData<Bank[]>;

export interface CreateBankDto {
  name: string;
  code: string;
}