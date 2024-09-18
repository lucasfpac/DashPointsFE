import React from "react";
import { Button } from "../../ui/button";
import Error from "@/components/Helper/Error";

const FormActions = ({ loading, error }) => {
  return (
    <div>
      <div className='flex justify-center items-center mt-8'>
        {loading ? <Button disabled>Avançar</Button> : <Button>Avançar</Button>}
      </div>
      <div className='text-center'>{error && <Error error={error} />}</div>
    </div>
  );
};

export default FormActions;
