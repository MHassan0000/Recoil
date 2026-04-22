import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      // ✅ Works for both GitHub and Google
      const providerId = profile?.id || profile?.sub;
      const displayName =
        normalizeText(user?.name) ??
        normalizeText(profile?.name) ??
        normalizeText(profile?.login) ??
        normalizeText(profile?.given_name) ??
        "Unknown";
      const displayUsername =
        normalizeText(profile?.login) ||
        normalizeText(profile?.given_name) ||
        normalizeText(user?.name) ||
        normalizeText(profile?.name) ||
        "Unknown";

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: providerId });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: providerId,
          name: displayName,
          username: displayUsername,
          email: user?.email,
          image: user?.image,
          bio:
            profile?.bio ||
            profile?.about_me ||
            "New user joined via authentication.",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      const providerId = profile?.id || profile?.sub;

      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: providerId });

        if (user) {
          token.id = user._id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // ✅ Add Sanity ID to session user
      Object.assign(session.user, { id: token.id });
      return session;
    },
  },
});

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}
