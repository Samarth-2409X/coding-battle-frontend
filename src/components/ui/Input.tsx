import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = ({ label, error, className = '', ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <input
        className={`input-base ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

export default Input
