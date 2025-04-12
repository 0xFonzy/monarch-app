import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Flag, ScrollText } from "lucide-react";
import { Transaction } from "@/utils/transactionUtils";
import { formatCurrency } from "@/utils/transactionUtils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TransactionRowProps {
  transaction: Transaction;
  isFlagged: boolean;
  onToggleFlag: (transactionId: string) => void;
  getCategoryIcon: (category: string) => React.ReactElement;
  isEditMode?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  isFlagged,
  onToggleFlag,
  getCategoryIcon,
  isEditMode = false,
  isSelected = false,
  onSelect,
}) => {
  const amount = parseFloat(transaction.Amount);
  const isPositive = amount >= 0;
  const transactionId = transaction.Merchant + transaction.Date;
  const [showDialog, setShowDialog] = React.useState(false);
  const [notes, setNotes] = useState("");
  const [isHiding, setIsHiding] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isSelected && (isEditMode || notes)) {
      setIsHiding(false);
      setShouldRender(true);
    } else if (shouldRender) {
      setIsHiding(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isSelected, isEditMode, notes]);

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 bg-white dark:bg-dark"
        )}
        onClick={isEditMode ? onSelect : undefined}
      >
        <div className="flex items-center gap-3">
          {isEditMode && (
            <div
              className="relative w-8 h-8 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.();
              }}
            >
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-500 transform-gpu",
                  isSelected
                    ? "rotate-y-180 opacity-0"
                    : "rotate-y-0 opacity-100"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-full",
                    isPositive
                      ? "text-success bg-light-success"
                      : "text-purple bg-light-purple"
                  )}
                >
                  {getCategoryIcon(transaction.Category)}
                </div>
              </div>
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-500 transform-gpu",
                  isSelected
                    ? "rotate-y-0 opacity-100"
                    : "-rotate-y-180 opacity-0"
                )}
              >
                <img src="/check.svg" alt="Selected" className="h-8 w-8" />
              </div>
            </div>
          )}
          {!isEditMode && (
            <div
              className={cn(
                "p-2 rounded-full",
                isPositive
                  ? "text-success bg-light-success"
                  : "text-purple bg-light-purple"
              )}
            >
              {getCategoryIcon(transaction.Category)}
            </div>
          )}
          {isFlagged && (
            <div className="p-1 rounded-full bg-[hsl(var(--light-primary))] cursor-pointer">
              <Flag className="h-4 w-4 text-[hsl(var(--primary))] fill-[hsl(var(--primary))]" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{transaction.Merchant}</span>
            <span className="text-xs text-[hsl(var(--label))]">
              {transaction.Category}
            </span>
          </div>
          {shouldRender && (
            <div className="flex items-center gap-2 ml-4 overflow-hidden">
              <div
                className={cn(
                  "flex items-center gap-2",
                  isHiding ? "animate-hide" : "animate-reveal"
                )}
              >
                <ScrollText className="h-4 w-4 text-[hsl(var(--label))]" />
                <Input
                  disabled
                  type="text"
                  placeholder="Add notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-7 w-40 text-sm bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 placeholder:text-[hsl(var(--label))]"
                  onClick={(e) => e.stopPropagation()}
                  readOnly={!isEditMode}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {amount > 0 ? "+" : ""}
            {amount.toFixed(2)}
          </span>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark as Complete</DialogTitle>
            <DialogDescription>
              Would you like to mark this transaction as complete? This will
              remove the flag.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowDialog(false)}>Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionRow;
