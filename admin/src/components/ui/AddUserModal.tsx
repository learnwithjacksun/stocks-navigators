import { useState } from "react";
import { Plus, Loader } from "lucide-react";
import { Country } from "country-state-city";
import Modal from "./Modal";
import InputWithoutIcon from "./InputWithoutIcon";
import SelectWithoutIcon from "./SelectWithoutIcon";

export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  password: string;
  availableBalance: string;
  bonus: string;
  isActive: boolean;
  isAdmin: boolean;
  isVerified: boolean;
}

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserData) => Promise<boolean | void>;
  isLoading: boolean;
}

const emptyForm: CreateUserData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  password: "",
  availableBalance: "",
  bonus: "",
  isActive: true,
  isAdmin: false,
  isVerified: true,
};

export default function AddUserModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: AddUserModalProps) {
  const [formData, setFormData] = useState<CreateUserData>(emptyForm);
  const countryList = Country.getAllCountries();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await onSubmit(formData);
    if (result !== false) {
      setFormData(emptyForm);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData(emptyForm);
    onClose();
  };

  const updateField = <K extends keyof CreateUserData>(
    key: K,
    value: CreateUserData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add User">
      <p className="text-sm text-muted mb-4">
        All fields are optional. Leave any blank and defaults will be used.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputWithoutIcon
            type="text"
            label="First Name"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="First name"
          />
          <InputWithoutIcon
            type="text"
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Last name"
          />
        </div>

        <InputWithoutIcon
          type="email"
          label="Email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="user@example.com"
        />

        <InputWithoutIcon
          type="tel"
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          placeholder="Phone number"
        />

        <SelectWithoutIcon
          label="Country"
          value={formData.country}
          onChange={(e) => updateField("country", e.target.value)}
          options={countryList.map((country) => ({
            label: country.name,
            value: country.name,
          }))}
          className="bg-background dark:bg-secondary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputWithoutIcon
            type="text"
            label="City"
            value={formData.city}
            onChange={(e) => updateField("city", e.target.value)}
            placeholder="City"
          />
          <InputWithoutIcon
            type="text"
            label="Address"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="Address"
          />
        </div>

        <InputWithoutIcon
          type="password"
          label="Password"
          value={formData.password}
          onChange={(e) => updateField("password", e.target.value)}
          placeholder="Leave blank to auto-generate"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputWithoutIcon
            type="number"
            label="Available Balance"
            value={formData.availableBalance}
            onChange={(e) => updateField("availableBalance", e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
          />
          <InputWithoutIcon
            type="number"
            label="Bonus"
            value={formData.bonus}
            onChange={(e) => updateField("bonus", e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-3 pt-1">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => updateField("isActive", e.target.checked)}
              className="rounded border-line"
            />
            Active account
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isAdmin}
              onChange={(e) => updateField("isAdmin", e.target.checked)}
              className="rounded border-line"
            />
            Admin privileges
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isVerified}
              onChange={(e) => updateField("isVerified", e.target.checked)}
              className="rounded border-line"
            />
            Email verified
          </label>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border text-sm border-line rounded-lg text-muted hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-sm text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span>{isLoading ? "Adding..." : "Add User"}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
