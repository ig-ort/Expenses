// src/domains/banks/types/card.ts
import { ApiResponseData, ApiResponsePaginatedData } from '@/types/shared/api';
import { BaseEntity } from '@/types/shared/base-entity';

// Tipo principal con posibles funciones utilitarias
export interface CardType extends BaseEntity {
  card_type_id: string;
  name: string;
  type: string;
  description?: string;
}


// Solo declaraciones de tipo
export type CardTypeResponse = ApiResponseData<CardType>;
export type CardTypeListResponse = ApiResponsePaginatedData<CardType[]>;
