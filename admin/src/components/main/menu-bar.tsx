import { navItems } from "@/constants/data";
import { LogOut, X } from "lucide-react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuBar({ isOpen, onClose }: MenuProps) {
  const { logout } = useAuth();
 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className="fixed inset-0 z-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/10 backdrop-blur"
      />
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        exit={{ opacity: 0, scaleX: 0 }}
        className="relative z-200 origin-left bg-primary flex flex-col border-r border-line h-[100dvh] w-[70%]"
      >
        <div className="h-[70px] relative flex items-center justify-between px-4 bg-[#131519]">
          <Link to="/">
            <img src="/logo.png" alt="logo" width={40} />
          </Link>

          <button onClick={onClose} className="absolute right-5 text-white">
            <X />
          </button>
        </div>

        <ul className="space-y-1 mt-4 pl-4">
        {navItems.map((item) => (
          <li key={item.label} className="text-sm">
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-primary font-medium flex items-center gap-2 px-5 py-3 rounded-l-full"
                  : "flex items-center gap-2 px-5 py-3 text-white font-medium rounded-l-full hover:bg-white/20"
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <button className="mt-auto w-full h-11 bg-red-500 text-white text-sm font-medium" onClick={logout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
      </motion.div>
    </div>
  );
}
