import { Link } from "react-router-dom";
import { Crown, CheckCircle, XCircle } from "lucide-react";

interface UserCardProps {
  user: IUser;
 
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      to={`/users/${user.id}`}
      className="bg-background dark:bg-secondary rounded-lg border border-line p-6 "
    >
      {/* Header */}

      <div className="flex items-start space-x-3">
        <div className="h-12 w-12 bg-primary/10 rounded-full center overflow-hidden">
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-main">
              {user.firstName} {user.lastName}
            </h3>
          </div>
          <p className="text-sm text-muted">{user.email}</p>
          <div className="flex items-center gap-1">
            {user.isAdmin && (
              <div className="flex items-center gap-1">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-muted">Admin</span>
              </div>
            )}
            {user.isActive ? (
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-muted">Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-muted">Inactive</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
