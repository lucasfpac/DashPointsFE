import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const FormRadio = ({
  onChange,
  value,
  label,
  options,
  additionalInput,
  onAdditionalInputChange,
}) => {
  const [additionalInputValue, setAdditionalInputValue] = useState("");

  const handleRadioChange = (option) => {
    onChange(option);
  };

  const handleAdditionalInputChange = (event) => {
    setAdditionalInputValue(event.target.value);
    onAdditionalInputChange(event.target.value);
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
          <Input
            placeholder={additionalInput.placeholder}
            value={additionalInputValue}
            onChange={handleAdditionalInputChange}
          />
        </div>
      ) : null}
    </>
  );
};

export default FormRadio;
