import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "@/schemas/auth";

export default function ForgotPassword() {
    const [showSuccess, setShowSuccess] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
    })
    const onSubmit = (data: ForgotPasswordSchema) => {
        console.log(data)
        setShowSuccess(true)
    }
  
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
          <h1 className="text-xl text-center font-bold">
            Forgot Password
          </h1>

          {showSuccess && (
            <div className="mt-6 bg-green-500/10 p-4 rounded-sm font-semibold">
              <p className="text-sm text-green-700">Check your email. A password reset link has been sent to your email. Ensure to check your spam folder if you don't see it.</p>
            </div>
          )}

         {!showSuccess && <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <InputWithoutIcon
              type="email"
              label="Email"
              {...register("email")}
              error={errors.email?.message}
            />


            <ButtonWithLoader
              type="submit"
              initialText="Send Reset Link"
              loadingText="Sending..."
              className="bg-[#3498db] w-full h-12 text-white rounded-sm mt-6 font-semibold"
            />

           
          </form>}
        </div>

        <p className="text-center mt-4">
          <Link
            to="/login"
            className="text-center text-[#3498db] font-medium"
          >
            I remember my password
          </Link>
        </p>
      </div>
    </div>
  );
}
