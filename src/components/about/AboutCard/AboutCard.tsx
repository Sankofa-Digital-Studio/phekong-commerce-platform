import styles from './card.module.css';
import { ReactNode } from 'react';

export type AboutCardProps = {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export function AboutCard({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
}: AboutCardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${styles[`padding-${padding}`]} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}