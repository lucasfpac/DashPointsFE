import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FormPhoneField = ({
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
      <PhoneInput
        id={name}
        international
        defaultCountry='BR'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-2"
        )}
        autoComplete='off'
      />
      {error && <p className='mb-2 text-red-500'>{error}</p>}
    </div>
  );
};

export default FormPhoneField;
