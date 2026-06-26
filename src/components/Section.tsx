import React from 'react';

/* ============================================================
   Editorial grid system - marketer.com technique.

   The hairlines are drawn as per-cell borders: the grid paints its
   top + left outer lines, and every Cell paints its right + bottom
   line. Each internal line is therefore drawn exactly once (no
   doubling), and the four outer edges are covered. We use borders
   (not a `gap-px` background reveal) because a 1px grid GAP collapses
   to 0 at fractional zoom / device-pixel ratios - making hairlines
   vanish in places - whereas box-edge borders stay stable.

   Every Section shares the same max width, so the vertical lines
   line up continuously down the whole page.

   Monochrome only - uses --grid-line (see globals.css). No accent.
   ============================================================ */

interface SectionProps {
  children: React.ReactNode;
  /** Columns on md+ (mobile always stacks to 1). Default 1. */
  cols?: 1 | 2 | 3 | 4;
  /** Show the small corner dots at the grid's outer corners. Default true. */
  dots?: boolean;
  className?: string;
  /**
   * Classes on the grid element. Use this for custom/asymmetric columns with a
   * LITERAL string so Tailwind's JIT picks it up, e.g.
   * `gridClassName="md:grid-cols-[1fr_2fr]"`. (cols defaults to 1 in that case.)
   */
  gridClassName?: string;
  id?: string;
  /** Ref on the outer <section> (e.g. for IntersectionObserver). */
  sectionRef?: React.Ref<HTMLElement>;
}

// Literal class strings so Tailwind JIT generates them (no runtime interpolation).
const COL_CLASS: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export default function Section({
  children,
  cols = 1,
  dots = true,
  className = '',
  gridClassName = '',
  id,
  sectionRef,
}: SectionProps) {
  // If the caller supplies its own column template via gridClassName, don't emit
  // the default md:grid-cols-N (which would conflict).
  const mdCols = gridClassName.includes('grid-cols')
    ? ''
    : COL_CLASS[cols] ?? 'md:grid-cols-1';

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`bg-[var(--grid-bg)] ${className}`}
    >
      <div className="mx-auto w-full max-w-[var(--grid-max)] px-2.5 sm:px-5">
        <div
          // -mt-px pulls each grid up 1px so its top border overlaps the
          // previous section's bottom border - stacked sections share one
          // crisp 1px hairline at the seam instead of doubling to 2px.
          // Only the top + left outer lines live here; each Cell draws its
          // own right + bottom line (see Cell), so every line is drawn once.
          className={`relative -mt-px grid grid-cols-1 ${mdCols} border-t border-l border-[var(--grid-line)] ${gridClassName}`}
        >
          {children}
          {dots && <CornerDots />}
        </div>
      </div>
    </section>
  );
}

interface CellProps {
  children: React.ReactNode;
  className?: string;
  /** Remove default padding (e.g. for full-bleed media inside a cell). */
  bleed?: boolean;
}

/** A single grid cell. Paints the page background and draws the hairline on its
    right + bottom edges (the grid container supplies the top + left edges). */
export function Cell({ children, className = '', bleed = false }: CellProps) {
  return (
    <div
      className={`relative border-r border-b border-[var(--grid-line)] bg-[var(--grid-bg)] ${
        bleed ? '' : 'px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-24'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** A small "+" mark (9px), positioned by the caller so its center sits on a corner. */
function PlusMark({ className = '' }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute z-10 h-[9px] w-[9px] ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--grid-mark)]" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[var(--grid-mark)]" />
    </span>
  );
}

/** The four "+" intersection marks centered on the grid's outer corners. */
function CornerDots() {
  return (
    <>
      <PlusMark className="-left-[4px] -top-[4px]" />
      <PlusMark className="-right-[4px] -top-[4px]" />
      <PlusMark className="-bottom-[4px] -left-[4px]" />
      <PlusMark className="-bottom-[4px] -right-[4px]" />
    </>
  );
}
