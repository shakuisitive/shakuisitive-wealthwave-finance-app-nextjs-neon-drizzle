import { and, eq } from "drizzle-orm";
import { transactionsTable } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import "server-only";

export async function getTransaction(transactionId: number) {
  let { userId } = await auth();

  if (!userId) {
    return null;
  }

  let [transaction] = await db
    .select()
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.userId, userId),
        eq(transactionsTable.id, transactionId)
      )
    );

  return transaction;
}
