import { Metadata } from "next";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; }>;
}) {
  const token = (await searchParams).token || "";

  if (!token) {
    redirect("/");
  }

  return (
    <div className="bg-muted flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
