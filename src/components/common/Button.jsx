import React from "react";

export const Button = ({ children, className, ...props }) => {
	return (
		<button
			className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
			{...props}
		>
			{children}
		</button>
	);
};
