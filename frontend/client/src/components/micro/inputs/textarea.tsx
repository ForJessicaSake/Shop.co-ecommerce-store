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
      {error && (
        <div className="relative">
          <p className="text-red-500 text-xs absolute bottom-1">
            {typeof error === "string" && error}
          </p>
        </div>
      )}
      <textarea
        className={clsx(className, {
          "w-full rounded-md p-4 border placeholder:text-black/85 text-sm border-gray-100":
            !className,
        })}
        rows={rows}
        {...register}
        {...props}
      ></textarea>
    </div>
  );
}
