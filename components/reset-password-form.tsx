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
  password: z
    .string("The password field must be a string.")
    .min(8, "The password field must be at least 8 characters.")
    .max(100, "The password field must not be greater than 100 characters."),
  password_confirmation: z
    .string("The password confirmation field must be a string.")
    .optional(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "The password confirmation field does not match.",
  path: ["password_confirmation"],
});

export default function ResetPasswordForm({
  className,
  token,
  ...props
}: React.ComponentProps<"div"> & {
  token: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = ({ password }: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      await authClient.resetPassword({
        newPassword: password,
        token,
        fetchOptions: {
          onSuccess() {
            router.push("/");
            toast.success("Your password has been reset!");
          },
          onError({ error }) {
            form.resetField("password");
            form.resetField("password_confirmation");
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
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-6">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
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
              <Controller
                name="password_confirmation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password Confirmation</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
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
                  ) : "Reset Password"}
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
