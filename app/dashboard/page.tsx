import CardsContainer from "../ui/Dashboard/cards"
import NavBar from "../ui/navbar"

export default function Dashboard() {
    return (
        <div>
            <NavBar/>
            <div className=" bg-gray-900 mx-10 text-white ">
                <CardsContainer/>
                
            </div>
        </div>
    )
}