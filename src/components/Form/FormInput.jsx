import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormInput = ({
  type,
  name,
  title,
  placeholder,
  error,
  onBlur,
  onChange,
  value,
}) => {
  return (
    <div>
      <Label htmlFor={name}>{title}</Label>
      <Input
        type={type}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {error && <p className='mb-2 text-red-500'>{error}</p>}
    </div>
  );
};

export default FormInput;
