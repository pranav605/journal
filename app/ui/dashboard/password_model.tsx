'use client';

import { verifyJournalPassword } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import { useState } from "react";

export function PasswordModal({ journalId, onClose }: { journalId: string, onClose: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Add your password verification logic here
        console.log(`Password for journal ${journalId}: ${password}`);
        const passwordMatch = await verifyJournalPassword(journalId, password);
        console.log(`Password match: ${passwordMatch}`);
        if (passwordMatch) {
            redirect(`/dashboard/${journalId}/new`);
        } else {
            setError("Invalid Password");
        }
        // onClose();
    };

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 p-6 rounded-md">
                <h2 className="text-xl mb-4">Enter Password</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400 w-full mb-4"
                        placeholder="Password"
                    />
                    <p className="text-red-500 text-sm mb-4 w-full" aria-live="polite"
                        aria-atomic="true">{error}</p>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Submit
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
