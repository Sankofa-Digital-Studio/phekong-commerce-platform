import { Calendar, Leaf, HeartHandshake } from "lucide-react";
import type { ComponentType } from "react";
import Image from 'next/image';

import styles from "./stats-bar.module.css";
const ICONS: Record<
  string,
  ComponentType<{ size?: number; strokeWidth?: number }>
> = {
  calendar: Calendar,
  leaf: Leaf,
  heart: HeartHandshake,
};

export type StatItem = {
  icon: keyof typeof ICONS;
  value: string;
  label: string;
};

export type StatsBarProps = {
  stats: StatItem[];
};

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className={styles.wrap}>

      <div className={styles.bgPlaceholder}>
       <Image
  src="/images/stats-bg.png"
  alt="Forest and leaves background"
  fill
  loading="eager"
  className={styles.bgImage}
  style={{ objectFit: "cover" }}
/>
      </div>

      <div className={styles.grid}>
        {stats.map((stat) => {
          const Icon = ICONS[stat.icon];
          return (
            <div className={styles.stat} key={stat.label}>
              <Icon size={28} strokeWidth={1.75} />
              <div className={styles.statCopy}>
                <p className={styles.value}>{stat.value}</p>
                <p className={styles.label}>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}