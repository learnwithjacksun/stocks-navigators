import api from "@/config/api";
import { onError } from "@/helpers/onError";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";

interface PaymentMethod {
  id: string;
  currency: string;
  network: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export default function usePaymentMethods() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getPaymentMethods = async () => {
    try {
      const response = await api.get("/payment-method");
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

  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useQuery<PaymentMethod[]>({
    queryKey: ["paymentMethods"],
    queryFn: getPaymentMethods,
  });

  const createPaymentMethod = async (data: { currency: string; network: string; address: string }) => {
    setIsLoading(true);
    try {
      const response = await api.post("/payment-method", data);
      if (response.data.success) {
        toast.success("Payment method created successfully");
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
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

  const updatePaymentMethod = async (id: string, data: { currency: string; network: string; address: string }) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/payment-method/${id}`, data);
      if (response.data.success) {
        toast.success("Payment method updated successfully");
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
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

  const deletePaymentMethod = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/payment-method/${id}`);
      if (response.data.success) {
        toast.success("Payment method deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["paymentMethods"] });
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
    paymentMethods,
    isLoadingPaymentMethods,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    isLoading,
  };
}
