// actions/bank-actions.ts
"use server";

import type { Card } from "@/types";
import { revalidatePath } from "next/cache";
import { storeCard, updateCard } from "@/services/cardService";
import { cardSchema } from "@/schemas";
import { redirect } from 'next/navigation';

export async function createCard(data: unknown) {
  // Validación en el servidor
  const validatedData = cardSchema.parse(data);

  try {

    // 2. Mapear a tipo Card (si hay diferencias)
    const card: Card = {
      ...validatedData,
      // otros campos que pueda necesitar Card
      card_id: '', // valor temporal si es creación
    };

    await storeCard({ card });

  } catch (error) {
    console.error("Error creating card:", error);
    return { success: false, error: "Error al guardar tarjeta" };
  }

  revalidatePath('/apps/cards');
  redirect('/apps/cards'); // Redirigir a la lista de bancos después de crear uno nuevo
}

export async function editCard(card_id: string, data: unknown) {
  // Validación en el servidor
  const validatedData = cardSchema.parse(data);

  try {

    // 2. Mapear a tipo Card (si hay diferencias)
    const card: Card = {
      ...validatedData,
      // otros campos que pueda necesitar Card
      card_id: card_id, // valor temporal si es creación
    };

    await updateCard({ card });

  } catch (error) {
    console.error("Error creating card:", error);
    return { success: false, error: "Error al guardar el banco" };
  }

  revalidatePath('/apps/cards');
  redirect('/apps/cards'); // Redirigir a la lista de bancos después de crear uno nuevo
}