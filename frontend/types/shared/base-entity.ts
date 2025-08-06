// Base entity interface para todas las entidades
export interface BaseEntity {
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}
