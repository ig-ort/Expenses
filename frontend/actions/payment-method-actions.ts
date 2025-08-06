'use server'

import { getAllMethodPayments } from '@/services/methodPaymentService'
import { MethodPayment } from '@/types/domains/methodpayment/types/methodpayment'

export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Action para obtener todos los métodos de pago
export async function getPaymentMethodsAction(): Promise<ActionResult<MethodPayment[]>> {
  try {
    const response = await getAllMethodPayments({ 
      searchParams: { per_page: 'all' } 
    })
    
    if (response.success) {
      // Handle new Laravel API structure: { success: true, data: { current_page, data: [], total, etc. } }
      let methods: MethodPayment[] = []
      
      if (response.result && typeof response.result === 'object' && 'success' in response.result) {
        // New Laravel API response structure
        const apiResponse = response.result as any;
        
        if (apiResponse.success && apiResponse.data && typeof apiResponse.data === 'object' && Array.isArray(apiResponse.data.data)) {
          methods = apiResponse.data.data as MethodPayment[];
        } else {
          console.error('API returned success=false or invalid data structure:', apiResponse);
          return {
            success: false,
            error: apiResponse.errors || 'Error en la respuesta de la API'
          };
        }
      } else if (Array.isArray(response.result)) {
        // Fallback: Si result es directamente un array
        methods = response.result
      } else if (response.result && typeof response.result === 'object' && 'data' in response.result) {
        // Fallback: Si result tiene la estructura paginada antigua { data: [...], total, etc. }
        const paginatedResult = response.result as any
        if (Array.isArray(paginatedResult.data)) {
          methods = paginatedResult.data
        }
      } else {
        console.error('Estructura de respuesta inesperada:', response.result)
        return {
          success: false,
          error: 'Estructura de datos inesperada en la respuesta'
        }
      }
      
      // Filtrar solo los métodos activos - manejando tanto isActive como is_active
      const activeMethods = methods.filter(method => 
        method.isActive === 1 || 
        method.isActive === true || 
        method.is_active === true
      )
      
      return {
        success: true,
        data: activeMethods
      }
    } else {
      return {
        success: false,
        error: 'Error al obtener los métodos de pago'
      }
    }
  } catch (error) {
    console.error('Error en getPaymentMethodsAction:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al obtener los métodos de pago'
    }
  }
}
