import Link from 'next/link';

import styles from './breadcrumbs.module.css';

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className={styles.item} key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <Link className={styles.link} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={styles.current}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span className={styles.separator} aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
