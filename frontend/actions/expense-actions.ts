// actions/expense-actions.ts
"use server";

import { CreateExpenseForm, EditExpenseForm } from "@/types/forms";
import { revalidatePath } from "next/cache";
import { storeExpense, updateExpense } from "@/services/expenseService";
import { expenseSchema } from "@/schemas";
import { redirect } from 'next/navigation';

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
