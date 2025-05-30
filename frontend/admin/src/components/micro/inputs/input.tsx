import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register?: any;
  className?: string;
}

export default function TextInput({
  label,
  error,
  register,
  className,
  ...props
}: TextInputProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      <input
        className={clsx(className, {
          "w-full rounded-md p-4 border placeholder:text-black/85 text-sm border-gray-100":
            !className,
        })}
        {...register}
        {...props}
      />
      {error && (
        <div className="relative top-6">
          <p className="text-red-500  text-xs absolute bottom-1">
            {typeof error === "string" && error}
          </p>
        </div>
      )}
    </div>
  );
}
