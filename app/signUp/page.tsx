
"use client";

import React, { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, Mail, User } from "lucide-react";

/** Icon shown inside each input (Full Name / Email / Password). */
function InputIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
  );
}

const inputClassName =
  "w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Password states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Signup form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data: signupData, error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Could not create an account. Please try again.");
        return;
      }

      if (signupData) {
        setSuccessMessage("Your account was created successfully!");

        router.push("/signIn");
      }
    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
  const handleGoogleSignUp = async () => {
    try {
      setErrorMessage("");

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Could not sign up with Google.");
      }
    } catch (error) {
      console.error("Google signup error:", error);

      setErrorMessage("Could not sign up with Google.");
    }
  };

  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center bg-white px-4 py-14">
      {/* Page Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Create Account
        </h1>

        <p className="mt-3 text-sm text-gray-500 md:text-base">
          Start your adventure with Wanderlust
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* Full Name */}
          <TextField
            isRequired
            name="name"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.trim().length < 3) {
                return "Name must be at least 3 characters.";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              Full Name
            </Label>

            <div className="relative">
              <InputIcon icon={User} />

              <Input
                autoComplete="name"
                placeholder="Enter your name"
                className={inputClassName}
              />
            </div>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Email Address */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Enter a valid email address.";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              Email Address
            </Label>

            <div className="relative">
              <InputIcon icon={Mail} />

              <Input
                autoComplete="email"
                placeholder="Enter your email"
                className={inputClassName}
              />
            </div>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters.";
              }

              if (!/[A-Z]/.test(value)) {
                return "Add at least one uppercase letter.";
              }

              if (!/[0-9]/.test(value)) {
                return "Add at least one number.";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              Password
            </Label>

            <div className="relative">
              <InputIcon icon={LockKeyhole} />

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Create a password"
                className={inputClassName}
              />
            </div>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Confirm Password */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value !== password) {
                return "Passwords do not match.";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">
              Confirm Password
            </Label>

            <div className="relative">
              <InputIcon icon={LockKeyhole} />

              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Confirm your password"
                className={inputClassName}
              />
            </div>

            <FieldError className="text-xs text-red-500" />
          </TextField>

          {/* Error Message */}
          {errorMessage && (
            <div
              role="alert"
              className="w-full rounded-lg border border-red-100 bg-red-50 px-3.5 py-2.5 text-sm text-red-600"
            >
              {errorMessage}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div
              role="status"
              className="w-full rounded-lg border border-green-100 bg-green-50 px-3.5 py-2.5 text-sm text-green-700"
            >
              {successMessage}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading}
            className="mt-1 w-full rounded-lg bg-sky-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="relative my-1 flex w-full items-center justify-center">
            <div className="w-full border-t border-gray-200" />

            <span className="absolute bg-white px-3 text-xs text-gray-400">
              Or sign up with
            </span>
          </div>

          {/* Google Signup */}
          <Button
            type="button"
            isDisabled={loading}
            onPress={handleGoogleSignUp}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />

              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />

              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />

              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>

            Sign Up With Google
          </Button>

          {/* Footer Link */}
          <p className="mt-3 w-full text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/signIn"
              className="font-medium text-sky-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </Form>
      </div>
    </main>
  );
}
