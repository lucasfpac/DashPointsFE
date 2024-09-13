import React from "react";

const Title = ({ title, paragraph }) => {
  return (
    <div className='flex flex-1 justify-center items-center flex-col bg-slate-50 p-2'>
      <h1 className='text-xl font-bold uppercase'>{title}</h1>
      <p>{paragraph}</p>
    </div>
  );
};

export default Title;
