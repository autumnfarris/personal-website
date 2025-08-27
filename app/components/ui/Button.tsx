import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  external = false,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl focus:ring-amber-500 hover:-translate-y-0.5',
    secondary: 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl focus:ring-orange-500 hover:-translate-y-0.5',
    outline: 'border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white focus:ring-amber-500 hover:-translate-y-0.5',
    ghost: 'text-amber-700 hover:bg-amber-50 focus:ring-amber-500'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    if (external || href.startsWith('http')) {
      return (
        <a 
          href={href} 
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}