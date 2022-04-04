import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/config";

export const getAllNotes = createAsyncThunk(
    "note/getAllNotes",
    async ({token}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API}/notes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addNote = createAsyncThunk(
    "note/addNote",
    async ({token, noteTitle, noteBody, isPinned, bgColor, imageURL}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/notes/new`, {
                token,
                noteTitle,
                noteBody,
                isPinned, 
                bgColor,
                imageURL
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            console.log(response);
            return response.data
        } catch(error){
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const editNote = createAsyncThunk(
    "note/editNote",
    async ({token, noteId, noteTitle, noteBody, isPinned, bgColor, imageURL}, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/notes/edit/${noteId}`, {
                noteTitle, 
                noteBody,
                isPinned, 
                bgColor, 
                imageURL
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            return response.data;
        } catch(error){
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteNote = createAsyncThunk(
    "note/deleteNote",
    async ({token, noteId}, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API}/notes/delete/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const noteSlice = createSlice({
    name: "note",
    initialState: {
        status: "idle",
        notes: [],
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
            state.error = action.payload;
        },

        [addNote.fulfilled]: (state, action) => {
            state.status =  "fulfilled";
            state.notes = action.payload.userNotes.notes;
        },

        [getAllNotes.pending]: (state) => {
            state.status = "loading";
        },

        [editNote.pending]: (state) => {
            state.status = "loading";
        },

        [editNote.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.notes = action.payload.allNotes.notes
        },

        [editNote.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

        [deleteNote.fulfilled]: (state, action) => {
            state.notes = action.payload.allNotes.notes;
        },

        [deleteNote.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        }

    }
});

export const { resetStatus } = noteSlice.actions;
export default noteSlice.reducer