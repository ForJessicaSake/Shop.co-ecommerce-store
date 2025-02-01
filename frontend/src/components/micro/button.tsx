import clsx from "clsx";
import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  className?: string;
  size?: "s" | "m" | "l";
}>;

const Button = ({ className, size='m', children }: ButtonProps) => {
  return (
    <button
      className={clsx('cursor-pointer text-xs sm:text-base sm:w-52 break-all bg-white border-black/10 rounded-full p-3 font-medium', {
        "sm:w-fit": size === "s",
        "sm:w-52": size === "m",
        "sm:w-full": size === "l",
      },className)}
    >
      {children}
    </button>
  );
};

export default Button;
