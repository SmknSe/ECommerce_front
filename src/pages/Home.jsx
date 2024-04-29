import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
            <h2>HOME PAGE</h2>
            <Link to={'/auth'}>AUTH</Link>
            <ViewTransitionLink to={'/auth'}>AUTH</ViewTransitionLink>
        </>
    )
}
export default Home