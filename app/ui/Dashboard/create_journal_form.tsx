'use client';

import { useState } from "react";
import { Card } from "./cards";

export default function CreateJournalForm() {
    const [isLocked, setIsLocked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIsLocked(e.target.checked);
    }

    function togglePasswordVisibility() {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    const [formData, setFormData] = useState({
        title: "",
        password: "",
        image: "1",
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <form className="p-10 w-full md:w-1/2 bg-transparent grid grid-cols-1 space-y-4">
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
            <label htmlFor="locked" className="flex items-center space-x-2">
                <input
                    id="locked"
                    name="locked"
                    type="checkbox"
                    className="h-5 w-5"
                    onChange={(e) => handleCheckboxChange(e)}
                />
                <span>Use a password</span>
            </label>
            {isLocked && (
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
            <label htmlFor="image">Select Image</label>
            <select
                id="image"
                name="image"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2"
                value={formData.image}
                onChange={handleInputChange}
            >
                <option value="1">Aquatic Blue</option>
                <option value="2">Abstract Purple</option>
                <option value="3">Summer Vibes</option>
                <option value="4">Brown Diary</option>
                <option value="5">Blue Diary</option>
                <option value="6">Petals Diary</option>
                <option value="7">Plants Diary</option>
                <option value="8">Line art Diary</option>
                <option value="9">Night Sky</option>
                <option value="10">Space Explorer</option>
            </select>
            <Card title={formData.title} createdon={new Date().toISOString().split('T')[0]} isLocked={isLocked} template={parseInt(formData.image)} />
             
            <button className="bg-blue-500 text-white rounded h-10 mt-2">Create Journal</button>
        </form>
    );
}