import { ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth";

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: LoginSchema) => {
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
            Sign in to your account
          </h1>
          <form className="space-y-4 mt-6" onSubmit={handleSubmit(onSubmit)}>
            <InputWithoutIcon
              type="email"
              label="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <InputWithoutIcon
              type="password"
              label="Password"
              {...register("password")}
              error={errors.password?.message}
            />
            <div className="flex items-center gap-2">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember" className="text-sm font-medium">
                Remember me
              </label>
            </div>

            <ButtonWithLoader
              type="submit"
              initialText="Sign in"
              loadingText="Signing in..."
              className="bg-[#3498db] w-full h-12 text-white rounded-sm mt-6 font-semibold"
            />

            <Link
              to="/register"
              className="h-12 btn font-semibold border border-line rounded-sm"
            >
              Create an account
            </Link>
          </form>
        </div>

        <p className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-center text-[#3498db] font-medium"
          >
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}
