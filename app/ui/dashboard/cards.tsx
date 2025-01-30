'use client';
import { Journal } from "@/app/lib/definitions"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react";
import { PasswordModal } from "./password_model";
export default function CardsContainer({ journals }: { journals: Journal[] }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null);

    const handleCardClick = (journalId: string) => {
        setSelectedJournalId(journalId);
        setShowModal(true);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-gray-900 text-white ">
                {journals.map((journal) => {
                    const formattedDate = new Date(journal.created_on).toISOString().split('T')[0];
                    if (journal.locked) {
                        return (
                            <div key={journal.id} onClick={() => handleCardClick(journal.id)}>
                                <Card title={journal.title} createdon={formattedDate} isLocked={journal.locked} template={journal.template} />
                            </div>
                        )
                    } else {
                        return (
                            <Link key={journal.id} href={`/dashboard/${journal.id}/new`}>
                                <Card title={journal.title} createdon={formattedDate} isLocked={journal.locked} template={journal.template} />
                            </Link>
                        )
                    }
                })}
                <NewJounralCard title="Journal" createdon="2025-01-23" />
            </div>
            {showModal && selectedJournalId && (
                <PasswordModal journalId={selectedJournalId} onClose={() => setShowModal(false)} />
            )}
        </div>
    )
}
export function Card({ title, createdon, isLocked, template }: { title: string, createdon: string, isLocked: boolean, template: number }) {
    return (
        <div className="relative group hover:cursor-pointer active:scale-95">
            <div className={clsx("absolute inset-0 rounded-md blur-md w-52 h-64 sm:w-52 sm:h-64 md:w-52 md:h-64 lg:w-60 lg:h-80 bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500 z-10 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300")}></div>
            <div className={clsx("relative rounded-xl w-52 h-64 sm:w-52 sm:h-64 md:w-52 md:h-64 lg:w-60 lg:h-80 z-20 bg-cover bg-center",
                { "bg-[url('/cover_1.jpg')] text-white": template === 1 },
                { "bg-[url('/cover_2.jpg')] text-white": template === 2 },
                { "bg-[url('/cover_3.jpg')] text-cyan-600": template === 3 },
                { "bg-[url('/cover_4.jpg')] text-orange-200": template === 4 },
                { "bg-[url('/cover_5.jpg')] text-white": template === 5 },
                { "bg-[url('/cover_6.jpg')] text-cyan-800": template === 6 },
                { "bg-[url('/cover_7.jpg')] text-green-950": template === 7 },
                { "bg-[url('/cover_8.jpg')] text-violet-200": template === 8 },
                { "bg-[url('/cover_9.jpg')] text-white": template === 9 },
                { "bg-[url('/cover_10.jpg')] text-white": template === 10 },
            )}>
                <div className="p-10 flex flex-col justify-center items-center">
                    <h1 className="text-2xl truncate w-full text-center">{title}</h1>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {title}
                    </div>
                    <p>{createdon}</p>
                </div>
                {isLocked ? (
                    <div className="absolute top-4 left-5 rounded-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                ) : (
                    <div className="absolute top-4 left-5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    )
}


export function NewJounralCard({ title, createdon }: { title: string, createdon: string }) {
    return (
        <Link href={'/dashboard/createJournal'} className="bg-gray-800 hover:cursor-pointer rounded-xl w-52 h-64 sm:w-52 sm:h-64 md:w-52 md:h-64 lg:w-60 lg:h-80 border-4 border-dotted border-gray-600 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl">+</h1>
                <p>Create a Journal</p>
            </div>
        </Link>
    )
}
