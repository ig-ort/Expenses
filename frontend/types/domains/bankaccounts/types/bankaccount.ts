// src/domains/banks/types/bank.ts
import { ApiResponseData, ApiResponsePaginatedData } from '@/types/shared/api';
import { BaseEntity } from '@/types/shared/base-entity';

// Tipo principal con posibles funciones utilitarias
export interface BankAccount extends BaseEntity {
  bank_account_id: string;
  name: string;
  code: string;
  clabe?: string;
  account_number?: string;
  bank_id?: string;
  description?: string;
}


// Solo declaraciones de tipo
export type BankAccountResponse = ApiResponseData<BankAccount>;
export type BankAccountListResponse = ApiResponsePaginatedData<BankAccount[]>;
