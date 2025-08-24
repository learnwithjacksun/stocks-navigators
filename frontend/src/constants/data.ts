import { ArrowDownRight, ChartLine, CreditCard, History, LayoutDashboard, UserCog } from "lucide-react"

export const libraries = [
    "React Router",
    "Tailwind CSS",
    "Lucide React",
    "React Hook Form",
    "React Query",
    "Zustand",
    "Axios",
    "Zod",
    "Sonner",
    "Framer Motion",
]

export const navItems = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Deposit",
        icon: CreditCard,
        href: "/deposit",
    },
    {
        label: "Withdraw",
        icon: ArrowDownRight,
        href: "/withdraw",
    },
    {
        label: "Trades",
        icon: ChartLine,
        href: "/trades",
    },
    {
        label: "Transactions",
        icon: History,
        href: "/transactions",
    },
    {
        label: "Profile",
        icon: UserCog,
        href: "/profile",
    },
]