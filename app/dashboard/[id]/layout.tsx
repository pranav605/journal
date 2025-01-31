import { getJournalEntries } from '@/app/lib/data';
import SideNav from '@/app/ui/dashboard/sidenav';

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) {
  const id = await params.then((data) => data.id);
  let entries = [];
  entries = await getJournalEntries(id);
  return (
    <>
      <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav entries={entries} journalId={id} />
        </div>
        <div className="flex flex-col h-screen flex-grow  md:overflow-y-auto ">
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}