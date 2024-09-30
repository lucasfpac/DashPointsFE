import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSelect = ({
  id,
  label,
  options = [],
  placeholder,
  onChange,
  value,
}) => {
  return (
    <div className='mt-4'>
      <Label htmlFor={id} className='block text-sm font-medium'>
        {label}
      </Label>
      <Select id={id} onValueChange={onChange} value={value} aria-label={label}>
        <SelectTrigger className='w-full mt-2'>
          <SelectValue placeholder={placeholder}>
            {options.find((option) => option.value === value)?.label}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className='w-full'>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
