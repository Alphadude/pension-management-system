import { auth } from "@/server/auth";
import TransactionHistoryPageClient from "./components/transaction-history-page-client";

export const metadata = {
  title: "Transaction History",
};

const TransactionHistoryPage = async () => {
  const session = await auth();
  return <TransactionHistoryPageClient {...{ session }} />;
};

export default TransactionHistoryPage;
