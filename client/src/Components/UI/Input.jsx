import React, { forwardRef } from "react";

const Input = ({ label, type = "text", placeholder, name, register, error, className = "", ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...(register ? register(name) : {})} // Handle case where register might not be passed
          className={`w-full px-4 py-2.5 bg-white border rounded-lg outline-none transition-all duration-200 ${error
            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            : "border-zinc-300 focus:border-zinc-800 focus:ring-4 focus:ring-zinc-500/10 hover:border-zinc-400"
            } placeholder:text-gray-400 text-gray-900`}
          {...props}
        />
      </div>
      {error && (
        <span className="flex items-center gap-1 text-sm text-red-500 mt-1.5 animate-in slide-in-from-top-1 fade-in duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
