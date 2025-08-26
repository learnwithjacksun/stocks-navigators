import { useState } from "react";
import { useUsers } from "@/hooks";
import { MainLayout } from "@/layouts";
import { UserCard } from "@/components/ui";
import {
  Search,
  Filter,
  CheckCircle,
  Crown,
  UsersRound,
  XCircle,
} from "lucide-react";

export default function Users() {
  const { users: usersData, isLoadingUsers } = useUsers();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [adminFilter, setAdminFilter] = useState<"all" | "admin" | "user">(
    "all"
  );

  const filteredUsers = usersData?.filter((user) => {
    const searchMatch =
      searchTerm === "" ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    const adminMatch =
      adminFilter === "all" ||
      (adminFilter === "admin" && user.isAdmin) ||
      (adminFilter === "user" && !user.isAdmin);

    return searchMatch && statusMatch && adminMatch;
  });

  // Calculate stats
  const totalUsers = usersData?.length ?? 0;
  const activeUsers = usersData?.filter((u) => u.isActive).length ?? 0;
  const inactiveUsers = usersData?.filter((u) => !u.isActive).length ?? 0;
  const adminUsers = usersData?.filter((u) => u.isAdmin).length ?? 0;

  return (
    <MainLayout
      title="User Management"
      subtitle="Manage users and their activities"
    >
      <div className="mt-10 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <UsersRound className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Users
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isLoadingUsers ? (
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                  ) : (
                    totalUsers
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Active Users
                </div>
                <div className="text-xl font-semibold text-green-600">
                  {isLoadingUsers ? (
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                  ) : (
                    activeUsers
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Inactive Users
                </div>
                <div className="text-xl font-semibold text-green-600">
                  {isLoadingUsers ? (
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                  ) : (
                    inactiveUsers
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Crown className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Admin Users
                </div>
                <div className="text-xl font-semibold text-yellow-600">
                  {isLoadingUsers ? (
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                  ) : (
                    adminUsers
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <div className="flex flex-wrap lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 min-w-sm max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex md:items-center flex-wrap gap-3">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as typeof statusFilter)
                }
                className="px-3 py-2 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Admin Filter */}
              <select
                value={adminFilter}
                onChange={(e) =>
                  setAdminFilter(e.target.value as typeof adminFilter)
                }
                className="px-3 py-2 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-main"
              >
                <option value="all">All Users</option>
                <option value="admin">Admins</option>
                <option value="user">Regular Users</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filtered Results Summary */}
        {filteredUsers && filteredUsers.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Showing {filteredUsers.length} of {usersData?.length} users
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoadingUsers && (
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-background dark:bg-secondary rounded-lg border border-line p-6 animate-pulse"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-200 dark:bg-gray-700 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users Grid */}
        {!isLoadingUsers && (
          <>
            {filteredUsers && filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No users found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setAdminFilter("all");
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}
