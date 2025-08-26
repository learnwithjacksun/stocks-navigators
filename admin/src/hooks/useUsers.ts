import api from "@/config/api";
import { onError } from "@/helpers/onError";
import { toBase64 } from "@/helpers/toBase64String";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import useAuth from "./useAuth";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useUsers() {
  const { getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/user/all");
      if (response.data.success) {
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

  const makeUserAdmin = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/user/make-admin/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
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
  const removeUserAdmin = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/user/remove-admin/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const activateUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/user/activate/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const deactivateUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/user/deactivate/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/user/${userId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const updateUserBalance = async (userId: string, balance: number) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/user/update-balance/${userId}`, {
        balance,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const updateUserBonus = async (
    userId: string,
    bonus: number,
    type: string
  ) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/user/update-bonus/${userId}`, {
        bonus,
        type,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
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

  const updateUserProfile = async (data: ProfileData, avatar?: File) => {
    setIsLoading(true);
    try {
      let stringifiedAvatar;
      if (avatar) {
        stringifiedAvatar = await toBase64(avatar);
      }
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        address: data.address,
        newAvatar: stringifiedAvatar,
      };
      const response = await api.put("/user/update-profile", payload);
      if (response.data.success) {
        toast.success(response.data.message);
        await getUser();
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

  const changeUserPassword = async (data: {
    newPassword: string;
    oldPassword: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await api.put("/user/change-password", data);
      if (response.data.success) {
        toast.success(response.data.message);
        await getUser();
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

  const { data: users, isLoading: isLoadingUsers } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return {
    updateUserProfile,
    changeUserPassword,

    makeUserAdmin,
    activateUser,
    deactivateUser,
    deleteUser,
    updateUserBalance,
    updateUserBonus,
    removeUserAdmin,

    isLoading,
    users,
    isLoadingUsers,
  };
}
