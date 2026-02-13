"use client";

import React from "react";
import Image from "next/image";

const ResetForm = ({ onClear }: { onClear: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClear}
      
    >
      <Image width={35} height={35} className="invert hover:scale-90 cursor-pointer" src="/images/close.png" alt="Clear" />
    </button>
  );
};

export default ResetForm;
