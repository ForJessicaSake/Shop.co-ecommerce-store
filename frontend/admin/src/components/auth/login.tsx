import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../micro/button";
import TextInput from "../micro/inputs/input";
import { adminAuth, useLoginAdminAccount } from "../../lib/hooks";
import { loginSchema, LoginSchemaType } from "./schema";
import PasswordInput from "../micro/inputs/PasswordInput";

const Login = () => {
  const { mutate: loginMutation, isPending } = useLoginAdminAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginSchemaType) => {
    loginMutation(data);
  };
  return (
    <section className="my-10 flex justify-center items-center w-full">
      <form
        className="w-full rounded-xl p-5 max-w-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl sm:text-3xl font-bold text-center">
          Welcome back, log in to continue
        </h1>
        <div className="mt-10 space-y-10 flex flex-col items-center w-full max-w-lg text-sm">
          <TextInput
            placeholder="Enter your email address"
            register={register("email")}
            error={errors.email?.message}
            name="email"
          />
          <PasswordInput
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password?.message}
            type="password"
            name="password"
          />
          <Button
            size="l"
            className="w-full my-5 max-w-sm"
            dark
            isLoading={isPending}
          >
            Login
          </Button>

          <div className="space-y-2 text-sm text-black/80">
            <div>
              Don't have an account?{" "}
              <a href="/signup" className="text-black/60 hover:underline">
                Sign up
              </a>
            </div>
            <div>
              Forgot your password?{" "}
              <a
                href="/forgot-password"
                className="text-black/60 hover:underline"
              >
                Reset it here
              </a>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default adminAuth(Login, { authenticated: false });
