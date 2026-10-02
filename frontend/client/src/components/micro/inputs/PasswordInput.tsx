import clsx from "clsx";
import { InputHTMLAttributes, useState } from "react";
import { FaRegEyeSlash, FaEye } from "react-icons/fa6";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register: any;
  className?: string;
  type?: string;
}

export default function PasswordInput({
  label,
  error,
  register,
  className,
  type = "password",
  ...props
}: PasswordInputProps) {
  const [passwordType, setPasswordType] = useState(type);
  const handleToggle = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <div className="w-full">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <div className="relative w-full">
        <input
          className={clsx(
            "w-full rounded-xl border border-line bg-surface p-4 pr-10 text-sm text-ink placeholder:text-ink-soft",
            className
          )}
          type={passwordType}
          {...register}
          {...props}
        />
        <span
          className="absolute inset-y-0 right-5 flex items-center cursor-pointer text-ink-soft"
          onClick={handleToggle}
        >
          {passwordType === "password" ? <FaEye /> : <FaRegEyeSlash />}
        </span>
      </div>
      {error && (
        <div className="relative top-6">
          <p className="text-red-500 text-xs absolute bottom-1">
            {typeof error === "string" && error}
          </p>
        </div>
      )}
    </div>
  );
}
