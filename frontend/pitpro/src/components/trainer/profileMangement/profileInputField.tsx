import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  value?: string;
  editable: boolean;
  type?: React.HTMLInputTypeAttribute;
  full?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?:string
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, value, editable, type = "text", full = false,error, ...rest }, ref) => {
    return (
      <div className={full ? "md:col-span-2" : ""}>
        <label className="block text-sm font-semibold text-white mb-2">
          {label}
        </label>
        <input
          type={type}
          value={value}
          readOnly={!editable}
          ref={ref}
          {...rest} // allows onChange, onBlur, name from RHF
          className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-purple-500"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
