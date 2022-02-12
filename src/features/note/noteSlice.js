import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/config";

export const getAllNotes = createAsyncThunk(
    "note/getAllNotes",
    async ({token}) => {
        const response = await axios.get(`${API}/notes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.data);
        return response.data;
    }
);

export const addNote = createAsyncThunk(
    "note/addNote",
    async ({token, noteTitle, noteBody, isPinned, bgColor}) => {
        
        const response = await axios.post(`${API}/notes/new`, {
            token,
            noteTitle,
            noteBody,
            isPinned, 
            bgColor
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response);
        return response.data
    }
);

export const getNote = createAsyncThunk(
    "note/getNote",
    async ({token, noteId}) => {
        const response = await axios.get(`${API}/notes/${noteId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    }
);

export const editNote = createAsyncThunk(
    "note/editNote",
    async ({token, noteId, noteTitle, noteBody, isPinned, bgColor}) => {
        const response = await axios.post(`${API}/notes/edit/${noteId}`, {
            noteTitle, 
            noteBody,
            isPinned, 
            bgColor
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }
)


export const noteSlice = createSlice({
    name: "note",
    initialState: {
        status: "idle",
        notes: [],
        note: null,
        error: ""
    },
    
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            state.error = null;
        },
    },

    extraReducers: {
        [getAllNotes.pending]: (state) => {
            state.status = "loading"
        },
        [getAllNotes.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.notes = action.payload.allNotes.notes
        },
        [getAllNotes.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        },

        [addNote.fulfilled]: (state, action) => {
            state.status =  "fulfilled";
            state.notes = action.payload.userNotes.notes;
        },

        [getAllNotes.pending]: (state) => {
            state.status = "loading";
        },

        [getNote.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.note = action.payload.note
        },

        [editNote.pending]: (state) => {
            state.status = "loading";
        },

        [editNote.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.notes = action.payload.allNotes.notes
        }

    }
});

export const { resetStatus } = noteSlice.actions;
export default noteSlice.reducer