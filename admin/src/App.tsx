import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Protector } from "@/pages";
import {
  ForgotPassword,
  Login,
  NewPassword,
  Register,
  Verify,
} from "./pages/auth";
import {
  Dashboard,
  Payment,
  Profile,
  Trades,
  Transaction,
  TransactionDetails,
  NewTrade,
  Users,
  UserDetails,
  PaymentMethods,
} from "./pages/main";
import { useAuth } from "./hooks";
import { useEffect } from "react";
import { UserTrades, UserTransactions } from "./pages/user";

export default function App() {
  const { getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route element={<Protector />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />

          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/trades/new" element={<NewTrade />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/users/:id/trades" element={<UserTrades />} />
          <Route
            path="/users/:id/transactions"
            element={<UserTransactions />}
          />
        </Route>
      </Routes>
    </>
  );
}
