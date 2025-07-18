import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/data/getCategories";
import { getTransaction } from "@/data/getTransaction";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteTransactionDialogue from "./delete-transaction-dialog";
import EditTransactionForm from "./edit-transaction-form";

async function EditTransactionPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  let { transactionId } = await params;

  if (isNaN(Number(transactionId))) {
    notFound();
  }

  let categories = await getCategories();
  let transaction = await getTransaction(Number(transactionId));

  if (!transaction) {
    notFound();
  }

  return (
    <Card className="mt-4 max-w-screen-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Edit Transaction</CardTitle>
        <DeleteTransactionDialogue
          transactionId={transaction.id}
          transactionDate={transaction.transactionDate}
        />
      </CardHeader>
      <CardContent>
        <EditTransactionForm
          transaction={transaction}
          categories={categories}
        />
      </CardContent>
    </Card>
  );
}

export default EditTransactionPage;
