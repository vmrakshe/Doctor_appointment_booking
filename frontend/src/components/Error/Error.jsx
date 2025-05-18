import React from "react";

const Error = ({errorMessage}) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <h1 className="text-[23px] text-red-400 font-semibold leading-[30px]">{errorMessage}</h1>
    </div>
  );
};

export default Error;
