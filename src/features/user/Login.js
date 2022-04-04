import { LoginForm } from "./LoginForm";
import notes from "../../images/notes.webp";
import { useSelector } from "react-redux";
import { Logout } from "./Logout";

export function Login() {

    const { token } = useSelector(state => state.user);

    return (
        <div className="flex flex-col lg:flex-row">
            <img 
                src={notes} 
                alt="notes"
                className="lg:w-1/2 lg:h-screen"
            />
            { token ? <Logout/> : <LoginForm/> }
        </div>

    )
}
