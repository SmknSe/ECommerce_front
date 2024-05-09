import ViewTransitionLink from "@/components/ViewTransitionLink"
import { Button } from "@/components/ui/button"
import { MonitorXIcon } from "lucide-react"

const NotFound = () => {
    return (

        <div className="flex h-3/4 flex-col gap-5 justify-center items-center max-w-[500px] m-auto">

            <MonitorXIcon className="h-10 w-10" />
            <span className="text-2xl flex align-middle">Oops!</span>
            <span className="text-xl text-center">Unfortunately, there is nothing here...</span>
            <Button><ViewTransitionLink to={'/'}>Back to main page</ViewTransitionLink></Button>

        </div>
    )
}

export default NotFound