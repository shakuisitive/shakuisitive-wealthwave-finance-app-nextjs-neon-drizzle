import "server-only";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { transactionsTable } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getTransactionYearsRange() {
  let { userId } = await auth();

  if (!userId) {
    return [];
  }

  let [earliestTransaction] = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.userId, userId))
    .orderBy(asc(transactionsTable.transactionDate))
    .limit(1);

  let today = new Date();
  let currentYear = today.getFullYear();
  let earliestYear = earliestTransaction
    ? new Date(earliestTransaction.transactionDate).getFullYear()
    : currentYear;
  let years = Array.from({
    length: currentYear - earliestYear + 1,
  }).map((_, i) => currentYear - i);

  return years;
}
