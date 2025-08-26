import { useState } from "react";
import { AvatarUpload, ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { useAuth, useUsers } from "@/hooks";

interface ProfileTabProps {
  initialData?: ProfileData;
}

export default function ProfileTab({ initialData }: ProfileTabProps) {
  const { user } = useAuth();
  const { updateUserProfile, isLoading: isUpdatingProfile } = useUsers();
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  // Profile data state
  const [profileData, setProfileData] = useState<ProfileData>(
    initialData || {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      country: user?.country ?? "",
      city: user?.city ?? "",
      address: user?.address ?? ""
    }
  );

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    
   await updateUserProfile(profileData, selectedAvatar ?? undefined)
  };

  const handleAvatarUpload = (file: File) => {
    setSelectedAvatar(file);
  };

  const handleAvatarRemove = () => {
    setSelectedAvatar(null);
  };

  return (
    <form onSubmit={handleProfileUpdate} className="space-y-8">
      {/* Avatar Section */}
      <div>
        <AvatarUpload
          onImageSelect={handleAvatarUpload}
          onImageRemove={handleAvatarRemove}
          selectedImage={selectedAvatar}
          currentAvatar={user?.avatar ?? "https://ui-avatars.com/api/?background=13a870&color=fff&name=Gift+Jacksun"}
          disabled={isUpdatingProfile}
        />
      </div>

      {/* Personal Information */}
      <div>
        <h3 className="text-md font-medium text-muted mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithoutIcon
            type="text"
            label="First Name"
            value={profileData.firstName}
            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
            placeholder="Enter your first name"
            disabled={isUpdatingProfile}
          />
          <InputWithoutIcon
            type="text"
            label="Last Name"
            value={profileData.lastName}
            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
            placeholder="Enter your last name"
            disabled={isUpdatingProfile}
          />
          <InputWithoutIcon
            type="email"
            label="Email Address"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
            disabled={isUpdatingProfile}
          />
          <InputWithoutIcon 
            type="tel"
            label="Phone Number"
            value={profileData.phone}
            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Enter your phone number"
            disabled={isUpdatingProfile}
          />
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className="text-md font-medium text-muted mb-4">
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithoutIcon
            type="text"
            label="Country"
            value={profileData.country}
            onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
            placeholder="Enter your country"
            disabled={isUpdatingProfile}
          />
          <InputWithoutIcon
            type="text"
            label="City"
            value={profileData.city}
            onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Enter your city"
            disabled={isUpdatingProfile}
          />
          <div className="md:col-span-2">
            <InputWithoutIcon
              type="text"
              label="Address"
              value={profileData.address}
              onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your full address"
              disabled={isUpdatingProfile}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <ButtonWithLoader
          type="submit"
          loading={isUpdatingProfile}
          disabled={isUpdatingProfile}
          className="btn-primary text-white px-6 h-10 text-sm rounded-lg"
          initialText="Save Changes"
          loadingText="Saving..."
        />
      </div>
    </form>
  );
}
