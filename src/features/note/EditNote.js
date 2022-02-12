import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"
import { getNote, editNote } from "./noteSlice";
import { BsPinFill, BsPin } from "react-icons/bs";

export function EditNote() {

    const { token } = useSelector(state => state.user);
    const { note, status } = useSelector(state => state.notes);

    const [noteTitle, setNoteTitle] = useState(note?.noteTitle);
    const [noteBody, setNoteBody] = useState(note?.noteBody);
    const [isPinned, setIsPinned] = useState(note?.isPinned);
    const [bgColor, setBgColor] = useState(note?.bgColor);

    console.log(noteTitle, noteBody, isPinned, bgColor);

    console.log(note);

    const {noteId} = useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function editNoteFormHandler(e) {
        e.preventDefault();

        dispatch(editNote({ token, noteId, noteTitle, noteBody, isPinned, bgColor }));

        if (status === "fulfilled") {
            navigate("/")
        }

    };

    useEffect(() => {
        dispatch(getNote({token, noteId}));
    }, [dispatch, token, noteId]);

    return (
        <div className="custom-container flex flex-col items-center">

            <h1 className="mt-8 text-2xl font-bold">Edit Note</h1>

            <div 
                className={`${bgColor} rounded-lg flex flex-col md:w-1/2 my-8 justify-center items-center shadow-xl`}
            >
                <form 
                    className={`p-4 w-full`}
                    onSubmit={(e) => editNoteFormHandler(e)}
                >
                    <div className="flex justify-between w-full mb-2">
                        <div className="flex flex-col w-[90%]">
                            <input 
                                type="text"
                                className={`${bgColor} py-2 text-black focus:outline-none`}
                                placeholder="Note title"
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                            />

                            <input 
                                type="text"
                                className={`${bgColor} py-2 text-black focus:outline-none`}
                                placeholder="What do you want to note down?"
                                value={noteBody}
                                onChange={(e) => setNoteBody(e.target.value)}
                            />

                        </div>

                            <div
                                className="cursor-pointer"
                                onClick={() => setIsPinned(!isPinned)}
                            >
                                {
                                    isPinned 
                                    ? <BsPinFill size={24}/> 
                                    : <BsPin size={24} />
                                }
                            </div>
                    </div>
                    
                    <div className="flex items-center justify-around">
                        <div 
                            className="flex"
                            onClick={(e) => setBgColor(e.target.dataset.color)}
                        >
                            <div 
                                data-color="bg-l-red" 
                                className="w-6 h-6 rounded-full border border-black bg-l-red cursor-pointer"
                            >
                            </div>

                            <div 
                                data-color="bg-white" 
                                className="w-6 h-6 ml-1 rounded-full border border-black bg-white cursor-pointer"
                            >
                            </div>

                            <div 
                                data-color="bg-b-blue" 
                                className="w-6 h-6 ml-1 cursor-pointer rounded-full border border-black bg-b-blue"
                            >
                            </div>

                            <div 
                                data-color="bg-l-yellow" 
                                className="w-6 h-6 ml-1 rounded-full border border-black bg-l-yellow cursor-pointer"
                            >
                            </div>

                        </div>

                        <input
                            type="submit"
                            value="Save"
                            className="cursor-pointer p-btn"
                        />

                    </div>
                </form>
            </div>
        </div>
    )
}

