import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ href, to, children, className, ...props }: LinkProps) {
  const destination = to || href || '#';
  return (
    <RouterLink to={destination} className={className} {...props}>
      {children}
    </RouterLink>
  );
}
export { Link };
