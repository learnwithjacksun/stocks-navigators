import { LogOut, User, Settings } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAvatar: string;
}

export default function UserDropdown({ isOpen, onClose, userName, userAvatar }: UserDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const menuItems = [
    {
      label: "Profile",
      icon: User,
      href: "/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-64 bg-background dark:bg-secondary border border-line rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {/* User Info Section */}
          <div className="p-4 border-b border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img src={userAvatar} alt={userName} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-muted">Online</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2 text-sm text-muted hover:text-white hover:bg-foreground transition-colors"
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Logout Section */}
          <div className="border-t border-line pt-2">
            <button
              onClick={() => {
                // Handle logout logic here
                onClose();
              }}
              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-500 dark:hover:bg-red-900 transition-colors w-full"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
