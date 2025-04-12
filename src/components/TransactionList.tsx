import React, { useMemo, useCallback, useState } from "react";
import {
  Transaction,
  formatCurrency,
  formatDate,
  groupTransactionsByDate,
} from "@/utils/transactionUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CreditCard,
  DollarSign,
  Building2,
  ShoppingCart,
  Utensils,
  Plane,
  Car,
  HomeIcon,
  Film,
  Phone,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TransactionRow from "@/components/TransactionRow";
import TransactionSelectionActions from "@/components/TransactionSelectionActions";

interface TransactionListProps {
  transactions: Transaction[];
  flaggedTransactions: Set<string>;
  onToggleFlag: (transactionId: string | string[]) => void;
  isEditMode?: boolean;
  onEditModeChange?: (isEditMode: boolean) => void;
}

interface GroupedData {
  date: string;
  transactions: Transaction[];
  total: number;
}

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Entertainment & Recreation":
      return <Film className="h-4 w-4" />;
    case "Travel & Vacation":
      return <Plane className="h-4 w-4" />;
    case "Shopping":
      return <ShoppingCart className="h-4 w-4" />;
    case "Auto Payment":
    case "Auto Maintenance":
      return <Car className="h-4 w-4" />;
    case "Phone":
      return <Phone className="h-4 w-4" />;
    case "Restaurants & Bars":
      return <Utensils className="h-4 w-4" />;
    case "Home Improvement":
      return <HomeIcon className="h-4 w-4" />;
    case "Paychecks":
    case "Business Income":
      return <DollarSign className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  flaggedTransactions,
  onToggleFlag,
  isEditMode = false,
  onEditModeChange,
}) => {
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(
    new Set()
  );
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Select first transaction when entering edit mode
  React.useEffect(() => {
    if (isEditMode) {
      if (flaggedTransactions.size > 0) {
        // If there are flagged transactions, select all of them
        setSelectedTransactions(new Set(flaggedTransactions));
        setIsAllSelected(true);
      } else if (transactions.length > 0 && selectedTransactions.size === 0) {
        // If no flagged transactions, select the first one
        const firstTransaction = transactions[0];
        const firstTransactionId =
          firstTransaction.Merchant + firstTransaction.Date;
        setSelectedTransactions(new Set([firstTransactionId]));
      }
    }
  }, [isEditMode, transactions, flaggedTransactions]);

  const groupedData = useMemo<GroupedData[]>(() => {
    const grouped = groupTransactionsByDate(transactions);
    return Array.from(grouped).map(([date, dateTransactions]) => ({
      date,
      transactions: dateTransactions,
      total: dateTransactions.reduce(
        (sum, tx) => sum + parseFloat(tx.Amount),
        0
      ),
    }));
  }, [transactions]);

  const memoizedGetCategoryIcon = useCallback(getCategoryIcon, []);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedTransactions(new Set());
      setIsAllSelected(false);
    } else {
      setSelectedTransactions(
        new Set(transactions.map((tx) => tx.Merchant + tx.Date))
      );
      setIsAllSelected(true);
    }
  };

  const handleBackClick = () => {
    // Clear all selections
    setSelectedTransactions(new Set());
    setIsAllSelected(false);

    // Add delay for flip animation before exiting edit mode
    setTimeout(() => {
      // Exit edit mode if the callback is provided
      if (onEditModeChange) {
        onEditModeChange(false);
      }
    }, 500); // Match the duration of the flip animation
  };

  const handleFlagSelected = () => {
    // Get all transaction IDs from the selected transactions
    const selectedIds = Array.from(selectedTransactions);

    // Flag all selected transactions at once
    onToggleFlag(selectedIds);

    // Exit edit mode if the callback is provided
    if (onEditModeChange) {
      onEditModeChange(false);
    }
  };

  return (
    <div className="w-full">
      <ScrollArea className="h-full w-full rounded-lg bg-background shadow-sm">
        <div className="w-full">
          {isEditMode && (
            <TransactionSelectionActions
              selectedCount={selectedTransactions.size}
              onSelectAll={handleSelectAll}
              isAllSelected={isAllSelected}
              onBackClick={handleBackClick}
              onFlagSelected={handleFlagSelected}
            />
          )}
          {groupedData.map(({ date, transactions, total }) => {
            return (
              <div key={date}>
                <div className="flex items-center justify-between py-2 px-4 bg-background rounded-lg">
                  <h3 className="text-sm font-normal text-[#989691] flex items-center">
                    {formatDate(date)}
                  </h3>
                  <span className="text-sm font-normal text-[#989691] flex items-center">
                    {formatCurrency(total.toString())}
                  </span>
                </div>
                <div className="space-y-1">
                  {transactions.map((transaction, index) => {
                    const transactionId =
                      transaction.Merchant + transaction.Date;
                    const isFlagged = flaggedTransactions.has(transactionId);
                    const isSelected = selectedTransactions.has(transactionId);

                    return (
                      <TransactionRow
                        key={`${date}-${index}`}
                        transaction={transaction}
                        isFlagged={isFlagged}
                        onToggleFlag={onToggleFlag}
                        getCategoryIcon={memoizedGetCategoryIcon}
                        isEditMode={isEditMode}
                        isSelected={isSelected}
                        onSelect={() => {
                          const newSelected = new Set(selectedTransactions);
                          if (isSelected) {
                            newSelected.delete(transactionId);
                          } else {
                            newSelected.add(transactionId);
                          }
                          setSelectedTransactions(newSelected);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TransactionList;
