// actions/bank-actions.ts
"use server";

import type { BankAccount } from "@/types";
import { revalidatePath } from "next/cache";
import { storeBankAccount, updateBankAccount } from "@/services/bankAccountService";
import { bankAccountSchema } from "@/schemas";
import { redirect } from 'next/navigation';

export async function createBankAccount(data: unknown) {
  // Validación en el servidor
  const validatedData = bankAccountSchema.parse(data);

  try {

    // 2. Mapear a tipo Bank (si hay diferencias)
    const bankAccount: BankAccount = {
      ...validatedData,
      // otros campos que pueda necesitar Bank
      bank_account_id: '', // valor temporal si es creación
    };

    await storeBankAccount({ bankAccount });


    // revalidatePath("/banks"); // Opcional: revalidar la ruta si es necesario
    // return { success: true, bank };

  } catch (error) {
    console.error("Error creating bank:", error);
    return { success: false, error: "Error al guardar el banco" };
  }

  revalidatePath('/apps/bank-accounts');
  redirect('/apps/bank-accounts'); // Redirigir a la lista de bancos después de crear uno nuevo
}

export async function editBankAccount(bank_account_id: string ,data: unknown) {
  // Validación en el servidor
  const validatedData = bankAccountSchema.parse(data);

  try {

    // 2. Mapear a tipo Bank (si hay diferencias)
    const bankAccount: BankAccount = {
      ...validatedData,
      // otros campos que pueda necesitar Bank
      bank_account_id: bank_account_id, // valor temporal si es creación
    };

    await updateBankAccount({ bankAccount });


    // revalidatePath("/banks"); // Opcional: revalidar la ruta si es necesario
    // return { success: true, bank };

  } catch (error) {
    console.error("Error creating bank:", error);
    return { success: false, error: "Error al guardar el banco" };
  }

  revalidatePath('/apps/bank-accounts');
  redirect('/apps/bank-accounts'); // Redirigir a la lista de bancos después de crear uno nuevo
}