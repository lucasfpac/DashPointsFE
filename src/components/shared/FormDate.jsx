import React from "react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CustomerContext } from "@/CustomerContext";

const FormDate = ({ name, title, onChange, value }) => {
  const { today } = React.useContext(CustomerContext);
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(value || today);

  React.useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
    setOpen(false);
  };

  return (
    <div className='mt-4'>
      <Label htmlFor={name} className='block text-sm font-medium'>
        {title}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full mt-2 justify-start text-left font-normal'
            onClick={() => setOpen(true)}
          >
            {selectedDate
              ? format(selectedDate, "dd/MM/yyyy")
              : "Selecione uma data"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-2'>
          <Calendar
            selected={selectedDate}
            onSelect={handleDateChange}
            mode='single'
            initialFocus
            disabled={(date) => date > today}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FormDate;
