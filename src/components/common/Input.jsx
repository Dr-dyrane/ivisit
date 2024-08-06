// src/components/ui/Input.jsx
import React from "react";

const Input = ({ type = "text", placeholder, className, ...props }) => (
	<input
		type={type}
		placeholder={placeholder}
		classNames="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
		{...props}
	/>
);

export default Input;
