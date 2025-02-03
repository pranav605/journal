'use client'

import { useActionState, useEffect, useState } from "react"
import { Button } from "./button"
import { getAllTimeZones, getTimeZoneByIP } from "../lib/data"
import { signUp, State } from "../lib/actions"


export default function SignUpForm() {
    const initialState: State = { message: '', errors: {} };
    const [selectOptions, setSelectOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPicking, setIsPicking] = useState(false);
    const [formState, formAction] = useActionState<State | string, FormData>(signUp, initialState)

    async function getClientIp() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return null;
        }
    }

    async function pickTimezone(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsPicking(true);
        const ip = await getClientIp();
        const timezone = await getTimeZoneByIP(ip);

        if (timezone) {
            const timezoneOption = document.querySelector(`option[value='${timezone.timeZone}']`);
            if (timezoneOption) {
                (timezoneOption as HTMLOptionElement).selected = true;
            }
        }
        setIsPicking(false);
    }
    useEffect(() => {
        async function getData() {
            try {
                const data = await getAllTimeZones();
                setSelectOptions(data);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, [])



    return (
        <form action={formAction} className="p-10 py-5 w-full bg-transparent grid grid-cols-1 space-y-4">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Name"
                autoComplete="name"
                aria-describedby="name-error"
                required
            ></input>
            <div id="name-error" className={typeof formState !== 'string' && formState.errors?.name ? 'block':'hidden'} aria-live="polite" aria-atomic="true">
                {typeof formState !== 'string' && formState.errors?.name &&
                    formState.errors.name.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Email"
                autoComplete="email"
                aria-describedby="email-error"
                required
            ></input>
            <div id="email-error" className={typeof formState !== 'string' && formState.errors?.email ? 'block':'hidden'} aria-live="polite" aria-atomic="true">
                {typeof formState !== 'string' && formState.errors?.email &&
                    formState.errors.email.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Password"
                aria-describedby="password-error"
                required
            ></input>
            <div id="password-error" className={typeof formState !== 'string' && formState.errors?.password ? 'block':'hidden'} aria-live="polite" aria-atomic="true">
                {typeof formState !== 'string' && formState.errors?.password &&
                    formState.errors.password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Confirm Password"
                aria-describedby="confirm-password-error"
                required
            ></input>
            <div id="confirm-password-error" className={typeof formState !== 'string' && formState.errors?.confirm_password ? 'block':'hidden'} aria-live="polite" aria-atomic="true">
                {typeof formState !== 'string' && formState.errors?.confirm_password &&
                    formState.errors.confirm_password.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <div className="flex justify-between items-center">
                <label htmlFor="timezone">Time Zone</label>
                <div className="relative flex items-center gap-2">
                    <div className={`${isPicking ? "" : "hidden"} w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin`}></div>
                    <Button className="px-2 py-3 font-semibold text-gray-400 bg-transparent h-3 w-fit" onClick={(e) => pickTimezone(e)}>Pick automatically</Button>
                    <div className="group relative">
                        <span className="cursor-help text-gray-400">ℹ️</span>
                        <div className="invisible group-hover:visible absolute -top-32 right-0 w-64 p-4 bg-gray-800 text-gray-200 text-sm rounded-lg shadow-lg">
                            <p>We'll use your IP address to automatically detect your approximate location and timezone. This helps us maintain accurate timelines for your journal entries.</p>
                        </div>
                    </div>
                </div>
            </div>
            <select
                id="timezone"
                name="timezone"
                defaultValue={isLoading ? '' : ''}
                aria-describedby="timezone-error"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
            >
                <option value="" disabled>
                    {isLoading ? "Loading timezones..." : "Select a timezone"}
                </option>
                {selectOptions?.map((timezone, i) => (
                    <option value={timezone} key={i}>{timezone}</option>
                ))}
            </select>
            <div id="timezone-error" className={typeof formState !== 'string' && formState.errors?.timezone ? 'block':'hidden'} aria-live="polite" aria-atomic="true">
                {typeof formState !== 'string' && formState.errors?.timezone &&
                    formState.errors.timezone.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <Button className="w-fit">Sign up</Button>
        </form>
    )
}