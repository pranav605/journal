import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function SideNav({ entries, journalId }: { entries: any, journalId: string }) {
    return (
        <div className="flex h-full flex-row sm:flex-col px-3 py-4 md:px-2">
            
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 overflow-y-auto">
            <Link
                className="mb-2 sm:flex items-end justify-start rounded-md bg-gray-800 p-3 text-white hover:bg-blue-700"
                href="/dashboard"
            >
                <ArrowLeftIcon className='w-6 md:mr-2'/>
                <div className="hidden md:block w-32 text-sm font-semibold md:w-40">
                    Back to Dashboard
                </div>
            </Link>
                    <NavLinks entries={entries} journalId={journalId} />
                    <form className=' block md:hidden'
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </form>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-800 md:block"></div>
            </div>
            <form className='space-y-2 hidden md:block'
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Sign Out</div>
                </button>
            </form>
        </div>
    );
}