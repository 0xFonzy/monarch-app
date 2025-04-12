import { format } from "date-fns";

export interface Transaction {
  Date: string;
  Merchant: string;
  Category: string;
  Account: string;
  Amount: string;
}

export const formatCurrency = (amount: string) => {
  const numAmount = parseFloat(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numAmount);
};

export const formatDate = (date: string) => {
  return format(new Date(date), "MMM dd, yyyy");
};

export const groupTransactionsByDate = (transactions: Transaction[]) => {
  const groups = transactions.reduce((acc, transaction) => {
    const date = transaction.Date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return Object.entries(groups).sort(([dateA], [dateB]) => {
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
};
