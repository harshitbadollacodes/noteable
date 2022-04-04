import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteNote } from "./noteSlice";

export function NoteCard({notes}) {

    const { token } = useSelector(state => state.user);

    const dispatch = useDispatch();

    function deleteNoteHandler(token, noteId) {
        dispatch(deleteNote({token, noteId}))
    }

    return (
        <ul className="flex flex-wrap w-full">
            
            {notes && notes.map(note => (
                <li 
                    key={note._id}
                    className={`${note.bgColor} w-full md:w-[47%] m-2 flex`}
                >
                    <div className="p-4 flex flex-col w-full">
                        <h1 className={`${note.bgColor} text-2xl font-bold capitalize py-2 text-black`}>
                            {note.noteTitle ? note.noteTitle : "Untitled Note"}
                        </h1>

                        { note.imageURL && <img src={note.imageURL} alt={note.noteTitle}/> }
                        
                        <p className="grow capitalize">
                            {note.noteBody}
                        </p>

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

