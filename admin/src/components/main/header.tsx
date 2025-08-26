import { ChevronDown, Sidebar } from "lucide-react";
import ModeToggle from "../ui/mode-toggle";
import { useState } from "react";
import MenuBar from "./menu-bar";
import UserDropdown from "./user-dropdown";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks";

export default function Header() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const userName = `${user?.firstName} ${user?.lastName}`;
  const userAvatar = user?.avatar;

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 border-b border-line bg-background/80 dark:bg-secondary/80 backdrop-blur">
        <nav className="flex items-center justify-between w-full h-[70px] md:px-6 px-4">
          <div className="cursor-pointer visible md:invisible">
            <Sidebar
              className="text-main"
              size={22}
              onClick={() => setIsMenuOpen(true)}
            />
          </div>

          <div className="flex items-center gap-6">
            <ModeToggle />
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm hidden md:block">
                {userName}
              </p>
              <div className="relative">
                <div 
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <div className="h-11 w-11 rounded-full overflow-hidden">
                    <img
                      src={userAvatar}
                      alt={userName}
                    />
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-200 ${
                      isUserDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                
                <UserDropdown
                  isOpen={isUserDropdownOpen}
                  onClose={() => setIsUserDropdownOpen(false)}
                  userName={userName}
                  userAvatar={userAvatar ?? "https://ui-avatars.com/api/?background=13a870&color=fff&name=Gift+Jacksun"}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
