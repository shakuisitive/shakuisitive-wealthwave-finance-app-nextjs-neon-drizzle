"use client";

import { z } from "zod";
import TransactionForm, {
  transactionFormSchema,
} from "@/components/common/transaction-form";
import { type Category } from "@/types/Category";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createTransaction } from "../new/actions";
import { updateTransaction } from "./actions";

function EditTransactionForm({
  categories,
  transaction,
}: {
  categories: Category[];
  transaction: {
    id: number;
    description: string;
    amount: string;
    transactionDate: string;
    categoryId: number;
  };
}) {
  let router = useRouter();

  let handleSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    let result = await updateTransaction({
      id: transaction.id,
      description: data.description,
      transactionDate: format(data.transactionDate, "yyyy-MM-dd"),
      amount: data.amount,
      categoryId: data.categoryId,
    });

    if (result?.error) {
      toast("Failed to insert the data.", {
        description: result.message,
        style: {
          backgroundColor: "#f03e3e", // red-500
          color: "white",
        },
        action: {
          label: "Understood",
          onClick: () => console.log("Undo"),
        },
      });

      return;
    }

    toast(result?.message, {
      style: {
        backgroundColor: "#37b24d", // red-500
        color: "white",
      },
      action: {
        label: "Understood",
        onClick: () => console.log("Undo"),
      },
    });

    router.push(
      `/dashboard/transactions/?month=${
        data.transactionDate.getMonth() + 1
      }&year=${data.transactionDate.getFullYear()}`
    );
  };

  return (
    <TransactionForm
      defaultValues={{
        amount: Number(transaction.amount),
        categoryId: transaction.categoryId,
        description: transaction.description,
        transactionDate: new Date(transaction.transactionDate),
        transactionType:
          categories.find((category) => category.id === transaction.categoryId)
            ?.type ?? "income",
      }}
      onSubmit={handleSubmit}
      categories={categories}
    />
  );
}

export default EditTransactionForm;
