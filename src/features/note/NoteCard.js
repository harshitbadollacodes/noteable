import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "./noteSlice";

export function NoteCard() {

    const { token } = useSelector(state => state.user);
    const { notes } = useSelector(state => state.notes);

    const dispatch = useDispatch();

    function deleteNoteHandler(token, noteId) {
        dispatch(deleteNote({token, noteId}))
    }

    return (
        <ul className="flex flex-wrap w-full">
            
            {notes && notes.map(note => (
                <li 
                    key={note._id}
                    className={`${note.bgColor} w-full md:w-[47%] m-2`}
                >
                    <div
                        className={`p-4 w-full`}
                    >
                        <div className="flex justify-between w-full mb-2">
                            <div className="flex flex-col w-[90%]">
                                <h1 className={`${note.bgColor} text-2xl font-bold capitalize py-2 text-black`}>
                                    {note.noteTitle}
                                </h1>
                                
                                <p className="capitalize">
                                    {note.noteBody}
                                </p>
                            </div>
                        </div>
                
                        <div className="flex items-center justify-between">
                        
                        <BsTrash 
                            size={24} 
                            className="hover:text-red-700 cursor-pointer"
                            onClick={() => deleteNoteHandler(token, note._id)}
                        />

                        <Link to={`note/${note._id}`}>
                            <div className="text-2xl border border-black s-btn text-center cursor-pointer">
                                Edit
                            </div>
                        </Link>

                    </div>
                    </div>
                
            </li>
        ))}
    </ul>
);
}

