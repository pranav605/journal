'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries()); // Convert FormData to a plain object
    await signIn('credentials', { redirectTo: '/dashboard', ...data });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}