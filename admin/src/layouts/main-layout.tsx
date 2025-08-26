import { Header, Sidebar } from "@/components/main";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export default function MainLayout({
  children,
  title,
  subtitle,
  showBackButton = false,
}: MainLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className="flex bg-secondary dark:bg-background min-h-[100dvh]">
      <div className="md:flex-1/5 hidden md:block">
        <Sidebar />
      </div>
      <div className="md:flex-4/5 flex-1 h-[100dvh] overflow-y-scroll hide-scrollbar pb-10">
        <Header />
        <main className="md:px-6 px-4 md:space-y-6 space-y-4">
          {title && (
            <div className="md:mt-6 mt-4">
              <h1 className="text-2xl font-semibold">{title}</h1>
              {subtitle && <p className="text-muted text-sm">{subtitle}</p>}
            </div>
          )}

          {showBackButton && (
            <div className="flex items-center gap-2 text-muted text-sm cursor-pointer" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
              <span>Back</span>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
