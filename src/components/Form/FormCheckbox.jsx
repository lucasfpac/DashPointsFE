import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const FormCheckbox = ({ id, text, checked, onChange }) => {
  return (
    <div className='flex items-center space-x-2'>
      <Checkbox id={id} checked={checked} onChange={onChange} />
      <label
        htmlFor={id}
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {text}
      </label>
    </div>
  );
};

export default FormCheckbox;
