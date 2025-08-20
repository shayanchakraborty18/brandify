import React from "react";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  error = "",
  disabled = false,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        // id={name}
        name={name}
        disabled={disabled}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded border bg-background border-gray-300 px-3 py-3 text-text placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none ${disabled ? "bg-text/10" : ""} ${error ? "border-red-500" : ""
          } ${className}`}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
