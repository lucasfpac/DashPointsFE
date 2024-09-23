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
    <div className='mt-4'>
      <Label htmlFor={name} className='block text-sm font-medium'>
        {title}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className='w-full mt-2'
        autoComplete='off'
      />
      {error && <p className='mb-2 text-red-500'>{error}</p>}
    </div>
  );
};

export default FormInput;
