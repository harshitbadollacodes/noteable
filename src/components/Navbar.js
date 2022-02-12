import { Link } from "react-router-dom";
import notebook from "../images/notebook.png";

export function Navbar() {


    return (
        <div className="bg-white shadow-xl p-4">
            <div className="custom-container flex justify-between items-center">
                <Link to="/" className="flex">
                    <img src={notebook} alt="notebook" className="w-8" />
                    <h1 className="font-bold text-3xl">Noteable</h1>
                </Link>
                
                <ul className="flex">
                    <li className="text-xl">
                        <Link to="/login">Account</Link>
                    </li>
                </ul>


            </div>
        </div>
    )
}

