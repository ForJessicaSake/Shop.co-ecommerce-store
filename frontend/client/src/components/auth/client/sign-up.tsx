import { useForm } from "react-hook-form";
import { useCreateClientAccount } from "../../../lib/hooks/auth";
import Button from "../../micro/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchemaType } from "./schema";
import TextInput from "../../micro/inputs/input";
import PasswordInput from "../../micro/inputs/PasswordInput";

const SignUp = () => {
  const { mutate: CreateAccount, isPending } = useCreateClientAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchemaType) => {
    const { email, password } = data;
    CreateAccount({ email, password });
  };

  return (
    <section className="container my-10 mx-auto px-10 lg:px-16 flex justify-center items-center">
      <form
        className="w-full rounded-xl p-5 max-w-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl sm:text-3xl font-bold text-center">
          Create an account
        </h1>
        <div className="mt-10 space-y-6 flex flex-col items-center w-full max-w-lg text-sm">
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
          <TextInput
            placeholder="Confirm your password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
            type="password"
            name="confirmPassword"
          />
          <Button size="l" className="w-full" dark isLoading={isPending}>
            Sign up
          </Button>

          <div>
            Already have an account?{" "}
            <span className="cursor-pointer text-black/60">
              <a href="/login">login</a>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
