import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema, type NewPasswordSchema } from "@/schemas/auth";

export default function NewPassword() {
  const {register, handleSubmit, formState: {errors}} = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  })
  const onSubmit = (data: NewPasswordSchema) => {
    console.log(data)
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
            Reset password
          </h1>
          <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <InputWithoutIcon
              type="password"
              label="New Password"
              {...register("password")}
              error={errors.password?.message}
            />
            <InputWithoutIcon
              type="password"
              label="Confirm Password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
           

            <ButtonWithLoader
              type="submit"
              initialText="Update Password"
              loadingText="Updating..."
              className="bg-[#3498db] w-full h-12 text-white rounded-sm mt-6 font-semibold"
            />

           
          </form>
        </div>

        <p className="text-center mt-4">
          <Link
            to="/login"
            className="text-center text-[#3498db] font-medium"
          >
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
