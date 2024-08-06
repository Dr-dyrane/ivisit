import React from 'react';

export function Label({ children, ...props }) {
  return (
    <label {...props} className="label">
      {children}
    </label>
  );
}
