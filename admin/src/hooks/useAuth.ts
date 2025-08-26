import { useAuthStore } from "@/store";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";
import type { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { onError } from "@/helpers/onError";

const useAuth = () => {
  const { user, token, setUser, setToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const [isCheckAuth, setIsCheckAuth] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (data: RegisterSchema) => {
    setIsLoading(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        country: data.country,
      };
      const response = await api.post("/auth/register", payload);
      if (response.data.success) {
        toast.success(response.data.message);
        setUser(response.data.data);
        setToken(response.data.token);
        navigate(`/verify?email=${data.email}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/verify", {
        otp,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resentOtp = async (email: string) => {
    setIsResendLoading(true);
    try {
      const response = await api.post("/auth/resend", { email });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsResendLoading(false);
    }
  };

  const login = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/admin-login", {
        email: data.email,
        password: data.password,
      });
      if (response.data.success) {
        setUser(response.data.data);
        setToken(response.data.token);
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", { email });
      if (response.data.success) {
        toast.success(response.data.message);
        return true
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: { password: string; userId: string }) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/reset-password", data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const getUser = useCallback(async () => {
    setIsCheckAuth(true);
    try {
      const response = await api.get("/auth/check");
      if (response.data.success) {
        setUser(response.data.data);
        setToken(response.data.token);
      } else {
        setUser(null);
        setToken(null);
        toast.error(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      setUser(null);
      setToken(null);
      console.error(error);
    } finally {
      setIsCheckAuth(false);
    }
  }, [setUser, setToken, navigate]);

  return {
    user,
    token,
    isLoading,
    login,
    logout,
    getUser,
    registerUser,
    verifyOtp,
    resentOtp,
    isResendLoading,
    isCheckAuth,
    forgotPassword,
    resetPassword,
  };
};

export default useAuth;
