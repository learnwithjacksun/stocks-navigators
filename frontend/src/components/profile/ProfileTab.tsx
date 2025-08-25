import { useState } from "react";
import { AvatarUpload, ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { toast } from "sonner";

interface ProfileTabProps {
  initialData?: ProfileData;
  onUpdate?: (data: ProfileData) => Promise<void>;
}

export default function ProfileTab({ initialData, onUpdate }: ProfileTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  // Profile data state
  const [profileData, setProfileData] = useState<ProfileData>(
    initialData || {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      country: "United States",
      city: "New York",
      address: "123 Trading Street, NY 10001"
    }
  );

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (onUpdate) {
        await onUpdate(profileData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
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
          currentAvatar={"https://ui-avatars.com/api/?background=13a870&color=fff&name=Gift+Jacksun"}
          disabled={isLoading}
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
            disabled={isLoading}
          />
          <InputWithoutIcon
            type="text"
            label="Last Name"
            value={profileData.lastName}
            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
            placeholder="Enter your last name"
            disabled={isLoading}
          />
          <InputWithoutIcon
            type="email"
            label="Email Address"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email"
            disabled={isLoading}
          />
          <InputWithoutIcon 
            type="tel"
            label="Phone Number"
            value={profileData.phone}
            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="Enter your phone number"
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <InputWithoutIcon
            type="text"
            label="City"
            value={profileData.city}
            onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Enter your city"
            disabled={isLoading}
          />
          <div className="md:col-span-2">
            <InputWithoutIcon
              type="text"
              label="Address"
              value={profileData.address}
              onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="Enter your full address"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <ButtonWithLoader
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="btn-primary text-white px-6 h-10 text-sm rounded-lg"
          initialText="Save Changes"
          loadingText="Saving..."
        />
      </div>
    </form>
  );
}
