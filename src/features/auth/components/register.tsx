"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import * as z from "zod";
import { registerUser } from "@/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import FramerButton from "@/features/auth/components/ui/framer-button";
import { SocialAuthButton } from "@/features/auth/components/SocialAuthButton";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const Register = () => {
  const [isLoading, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const data = await registerUser(values);
    console.log(data);

    const isSuccess = data.status === 201;

    toast[isSuccess ? "success" : "error"](
      isSuccess ? "Account created successfully" : "An error occurred",
      {
        description: isSuccess ? "Verify your account" : data.error,
      },
    );

    if (isSuccess) {
      startTransition(() => {});
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-inter text-neutralColor-dark-2 mb-5 text-center text-2xl leading-tight font-semibold">
            Sign Up
          </h1>
          <p className="font-inter text-neutralColor-dark-2 mt-2 text-center text-sm leading-6 font-normal">
            Create an account to get started with us.
          </p>
        </div>
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <SocialAuthButton text="Sign up with Google" />
        </div>
        <div className="flex items-center justify-center">
          <hr className="w-full border-t border-gray-300" />
          <span className="font-inter text-neutralColor-dark-1 px-3 text-xs leading-tight font-normal">
            OR
          </span>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<RegisterFormValues, "first_name">;
              }) => (
                <FormItem>
                  <FormLabel className="text-neutralColor-dark-2">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isLoading}
                      placeholder="Enter your first name"
                      {...field}
                      className={cn(
                        "font-inter w-full rounded-md border px-3 py-6 text-sm leading-[21.78px] font-normal transition duration-150 ease-in-out focus:outline-none",
                        form.formState.errors.first_name &&
                          "border-destructive",
                      )}
                    />
                  </FormControl>
                  <FormMessage data-testid="name-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<RegisterFormValues, "last_name">;
              }) => (
                <FormItem>
                  <FormLabel className="text-neutralColor-dark-2">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isLoading}
                      placeholder="Enter your last name"
                      {...field}
                      className={cn(
                        "font-inter w-full rounded-md border px-3 py-6 text-sm leading-[21.78px] font-normal transition duration-150 ease-in-out focus:outline-none",
                        form.formState.errors.last_name && "border-destructive",
                      )}
                    />
                  </FormControl>
                  <FormMessage data-testid="name-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({
                field,
              }: {
                field: ControllerRenderProps<RegisterFormValues, "email">;
              }) => (
                <FormItem>
                  <FormLabel className="text-neutralColor-dark-2">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isLoading}
                      placeholder="Enter Email Address"
                      {...field}
                      className={cn(
                        "font-inter w-full rounded-md border px-3 py-6 text-sm leading-[21.78px] font-normal transition duration-150 ease-in-out focus:outline-none",
                        form.formState.errors.email && "border-destructive",
                      )}
                    />
                  </FormControl>
                  <FormMessage data-testid="email-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({
                field,
              }: {
                field: ControllerRenderProps<RegisterFormValues, "password">;
              }) => (
                <FormItem>
                  <FormLabel className="text-neutralColor-dark-2">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isLoading}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        {...field}
                        className={cn(
                          "font-inter w-full rounded-md border px-3 py-6 text-sm leading-[21.78px] font-normal transition duration-150 ease-in-out focus:outline-none",
                          form.formState.errors.password &&
                            "border-destructive",
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <Eye
                            className="h-5 w-5 text-gray-400"
                            data-testid="eye-icon"
                          />
                        ) : (
                          <EyeOff
                            className="h-5 w-5 text-gray-400"
                            data-testid="eye-off-icon"
                          />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage data-testid="password-error" />
                </FormItem>
              )}
            />
            <FramerButton
              isLoading={isLoading}
              disabled={isLoading}
              text="Sign up"
            />
            {/* <CustomButton
              type="submit"
              variant="primary"
              size="default"
              className="w-full py-6"
              isDisabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-x-2">
                  <span className="animate-pulse">Logging in...</span>{' '}
                  <LoadingSpinner className="size-4 animate-spin sm:size-5" />
                </span>
              ) : (
                <span>Create Account</span>
              )}
            </CustomButton> */}
          </form>
        </Form>

        <p className="font-inter text-neutralColor-dark-1 mt-5 text-center text-sm leading-[15.6px] font-normal">
          Already Have An Account?{" "}
          <Link
            href="/login"
            className="font-inter text-primary ms-1 text-left text-base leading-[19.2px] font-bold hover:text-orange-400"
            data-testid="link"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
