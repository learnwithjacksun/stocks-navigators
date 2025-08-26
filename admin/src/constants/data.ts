import { ChartLine, CreditCard, History, LayoutDashboard, UserCog, UsersRound } from "lucide-react"

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
        label: "Manage Users",
        icon: UsersRound,
        href: "/users",
    },
    {
        label: "Manage Trades",
        icon: ChartLine,
        href: "/trades",
    },
    {
        label: "Manage Transactions",
        icon: History,
        href: "/transactions",
    },
    {
        label: "Payment Methods",
        icon: CreditCard,
        href: "/payment-methods",
    },
    {
        label: "Profile",
        icon: UserCog,
        href: "/profile",
    },
]