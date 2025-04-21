import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema, ForgotPasswordType } from "./schema";
import TextInput from "../micro/inputs/input";
import Button from "../micro/button";
import { useForgotPassword } from "../../lib/hooks";
import { Link } from "react-router";

const ForgotPassword = () => {
  const { mutate: forgotPasswordMutation, isPending } = useForgotPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });
  const onSubmit = (data: ForgotPasswordType) => {
    forgotPasswordMutation(data);
  };
  return (
    <section className="container my-10 mx-auto px-10 lg:px-16 flex justify-center items-center">
      <form
        className="w-full rounded-xl p-5 max-w-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl sm:text-3xl font-bold text-center">
          Reset your password
        </h1>
        <div className="mt-10 space-y-8 flex flex-col items-center w-full max-w-lg text-sm">
          <TextInput
            placeholder="Enter your email address"
            register={register("email")}
            error={errors.email?.message}
            name="email"
          />
          <Button size="l" className="w-full" dark isLoading={isPending}>
            Submit
          </Button>

          <Link to="/login" className="underline">
            Click here to login
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
