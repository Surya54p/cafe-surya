import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, variant, href, onClick, className = '' }: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition duration-200 inline-block text-center';

  const variantClasses = {
    primary: 'bg-gray-800 text-white hover:bg-gray-900 shadow-md hover:shadow-lg',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}