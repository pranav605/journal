import Link from "next/link";
import { Button } from "../ui/button";
import LoginForm from "../ui/logix-form";

export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-transparent rounded-xl bg-gradient-to-b from-blue-400 to-purple-500 bg-clip-border p-1 h-fill w-4/5 md:w-1/4">
                <div className="bg-gray-900 h-full p-10 rounded-xl">
                <LoginForm/>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <p className="text-l">Register to start securing your memories, <Link href={'/signup'} className="text-blue-200">Sign up</Link></p>
                </div>
            </div>
        </div>
    )
}