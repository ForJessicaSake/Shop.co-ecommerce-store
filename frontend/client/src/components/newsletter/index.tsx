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
      <div className="lg:p-10 p-5 bg-black flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center rounded-2xl">
        <h2 className="font-bold text-xl sm:text-4xl text-white max-w-xl">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form
          onSubmit={handleSubmit(_onSubmit)}
          className="flex flex-col space-y-5"
        >
          <TextInput
            type="email"
            name="email"
            placeholder="Enter your email address"
            register={register("email")}
            className="border border-white bg-white max-w-sm sm:w-80 w-full p-3 rounded-lg text-center text-xs sm:text-base"
          />
          <Button isLoading={isPending} className="max-w-sm w-full sm:w-80">
            Subscribe to Newsletter
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
