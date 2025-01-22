'use client'

import { useEffect, useState } from "react"
import { Button } from "./button"
import { getAllTimeZones } from "../lib/data"



export default function SignUpForm() {
    const [selectOptions, setSelectOptions ] = useState([]);

    useEffect(()=>{
        async function getData(){
            const data = await getAllTimeZones();
            console.log(data);
            setSelectOptions(data);
        }
        getData();
    },[selectOptions])

    return (
        <form className="p-10 w-full bg-transparent grid grid-cols-1 space-y-4">
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                type="text"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Name"
                required
            ></input>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Email"
                required
            ></input>
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Password"
                required
            ></input>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                className="text-white bg-gray-700 rounded h-10 mt-2 px-4 py-2 placeholder-gray-400"
                placeholder="Confirm Password"
                required
            ></input>
            <label htmlFor="time-zone">Time Zone</label>
            <select
             id="time-zone"
             name="time-zone"
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             required>
                {
                    selectOptions?.map((timezone,i)=>{
                        return <option value={timezone} key={i}>{timezone}</option>
                    })
                }
            </select>
            <Button className="w-fit">Sign up</Button>
        </form>
    )
}