import {
  ButtonWithLoader,
  InputWithoutIcon,
  SelectWithoutIcon,
} from "@/components/ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "@/schemas/auth";
import { Country } from "country-state-city";
import { useAuth } from "@/hooks";

export default function Register() {
  const { registerUser, isLoading } = useAuth();
  const countryList = Country.getAllCountries();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (data: RegisterSchema) => {
    registerUser(data);
  };
  return (
    <div className="bg-foreground dark:bg-background min-h-[100dvh]">
      <div className="py-10 w-[90%] mx-auto md:w-[400px]">
        <div>
          <img
            src="/logo.webp"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="bg-background dark:bg-secondary p-6">
          <h1 className="text-xl text-center font-bold">Create an account</h1>
          <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <InputWithoutIcon
              type="text"
              label="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <InputWithoutIcon
              type="text"
              label="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
            <InputWithoutIcon
              type="email"
              label="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <InputWithoutIcon
              type="tel"
              label="Phone Number"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <SelectWithoutIcon
              label="Country"
              options={countryList.map((country) => ({
                label: country.name,
                value: country.name,
              }))}
              {...register("country")}
              error={errors.country?.message}
              className="bg-background dark:bg-secondary"
            />
            <InputWithoutIcon
              type="password"
              label="Password"
              {...register("password")}
              error={errors.password?.message}
            />

            <ButtonWithLoader
              type="submit"
              initialText="Register"
              loadingText="Registering..."
              loading={isLoading}
              className="bg-[#3498db] w-full h-12 text-white rounded-sm mt-6 font-semibold"
            />
          </form>
        </div>

        <p className="text-center mt-4">
          <Link to="/login" className="text-center text-[#3498db] font-medium">
            I already have an account
          </Link>
        </p>
      </div>
    </div>
  );
}
