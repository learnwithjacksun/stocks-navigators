import { useAuth } from "@/hooks";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const Protector = () => {
  const { isCheckAuth, user } = useAuth();
  if (isCheckAuth) {
    return (
      <>
        <div className="center h-[100dvh]">
          <div className="flex items-center gap-2">
            <Loader2 className="w-10 h-10 animate-spin" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return !isCheckAuth && user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protector;
