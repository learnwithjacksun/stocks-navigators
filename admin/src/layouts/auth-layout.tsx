interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="bg-foreground min-h-[100dvh]">
      <div className="pt-10 w-[90%] mx-auto md:w-[480px]">
        <div>
          <img src="/logo.webp" alt="" className="w-full h-full object-contain" />
        </div>
        <div className="bg-background p-6">
          <h1 className="text-xl text-center font-bold">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
