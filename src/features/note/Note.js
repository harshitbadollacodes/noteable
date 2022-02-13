import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "./noteSlice";
import { NoteCard } from "./NoteCard";
import { BsPinFill, BsPin } from "react-icons/bs";
import { addNote } from "./noteSlice"

export function Note() {

    const { token } = useSelector(state => state.user);
    const { notes } = useSelector(state => state.notes);

    const pinnedNotes = notes.filter(note => note.isPinned);
    const unpinnedNotes = notes.filter(note => !note.isPinned);
    
    const [form, setForm] = useState(false);

    const [noteTitle, setNoteTitle] = useState("");
    const [noteBody, setNoteBody] = useState("");
    const [isPinned, setIsPinned] = useState(false);
    const [bgColor, setBgColor] = useState("bg-l-yellow");
    
    const dispatch = useDispatch();

    function addNoteFormHandler() {
        
        setForm(false);

        setNoteTitle("");
        setNoteBody("");
        setIsPinned(false);
        setBgColor("bg-l-yellow");

        dispatch(addNote({ token, noteTitle, noteBody, isPinned, bgColor }));

    };

    function clearHandler() {
        setForm(false);

        setNoteTitle("");
        setNoteBody("");
        setIsPinned(false);
        setBgColor("bg-l-yellow");
    };

    useEffect(() => {
            dispatch(getAllNotes({token}));
    }, [dispatch, token]);

    return (
        <div className="custom-container flex flex-col items-center justify-center">

            {!form &&
                <button 
                    className="p-4 my-12 text-xl bg-white shadow-xl hover:shadow-none transition-all delay-300 rounded-xl md:w-1/2" 
                    onClick={() => setForm(true)} 
                >
                    Create a new note
                </button>
            }
            
            {form && 
                <div 
                    className={`${bgColor} rounded-lg flex flex-col md:w-1/2 my-8 justify-center items-center shadow-xl`}
                >
                    <form 
                        className={`p-4 w-full`}
                        onSubmit={(e) => addNoteFormHandler(e)}
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

                            <div 
                                onClick={clearHandler}
                                className="text-2xl s-btn text-center cursor-pointer"
                            >
                                Clear
                            </div>

                            <input
                                type="submit"
                                value="Add"
                                className="cursor-pointer p-btn"
                            />

                        </div>
                    </form>
                </div>
            }

            <div className="w-full">
                <h1 className="font-bold text-2xl">Pinned Notes</h1>
                    <NoteCard notes={pinnedNotes} />
            </div>

            <div className="w-full">
                <h1 className="font-bold text-2xl">Other Notes</h1>
                <NoteCard notes={unpinnedNotes}/>
            </div>

            
            
            


        </div>
    );
};