"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiLoader2Line } from "@remixicon/react";
import Link from "next/link";
import { useAuthToken } from "@/hooks/use-auth-token";

const signInSchema = z.object({
  email: z.email("Invalid email address").min(1, "Email required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setBearerToken } = useAuthToken();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/home",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          const token = ctx.response.headers.get("set-auth-token");
          if (token) {
            setBearerToken(token);
          }
          router.replace("/home");
          setIsLoading(false);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back!</CardTitle>
          <CardDescription>Log in to your vecta account</CardDescription>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="******"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && (
                    <RiLoader2Line className="w-4 h-4 animate-spin" />
                  )}
                  Sign In
                </Button>
                <div className="text-center text-sm">
                  Dont have an account?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SignInForm;
