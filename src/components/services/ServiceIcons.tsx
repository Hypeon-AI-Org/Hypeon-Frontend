/* ============================================================
   Purpose-drawn icon set for the services page.

   One shared grammar so the four read as a family:
   24x24 box, 1.5 stroke, round caps/joins, currentColor, and one
   dominant shape per icon that fills the box - fine interior detail
   turns to mush at the 19px the navbar renders these at.
   ============================================================ */

type IconProps = {
  className?: string;
  /** Optional override; the set is tuned for 1.5 at 24px. */
  strokeWidth?: number;
};

function Svg({
  className = "h-6 w-6",
  strokeWidth = 1.5,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** GEO - a wire globe: the circle carries recognition, the meridian lens
    and latitude rules give it the grid. */
export function GeoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      {/* Only three strokes. The lens already implies the verticals, so a
          straight centre meridian just adds a third line through the middle -
          at 22px the interior has room for one horizontal and one lens, no more. */}
      <path d="M12 3a11.5 11.5 0 0 1 3.2 9 11.5 11.5 0 0 1-3.2 9 11.5 11.5 0 0 1-3.2-9 11.5 11.5 0 0 1 3.2-9z" />
      <path d="M3 12h18" />
    </Svg>
  );
}

/** SEO - a plain magnifier: search, with nothing inside the lens. */
export function SeoIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10.2" cy="10.4" r="7.6" />
      <path d="M15.7 15.9 21.2 21.4" />
    </Svg>
  );
}

/** Websites - a page layout being built: the wireframe blocks inside are
    what separate this from a plain window or card. */
export function WebsiteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.75h19" />
      <rect x="5.5" y="11.6" width="5.6" height="5.6" rx="1" />
      <path d="M13.9 12.6h4.6" />
      <path d="M13.9 16.2h4.6" />
    </Svg>
  );
}

/** AI Automated Marketing - a megaphone broadcasting. */
export function AutomationIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 5.2 6.8 8.6H4.6A1.6 1.6 0 0 0 3 10.2v3.6a1.6 1.6 0 0 0 1.6 1.6h2.2L16 18.8z" />
      <path d="M6.8 8.6v6.8" />
      <path d="M19 9.4a4 4 0 0 1 0 5.2" />
      <path d="M21.4 7.2a7.4 7.4 0 0 1 0 9.6" />
    </Svg>
  );
}

/* ---- supporting marks, same grammar ---- */

/** A single stroked arrow, lighter than the lucide default. */
export function ArrowIcon({ className = "h-4 w-4", strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </Svg>
  );
}

/** Diagonal arrow for outbound / anchor links. */
export function ArrowOutIcon({ className = "h-4 w-4", strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </Svg>
  );
}

/** Hairline tick used in every list on the page. */
export function TickIcon({ className = "h-4 w-4", strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Svg>
  );
}

/** Minimal calendar mark for the booking panel. */
export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17" />
      <path d="M8.25 3.5v4" />
      <path d="M15.75 3.5v4" />
      <circle cx="12" cy="14.75" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Chevron used by the FAQ accordion. */
export function ChevronIcon({ className = "h-4 w-4", strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg className={className} strokeWidth={strokeWidth}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export const SERVICE_ICONS = {
  geo: GeoIcon,
  seo: SeoIcon,
  websites: WebsiteIcon,
  automation: AutomationIcon,
} as const;
