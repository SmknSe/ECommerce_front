import transition from "@/lib/transition";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

const ViewTransitionLink = ({ to, children }) => {
    const navigate = useNavigate();
    return (
        <a
            href={to}
            onClick={(ev) => {
                ev.preventDefault();
                transition(() => {
                    flushSync(() => {
                        navigate(to)
                    });
                })
            }}
        >
            {children}
        </a>
    );
};

export default ViewTransitionLink