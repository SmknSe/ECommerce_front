import { AuthContext } from "@/components/AuthContext"
import ViewTransitionLink from "@/components/ViewTransitionLink"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {
    const { user } = useContext(AuthContext)
    useEffect(() => {
        console.log(user);
    }, [user])
    return (
        <>
            {JSON.stringify(user)}
            <h2>HOME PAGE</h2>
            <Link to={'/auth'}>AUTH</Link>
            <ViewTransitionLink to={'/auth'}>AUTH</ViewTransitionLink>

        </>
    )
}
export default Home