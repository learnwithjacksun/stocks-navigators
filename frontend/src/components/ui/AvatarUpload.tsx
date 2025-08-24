import { useState, useRef } from "react";
import { X, User, Camera } from "lucide-react";

interface AvatarUploadProps {
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  selectedImage: File | null;
  currentAvatar?: string;
  disabled?: boolean;
}

export default function AvatarUpload({
  onImageSelect,
  onImageRemove,
  selectedImage,
  currentAvatar,
  disabled = false
}: AvatarUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    
    onImageSelect(file);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

 

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageSelect(files[0]);
    }
  };

  const handleRemove = () => {
    onImageRemove();
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const displayImage = previewUrl || currentAvatar;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-muted">
        Profile Picture
      </label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      <div className="center flex-col">
        {/* Avatar Display */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-background dark:bg-foreground border-2 border-gray-200 dark:border-gray-600">
            {displayImage ? (
              <img
                src={displayImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Upload Overlay */}
          {!displayImage && (
            <button
              type="button"
              onClick={handleClick}
              disabled={disabled}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div className="flex-1">
          {displayImage && (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedImage ? 'New Image Selected' : 'Current Profile Picture'}
                </span>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleClick}
                disabled={disabled}
                className="w-full px-4 py-2 text-sm border border-line rounded-lg text-gray-700 dark:text-gray-300 hover:bg-foreground transition-colors"
              >
                Change Picture
              </button>
            </div>
          )}
        </div>
      </div>
      
     {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
