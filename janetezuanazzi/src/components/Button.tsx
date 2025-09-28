import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  href,
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-accent text-ink hover:bg-accent/80 hover:scale-105 focus:ring-accent/50',
    secondary: 'border-2 border-ink text-ink hover:bg-ink hover:text-bg focus:ring-ink/50',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
