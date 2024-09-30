import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const FormRadioGroup = ({
  onChange,
  value,
  name,
  label,
  options,
  additionalInput,
  onAdditionalInputChange,
}) => {
  return (
    <div className='mt-4'>
      <Label htmlFor={name} className='font-medium text-sm mb-2'>
        {label}
      </Label>
      <RadioGroup
        id={name}
        onValueChange={onChange}
        className='flex space-x-10'
        value={value}
      >
        {options.map((option) => (
          <div key={option.value} className='flex items-center space-x-2'>
            <RadioGroupItem
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              value={option.value}
              id={`radio${option.value}`}
            />
            <Label htmlFor={`radio${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      {additionalInput && value === additionalInput.condition && (
        <div className='mt-2'>
          <Input
            id='addStore'
            placeholder={additionalInput.placeholder}
            value={additionalInput.value}
            onChange={(event) => onAdditionalInputChange(event.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default FormRadioGroup;
