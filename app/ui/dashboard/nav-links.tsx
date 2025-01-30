'use client';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Entry } from '@/app/lib/definitions';
import { useState } from 'react';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function NavLinks({ entries, journalId }: { entries: Entry[], journalId: string }) {
  const pathname = usePathname();
  const [selected, setSelected] = useState('new');
  return (
    <>
      <div className="flex w-full md:hidden">
        <select
          className="w-full rounded-md bg-gray-800 text-white p-2 outline-none focus:outline-none"
          value={pathname === `/dashboard/${journalId}/new` ? 'new' : pathname.split('/').pop()}
          onChange={(e) => {
            let entryId = e.target.value;
            if (entryId != 'new') {
              redirect(`/dashboard/${journalId}/${entryId}`);
            } else if (entryId == 'new') {
              redirect(`/dashboard/${journalId}/new`);
            }
          }}
        >
          <option key={'new'} value={'new'}>
            New
          </option>
          {entries.map((entry: any) => (
            <option key={entry.id} value={entry.id}>
              {new Date(JSON.parse(entry.created_on).dateTime).toDateString()}
            </option>
          ))}
        </select>
      </div>
      <div className='hidden md:block md:space-y-2'>
        <Link
          key={'new'}
          href={`/dashboard/${journalId}/new`}
          className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
            {
              'bg-sky-100 text-blue-600': pathname === `/dashboard/${journalId}/new`,
            },
          )}
        >
          <p className="block">New Entry</p>
        </Link>
        {entries.map((entry) => {
          return (
            <Link
              key={entry.id}
              href={`/dashboard/${journalId}/${entry.id}`}
              className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-800 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  'bg-sky-100 text-blue-600': pathname === `/dashboard/${journalId}/${entry.id}`,
                },
              )}
            >
              <p className="block">{new Date(JSON.parse(entry.created_on).dateTime).toDateString()}</p>
            </Link>
          );
        })}
      </div></>
  );
}