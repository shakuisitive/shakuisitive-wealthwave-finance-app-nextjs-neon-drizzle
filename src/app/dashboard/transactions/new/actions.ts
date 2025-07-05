"use server";

import { transactionSchema } from "@/validation/transactionSchema";
import { db } from "@/lib/db";
import { transactionsTable } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

export let createTransaction = async (data: {
  amount: number;
  transactionDate: string;
  description: string;
  categoryId: number;
}) => {
  let { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: "User is not authenticated",
    };
  }

  let validation = transactionSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message,
    };
  }

  try {
    let [transaction] = await db
      .insert(transactionsTable)
      .values({
        userId,
        amount: data.amount.toString(),
        description: data.description,
        categoryId: data.categoryId,
        transactionDate: data.transactionDate,
      })
      .returning();

    return { id: transaction.id, message: "Success" };
  } catch (e: any) {
    return {
      error: true,
      message: e.message,
    };
  }
};
