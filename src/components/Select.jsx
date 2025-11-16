import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 ml-1">{label}</label>}
      <select
        id={id}
        className={`px-3 py-2 w-full rounded text-black outline-none focus:ring-2 focus:bg-blue-500 border border-gray-300 duration-200  ${className}`}
        ref={ref}
        {...props}
      >
        {options?.map((option) => {
          <option key={option} value={option}>
            {option}
          </option>;
        })}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
