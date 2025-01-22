
import { auth, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export default async function NavBar() {
    const session = await auth();
    return (
        <nav aria-label="Global" className="fixed z-50 bg-opacity-50 backdrop-blur-sm md:bg-opacity-100 md:backdrop-blur-none flex w-full items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
                <Link href="#" className="-m-1.5 p-1.5">
                    <Image
                        src={'/logo.png'}
                        width={100}
                        height={60}
                        className="w-auto h-auto"
                        alt="Journal"
                    />
                </Link>
            </div>

            <div className="lg:flex lg:flex-1 lg:justify-end">
                {session?.user ? 
                    <form action={async () =>{
                        'use server';
                        await signOut({redirectTo:'http://localhost:3000/'});
                        
                    }}>
                        <Button className="px-6 py-3 font-semibold text-gray-400" >Sign out</Button>
                    </form>
                     :
                    <Link
                        href="/login"
                        className="px-6 py-3 font-semibold text-gray-400 "
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                }
            </div>
        </nav>
    )
}