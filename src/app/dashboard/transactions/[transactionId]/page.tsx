import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/data/getCategories";

import Link from "next/link";

async function EditTransactionPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  let { transactionId } = await params;

  if (isNaN(Number(transactionId))) {
    return <div>OOps, transaction not found.</div>;
  }

  let categories = await getCategories();

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/transactions">Transactions</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Edit Transaction</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-4 max-w-screen-md">
        <CardHeader>
          <CardTitle>Edit Transaction</CardTitle>
        </CardHeader>
        <CardContent>edit transaction</CardContent>
      </Card>
    </div>
  );
}

export default EditTransactionPage;
