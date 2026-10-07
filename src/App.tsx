import ClientApp from './ClientApp';
import AdminApp from './AdminApp';

/**
 * Top-level router.
 * - /admin  → AdminApp  (admin dashboard shell)
 * - /*      → ClientApp (public-facing sorting hat)
 *
 * No external router library needed — a single pathname check is sufficient
 * for this two-route SPA.
 */
export default function App() {
  const isAdmin = window.location.pathname.startsWith('/admin');
  return isAdmin ? <AdminApp /> : <ClientApp />;
}
