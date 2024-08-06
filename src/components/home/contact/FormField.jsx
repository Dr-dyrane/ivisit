import React from 'react';

const FormField = ({ id, label, type = 'text', required = false, textarea = false }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {textarea ? (
      <textarea
        id={id}
        rows={4}
        required={required}
        className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base lg:text-lg xl:text-xl"
      />
    ) : (
      <input
        id={id}
        type={type}
        required={required}
        className="mt-1 p-2 border block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:text-base lg:text-lg xl:text-xl"
      />
    )}
  </div>
);

export default FormField;
