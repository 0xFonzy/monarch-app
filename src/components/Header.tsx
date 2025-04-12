import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Filter, Edit } from "lucide-react";

interface HeaderProps {
  className?: string;
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  className,
  isEditMode,
  onEditModeChange,
}) => {
  return (
    <header className={cn("h-16", className)}>
      <div className="flex h-full items-center justify-between px-2">
        <div className="flex items-center">
          <h1 className="text-lg font-normal text-foreground">Transactions</h1>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-1">
          {/* Search button */}
          <Button
            disabled
            variant="outline"
            className="h-[38px] px-3 bg-light dark:bg-[hsl(var(--black))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Button>

          {/* Filters button */}
          <Button
            disabled
            variant="outline"
            className="h-[38px] px-3 bg-light dark:bg-[hsl(var(--black))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>

          {/* Edit button */}
          <Button
            variant="outline"
            className={cn(
              "h-[38px] px-3 bg-light dark:bg-[hsl(var(--black))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--dark))] hover:text-white flex items-center gap-2",
              isEditMode && "bg-[hsl(var(--dark))] text-white"
            )}
            onClick={() => onEditModeChange(!isEditMode)}
          >
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
