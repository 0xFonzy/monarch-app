import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Flag } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TransactionActionsProps {
  className?: string;
  filter: "all" | "flagged";
  onFilterChange: (filter: "all" | "flagged") => void;
}

const TransactionActions: React.FC<TransactionActionsProps> = ({
  className,
  filter,
  onFilterChange,
}) => {
  const [sortBy, setSortBy] = useState<string>("Date (Newest)");

  return (
    <div
      className={`flex justify-between items-center gap-2.5 py-2.5 px-2 bg-white dark:bg-dark ${className}`}
    >
      <Tabs
        defaultValue={filter}
        className="w-[400px]"
        onValueChange={(value) => onFilterChange(value as "all" | "flagged")}
      >
        <TabsList className="grid w-full grid-cols-2 bg-light dark:bg-[hsl(var(--black))] p-0 h-[38px] border border-[hsl(var(--border))] rounded-md overflow-hidden">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-panel data-[state=active]:text-[hsl(var(--foreground))] text-[hsl(var(--label))] rounded-none h-full px-4 border-r border-[hsl(var(--border))]"
          >
            All Transactions
          </TabsTrigger>
          <TabsTrigger
            value="flagged"
            className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-panel data-[state=active]:text-[hsl(var(--foreground))] text-[hsl(var(--label))] rounded-none h-full px-4"
          >
            <Flag className="h-4 w-4" />
            Requires Action
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled
            variant="outline"
            className="h-[38px] bg-light dark:bg-[hsl(var(--black))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white"
          >
            <span className="mr-2.5">Sort</span>
            <ChevronDown className="h-4 w-4 text-[hsl(var(--label))]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-light dark:bg-[hsl(var(--black))] border border-[hsl(var(--border))]"
        >
          <DropdownMenuItem
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white cursor-pointer"
            onClick={() => setSortBy("Date (Newest)")}
          >
            Date (Newest)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white cursor-pointer"
            onClick={() => setSortBy("Date (Oldest)")}
          >
            Date (Oldest)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white cursor-pointer"
            onClick={() => setSortBy("Amount (Highest)")}
          >
            Amount (Highest)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white cursor-pointer"
            onClick={() => setSortBy("Amount (Lowest)")}
          >
            Amount (Lowest)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white cursor-pointer"
            onClick={() => setSortBy("Merchant (A-Z)")}
          >
            Merchant (A-Z)
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white cursor-pointer"
            onClick={() => setSortBy("Merchant (Z-A)")}
          >
            Merchant (Z-A)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TransactionActions;
