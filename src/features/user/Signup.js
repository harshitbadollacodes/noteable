import { SignupForm } from "./SignupForm";
import notes from "../../images/notes.webp";

export function Signup() {

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
                <img 
                    className="w-full lg:h-screen"
                    src={notes} 
                    alt="notes" 
                />
            </div>

            <div className="lg:w-1/2">
                <SignupForm/>
            </div>
        </div>
    );
}