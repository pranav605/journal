'use client';

import { useActionState, useEffect, useState } from "react";
import { Card } from "./cards";
import Link from "next/link";
import { addJournal, JournalForm } from "@/app/lib/actions";

export default function CreateJournalForm() {
    const initialState: JournalForm = { message: '', errors: {} };
    const [showPassword, setShowPassword] = useState(false);
    const [formState, formAction] = useActionState<JournalForm | string, FormData>(addJournal, initialState);

    function togglePasswordVisibility() {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const [formData, setFormData] = useState({
        title: "",
        password: "",
        template: "1",
        locked: false,
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        // console.log(name, value, type, checked);

        setFormData((prevData) => ({
            ...prevData,
            [name == 'locked_checkbox' ? 'locked' : name]: type === 'checkbox' ? checked : value,
        }));
    }

    // useEffect(() => {
    //     console.log(formState)
    // }, [formState])

    return (
        <form action={formAction} className=" w-full md:w-1/2 bg-transparent grid grid-cols-1 space-y-4">
            <label htmlFor="title">Title</label>
            <input
                id="title"
                name="title"
                type="text"
                placeholder="Title"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                required
                value={formData.title}
                onChange={handleInputChange}
            />
            <label htmlFor="locked_checkbox" className="flex items-center space-x-2">
                <input
                    id="locked_checkbox"
                    name="locked_checkbox"
                    type="checkbox"
                    className="h-5 w-5"
                    checked={formData.locked}
                    onChange={(e) => handleInputChange(e)}
                />
                <span>Use a password</span>
            </label>

            {formData.locked && (
                <>
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="text-white w-full bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 top-2 text-sm text-gray-400"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </>
            )}
            <label htmlFor="template">Select Image</label>
            <select
                id="template"
                name="template"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2"
                value={formData.template}
                onChange={handleInputChange}
            >
                <option value={1}>Aquatic Blue</option>
                <option value={2}>Abstract Purple</option>
                <option value={3}>Summer Vibes</option>
                <option value={4}>Brown Diary</option>
                <option value={5}>Blue Diary</option>
                <option value={6}>Petals Diary</option>
                <option value={7}>Plants Diary</option>
                <option value={8}>Line art Diary</option>
                <option value={9}>Night Sky</option>
                <option value={10}>Space Explorer</option>
            </select>
            <input
                type="hidden"
                id="date"
                name="date"
                value={new Date().toISOString().split('T')[0]}
            />
            {!formData.locked && (
                <input
                    type="hidden"
                    id="password"
                    name="password"
                    value=""
                />
            )}
            <input
                type="hidden"
                id="locked"
                name="locked"
                value={formData.locked ? "true" : "false"}
            />
            <Card title={formData.title} createdon={new Date().toISOString().split('T')[0]} isLocked={formData.locked} template={parseInt(formData.template)} />

            <div className="flex w-full justify-center items-center space-x-10">
                <button className="bg-blue-500 w-1/2 text-white rounded h-10 px-4">Create Journal</button>
                <Link href={'/dashboard'} className="bg-transparent w-1/2 border border-white text-white rounded h-10 px-4 flex items-center justify-center">Cancel</Link>
            </div>
        </form>
    );
}