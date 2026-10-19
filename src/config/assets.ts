/**
 * Centralized static asset configuration.
 *
 * All files live under public/assets/ and are served at /assets/* by Vite
 * (and Vercel) without any build processing. Use root-relative paths so the
 * same build works locally and in production.
 *
 * DO NOT use import() or require() for these — they are not bundled assets.
 */
export const ASSETS = {
  // ─── Images ──────────────────────────────────────────────────────────────
  logo: '/assets/images/sdg_sorting_hat.png',
  heroHall: '/assets/images/sdg_sorting_hall_hero_1790619923983.jpg',
  avatarBrahim: '/assets/images/sdg_avatar_brahim_1790619933929.jpg',
  workspaces: '/assets/images/sdg_departments_workspaces_1790619944717.jpg',
  hatCloseup: '/assets/images/sdg_sorting_hat_closeup_1790619956734.jpg',

  // ─── Videos ──────────────────────────────────────────────────────────────
  heroVideo: '/assets/videos/sorting_hat_final_with_sfx.mp4',
  enchantedMap: '/assets/videos/SDG_Enchanted_Map_16s_9x16.mp4',

  // ─── Audio ───────────────────────────────────────────────────────────────
  hedwigTheme: '/assets/sounds/hedwig_theme.m4a',
} as const;
