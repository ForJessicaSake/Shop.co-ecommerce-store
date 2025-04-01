import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

type SelectInputProps = {
  label?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  register: UseFormRegisterReturn;
  name: string;
  defaultValue: string;
  options: { value: string; label: string; selected?: boolean }[];
  placeholder?: string;
};

const SelectInput = ({
  label,
  error,
  register,
  name,
  defaultValue,
  options,
  placeholder,
  ...rest
}: SelectInputProps) => {
  return (
    <div>
      {label && <label className="mb-1 text-sm font-medium">{label}</label>}
      {error && (
        <div className="relative">
          <p className="text-red-500 text-xs absolute bottom-1">
            {typeof error === "string" && error}
          </p>
        </div>
      )}
      <select
        className="w-full rounded-md p-4 mt-1 border placeholder:text-black/85 border-gray-100"
        {...register}
        name={name}
        defaultValue={defaultValue}
        {...rest}
      >
        {defaultValue && <option>{defaultValue}</option>}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.selected}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
