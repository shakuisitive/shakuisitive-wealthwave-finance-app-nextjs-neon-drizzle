"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteTransaction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function DeleteTransactionDialogue({
  transactionId,
  transactionDate,
}: {
  transactionId: number;
  transactionDate: string;
}) {
  let router = useRouter();
  let handleDeleteConfirm = async () => {
    let result = await deleteTransaction(transactionId);

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
    let [year, month] = transactionDate.split("-");

    router.push(`/dashboard/transactions?month=${month}&year=${year}`);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" size="icon" variant="destructive">
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This transaction will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={handleDeleteConfirm}
            variant="destructive"
            className="cursor-pointer"
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTransactionDialogue;
