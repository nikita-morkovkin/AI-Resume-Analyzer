import type { ChangeEvent } from "react";

interface FormInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div className="form-div">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        name={id}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormInput;
