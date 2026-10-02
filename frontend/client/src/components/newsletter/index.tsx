import Button from "../micro/button";
import { useSubscribeToNewsLetter } from "../../lib/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsLetterSchema, NewsLetterSchemaType } from "./schema";
import TextInput from "../micro/inputs/input";
import { useEffect } from "react";
import { toast } from "sonner";

const Newsletter = () => {
  const { mutate: subscribeToNewsLetter, isPending } =
    useSubscribeToNewsLetter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsLetterSchemaType>({
    resolver: zodResolver(newsLetterSchema),
  });

  const _onSubmit = (data: NewsLetterSchemaType) => {
    subscribeToNewsLetter(data);
    reset();
  };
  useEffect(() => {
    if (errors.email?.message) {
      toast.error(errors.email.message);
    }
  });
  return (
    <section
      id="newsLetter"
      className="mx-auto container px-8 lg:px-16 my-10 lg:my-20"
    >
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 text-ink lg:flex-row lg:items-center lg:justify-between lg:p-10">
        <h2 className="max-w-xl text-xl font-bold sm:text-4xl">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form
          onSubmit={handleSubmit(_onSubmit)}
          className="flex flex-col space-y-5"
        >
          <TextInput
            type="email"
            name="email"
            required
            placeholder="Enter your email address"
            register={register("email")}
            className="w-full max-w-sm border-line! bg-canvas! p-3 text-center text-xs text-ink sm:w-80 sm:text-base"
          />
          <Button
            filled
            isLoading={isPending}
            className="w-full max-w-sm sm:w-80"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
