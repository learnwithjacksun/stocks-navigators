import { useState } from "react";
import { MainLayout } from "@/layouts";
import { ProfileTab, SecurityTab, PreferencesTab } from "@/components/profile";
import { 
  User, 
  Shield, 
  Bell,
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');

 

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Bell }
  ] as const;

  return (
    <MainLayout title="Profile Settings" subtitle="Manage your account settings and preferences">
     
        {/* Header */}
       

        {/* Tabs */}
        <div className="border-b border-line">
          <nav className="flex md:space-x-10 space-x-4 flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-background dark:bg-secondary rounded-lg border border-line md:p-6 p-4">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <ProfileTab  />
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <SecurityTab  />
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <PreferencesTab  />
          )}
        </div>
      
    </MainLayout>
  );
}
