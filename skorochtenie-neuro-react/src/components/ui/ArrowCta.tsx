import type { ReactNode } from 'react';
import { ArrowRight } from '../icons/icons';
import { useBooking } from './BookingContext';

type Props = {
  children: ReactNode;
  size?: 'sm' | 'md' | 'large';
  variant?: 'primary' | 'accent';
  className?: string;
};

export function ArrowCta({
  children,
  size = 'md',
  variant = 'accent',
  className = '',
}: Props) {
  const { open } = useBooking();
  const sizeCls = size === 'large' ? 'btn-large' : size === 'sm' ? 'btn-sm' : '';
  const variantCls = variant === 'primary' ? 'btn-primary' : 'btn-accent';
  return (
    <button
      type="button"
      className={`btn ${variantCls} ${sizeCls} ${className}`.trim()}
      onClick={open}
    >
      {children}
      <ArrowRight />
    </button>
  );
}
