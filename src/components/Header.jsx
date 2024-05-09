import { useLocation } from "react-router-dom"
import ViewTransitionLink from "./ViewTransitionLink"
import { User } from "lucide-react"

const Header = () => {
    const location = useLocation()
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <ViewTransitionLink to='/'>
                    <div className="flex gap-3">
                        <img src="sofa512x.png" className="h-7" alt="" />
                        <span className="text-xl font-medium">
                            Furniture Shop
                        </span>
                    </div>
                </ViewTransitionLink>

                {!['/login', '/signup', '/profile'].includes(location.pathname) && (
                    <ViewTransitionLink to='/profile'>
                        <User size={28} />
                    </ViewTransitionLink>
                )}
            </div>
        </header>
    )
}

export default Header
