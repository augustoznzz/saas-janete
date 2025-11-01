import { clsx } from 'clsx';
import Link from 'next/link';

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

export function Button({ href, children, className }: ButtonProps) {
  const classes = clsx('cta-button', className);
  if (href) {
    return (
      <Link href={href} className={classes}>{children}</Link>
    );
  }
  return (
    <button className={classes}>{children}</button>
  );
}

