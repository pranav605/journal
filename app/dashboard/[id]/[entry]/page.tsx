import { getJournalEntry } from "@/app/lib/data";
import Editor from "@/app/ui/dashboard/editor";

export default async function EditEntry({params}: {params: Promise<{ id: string, entry: string }>}) {
    const id = await params.then((data) => data.id);
    const entryId = await params.then((data) => data.entry);
    const entry = await getJournalEntry(id, entryId);
    return(
        <div>
            <Editor entry={entry} journalId={id} mode="edit"/>
        </div>
    )
}