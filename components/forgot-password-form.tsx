"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z
    .email("The email field must be a valid email address."),
});

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = ({ email }: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      await authClient.requestPasswordReset({
        email,
        redirectTo: "http://localhost:3000/reset-password",
        fetchOptions: {
          onSuccess() {
            router.push("/");
            toast.success("We have emailed your password reset link!");
          },
          onError({ error }) {
            toast.error(error.message ?? error.statusText);
          },
        },
      });
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address below to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-6">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="me@example.com"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                      autoFocus
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit" className="cursor-pointer" disabled={isPending}>
                  {isPending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : "Send Reset Link"}
                </Button>
                <FieldDescription className="text-center">
                  Remember your password?{" "}
                  <Link href="/" className="underline underline-offset-4">
                    Login
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
