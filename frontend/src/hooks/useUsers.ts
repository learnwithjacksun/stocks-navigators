import api from "@/config/api";
import { onError } from "@/helpers/onError";
import { toBase64 } from "@/helpers/toBase64String";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import useAuth from "./useAuth";
import { useState } from "react";

export default function useUsers() {
  const { getUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

  return {
    updateUserProfile,
    changeUserPassword,
    isLoading,
  };
}
