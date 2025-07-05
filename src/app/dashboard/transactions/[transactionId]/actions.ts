"use server";
import { eq, and } from "drizzle-orm";
import { transactionsTable } from "@/lib/db/schema";
import { db } from "@/seed";

import { transactionSchema } from "@/validation/transactionSchema";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

let updateTransactionSchema = transactionSchema.and(
  z.object({
    id: z.number(),
  })
);

export async function updateTransaction(data: {
  id: number;
  transactionDate: string;
  description: string;
  amount: number;
  categoryId: number;
}) {
  let { userId } = await auth();

  if (!userId) {
    return {
      error: true,
      message: "Unauthorized",
    };
  }

  let validation = updateTransactionSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0].message,
    };
  }
  await db
    .update(transactionsTable)
    .set({
      description: data.description,
      amount: data.amount.toString(),
      transactionDate: data.transactionDate,
      categoryId: data.categoryId,
    })
    .where(
      and(
        eq(transactionsTable.id, data.id),
        eq(transactionsTable.userId, userId)
      )
    );
}
