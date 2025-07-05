import "server-only";
import { transactionsTable, categoriesTable } from "@/lib/db/schema";
import { db } from "@/seed";
import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";

export async function getRecentTransactions() {
  let { userId } = await auth();
  if (!userId) {
    return [];
  }

  let recentTransactions = await db
    .select({
      id: transactionsTable.id,
      description: transactionsTable.description,
      amount: transactionsTable.amount,
      transactionDate: transactionsTable.transactionDate,
      category: categoriesTable.name,
      transactionType: categoriesTable.type,
    })
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(desc(transactionsTable.transactionDate))
    .limit(5)
    .leftJoin(
      categoriesTable,
      eq(transactionsTable.categoryId, categoriesTable.id)
    );

  return recentTransactions;
}
