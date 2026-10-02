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
      <input
        {...props}
        type="file"
        id="fileInput"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(e) => onFileChange && onFileChange(e.target?.files)}
        className="w-full rounded-xl border border-line bg-surface p-4 text-ink"
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
