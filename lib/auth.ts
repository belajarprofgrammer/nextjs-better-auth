import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { resend } from "@/lib/resend";
import { PrismaClient } from "@/lib/generated/prisma";
import ResetPasswordTemplate from "@/components/emails/reset-password-template";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "NextJS <nextjs-better-auth@resend.dev>",
        to: user.email,
        subject: "Reset Password Notification",
        react: ResetPasswordTemplate({
          name: user.name,
          url,
          token,
        }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
