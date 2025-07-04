import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getRecentTransactions } from "@/data/getRecentTransactions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import numeral from "numeral";

async function RecentTransactions() {
  let transactions = await getRecentTransactions();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Recent Transactions</span>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard/transactions">View All</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/transactions/new">Create New</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!transactions?.length && (
          <p className="text-center py-10 text-lg text-muted-foreground">
            There is no transaction for this month.
          </p>
        )}

        {!!transactions?.length && (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(transaction.transactionDate, "do MMM yyyy")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className="capitalize">
                    <Badge
                      className={
                        transaction.transactionType === "income"
                          ? "bg-lime-500"
                          : "bg-orange-500"
                      }
                    >
                      {transaction.transactionType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    ${numeral(transaction.amount).format("0,0[.]00")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentTransactions;
