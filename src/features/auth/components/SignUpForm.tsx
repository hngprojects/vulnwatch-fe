'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authService } from '@/features/auth/services/auth.services';

import { signUpSchema } from '@/features/auth/schemas/auth.schema';
import type { SignUpFormData } from '@/types/auth.types';

import { AuthCard } from './AuthCard';
import { AuthHeader } from './AuthHeader';
import { AuthInput } from './AuthInput';
import { PasswordInput } from './PasswordInput';
import { AuthDivider } from './AuthDivider';
import { SocialAuthButton } from './SocialAuthButton';

export function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await authService.register(data);

      if (response.isSuccess) {
        const successMessage =
          (response.value as { message?: string } | null)?.message ??
          'Successfully registered!';
        toast.success(successMessage);
        router.push('/login');
      } else {
        toast.error(response.error?.message || 'Registration failed');
        setError('root', {
          message: response.error?.message || 'Registration failed',
        });
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='flex min-h-screen w-full flex-col items-center bg-[#FAFAFA] px-4 py-8 sm:px-6 lg:px-8'>
      <div className='flex w-full flex-1 flex-col items-center justify-center pb-12'>
        <AuthCard>
          <div className='mb-8 w-full flex items-center justify-center'>
            <Link href='/'>
              <Image
                src='/images/logo-auth.png'
                alt='VulnWatch AI Logo'
                width={260}
                height={105}
                className='h-auto w-56 object-contain'
                priority
              />
            </Link>
          </div>
          <AuthHeader />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
            noValidate
          >
            <div className='flex flex-col gap-6 sm:flex-row'>
              <AuthInput
                label='First Name'
                placeholder='e.g Divine'
                icon={<User className='h-5 w-5' />}
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <AuthInput
                label='Last Name'
                placeholder='e.g Divine'
                icon={<User className='h-5 w-5' />}
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>

            <AuthInput
              label='Email Address'
              type='email'
              placeholder='analyst@company.com'
              icon={<Mail className='h-5 w-5' />}
              error={errors.email?.message}
              {...register('email')}
            />

            <PasswordInput
              label='Password'
              placeholder='........'
              helperText='Use at least 12 characters, with numbers & symbols.'
              error={errors.password?.message}
              {...register('password')}
            />

            <PasswordInput
              label='Confirm Password'
              placeholder='........'
              helperText='Must match the first password'
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <div className='mt-2 flex flex-col gap-6'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-primary font-geist flex h-11 w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-[16px] leading-6 font-medium tracking-[0.02em] text-[#FFFFFF] transition-opacity hover:opacity-90 disabled:opacity-50'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='h-5 w-5 animate-spin' />
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>

              <p className='font-geist text-center text-[16px] leading-6 font-normal text-[#3D4947]'>
                Already have an account?{' '}
                <Link
                  href='/login'
                  className='font-medium text-[#C68A00] hover:underline'
                >
                  Sign in
                </Link>
              </p>

              <AuthDivider />

              <SocialAuthButton />
            </div>
          </form>
        </AuthCard>
      </div>
    </div>
  );
}