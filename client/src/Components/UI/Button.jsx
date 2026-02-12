import React from 'react';
import Loader from './Loader';

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
    loading = false,
    fullWidth = false
}) => {
    const baseStyles = "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100";

    const variants = {
        primary: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow-md",
        secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
        danger: "bg-red-500 text-white hover:bg-red-600",
        ghost: "text-gray-600 hover:bg-gray-100"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
        >
            {loading && <Loader size="sm" color="text-current" />}
            {children}
        </button>
    );
};

export default Button;
