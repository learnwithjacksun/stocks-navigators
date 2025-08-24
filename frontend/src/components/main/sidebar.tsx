import { navItems } from "@/constants/data";
import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-primary min-h-[100dvh] flex flex-col">
      <div className="h-[70px] overflow-hidden">
        <img
          src="/logo.webp"
          alt="logo"
          className="h-full w-full object-cover"
        />
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

      <button className="mt-auto w-full h-11 bg-red-500 text-white text-sm font-medium">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}
