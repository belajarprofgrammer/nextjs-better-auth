import { Metadata } from "next";
import ForgotPasswordForm from "@/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
