import axios from "axios"
import { createContext, memo, useCallback, useEffect, useState } from "react"
import transition from "../lib/transition"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const url = 'http://localhost/api/auth'
    const checkLoginState = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/info`)
            if (response.status === 200) {
                setLoggedIn(true)
                setUser(response.data)
            }
        }
        catch (err) {
            setLoggedIn(false)
            setUser(null)
        }
    }, [])

    useEffect(() => {
        checkLoginState()
    }, [checkLoginState])

    return <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>{children}</AuthContext.Provider>
}
const AuthContextProviderr = memo(AuthContextProvider)
export default AuthContextProviderr