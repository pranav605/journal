'use server';

import { auth, signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getJournalPassword, getUserIdByEmail } from './data';
export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        passowrd?: string[];
        confirm_password?: string[];
        timezone?: string[];
    };
    message?: string | null;
};

export type JournalForm = {
    errors?: {
        title?: string[];
        date?: string[];
        template?: string[];
    };
    message?: string | null;
}

const FormSchema = z.object({
    name: z.string({
        invalid_type_error: 'Please enter a valid name.',
    }),
    email: z.string({
        invalid_type_error: 'Please enter a valid email id.',
    }).email('Invalid email address'),
    password: z.string({
        invalid_type_error: 'Please enter a password'
    }).min(6, 'Password must be minimum 6 characters long').refine((data) => /[A-Z]/.test(data), {
        message: 'Password must contain at least one capital letter',
    }),
    confirm_password: z.coerce.string({
        invalid_type_error: 'Please re-enter the password.',
    }),
    timezone: z.string(),
});

const JournalSchema = z.object({
    title: z.string({
        invalid_type_error: 'Please enter a valid title.',
    }),
    locked: z.string(),
    password: z.string(),
    date: z.string(),
    template: z.string(),
});

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

export async function signUp(state: State | string, formData: FormData): Promise<string | State> {
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
                errors: { confirm_password: ['Passwords do not match.'] },
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
                errors: { email: [''] },
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

export async function addJournal(state: JournalForm | string, formData: FormData): Promise<string | JournalForm> {
    try {
        
        const validatedFields = JournalSchema.safeParse({
            title: formData.get('title'),
            date: formData.get('date'),
            template: formData.get('template'),
            locked: formData.get('locked'),
            password: formData.get('password'),
        })

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
                message: 'Missing Fields. Failed to Create Journal.',
            };
        }


        // Proceed with signup logic, e.g., calling an API or database
        const {title, date, template, locked, password} = validatedFields.data

        let passwordFIeld = '';
        if (locked == 'true') {
            passwordFIeld = await bcrypt.hash(password,10);
        }
        
        const session = await auth();
        console.log(session);
        let id = '';
        if (session && session.user && session.user.email) {
            id = await getUserIdByEmail(session.user.email);
        }

        if(id === 'not found' || !id || id === ''){
            return {
                errors: { title: [''] },
                message: 'User not found.',
            };
        }

        // Insert data into the database
        try {
            await sql`
            INSERT INTO journals ( title, created_on, updated_on, locked, password, template, user_id)
            VALUES (${title}, ${date}, ${date}, ${locked === 'true'}, ${passwordFIeld}, ${parseInt(template)},${id})
            `;
        } catch (error) {
            // If a database error occurs, return a more specific error.
            console.log(error);

            return {
                errors: { title: [''] },
                message: 'Database Error: Failed to Create Journal.',
            };
        }
        revalidatePath('/dashboard/createJournal');
        redirect('/dashboard');
    } catch (error) {
        if (error instanceof z.ZodError) {
            return error.errors.map(e => e.message).join(', '); // Return validation errors
        }
        throw error; // Rethrow unexpected errors
    }

}


export async function verifyJournalPassword(journalId: string, password: string): Promise<boolean> {
    const journal_password = await getJournalPassword(journalId);
    
    if (journal_password.length === 0) {
        return false;
    }
    
    return bcrypt.compare(password, journal_password);
}