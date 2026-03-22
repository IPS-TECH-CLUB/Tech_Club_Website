import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth.config';

/**
 * Get the current user session on the server side
 * Use this in Server Components, Route Handlers, and Server Actions
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  return !!session?.user;
}

/**
 * Check if user has a specific role
 */
export async function hasRole(role: string) {
  const user = await getCurrentUser();
  return user?.role === role;
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  return hasRole('admin');
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

/**
 * Require admin role - throws if not admin
 */
export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'admin') {
    throw new Error('Forbidden: Admin access required');
  }
  return user;
}
