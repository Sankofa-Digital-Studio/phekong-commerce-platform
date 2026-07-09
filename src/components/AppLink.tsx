import Link from "next/link";
import React from "react";

type AppLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function AppLink({ href, children, className, ariaLabel }: AppLinkProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}

export default AppLink;
