import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { logoutUser } from "./userSlice";

export function Logout() {

    const { firstName } = useSelector(state => state.user);
    const disptach = useDispatch();

    function logoutHandler() {
        disptach(logoutUser());
    };

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2">

            <h1 className="text-2xl my-4 text-center">Hello {firstName}, you are logged in.</h1>

            <div className="flex">
                <NavLink
                        to="/"
                        className="p-btn"
                    >
                        View Notes
                </NavLink>

                <button 
                    className="p-btn ml-2"
                    onClick={logoutHandler}
                >
                    Logout
                </button>

                
            </div>
        </div>
    )
}