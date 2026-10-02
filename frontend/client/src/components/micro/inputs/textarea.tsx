import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  register: UseFormRegisterReturn;
  className?: string;
  rows?: number;
}

export default function TextAreaInput({
  label,
  error,
  register,
  className,
  rows = 5,
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <textarea
        className={clsx(className, {
          "w-full rounded-xl border border-line bg-surface p-4 text-sm text-ink placeholder:text-ink-soft":
            !className,
        })}
        rows={rows}
        {...register}
        {...props}
      ></textarea>
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
