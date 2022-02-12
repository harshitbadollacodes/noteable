import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function NoteCard() {

    const { notes } = useSelector(state => state.notes);

    return (
        <ul className="flex flex-wrap w-full">
            
            {notes && notes.map(note => (
                <li 
                    key={note._id}
                    className={`${note.bgColor} w-full md:w-[47%] m-2`}
                >
                    <Link to={`note/${note._id}`}>
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
                                <div 
                                    className="flex"
                                    // onClick={(e) => setBgColor(e.target.dataset.color)}
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

                            <div className="text-2xl border border-black s-btn text-center cursor-pointer">
                                Edit
                            </div>
                        </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

