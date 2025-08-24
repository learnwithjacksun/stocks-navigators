import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home } from "@/pages";
import { ForgotPassword, Login, NewPassword, Register } from "./pages/auth";
import { Dashboard, Deposit, Withdraw, Payment, Profile, Trades, Transaction, NewTrade } from "./pages/main";

export default function App() {
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/trades/new" element={<NewTrade />} />
        <Route path="/transactions" element={<Transaction />} />
      </Routes>
    </>
  );
}
