import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";

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
      const providerId = normalizeText(String(profile?.id ?? profile?.sub ?? ""));
      if (!providerId) {
        return true;
      }

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
        const { writeClient } = await import("@/sanity/lib/write-client");

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
      const providerId = normalizeText(String(profile?.id ?? profile?.sub ?? ""));

      if (account && profile && providerId) {
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
      if (session.user && token?.id) {
        Object.assign(session.user, { id: token.id });
      }

      return session;
    },
  },
});

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}
