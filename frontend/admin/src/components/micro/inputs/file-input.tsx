import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type FileInputProps = {
  label?: string;
  error?: string;
  onFileChange?: (file: FileList | null) => void;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function FileInput({
  label,
  error,
  onFileChange,
  ...props
}: FileInputProps) {
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
      <input
        {...props}
        type="file"
        id="fileInput"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(e) => onFileChange && onFileChange(e.target?.files)}
        className="w-full rounded-md p-4 border placeholder:text-black/85 border-gray-100"
      />
    </div>
  );
}
