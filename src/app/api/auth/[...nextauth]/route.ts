import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth.config'; // Ensure this points to your config file

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
