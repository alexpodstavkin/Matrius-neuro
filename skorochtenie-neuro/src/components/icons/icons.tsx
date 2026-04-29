import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const TrendUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M14 7h7v7" />
  </svg>
);

export const Book = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 4h7a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 4h-7a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h8z" />
  </svg>
);

export const Trophy = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
    <path d="M8 11h6M11 8v6" />
  </svg>
);

export const ArrowSquare = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 4h7v7M21 4 11 14" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </svg>
);

export const Report = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M5 8V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3" />
    <path d="M3 14h7M7 11l3 3-3 3" />
  </svg>
);

export const Target = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Eye = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Brain = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9.5 2A4.5 4.5 0 0 1 14 6.5v0a4.5 4.5 0 0 1-1.6 3.5A4 4 0 0 1 14 13.5v0A4.5 4.5 0 0 1 9.5 18M9.5 2A4.5 4.5 0 0 0 5 6.5v0a4.5 4.5 0 0 0 1.6 3.5A4 4 0 0 0 5 13.5v0A4.5 4.5 0 0 0 9.5 18" />
    <path d="M9.5 2v16M9.5 18a4 4 0 0 0 4 4M14 13.5a4.5 4.5 0 0 0 4.5-4.5" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} strokeWidth={2.5} {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} strokeWidth={3} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const Cross = (p: IconProps) => (
  <svg {...base} strokeWidth={3} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const Star = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 0l2.6 7.4L22 10l-7.4 2.6L12 20l-2.6-7.4L2 10l7.4-2.6z" />
  </svg>
);
