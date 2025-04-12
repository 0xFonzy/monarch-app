import React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flag, Clock } from "lucide-react";

interface TransactionSelectionActionsProps {
  selectedCount: number;
  onSelectAll: () => void;
  isAllSelected: boolean;
  onBackClick: () => void;
  onFlagSelected?: () => void;
  className?: string;
}

const TransactionSelectionActions: React.FC<
  TransactionSelectionActionsProps
> = ({
  selectedCount,
  onSelectAll,
  isAllSelected,
  onBackClick,
  onFlagSelected,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-2.5 px-4 bg-white dark:bg-dark",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 text-[hsl(var(--label))] hover:text-[hsl(var(--foreground))] hover:bg-transparent"
              onClick={onBackClick}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <span className="text-lg font-normal text-[hsl(var(--foreground))]">
              {selectedCount} selected
            </span>
          </div>
          <div className="h-4 w-px bg-[hsl(var(--border))]" />
          <Button
            variant="ghost"
            className="text-base font-normal text-[hsl(var(--link))] hover:bg-transparent hover:text-[hsl(var(--link))]"
            onClick={onSelectAll}
          >
            {isAllSelected ? "Deselect All" : "Select All"}
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-black dark:text-white hover:bg-transparent"
            onClick={onFlagSelected}
          >
            <Flag className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-[hsl(var(--label))] hover:text-[hsl(var(--foreground))] hover:bg-transparent opacity-50 cursor-not-allowed"
            disabled
          >
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSelectionActions;
