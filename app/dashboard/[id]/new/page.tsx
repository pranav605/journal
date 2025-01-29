import Editor from "@/app/ui/dashboard/editor";

export default async function NewEntry({params}: {params: Promise<{ id: string }>}) {
    const id = await params.then((data) => data.id);
    return(
        <div>
            <Editor entry={''} journalId={id} mode="new"/>
        </div>
    )
}