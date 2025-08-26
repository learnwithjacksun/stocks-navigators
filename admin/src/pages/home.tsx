import ModeToggle from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-background  min-h-[100dvh] center flex-col gap-4 main">
      <img src="/logo.webp" alt="logo" width={200} />
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="text-sm text-muted">
        Welcome to the home page of the Stocks Navigators.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="btn">Login</Link>
        <Link to="/register" className="btn">Register</Link>
      </div>
      <ModeToggle />
    </div>
  )
}
