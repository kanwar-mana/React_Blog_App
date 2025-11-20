import React from "react";

function Button({
  children,
  textColor,
  bgColor,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg hover:bg-white hover:rounded-3xl hover:border-none hover:text-black text-${textColor} bg-${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
