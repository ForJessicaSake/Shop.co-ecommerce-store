import clsx from "clsx";
import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  size?: "s" | "m" | "l";
  filled?: boolean;
}>;

const Button = ({
  className,
  isLoading,
  onClick,
  size = "m",
  children,
  filled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={clsx(
        "cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 disabled:translate-y-0",
        {
          "sm:w-fit min-w-28": size === "s",
          "sm:w-52": size === "m",
          "w-full": size === "l",
          "border-transparent bg-ink text-canvas hover:opacity-90": filled,
          "border-line bg-surface text-ink hover:border-ink": !filled,
          "!cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
