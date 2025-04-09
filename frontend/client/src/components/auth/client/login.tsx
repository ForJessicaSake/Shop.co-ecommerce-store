import Button from "../../micro/button";
import TextInput from "../../micro/inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "./schema";
import { useLoginClientAccount } from "../../../lib/hooks/auth";
import { useForm } from "react-hook-form";
import PasswordInput from "../../micro/inputs/PasswordInput";
import { clientAuth } from "../../../lib/hooks/useAuth";

const Login = () => {
  const { mutate: loginMutation, isPending } = useLoginClientAccount();
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
    <section className="container my-10 mx-auto px-10 lg:px-16 flex justify-center items-center">
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
          <Button size="l" className="w-full" dark isLoading={isPending}>
            Login
          </Button>

          <div>
            Don't have an account?{" "}
            <span className="cursor-pointer text-black/60">
              <a href="/signup">sign up</a>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default clientAuth(Login, { authenticated: false });
