import { useContext } from "react"
import { AuthContext } from "./AuthContext"

const Protected = ({ children }) => {
    const { loggedIn } = useContext(AuthContext)
    if (loggedIn === true) return children
    if (loggedIn === false) return <Navigate to={'/auth'} />
    return <></>
}

export default Protected