// actions/expense-actions.ts
"use server";

import { CreateExpenseForm, EditExpenseForm } from "@/types/forms";
import { Expense } from '@/types/domains/expenses/types/expense'
import { revalidatePath } from "next/cache";
import { storeExpense, updateExpense, getAllExpenses, deleteExpense } from "@/services/expenseService";
import { expenseSchema } from "@/schemas";
import { redirect } from 'next/navigation';

export interface ActionResult<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Action mejorada para crear gastos con mejor manejo de respuestas
export async function createExpenseAction(data: CreateExpenseForm): Promise<ActionResult<Expense>> {
  try {
    // Validar datos con el schema si existe
    // const validatedData = expenseSchema.parse(data);
    
    const response = await storeExpense({ expenseForm: data });

    if (response.success) {
      // Handle new Laravel API structure: { success: true, data: expense_object, message: string }
      let expense: Expense | null = null;
      
      if (response.result && typeof response.result === 'object' && 'success' in response.result) {
        // New Laravel API response structure
        const apiResponse = response.result as any;
        
        if (apiResponse.success && apiResponse.data) {
          expense = apiResponse.data as Expense;
        } else {
          return {
            success: false,
            error: apiResponse.errors || 'Error en la respuesta de la API'
          };
        }
      } else {
        // Fallback: if result is directly the expense object
        expense = response.result as Expense;
      }
      
      // Revalidar la página del dashboard para mostrar los nuevos datos
      revalidatePath('/dashboard')
      
      return {
        success: true,
        data: expense || undefined,
        message: 'Gasto creado exitosamente'
      }
    } else {
      return {
        success: false,
        error: 'Error al crear el gasto en la API'
      }
    }
  } catch (error) {
    console.error("Error creating expense:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Error al guardar Gasto" 
    };
  }
}

// Action para obtener gastos
export async function getExpensesAction(searchParams?: any): Promise<ActionResult<Expense[]>> {
  try {
    const response = await getAllExpenses({ searchParams: searchParams || {} })
    
    if (response.success) {
      // Handle new Laravel API structure: { success: true, data: { current_page, data: [], total, etc. } }
      let expenses: Expense[] = []
      
      if (response.result && typeof response.result === 'object' && 'success' in response.result) {
        // New Laravel API response structure
        const apiResponse = response.result as any;
        
        if (apiResponse.success && apiResponse.data && typeof apiResponse.data === 'object' && Array.isArray(apiResponse.data.data)) {
          expenses = apiResponse.data.data as Expense[];
        } else {
          console.error('API returned success=false or invalid data structure:', apiResponse);
          return {
            success: false,
            error: apiResponse.errors || 'Error en la respuesta de la API'
          };
        }
      } else if (Array.isArray(response.result)) {
        // Fallback: Si result es directamente un array (compatibilidad)
        expenses = response.result
      } else if (response.result && typeof response.result === 'object' && 'data' in response.result) {
        // Fallback: Si result tiene la estructura paginada antigua { data: [...], total, etc. }
        const paginatedResult = response.result as any
        if (Array.isArray(paginatedResult.data)) {
          expenses = paginatedResult.data
        }
      } else {
        console.error('Estructura de respuesta inesperada:', response.result)
        return {
          success: false,
          error: 'Estructura de datos inesperada en la respuesta'
        }
      }
      
      return {
        success: true,
        data: expenses
      }
    } else {
      return {
        success: false,
        error: 'Error al obtener los gastos'
      }
    }
  } catch (error) {
    console.error('Error en getExpensesAction:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al obtener los gastos'
    }
  }
}

// Action para eliminar gasto
export async function deleteExpenseAction(expenseId: string): Promise<ActionResult> {
  try {
    const response = await deleteExpense(expenseId)
    
    if (response.success) {
      // Handle new Laravel API structure: { success: true, message: string }
      let message = 'Gasto eliminado exitosamente';
      
      if (response.result && typeof response.result === 'object' && 'success' in response.result) {
        // New Laravel API response structure
        const apiResponse = response.result as any;
        
        if (apiResponse.success) {
          message = apiResponse.message || message;
        } else {
          return {
            success: false,
            error: apiResponse.errors || 'Error en la respuesta de la API'
          };
        }
      }
      
      // Revalidar la página del dashboard para mostrar los datos actualizados
      revalidatePath('/dashboard')
      
      return {
        success: true,
        message: message
      }
    } else {
      return {
        success: false,
        error: 'Error al eliminar el gasto'
      }
    }
  } catch (error) {
    console.error('Error en deleteExpenseAction:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al eliminar el gasto'
    }
  }
}

// Mantener las funciones originales para compatibilidad
export async function createExpense(data: unknown) {
  // Validación en el servidor
  const validatedData = expenseSchema.parse(data);

  try {
    // 2. Mapear a tipo CreateExpenseForm
    const expenseForm = validatedData as CreateExpenseForm;

    await storeExpense({ expenseForm });

  } catch (error) {
    console.error("Error creating expense:", error);
    return { success: false, error: "Error al guardar Gasto" };
  }

  revalidatePath('/apps/expenses');
  redirect('/apps/expenses');
}

export async function editExpense(expense_id: string, data: unknown) {
  // Validación en el servidor
  const validatedData = expenseSchema.parse(data);

  try {
    // 2. Mapear a tipo EditExpenseForm
    const expenseForm = {
      ...(validatedData as CreateExpenseForm),
      expense_id: expense_id,
    } as EditExpenseForm;

    await updateExpense({ expenseForm });

  } catch (error) {
    console.error("Error updating expense:", error);
    return { success: false, error: "Error al actualizar el Gasto" };
  }

  revalidatePath('/apps/expenses');
  redirect('/apps/expenses');
}
