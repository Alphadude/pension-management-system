import { env } from "@/env";
import { routes } from "@/lib/routes";
import { hasExceededSixty } from "@/lib/utils";
import type { SessionUser } from "@/types/common";
import axios from "axios";
import {
  CredentialsSignin,
  type DefaultSession,
  type NextAuthConfig,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";

class LoginError extends CredentialsSignin {
  code = "Invalid email or password";
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    user: SessionUser;
    accessToken: string;
    refreshToken: string;
    id?: string;
  }
  interface Session extends DefaultSession {
    user: SessionUser;
    token: string;
    refreshToken: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const apiUrl = `${env.NEXT_PUBLIC_API_URL}/users/login`;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return (
          axios
            .post(apiUrl, {
              email: credentials?.email,
              password: credentials?.password,
            })
            .then((response) => {
              // ("response", response.data);
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return response.data;
            })
            .catch((error) => {
              const e = new LoginError();
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              e.code = error?.response?.data?.message;
              throw e;
            }) ?? null
        );
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        // User is available during sign-in
        token.user = user?.user;
        token.token = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (trigger === "update" && session) {
        // @ts-expect-error session is not defined
        token.user = { ...token.user, ...session };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
          // @ts-expect-error - isPensioner is not a valid property on the user object
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          isPensioner: hasExceededSixty(token.user.dob),
        };
        session.token = token?.token as string;
        session.refreshToken = token?.refreshToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: env.NODE_ENV === "development",
  secret: env.AUTH_SECRET,
  pages: {
    signIn: routes.auth.login,
  },
  trustHost: true,
} satisfies NextAuthConfig;
