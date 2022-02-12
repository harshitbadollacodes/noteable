import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { EditNote } from "./features/note/EditNote";
import { Note } from "./features/note/Note";
import { Login } from "./features/user/Login";
import { Signup } from "./features/user/Signup";
import { PrivateRoute } from "./Utils/PrivateRoute";

function App() {

    return (
        <div className="bg-gray-100 min-h-screen text-d-blue">
            <Navbar/>
            
            <Routes>
                <Route 
                    path="/" 
                    element={ 
                        <PrivateRoute>
                            <Note/> 
                        </PrivateRoute>
                    } 
                />

                <Route 
                    path="/note/:noteId" 

                    element={ 
                        <PrivateRoute>
                            <EditNote/>
                        </PrivateRoute>
                    } 
                />

                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />

            </Routes>

        </div>
    );
}

export default App;
