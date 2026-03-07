import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
//import { compare } from "bcryptjs";

const users = [
  {
    id: '1',
    email: process.env.DEMO_EMAIL,
    password: process.env.DEMO_PASSWORD,
    name: 'Demo User',
    role: 'user',
  },
  {
    id: '2',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    name: 'Admin User',
    role: 'admin',
  },
];

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60, //24 hours
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'demo@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = credentials.password === user.password;

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),

    //google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    //gitHub OAuth Provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
  ],

  // Custom pages (optional - NextAuth provides defaults)
  //pages: {
  //signIn: "/auth/signin",
  // signOut: "/auth/signout",
  // error: "/auth/error",
  // verifyRequest: "/auth/verify-request",
  // newUser: "/auth/new-user",
  //},

  // Callbacks for JWT and Session customization
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || 'user';
        token.email = user.email;
        token.name = user.name;
      }

      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.provider = token.provider as string;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === 'development',
};
