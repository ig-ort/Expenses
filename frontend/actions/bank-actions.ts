// actions/bank-actions.ts
"use server";

import type { Bank } from "@/types";
import { revalidatePath } from "next/cache";
import { storeBank, updateBank } from "@/services/bankService";
import { bankSchema } from "@/schemas";
import { redirect } from 'next/navigation';

export async function createBank(data: unknown) {
  // Validación en el servidor
  const validatedData = bankSchema.parse(data);

  try {

    // 2. Mapear a tipo Bank (si hay diferencias)
    const bank: Bank = {
      ...validatedData,
      // otros campos que pueda necesitar Bank
      bank_id: '', // valor temporal si es creación
    };

    await storeBank({ bank });


    // revalidatePath("/banks"); // Opcional: revalidar la ruta si es necesario
    // return { success: true, bank };

  } catch (error) {
    console.error("Error creating bank:", error);
    return { success: false, error: "Error al guardar el banco" };
  }

  revalidatePath('/apps/banks');
  redirect('/apps/banks'); // Redirigir a la lista de bancos después de crear uno nuevo
}

export async function editBank(bank_id: string ,data: unknown) {
  // Validación en el servidor
  const validatedData = bankSchema.parse(data);

  try {

    // 2. Mapear a tipo Bank (si hay diferencias)
    const bank: Bank = {
      ...validatedData,
      // otros campos que pueda necesitar Bank
      bank_id: bank_id, // valor temporal si es creación
    };

    await updateBank({ bank });


    // revalidatePath("/banks"); // Opcional: revalidar la ruta si es necesario
    // return { success: true, bank };

  } catch (error) {
    console.error("Error creating bank:", error);
    return { success: false, error: "Error al guardar el banco" };
  }

  revalidatePath('/apps/banks');
  redirect('/apps/banks'); // Redirigir a la lista de bancos después de crear uno nuevo
}