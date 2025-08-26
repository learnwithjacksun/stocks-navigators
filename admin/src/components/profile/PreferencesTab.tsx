import { useState } from "react";
import { ButtonWithLoader } from "@/components/ui";
import { toast } from "sonner";

interface PreferencesTabProps {
  initialPreferences?: PreferencesSettings;
  accountInfo?: AccountInfo;
  onUpdate?: (preferences: PreferencesSettings) => Promise<void>;
}

export default function PreferencesTab({ 
  initialPreferences, 
  accountInfo, 
  onUpdate 
}: PreferencesTabProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Preferences state
  const [preferences, setPreferences] = useState<PreferencesSettings>(
    initialPreferences || {
      emailNotifications: true,
      smsNotifications: false
    }
  );

  // Account information
  const defaultAccountInfo: AccountInfo = {
    accountId: "TRD-2024-001",
    memberSince: "January 15, 2024",
    accountStatus: "Verified"
  };

  const currentAccountInfo = accountInfo || defaultAccountInfo;

  const handlePreferencesUpdate = async () => {
    setIsLoading(true);
    
    try {
      if (onUpdate) {
        await onUpdate(preferences);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      toast.success("Preferences updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Notification Preferences */}
      <div>
        <h3 className="text-md font-medium text-muted mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-line rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Email Notifications</h4>
              <p className="text-xs text-muted">
                Receive important updates via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.emailNotifications}
                onChange={(e) => setPreferences(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                className="sr-only peer"
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-foreground peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-line rounded-lg">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">SMS Notifications</h4>
              <p className="text-xs text-muted">
                Receive important updates via SMS
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.smsNotifications}
                onChange={(e) => setPreferences(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                className="sr-only peer"
                disabled={isLoading}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
          Account Information
        </h3>
        <div className="bg-foreground rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Account ID:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{currentAccountInfo.accountId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Member Since:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{currentAccountInfo.memberSince}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Account Status:</span>
            <span className="text-sm font-medium text-green-600">{currentAccountInfo.accountStatus}</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <ButtonWithLoader
          onClick={handlePreferencesUpdate}
          loading={isLoading}
          disabled={isLoading}
          className="btn-primary text-white px-6 h-10 text-sm rounded-lg"
          initialText="Save Preferences"
          loadingText="Saving..."
        />
      </div>
    </div>
  );
}
