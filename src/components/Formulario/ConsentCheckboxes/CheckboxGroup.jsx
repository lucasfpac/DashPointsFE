// CheckboxGroup.jsx
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CheckboxGroup = ({ id, text, checked, onChange }) => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox id={id} checked={checked} onChange={onChange} required />
      <Label
        htmlFor={id}
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {text}
      </Label>
    </div>
  );
};

export default CheckboxGroup;
