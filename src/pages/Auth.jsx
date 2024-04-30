import { useContext, useState } from "react"
import transition from "../lib/transition"
import axios from "axios"
import { AuthContext } from "../components/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SignUpForm from "@/components/SignUpForm"
import SignInForm from "@/components/SignInForm"

const Auth = () => {
    const [isSignUp, setSignUp] = useState(false)
    const url = 'http://localhost/api/auth'
    // const { checkLoginState } = useContext(AuthContext)


    // const authenticate = async (e) => {
    //     // e.preventDefault()
    //     transition(() => setError(null))
    //     transition(() => setIsLoading(true))
    //     try {
    //         if (!isSignUp) {
    //             await axios.post(`${url}/login`, {
    //                 email: userData.email,
    //                 password: userData.password
    //             })
    //         }
    //         else {
    //             if (userData.password !== userData.passwordConfirmation) {
    //                 transition(() => setError({
    //                     response: {
    //                         data: {
    //                             message: 'Passwords must be equal'
    //                         }
    //                     }
    //                 }))

    //             }
    //             else {
    //                 await axios.post(`${url}/register`, {
    //                     username: userData.username,
    //                     email: userData.email,
    //                     password: userData.password,
    //                 })
    //                 transition(() => setIsSignUp(false))
    //             }

    //         }
    //     }
    //     catch (err) { setError(err) }
    //     finally {
    //         checkLoginState()
    //         transition(() => setIsLoading(false))
    //     }
    // }
    return (
        <>
            {isSignUp ? (
                <SignUpForm />
            ) : (
                <SignInForm />
            )}

        </>
    )

}

export default Auth