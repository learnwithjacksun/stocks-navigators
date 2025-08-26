import { onError } from "@/helpers/onError";
import useAuth from "./useAuth";
import api from "@/config/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { formatNumber } from "@/helpers/formatNumber";

export default function useTrades() {
  const { user, getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const createTrade = async (
    symbol: string,
    name: string,
    investmentAmount: number
  ) => {
    setIsLoading(true);
    try {
      if (!user) {
        toast.error("You must be logged in to create a trade");
        return false;
      }
      if (user?.availableBalance < investmentAmount) {
        toast.error("You do not have enough balance to create this trade");
        return false;
      }

      const response = await api.post("/trade/create", {
        symbol,
        name,
        investmentAmount,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["trades"] });
        getUser();
        return response.data.data;
      } else {
        return response.data.message;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const getTrades = async () => {
    try {
      const response = await api.get("/trade/all");
      if (response.data.success) {
        return response.data.data;
      } else {
        return response.data.message;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  const { data: trades, isLoading: isLoadingTrades } = useQuery<ITrade[]>({
    queryKey: ["trades"],
    queryFn: getTrades,
  });

  const claimProfit = async (
    tradeId: string,
    currentValue: number,
    symbol: string
  ) => {
    setIsLoading(true);
    try {
      const response = await api.post("/trade/claim-profit", {
        tradeId,
        currentValue,
      });
      if (response.data.success) {
        queryClient.invalidateQueries({ queryKey: ["trades"] });
        getUser();
        toast.success(
          `Successfully claimed a total of ${formatNumber(
            currentValue
          )} profit from ${symbol}!`
        );
        return response.data.data;
      } else {
        return response.data.message;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseTrade = async (tradeId: string) => {
    setIsUpdating(true);
    try {
      const response = await api.put(`/trade/pause/${tradeId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["trades"] });
        getUser();
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsUpdating(false);
    }
  };

  const resumeTrade = async (tradeId: string) => {
    setIsUpdating(true);
    try {
      const response = await api.put(`/trade/resume/${tradeId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["trades"] });
        getUser();
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsUpdating(false);
    }
  };
  const deleteTrade = async (tradeId: string) => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/trade/delete/${tradeId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["trades"] });
        getUser();
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsDeleting(false);
    }
  };

  // Admin functions
  const updateTradeCurrentValue = async (tradeId: string, currentValue: number) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/trade/update-current-value/${tradeId}`, { currentValue });
      if (response.data.success) {
        toast.success("Trade current value updated successfully");
        queryClient.invalidateQueries({ queryKey: ["trades"] });
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



  return {
    createTrade,
    isLoading,
    trades,
    isLoadingTrades,
    claimProfit,
    pauseTrade,
    resumeTrade,
    isUpdating,
    deleteTrade,
    isDeleting,
    updateTradeCurrentValue,

  };
}
