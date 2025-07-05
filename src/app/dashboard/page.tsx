import RecentTransactions from "./recent-transactions";

function DashboardPage() {
  return (
    <div className="max-w-screen-xl mx-auto py-5">
      <h1 className="text-4xl font-semibold pb-5">Dashboard</h1>
      <RecentTransactions />
      {/* <Link href="dashboard/transactions/new">Create A New Transaction</Link> */}
    </div>
  );
}

export default DashboardPage;
