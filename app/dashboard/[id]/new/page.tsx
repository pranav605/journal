import Editor from "@/app/ui/dashboard_ui/editor";

export default async function NewEntry({params}: {params: Promise<{ id: string }>}) {
    const id = await params.then((data) => data.id);
    return(
        <div>
            <Editor journalId={id}/>
        </div>
    )
}