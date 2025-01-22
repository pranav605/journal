'use server';

import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        passowrd?: string[];
        confirm_passowrd?: string[];
        timezone?: string[];
    };
    message?: string | null;
};

const FormSchema = z.object({
    name: z.string(),
    email: z.string({
        invalid_type_error: 'Please enter a valid email id.',
    }).email('Invalid email address'),
    password: z.string({
        invalid_type_error: 'Please enter a password'
    }).min(6, 'Password must be minimum 6 characters long').refine((data) => /[A-Z]/.test(data), {
        message: 'Password must contain at least one capital letter',
    }),
    confirm_password: z.coerce.string(),
    timezone: z.string(),
})

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

// Define the schema for signup form validation
const signupSchema = z.object({
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    // Add other fields as necessary
});

export async function signUp(prevState: State, formData: FormData) {
    try {

        const validatedFields = FormSchema.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
            timezone: formData.get('timezone'),
        })

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Create Invoice.',
            };
        }

        // Proceed with signup logic, e.g., calling an API or database
        const {name, email, password, confirm_password, timezone} = validatedFields.data

        if (password !== confirm_password) {
            return {
                errors: { confirm_password: 'Passwords do not match.' },
                message: 'Password and Confirm Password do not match.',
            };
        }

        const encryptedPassword = await bcrypt.hash(password,10);
        
        // Insert data into the database
        try {
            await sql`
            INSERT INTO users (name, email, password, timezone)
            VALUES (${name}, ${email}, ${encryptedPassword}, ${timezone})
            `;
        } catch (error) {
            // If a database error occurs, return a more specific error.
            console.log(error);

            return {
                message: 'Database Error: Failed to Create User.',
            };
        }
        revalidatePath('/signup');
        redirect('/login');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return error.errors.map(e => e.message).join(', '); // Return validation errors
        }
        throw error; // Rethrow unexpected errors
    }
}