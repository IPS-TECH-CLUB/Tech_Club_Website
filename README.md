# NextAuth.js Setup Guide

Complete authentication implementation using NextAuth.js with JWT strategy, OAuth providers, and route protection.

## 📁 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # NextAuth handler
│   │   └── health/
│   │       └── route.ts              # Health check (unchanged)
│   └── layout.tsx                     # Wrap with AuthProvider
├── lib/
│   └── auth/
│       ├── auth.config.ts            # NextAuth configuration
│       ├── auth.utils.ts             # Server-side auth utilities
│       └── AuthProvider.tsx          # Client-side provider
├── types/
│   └── next-auth.d.ts                # TypeScript type extensions
└── middleware.ts                      # Route protection middleware
```

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
npm install next-auth bcryptjs
npm install -D @types/bcryptjs
```

### 2. Copy Files to Your Project

Copy each file to the exact location specified:

- **`route.ts`** → `src/app/api/auth/[...nextauth]/route.ts`
- **`auth.config.ts`** → `src/lib/auth/auth.config.ts`
- **`auth.utils.ts`** → `src/lib/auth/auth.utils.ts`
- **`AuthProvider.tsx`** → `src/lib/auth/AuthProvider.tsx`
- **`next-auth.d.ts`** → `src/types/next-auth.d.ts`
- **`middleware.ts`** → `src/middleware.ts` (root of src folder)

### 3. Setup Environment Variables

Create `.env.local` in project root:

```env
NEXTAUTH_SECRET=your-super-secret-key-change-this
NEXTAUTH_URL=http://localhost:3000

# Optional OAuth providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**Generate a secure secret:**

```bash
openssl rand -base64 32
```

### 4. Update Root Layout

Modify `src/app/layout.tsx`:

```tsx
import { AuthProvider } from '@/lib/auth/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```

### 5. Update tsconfig.json (if needed)

Ensure path aliases are configured:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🔑 Authentication Methods

### 1. Credentials (Email/Password)

**Demo Accounts:**

- Email: `demo@example.com` | Password: `demo123` | Role: `user`
- Email: `admin@example.com` | Password: `admin123` | Role: `admin`

### 2. Google OAuth

Get credentials: https://console.cloud.google.com/

1. Create new project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 3. GitHub OAuth

Get credentials: https://github.com/settings/developers

1. Register new OAuth App
2. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

## 📝 Usage Examples

### Server Components

```tsx
import { getCurrentUser, requireAuth, isAdmin } from '@/lib/auth/auth.utils';

export default async function ServerComponent() {
  // Get current user (nullable)
  const user = await getCurrentUser();

  // Require authentication (throws if not authenticated)
  const user = await requireAuth();

  // Check if admin
  const adminStatus = await isAdmin();

  return <div>Welcome, {user?.name}</div>;
}
```

### Client Components

```tsx
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function ClientComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  if (status === 'unauthenticated') {
    return <button onClick={() => signIn()}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {session?.user?.name}</p>
      <p>Role: {session?.user?.role}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
```

### API Routes

```tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ data: 'Protected data' });
}
```

### Server Actions

```tsx
'use server';

import { requireAuth, requireAdmin } from '@/lib/auth/auth.utils';

export async function protectedAction() {
  const user = await requireAuth(); // Throws if not authenticated

  // Your action logic
  return { success: true };
}

export async function adminAction() {
  const user = await requireAdmin(); // Throws if not admin

  // Admin-only logic
  return { success: true };
}
```

## 🛡️ Route Protection

The middleware automatically protects routes:

### Protected Routes (require authentication):

- `/dashboard/*`
- `/admin/*` (requires admin role)

### Public Routes:

- `/auth/*` (sign in, sign up pages)
- `/api/auth/*` (NextAuth endpoints)
- `/api/health` (health check)
- Static files and images

### Customize Protected Routes

Edit `src/middleware.ts` to add/remove protected routes:

```typescript
export const config = {
  matcher: [
    // Add your patterns here
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
  ],
};
```

## 🔄 Session Management

### Token Expiration:

- **Session Max Age**: 30 days
- **Session Update Age**: 24 hours (token refreshes every 24 hours)
- **JWT Max Age**: 30 days

### Customize Expiration:

Edit `src/lib/auth/auth.config.ts`:

```typescript
session: {
  strategy: "jwt",
  maxAge: 7 * 24 * 60 * 60, // 7 days
  updateAge: 24 * 60 * 60,  // 24 hours
},
```

## 🔐 Security Best Practices

1. ✅ **Never commit `.env.local`** - add to `.gitignore`
2. ✅ **Use strong NEXTAUTH_SECRET** - generate with `openssl rand -base64 32`
3. ✅ **HTTP-only cookies** - enabled by default
4. ✅ **CSRF protection** - built into NextAuth
5. ✅ **Password hashing** - using bcrypt (10 rounds)
6. ✅ **No sensitive data in JWT** - only id, email, name, role

## 🧪 Testing

### Test Authentication:

```bash
# Start dev server
pnpm dev

# Navigate to
http://localhost:3000/api/auth/signin

# Sign in with:
Email: demo@example.com
Password: demo123
```

## 🐛 Troubleshooting

### "NEXTAUTH_SECRET missing"

- Ensure `.env.local` exists with `NEXTAUTH_SECRET` set

### "Callback URL mismatch" (OAuth)

- Verify redirect URIs in OAuth provider settings
- Format: `http://localhost:3000/api/auth/callback/[provider]`

### Middleware not working

- Ensure `middleware.ts` is in `src/` folder (not in `app/`)
- Check `matcher` patterns in middleware config

### Session not persisting

- Clear cookies and try again
- Verify `NEXTAUTH_URL` matches your domain

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [App Router Authentication](https://next-auth.js.org/configuration/nextjs#in-app-directory)
- [JWT Strategy](https://next-auth.js.org/configuration/options#session)

## 🎯 Next Steps

1. Replace mock users with actual user service/API
2. Create custom sign-in page at `/auth/signin`
3. Add role-based access control to components
4. Implement refresh token rotation (if needed)
5. Add email verification flow
6. Set up password reset functionality
