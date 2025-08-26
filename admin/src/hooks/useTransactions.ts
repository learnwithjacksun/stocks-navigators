import api from "@/config/api";
import { onError } from "@/helpers/onError";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

export default function useTransactions() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getAllTransactions = async () => {
    try {
      const response = await api.get("/transaction/all");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<ITransaction[]>({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  const approveDeposit = async (transactionId: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/transaction/approve-or-reject", {
        transactionId,
        status: "completed"
      });
      if (response.data.success) {
        toast.success("Deposit approved successfully");
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectDeposit = async (transactionId: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/transaction/approve-or-reject", {
        transactionId,
        status: "failed"
      });
      if (response.data.success) {
        toast.success("Deposit rejected successfully");
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const approveWithdrawal = async (transactionId: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/transaction/approve-or-reject-withdrawal", {
        transactionId,
        status: "completed"
      });
      if (response.data.success) {
        toast.success("Withdrawal approved successfully");
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectWithdrawal = async (transactionId: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/transaction/approve-or-reject-withdrawal", {
        transactionId,
        status: "failed"
      });
      if (response.data.success) {
        toast.success("Withdrawal rejected successfully");
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionById = async (id: string) => {
    try {
      const response = await api.get(`/transaction/${id}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  return {
    transactions,
    isLoadingTransactions,
    approveDeposit,
    rejectDeposit,
    approveWithdrawal,
    rejectWithdrawal,
    getTransactionById,
    isLoading,
  };
}
