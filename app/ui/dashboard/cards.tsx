'use client';
import { Journal } from "@/app/lib/definitions"
import clsx from "clsx"
import Link from "next/link"
import { useEffect, useState } from "react";
import { PasswordModal } from "./password_model";
import {TrashIcon, LockClosedIcon, LockOpenIcon} from '@heroicons/react/24/outline';

export function DeleteConfirmationModal({ 
    isOpen, 
    onClose, 
    onConfirm 
}: { 
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void; 
}) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold text-white">Journal</h2>
            <p className="mt-2 text-gray-400">Are you sure you want to delete this journal?</p>
            <div className="mt-4 flex justify-center space-x-2 items-center">
                <button 
                className="px-4 py-2 bg-transparent rounded-md hover:bg-gray-400"
                onClick={onClose}
                >
                Cancel
                </button>
                <button 
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => {
                    onConfirm();
                    onClose();
                }}
                >
                Delete
                </button>
            </div>
            </div>
        </div>
    );
}


export default function CardsContainer({ journals }: { journals: Journal[] }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedJournalId, setSelectedJournalId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [journalToDelete, setJournalToDelete] = useState<string | null>(null);

    const handleCardClick = (journalId: string) => {
        setSelectedJournalId(journalId);
        setShowModal(true);
    };

    const handleDeleteClick = (journalId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering parent click
        e.preventDefault();  // Prevent navigation
        setJournalToDelete(journalId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        console.log(`Journal ${journalToDelete} deleted`);
        setJournalToDelete(null);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-gray-900 text-white">
                {journals.map((journal) => {
                    const formattedDate = new Date(journal.created_on).toISOString().split('T')[0];
                    return journal.locked ? (
                        <div key={journal.id} onClick={() => handleCardClick(journal.id)}>
                            <Card 
                                title={journal.title} 
                                createdon={formattedDate} 
                                isLocked={journal.locked} 
                                template={journal.template}
                                onDelete={(e) => handleDeleteClick(journal.id, e)}
                            />
                        </div>
                    ) : (
                        <Link key={journal.id} href={`/dashboard/${journal.id}/new`}>
                            <Card 
                                title={journal.title} 
                                createdon={formattedDate} 
                                isLocked={journal.locked} 
                                template={journal.template}
                                onDelete={(e) => handleDeleteClick(journal.id, e)}
                            />
                        </Link>
                    );
                })}
                <NewJounralCard title="Journal" createdon="2025-01-23" />
            </div>

            {showModal && selectedJournalId && (
                <PasswordModal journalId={selectedJournalId} onClose={() => setShowModal(false)} />
            )}

            <DeleteConfirmationModal 
                isOpen={showDeleteModal} 
                onClose={() => setShowDeleteModal(false)} 
                onConfirm={handleConfirmDelete} 
            />
        </div>
    );
}
export function Card({ title, createdon, isLocked, template, onDelete }: { title: string, createdon: string, isLocked: boolean, template: number,  onDelete: (e: React.MouseEvent) => void;  }) {

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

                {/* Lock Icon */}
                {isLocked ? (
                    <div className="absolute top-4 left-5 rounded-full" onClick={(e) => e.stopPropagation()}>
                        <LockClosedIcon className="h-5 w-5" />
                    </div>
                ) : (
                    <div className="absolute top-4 left-5 rounded-full" onClick={(e) => e.stopPropagation()}>
                        <LockOpenIcon className="h-5 w-5" />
                    </div>
                )}

                {/* Delete Icon */}
                <div className="absolute top-4 right-5" onClick={onDelete}>
                    <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"/>
                </div>
            </div>
        </div>
    );
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
