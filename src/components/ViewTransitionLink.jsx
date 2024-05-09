import useViewNavigate from "@/lib/hooks/viewNavigate";
import { Link, Navigate, useLocation } from "react-router-dom";

const ViewTransitionLink = ({ to, children, options }) => {
    const navigate = useViewNavigate()
    const location = useLocation()
    return (
        <Link
            href={to}
            onClick={(ev) => {
                ev.preventDefault();
                if (to != location.pathname)
                    navigate(to, options)
            }}
        >
            {children}
        </Link>
    );
};

export default ViewTransitionLink