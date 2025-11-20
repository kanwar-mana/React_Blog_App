import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { type, label, placeholder, className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 ml-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className} w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
        ref={ref}
        id={id}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default Input;
