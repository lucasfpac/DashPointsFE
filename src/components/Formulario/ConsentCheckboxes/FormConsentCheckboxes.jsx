import React from "react";
import CheckboxGroup from "./CheckboxGroup";

const FormConsentCheckboxes = () => {
  return (
    <>
      <CheckboxGroup id='maiorde18' text='Concordo que sou maior de 18 anos.' />
      <CheckboxGroup
        id='regulamento'
        text='Concordo com o Regulamento e Politica de Privacidade deste site.'
      />
      <CheckboxGroup
        id='lgpd'
        text='Autorizo, nos termos do item 28 do regulamento, o tratamento de meus dados relativos a nomes, imagens e sons de voz, pela Promotora, para as finalidades e período definidos no regulamento.'
      />
    </>
  );
};

export default FormConsentCheckboxes;
