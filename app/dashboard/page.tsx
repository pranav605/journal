import { auth } from "@/auth";
import { getJournals, getUserIdByEmail } from "../lib/data";
import CardsContainer from "../ui/dashboard/cards"
import NavBar from "../ui/navbar"

export default async function Dashboard() {
    let id = '';
    const session = await auth();
    if (session && session.user && session.user.email) {
        id = await getUserIdByEmail(session.user.email);
    }
    const journals = await getJournals(id);
    // console.log(journals);
    
    return (
        <div>
            <NavBar />
            <div className=" bg-gray-900 mx-10 text-white ">
                <CardsContainer journals={journals.rows}/>

            </div>
        </div>
    )
}