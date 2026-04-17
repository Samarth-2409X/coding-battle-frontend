import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  loading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

const Button = ({
  variant = 'primary',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...rest
}: ButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg px-4 py-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
    ghost: 'hover:bg-gray-800 text-gray-400 hover:text-gray-100',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button
