import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  CreditCard,
  BarChart2,
  PanelLeft,
  PanelRight,
  Wallet,
  PieChart,
  FileText,
  Target,
  Repeat,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/use-theme";

interface LeftPanelProps {
  className?: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ className }) => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { theme } = useTheme();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Wallet, label: "Accounts", path: "/accounts" },
    { icon: CreditCard, label: "Transactions", path: "/transactions" },
    { icon: PieChart, label: "Cash Flow", path: "/cash-flow" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Target, label: "Budget", path: "/budget" },
    { icon: Repeat, label: "Recurring", path: "/recurring" },
    { icon: TrendingUp, label: "Goals", path: "/goals" },
    { icon: BarChart2, label: "Investments", path: "/investments" },
    { icon: MessageSquare, label: "Advice", path: "/advice" },
  ];

  return (
    <div className={cn("h-full flex flex-col", className)}>
      <div className="flex items-center py-1">
        {!isCollapsed && (
          <div className="flex items-center pl-2">
            <img src="/monarch-logo.svg" alt="Monarch" className="h-6" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto text-foreground hover:bg-panel"
        >
          {isCollapsed ? (
            <PanelRight className="h-4 w-4" />
          ) : (
            <PanelLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path === "/transactions";
          const isTransactions = item.path === "/transactions";

          return (
            <Link
              key={item.path}
              to={isTransactions ? item.path : "#"}
              className={cn(
                "flex items-center px-3 py-2 text-sm transition-colors rounded",
                isActive
                  ? "bg-panel text-[hsl(var(--foreground))]"
                  : "text-[#989691] hover:bg-panel hover:text-white",
                isCollapsed && "justify-center",
                !isTransactions &&
                  "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2.5">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto py-4 flex items-center gap-2">
        <ThemeToggle className="text-[hsl(var(--foreground))] hover:bg-[hsl(var(--panel))]" />
        {!isCollapsed && (
          <span className="text-sm text-[hsl(var(--label))]">
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
