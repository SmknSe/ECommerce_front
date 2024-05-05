import { useContext } from "react"
import { useLocation, } from "react-router-dom"
import { AuthContext } from "./AuthContext"

const Header = () => {
    const { user, loggedIn } = useContext(AuthContext)
    const location = useLocation()
    const { pathname } = location
    return (
        <header className="w-full min-h-[50px] p-3 bg-card flex items-center justify-between">
            <span className="text-xl">
                Furniture Store
            </span>
        </header>
    )
}

export default Header
