import api from "@/config/api";
import { onError } from "@/helpers/onError";
import { toBase64 } from "@/helpers/toBase64String";
import { AxiosError } from "axios";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useTransaction() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deposit = async (amount: number, method: string, receipt: File) => {
    setIsLoading(true);
    const receiptToBase64 = await toBase64(receipt);

    try {
      const payload = {
        amount,
        method,
        receipt: receiptToBase64,
      };

      const response = await api.post("/transaction/deposit", payload);

      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        navigate("/dashboard");
        return response.data.data;
      } else {
        return []
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const withdraw = async (amount: number, method: string, address: string) => {
    setIsLoading(true);
    try {
      const payload = {
        amount,
        method,
        recipient: address,
      };
      const response = await api.post("/transaction/withdraw", payload);
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        return true;
      } else {
        return response.data.message;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  }

  const getUserTransactions = async () => {
    try {
      const response = await api.get("/transaction/user");
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<ITransaction[]>({
    queryKey: ["transactions"],
    queryFn: getUserTransactions,
    enabled: !!user,
  });

  const totalTransactions = transactions?.length ?? 0;
  const totalInflow = transactions?.filter(t => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0) ?? 0;
  const totalOutflow = transactions?.filter(t => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0) ?? 0;
  const totalProfit = transactions?.filter(t => t.type === "profit_claim").reduce((sum, t) => sum + t.amount, 0) ?? 0;
  const totalSuccessfulDeposits = transactions?.filter(t => t.type === "deposit" && t.status === "completed").length ?? 0;
  const totalSuccessfulWithdrawals = transactions?.filter(t => t.type === "withdrawal" && t.status === "completed").length ?? 0;

  return {
    deposit,
    withdraw,
    transactions,
    isLoadingTransactions,
    isLoading,
    totalTransactions,
    totalInflow,
    totalOutflow,
    totalProfit,
    totalSuccessfulDeposits,
    totalSuccessfulWithdrawals,
  };
}
