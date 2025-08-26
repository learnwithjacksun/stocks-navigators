import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  ArrowLeft,
  User,
  DollarSign,
  Gift,
  TrendingUp,
  Shield,
  ShieldOff,
  Crown,
  Trash2,
  Calendar,
  CheckCircle,
  XCircle,
  Wallet,
} from "lucide-react";
import { formatNumber } from "@/helpers/formatNumber";
import { dateFormatter } from "@/helpers/dateFormatter";
import { useTrades, useUsers } from "@/hooks";
import { toast } from "sonner";
import useTransactions from "@/hooks/useTransactions";
import { ButtonWithLoader } from "@/components/ui";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    users,
    isLoadingUsers,
    makeUserAdmin,
    activateUser,
    deactivateUser,
    deleteUser,
    updateUserBalance,
    updateUserBonus,
    removeUserAdmin,

    isLoading,
  } = useUsers();
  const { trades } = useTrades();
  const { transactions } = useTransactions();

  const user = users?.find((u) => u.id === id);
  const userTrades = trades?.filter((t) => t.user.id === id);
  const userTransactions = transactions?.filter((t) => t.user.id === id);

  const [newBalance, setNewBalance] = useState(user?.availableBalance || 0);
  const [newBonus, setNewBonus] = useState(user?.bonus || 0);
  const [bonusType, setBonusType] = useState("add");
  const handleMakeAdmin = async () => { 
    if (!user) return;
    await makeUserAdmin(user.id);
  };
  const handleRemoveAdmin = async () => { 
    if (!user) return;
    await removeUserAdmin(user.id);
  };

  const handleActivate = async () => {
    if (!user) return;
    await activateUser(user.id);
  };

  const handleDeactivate = async () => {
    if (!user) return;
    await deactivateUser(user.id);
  };

  const handleDelete = async () => {
    if (!user) return;
    if (
      confirm(
        `Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`
      )
    ) {
      await deleteUser(user.id);
      
    }
  };

  const handleUpdateBalance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (newBalance <= 0) {
      toast.error("Balance must be greater than 0");
      return;
    }
    await updateUserBalance(user.id, newBalance);
    toast.success("Balance updated successfully");
  };

  const handleUpdateBonus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    if (newBonus <= 0) {
      toast.error("Bonus must be greater than 0");
      return;
    }
    await updateUserBonus(user.id, newBonus, bonusType);
  };

  if (isLoadingUsers) {
    return (
      <MainLayout title="User Details" subtitle="Loading user details...">
        <div className="mt-10 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted">Loading user details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout title="User Details" subtitle="User not found">
        <div className="mt-10 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              User not found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The user you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/users"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Calculate stats
  const totalTrades = userTrades?.length ?? 0;
  const activeTrades =
    userTrades?.filter((t) => t.status === "running").length ?? 0;
  const completedTrades =
    userTrades?.filter((t) => t.status === "completed").length ?? 0;
  const totalTransactions = userTransactions?.length ?? 0;
  const pendingTransactions =
    userTransactions?.filter((t) => t.status === "pending").length ?? 0;

  return (
    <MainLayout
      title={`${user.firstName} ${user.lastName}`}
      subtitle={`${user.email}`}
    >
      <div className="mt-10 space-y-6">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <Link
            to="/users"
            className="inline-flex items-center text-sm text-muted hover:text-main transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Link>
        </div>

        {/* User Header */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-primary" />
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  {user.isAdmin && (
                    <div className="flex items-center gap-1">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-muted">Admin</span>
                    </div>
                  )}
                  {user.isActive ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-muted">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm text-muted">Inactive</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {!user.isAdmin ? (
                <button
                  onClick={handleMakeAdmin}
                  disabled={isLoading}
                  className="flex items-center space-x-2 text-sm px-3 h-9 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-md hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors disabled:opacity-50"
                >
                  <Crown className="w-4 h-4" />
                  <span>Make Admin</span>
                </button>
              ) : (
                <button
                  onClick={handleRemoveAdmin}
                  disabled={isLoading}
                  className="flex items-center space-x-2 text-sm px-3 h-9 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <ShieldOff className="w-4 h-4" />
                  <span>Remove Admin</span>
                </button>
              )}

              {user.isActive ? (
                <button
                  onClick={handleDeactivate}
                  disabled={isLoading}
                  className="flex items-center space-x-2 text-sm px-3 h-9 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
                >
                  <ShieldOff className="w-4 h-4" />
                  <span>Deactivate</span>
                </button>
              ) : (
                <button
                  onClick={handleActivate}
                  disabled={isLoading}
                  className="flex items-center space-x-2 text-sm px-3 h-9 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50"
                >
                  <Shield className="w-4 h-4" />
                  <span>Activate</span>
                </button>
              )}

              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="flex items-center space-x-2 text-sm px-3 h-9 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete User</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex space-x-4">
              <div className="h-9 w-9 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center justify-center">
                <Wallet size={20} className=" text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Available Balance</p>
                <h3 className="text-lg font-bold text-blue-600">
                  ${formatNumber(user.availableBalance)}
                </h3>
              </div>
            </div>
            <form onSubmit={handleUpdateBalance} className="mt-4">
              <input
                type="text"
                placeholder="Amount"
                value={newBalance}
                onChange={(e) => setNewBalance(Number(e.target.value))}
                className="border border-line rounded-md p-2 w-full h-9 text-sm"
              />
              <ButtonWithLoader
                initialText="Update Balance"
                loadingText="Updating..."
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white w-full text-sm h-9 font-medium rounded-md mt-2"
              />
            </form>
          </div>
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="flex space-x-4">
              <div className="h-9 w-9 bg-green-50 dark:bg-green-900/20 rounded-md flex items-center justify-center">
                <Gift size={20} className=" text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted">Bonus</p>
                <h3 className="text-lg font-bold text-green-600">
                  ${formatNumber(user.bonus)}
                </h3>
              </div>
            </div>
            <form onSubmit={handleUpdateBonus} className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Amount"
                    value={newBonus}
                    onChange={(e) => setNewBonus(Number(e.target.value))}
                    className="border border-line rounded-md p-2 w-full h-9 text-sm"
                  />
                  <select name="type" id="type" value={bonusType} onChange={(e) => setBonusType(e.target.value)} className="border border-line rounded-md p-2 w-full h-9 text-sm">
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                  </select>
              </div>
              <ButtonWithLoader
                initialText="Update Bonus"
                loadingText="Updating..."
                type="submit"
                disabled={isLoading}
                className="bg-green-600 text-white w-full text-sm h-9 font-medium rounded-md mt-2"
              />
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="text-center">
              <TrendingUp size={20} className=" text-purple-600 mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-bold text-purple-600">
                {totalTrades}
              </div>
              <div className="text-sm text-muted">Total Trades</div>
            </div>
          </div>

          <div className="bg-background dark:bg-secondary rounded-lg border border-line p-4">
            <div className="text-center">
              <Calendar size={20} className=" text-orange-600 mx-auto mb-2" />
              <div className="text-xl md:text-2xl font-bold text-orange-600">
                {totalTransactions}
              </div>
              <div className="text-sm text-muted">Total Transactions</div>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
              <h2 className="text-lg font-semibold text-main mb-4 flex items-center md:text-base">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h2>
              <div className="space-y-4 md:text-sm text-xs">
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Full Name</span>
                  <span className="font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Email</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Phone</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Country</span>
                  <span className="font-medium">{user.country}</span>
                </div>
                {user.city && (
                  <div className="flex justify-between items-center py-2 border-b border-line">
                    <span className="text-muted">City</span>
                    <span className="font-medium">{user.city}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted">Address</span>
                    <span className="font-medium">{user.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Account Information */}
            <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
              <h2 className="text-lg font-semibold text-main mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Account Information
              </h2>
              <div className="space-y-4 text-sm md:text-base">
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">User ID</span>
                  <span className="font-mono text-sm text-ellipsis overflow-hidden">
                    {user.id.slice(0, 10)}...
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Status</span>
                  <span
                    className={`font-medium ${
                      user.isActive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Role</span>
                  <span
                    className={`font-medium ${
                      user.isAdmin ? "text-yellow-600" : "text-blue-600"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Pending Withdrawal</span>
                  <span
                    className={`font-medium ${
                      user.hasPendingWithdrawal
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {user.hasPendingWithdrawal ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-line">
                  <span className="text-muted">Member Since</span>
                  <span className="font-medium">
                    {dateFormatter(user.createdAt.toString())}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted">Last Updated</span>
                  <span className="font-medium">
                    {dateFormatter(user.updatedAt.toString())}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
          </div>
        </div>
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <h2 className="text-lg font-semibold text-main mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Activity Summary
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {activeTrades}
                </div>
                <div className="text-sm text-blue-600">Active Trades</div>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {completedTrades}
                </div>
                <div className="text-sm text-green-600">Completed Trades</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-lg font-bold text-orange-600">
                  {pendingTransactions}
                </div>
                <div className="text-sm text-orange-600">
                  Pending Transactions
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line p-6">
          <h2 className="text-lg font-semibold text-main mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to={`/users/${user.id}/trades`}
              className="flex items-center justify-center text-sm space-x-2 p-4 border border-line rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>View Trades</span>
            </Link>
            <Link
              to={`/users/${user.id}/transactions`}
              className="flex items-center justify-center text-sm space-x-2 p-4 border border-line rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>View Transactions</span>
            </Link>
           
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
