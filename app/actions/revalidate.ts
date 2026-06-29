"use server";

import { revalidatePath } from "next/cache";

export async function revalidateEvents() {
  revalidatePath("/events");
}

export async function revalidateGiftCards() {
  revalidatePath("/gift-cards");
}
