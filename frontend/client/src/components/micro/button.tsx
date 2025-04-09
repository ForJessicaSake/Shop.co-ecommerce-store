import clsx from "clsx";
import { PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren<{
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  size?: "s" | "m" | "l";
  dark?: boolean;
}>;

const Button = ({
  className,
  isLoading,
  onClick,
  size = "m",
  children,
  dark = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={clsx(
        "custom-button cursor-pointer text-sm break-all border border-black/10 rounded-lg p-[11px] font-medium transition-all duration-300 ease-in-out transform hover:scale-105",
        {
          "sm:w-fit min-w-28": size === "s",
          "sm:w-52": size === "m",
          "w-full": size === "l",
          "bg-black text-white hover:bg-white hover:text-black hover:border-black":
            dark,
          "bg-white text-black hover:bg-black hover:text-white hover:border-white":
            !dark,
          "!cursor-not-allowed": isLoading,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
