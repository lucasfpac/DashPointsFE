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

const FormSelect = ({ label, options, placeholder, onChange, value }) => {
  return (
    <div className='mt-4'>
      <Label className='block text-sm font-medium'>{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className='w-full mt-2'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className='w-full'>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
