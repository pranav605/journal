'use client'

import Image from "next/image"
import SignUpForm from "../ui/signup-form"
import Link from "next/link"

export default function SignUp() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto h-screen bg-gray-900 text-white">
            <div className="hidden md:flex md:flex-col justify-center items-center">
                <div className="relative">
                    <div className="absolute -inset-4 rounded-md blur-md bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 z-10"></div>
                    <Image
                        src={'/girl2.jpg'}
                        alt="Registration image"
                        width={500}
                        height={500}
                        className="relative rounded z-20 w-auto h-auto scale-x-[-1] "
                    />
                </div>
                <p className="pt-8">Sign up and begin your journey with Journal</p>
            </div>

            <div className="flex justify-center items-center  h-full p-10 max-w-2xl">
                <div className="bg-transparent rounded-xl bg-gradient-to-b from-blue-400 to-purple-500 bg-clip-border p-1 h-fill w-full">
                    <div className="bg-gray-900 h-full rounded-xl">
                        <SignUpForm />
                        <div className="px-10 pb-10">
                            <hr className="h-px mb-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <p className="text-l text-center">Already registered? <Link href={'/login'} className="text-blue-200">Login</Link> and start storing your memories</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}