import ViewTransitionLink from "@/components/ViewTransitionLink"

const Home = () => {

    return (
        <div className="flex flex-col gap-4">
            <h2>HOME PAGE</h2>
            <ViewTransitionLink to={'/login'}>AUTH</ViewTransitionLink>
            <ViewTransitionLink to={'/catalog'}>Catalog</ViewTransitionLink>
            <ViewTransitionLink to={'/profile'}>profile</ViewTransitionLink>
            
        </div>
    )
}
export default Home