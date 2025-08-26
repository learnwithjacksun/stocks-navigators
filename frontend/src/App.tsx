import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home, Protector } from "@/pages";
import { ForgotPassword, Login, NewPassword, Register, Verify } from "./pages/auth";
import {
  Dashboard,
  Deposit,
  Withdraw,
  Payment,
  Profile,
  Trades,
  Transaction,
  TransactionDetails,
  NewTrade,
} from "./pages/main";
import { useAuth } from "./hooks";
import { useEffect } from "react";

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route element={<Protector />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/trades/new" element={<NewTrade />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
        </Route>
      </Routes>
    </>
  );
}
