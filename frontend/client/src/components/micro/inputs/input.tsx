import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register: any;
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
        className={clsx(
          "w-full rounded-xl border border-line bg-surface p-4 text-sm text-ink placeholder:text-ink-soft",
          className
        )}
        {...register}
        {...props}
      />
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
