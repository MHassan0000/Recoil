"use client";

import React from "react";

const ResetForm = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClear}
      
    >
      <img width={35} className="invert hover:scale-90 cursor-pointer" src="/images/close.png" alt="X" />
    </button>
  );
};

export default ResetForm;
