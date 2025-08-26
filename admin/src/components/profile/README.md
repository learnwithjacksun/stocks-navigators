# Profile Components

This directory contains modular components for the profile page, separated by functionality to make API integration easier.

## Components

### ProfileTab
Handles user profile information including:
- Profile picture upload
- Personal information (name, email, phone)
- Address information

### SecurityTab
Manages security settings including:
- Password change
- Two-factor authentication toggle

### PreferencesTab
Handles user preferences including:
- Notification settings (email, SMS)
- Account information display

## Usage

### Basic Usage
```tsx
import { ProfileTab, SecurityTab, PreferencesTab } from "@/components/profile";

function ProfilePage() {
  const handleProfileUpdate = async (profileData) => {
    // Implement your API call here
    await updateProfileAPI(profileData);
  };

  const handleSecurityUpdate = async (securitySettings) => {
    // Implement your API call here
    await updateSecurityAPI(securitySettings);
  };

  const handlePreferencesUpdate = async (preferences) => {
    // Implement your API call here
    await updatePreferencesAPI(preferences);
  };

  return (
    <div>
      <ProfileTab onUpdate={handleProfileUpdate} />
      <SecurityTab onUpdate={handleSecurityUpdate} />
      <PreferencesTab onUpdate={handlePreferencesUpdate} />
    </div>
  );
}
```

### With Initial Data
```tsx
import { ProfileTab, SecurityTab, PreferencesTab } from "@/components/profile";
import type { ProfileData, SecuritySettings, PreferencesSettings } from "@/components/profile/types";

function ProfilePage() {
  const initialProfileData: ProfileData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    country: "USA",
    city: "New York",
    address: "123 Main St"
  };

  const initialSecuritySettings: SecuritySettings = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false
  };

  const initialPreferences: PreferencesSettings = {
    emailNotifications: true,
    smsNotifications: false
  };

  return (
    <div>
      <ProfileTab 
        initialData={initialProfileData} 
        onUpdate={handleProfileUpdate} 
      />
      <SecurityTab 
        initialSettings={initialSecuritySettings} 
        onUpdate={handleSecurityUpdate} 
      />
      <PreferencesTab 
        initialPreferences={initialPreferences} 
        onUpdate={handlePreferencesUpdate} 
      />
    </div>
  );
}
```

## API Integration Examples

### Profile Update API
```tsx
const handleProfileUpdate = async (profileData: ProfileData) => {
  try {
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update profile');
    }
    
    const result = await response.json();
    // Handle success
  } catch (error) {
    // Handle error
    console.error('Profile update failed:', error);
  }
};
```

### Security Update API
```tsx
const handleSecurityUpdate = async (securitySettings: SecuritySettings) => {
  try {
    const response = await fetch('/api/security', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(securitySettings),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update security settings');
    }
    
    const result = await response.json();
    // Handle success
  } catch (error) {
    // Handle error
    console.error('Security update failed:', error);
  }
};
```

### Preferences Update API
```tsx
const handlePreferencesUpdate = async (preferences: PreferencesSettings) => {
  try {
    const response = await fetch('/api/preferences', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }
    
    const result = await response.json();
    // Handle success
  } catch (error) {
    // Handle error
    console.error('Preferences update failed:', error);
  }
};
```

## Types

All components use TypeScript interfaces defined in `types.ts`:

- `ProfileData`: User profile information
- `SecuritySettings`: Security and authentication settings
- `PreferencesSettings`: User preferences
- `AccountInfo`: Account information display

## Features

- **Modular Design**: Each tab is a separate component for easy maintenance
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Built-in error handling with toast notifications
- **Loading States**: Loading indicators during API calls
- **Form Validation**: Client-side validation for all forms
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Compatible with dark/light themes
