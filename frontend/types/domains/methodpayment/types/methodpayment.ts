import { ApiResponseData, ApiResponsePaginatedData } from '@/types/shared/api';
import { BaseEntity } from '@/types/shared/base-entity';

// Métodos de pago simplificados para gastos personales
export enum PaymentMethodType {
  CASH = 'cash',
  DEBIT_CARD = 'debit_card',
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  DIGITAL_WALLET = 'digital_wallet',
  OTHER = 'other'
}

export interface MethodPayment extends BaseEntity {
  method_payment_id: string;
  name: string;
  type: PaymentMethodType;
  description?: string;
  is_active: boolean;
  icon?: string;
  color?: string;
  order?: number;
}


// Solo declaraciones de tipo
export type MethodPaymentResponse = ApiResponseData<MethodPayment>;
export type MethodPaymentListResponse = ApiResponsePaginatedData<MethodPayment[]>;

export interface CreateMethodPaymentDto {
  name: string;
  type: PaymentMethodType;
  description?: string;
  icon?: string;
  color?: string;
}