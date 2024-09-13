import React from "react";
import { Button } from "../../ui/button";

const FormButtons = ({ loading }) => {
  return (
    <div className='flex justify-center items-center mt-8 gap-10'>
      {loading ? <Button disabled>Avançar</Button> : <Button>Avançar</Button>}
      {loading ? (
        <Button disabled>Finalizar</Button>
      ) : (
        <Button>Finalizar</Button>
      )}
    </div>
  );
};

export default FormButtons;
