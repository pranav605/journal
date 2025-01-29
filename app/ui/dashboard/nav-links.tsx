'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Entry } from '@/app/lib/definitions';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks({entries, journalId}: {entries: Entry[], journalId: string}) {
  const pathname = usePathname();
  return (
    <>
        <Link 
            key={'new'}
            href={`/dashboard/${journalId}/new`}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  'bg-sky-100 text-blue-600' : pathname === `/dashboard/${journalId}/new`,
                },
              )}
        >
            <p className="hidden md:block">New Entry</p>
        </Link>
      {entries.map((entry) => {
        return (
          <Link
            key={entry.id}
            href={`/dashboard/${journalId}/${entry.id}`}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600' : pathname === `/dashboard/${journalId}/${entry.id}`,
              },
            )}
          >
            <p className="hidden md:block">{new Date(entry.created_on).toDateString()}</p>
          </Link>
        );
      })}
    </>
  );
}