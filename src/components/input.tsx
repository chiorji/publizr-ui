import React, { ComponentProps, ChangeEventHandler, ReactNode, forwardRef } from "react";
import { Alert, AlertDescription } from "./alert";
import { AlertCircle } from "lucide-react";
import { OptionContract } from "../types";

interface TextInputProps extends ComponentProps<'input'> {
  label: string
  error?: string
  suffix?: ReactNode
}

interface TextAreaProps extends ComponentProps<'textarea'> {
  label: string
  error?: string
};

interface RadioInputProps extends TextInputProps {
  active: boolean
}

interface SelectFieldProps extends ComponentProps<'select'> {
  options: OptionContract[]
  selectedValue: string | number
  label: string
  onChange: ChangeEventHandler<HTMLSelectElement>
  error?: string
}

export const TextInput: React.FC<TextInputProps> = forwardRef(({ error, label, suffix, ...rest }, ref) => {
  return (
    <div className="space-y-2 relative">
      <label htmlFor={rest.name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ref={ref}
        {...rest}
      />
      {suffix && <div className="absolute rounded-sm top-[30px] right-[2px]">{suffix}</div>}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
})

export const TextAreaInput: React.FC<TextAreaProps> = (props) => {
  const { error, label, ...rest } = props;
  return (
    <div className="space-y-2">
      <label htmlFor={rest.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        rows={10}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
      />
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

export const RadioInput: React.FC<RadioInputProps> = (props) => {
  const { error, label, active, ...rest } = props;
  return (
    <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer ${active ? 'bg-green-100 text-green-800' : 'bg-white text-gray-700'}`}>
      <input
        type="radio"
        checked={active}
        className="hidden"
        {...rest}
      />
      <span>{label}</span>
    </label>
  )
}


export const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { options, selectedValue, error, label, ...rest } = props;
  const selected = options.find((option) => String(option.value) === selectedValue);
  return (
    <div className="space-y-2">
      <label htmlFor={rest.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...rest}
        value={selected?.value ?? ''}
      >
        <option value="">Select a category</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}