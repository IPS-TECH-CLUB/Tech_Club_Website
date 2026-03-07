import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      provider?: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role?: string;
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    provider?: string;
  }
}
