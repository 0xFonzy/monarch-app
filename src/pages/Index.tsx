import React, { useState } from "react";
import TransactionList from "@/components/TransactionList";
import LeftPanel from "@/components/LeftPanel";
import Header from "@/components/Header";
import TransactionActions from "@/components/TransactionActions";
import { useFlaggedTransactions } from "@/hooks/useFlaggedTransactions";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { rawTransactions } from "@/data/transactions";

const Index = () => {
  const [filter, setFilter] = useState<"all" | "flagged">("all");
  const [isEditMode, setIsEditMode] = useState(false);
  const { flaggedTransactions, toggleMultiple } = useFlaggedTransactions();

  const filteredTransactions = rawTransactions.filter((transaction) => {
    if (filter === "all") return true;
    return flaggedTransactions.has(transaction.Merchant + transaction.Date);
  });

  const handleToggleFlag = (transactionId: string | string[]) => {
    const ids = Array.isArray(transactionId) ? transactionId : [transactionId];
    toggleMultiple(ids);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-background w-full">
        <div className="flex w-full">
          <Sidebar variant="inset" collapsible="icon" className="bg-background">
            <LeftPanel />
          </Sidebar>
          <div className="flex-1 flex flex-col w-full">
            <Header isEditMode={isEditMode} onEditModeChange={setIsEditMode} />
            {!isEditMode && (
              <TransactionActions filter={filter} onFilterChange={setFilter} />
            )}
            <div className="w-full">
              <TransactionList
                transactions={filteredTransactions}
                flaggedTransactions={flaggedTransactions}
                onToggleFlag={handleToggleFlag}
                isEditMode={isEditMode}
                onEditModeChange={setIsEditMode}
              />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
