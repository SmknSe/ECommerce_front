import { useLocation, useNavigate } from "react-router-dom";
import transition from "../transition";
import { flushSync } from "react-dom";
import { useEffect } from "react";

const useViewNavigate = () => {
    const navigate = useNavigate()
    return (to) => {
        transition(() => {
            flushSync(() => {
                navigate(to)
            })
        })
    }
}

export default useViewNavigate
