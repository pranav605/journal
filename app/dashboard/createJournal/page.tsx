
import CreateJournalForm from "@/app/ui/dashboard_ui/create_journal_form";
import NavBar from "@/app/ui/navbar";

export default function CreateJournal() {
    return (
        <div>
            <NavBar />
            <div className="bg-gray-900 mx-10 text-white flex justify-center items-center">
                <CreateJournalForm />
            </div>
        </div>
    );
}