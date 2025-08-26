import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifySchema, type VerifySchema } from "@/schemas/auth";
import { useAuth } from "@/hooks";
import { Info } from "lucide-react";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { verifyOtp, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = (data: VerifySchema) => {
    verifyOtp(data.otp);
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
          <h1 className="text-xl text-center font-bold">Verify your account</h1>
          <p className="text-center text-sm text-muted flex items-center gap-2 justify-center">
            {email} <Info className="w-4 h-4 text-yellow-600" />
          </p>
          <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <InputWithoutIcon
              type="number"
              label="Enter 6-digit OTP"
              {...register("otp")}
              error={errors.otp?.message}
            />

            <ButtonWithLoader
              type="submit"
              initialText="Verify"
              loadingText="Verifying..."
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
