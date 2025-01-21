import NavBar from "../ui/navbar"

export default function Dashboard() {
    return (
        <div>
            <NavBar/>
            <div className="h-screen bg-gray-900 text-white flex justify-center items-center">
                <h1 className="text-5xl">Dashboard</h1>
            </div>
        </div>
    )
}