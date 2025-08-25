import { useState } from "react";
import { ButtonWithLoader } from "@/components/ui";
import { Key, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface SecurityTabProps {
  initialSettings?: SecuritySettings;
  onUpdate?: (settings: SecuritySettings) => Promise<void>;
}

export default function SecurityTab({ initialSettings, onUpdate }: SecurityTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(
    initialSettings || {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: true,
      emailNotifications: true,
      smsNotifications: false
    }
  );

  const handleSecurityUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (securitySettings.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    
    try {
      if (onUpdate) {
        await onUpdate(securitySettings);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      toast.success("Security settings updated successfully!");
      setSecuritySettings(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update security settings");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <form onSubmit={handleSecurityUpdate} className="space-y-8">
      {/* Password Change */}
      <div>
        <h3 className="text-md font-medium text-muted mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-main mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={securitySettings.currentPassword}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full pl-10 pr-10 h-11 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-gray-900 dark:text-white"
                placeholder="Enter current password"
                disabled={isLoading}
              />
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-main mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={securitySettings.newPassword}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full pl-10 pr-10 h-11 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-gray-900 dark:text-white"
                placeholder="Enter new password"
                disabled={isLoading}
              />
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-main mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={securitySettings.confirmPassword}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full pl-10 pr-10 h-11 text-sm border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background dark:bg-foreground text-gray-900 dark:text-white"
                placeholder="Confirm new password"
                disabled={isLoading}
              />
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div>
        <h3 className="text-md font-medium text-muted mb-4">
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between p-4 border border-line rounded-lg">
          <div>
            <h4 className="font-medium text-main">Enable 2FA</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorEnabled}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
              className="sr-only peer"
              disabled={isLoading}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <ButtonWithLoader
          type="submit"
          loading={isLoading}
          disabled={isLoading || !securitySettings.currentPassword || !securitySettings.newPassword || !securitySettings.confirmPassword}
          className="btn-primary text-white px-6 h-10 text-sm rounded-lg"
          initialText="Update Security"
          loadingText="Updating..."
        />
      </div>
    </form>
  );
}
