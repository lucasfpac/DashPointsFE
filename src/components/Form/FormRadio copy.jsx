import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const FormRadio = ({ onChange, value, label, options, additionalInput }) => {
  const handleRadioChange = (option) => {
    onChange(option);
  };

  return (
    <>
      <Label className='font-medium text-sm'>{label}</Label>
      <RadioGroup
        onValueChange={handleRadioChange}
        className='flex space-x-10'
        value={value}
      >
        {options.map((option, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <RadioGroupItem
              checked={value === option.value}
              onChange={() => handleRadioChange(option.value)}
              value={option.value}
              id={`radio${option.value}`}
            />
            <Label htmlFor={`radio${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>

      {additionalInput && value === additionalInput.condition ? (
        <div className='mt-2'>
          <Input placeholder={additionalInput.placeholder} />
        </div>
      ) : null}
    </>
  );
};

export default FormRadio;
