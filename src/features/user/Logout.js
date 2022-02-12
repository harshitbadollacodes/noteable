import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { logoutUser } from "./userSlice";

export function Logout() {

    const { firstName } = useSelector(state => state.user);
    const disptach = useDispatch();

    function logoutHandler() {
        disptach(logoutUser());
    };

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2">

            <h1 className="text-2xl my-4 text-center">Hello {firstName}, you are logged in. Want to logout?</h1>

            <button 
                className="p-btn"
                onClick={logoutHandler}
            >
                Logout
            </button>
            
        </div>
    )
}