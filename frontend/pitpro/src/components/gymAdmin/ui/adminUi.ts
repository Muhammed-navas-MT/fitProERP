/**
 * Gym Admin UI design tokens.
 *
 * Pure presentational class-name strings derived from the EXISTING FitProERP
 * admin theme (zinc-950 surfaces, orange-500 accent, zinc-800 borders).
 * No logic, no data — safe to import anywhere in the admin UI.
 */

/** Full-page wrapper background for every admin page. */
export const adminPage = "min-h-screen bg-zinc-950 text-white";

/** Standard content card / panel. */
export const adminCard =
  "rounded-xl border border-zinc-800 bg-zinc-900/40 shadow-sm";

/** Card whose identity should read as "primary" (accented hairline border). */
export const adminCardAccent =
  "rounded-xl border border-orange-500/20 bg-zinc-900/40 shadow-sm";

/** Comfortable inner padding used by cards / panels. */
export const adminCardPad = "p-4 sm:p-5 lg:p-6";

/** Section heading inside a card. */
export const adminSectionTitle = "text-base font-semibold text-white";
export const adminSectionSubtitle = "text-sm text-zinc-400";

/** Muted label text (table headers, field labels, meta). */
export const adminMuted = "text-zinc-400";

/** Primary action button (matches existing orange CTA). */
export const adminPrimaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 disabled:cursor-not-allowed disabled:opacity-50";

/** Neutral / secondary button. */
export const adminGhostBtn =
  "inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50";

/** Input field styling consistent with the shadcn Input + admin theme. */
export const adminInput =
  "h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20";

/** Row-action icon button (view / edit / block …). */
export const adminIconBtn =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50";
