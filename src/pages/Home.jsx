import ViewTransitionLink from "@/components/ViewTransitionLink"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

const Home = () => {

    return (
        <div className="flex flex-col gap-4">
            <h2>HOME PAGE</h2>
            <ViewTransitionLink to={'/login'}>AUTH</ViewTransitionLink>
            <ViewTransitionLink to={'/catalog'}>Catalog</ViewTransitionLink>
            <ViewTransitionLink to={'/products/storage'}>storage</ViewTransitionLink>
            <ViewTransitionLink to={'/profile'}>profile</ViewTransitionLink>
            
        </div>
    )
}
export default Home