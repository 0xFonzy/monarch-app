import { useState, useEffect } from "react";

export const useFlaggedTransactions = () => {
  const [flaggedTransactions, setFlaggedTransactions] = useState<Set<string>>(
    () => {
      const stored = localStorage.getItem("flaggedTransactions");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "flaggedTransactions",
      JSON.stringify([...flaggedTransactions])
    );
  }, [flaggedTransactions]);

  const toggleMultiple = (transactionIds: string[]) => {
    const newSet = new Set<string>();
    transactionIds.forEach((id) => {
      newSet.add(id);
    });
    setFlaggedTransactions(newSet);
  };

  return { flaggedTransactions, toggleMultiple };
};
