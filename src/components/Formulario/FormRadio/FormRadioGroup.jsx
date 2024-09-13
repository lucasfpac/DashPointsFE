import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const FormRadioGroup = ({
  onChange,
  value,
  label,
  options,
  additionalInput,
  onAdditionalInputChange,
}) => {
  return (
    <div className='mt-4'>
      <Label className='font-medium text-sm mb-2'>{label}</Label>
      <RadioGroup
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
            placeholder={additionalInput.placeholder}
            value={additionalInput.value}
            onChange={onAdditionalInputChange}
          />
        </div>
      )}
    </div>
  );
};

export default FormRadioGroup;
