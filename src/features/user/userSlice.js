import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../constants/config";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async({email, password},{rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/user/login`, {
                email, 
                password
            });
            console.log(response.data);
            return response.data
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async({firstName, lastName,email, password},{rejectWithValue}) => {
        try {
            const response = await axios.post(`${API}/user/signup`, {
                firstName, 
                lastName,
                email, 
                password
            });
    
            return response.data;
        } catch(error) {
            console.log({error});
            return rejectWithValue(error.response.data.message);
        }
    }
);

const userId = JSON.parse(localStorage.getItem("userId")) || null;
const firstName = JSON.parse(localStorage.getItem("firstName")) || null;
const token = JSON.parse(localStorage.getItem("token")) || null;
const lastName = JSON.parse(localStorage.getItem("lastName") || null);

export const userSlice = createSlice({
    name: "user",
    initialState: {
        status: "idle",
        isUserLoggedIn: false,
        userId,
        firstName,
        lastName,
        token,
        error: null,
    },

    reducers: {
        logoutUser: () => {
            localStorage.removeItem("isUserLoggedIn");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("userId");
            localStorage.removeItem("token");

            return {
                status: "idle",
                isUserLoggedIn: false,
                userId: null,
                token: null,
                error: null,
                firstName: null,
                lastName: null
            }
        },

        resetAuthStatus: (state) => {
            state.status = "idle";
            state.error = null;
        },

    },

    extraReducers: {
        [loginUser.pending]: (state) => {
            state.status = "loading";
        },

        [loginUser.fulfilled]: (state, action) => {
            state.status = "tokenFetched";
            console.log(state.status);
            
            const { userId, firstName, lastName, token } = action.payload;
            localStorage.setItem("userId", JSON.stringify(userId));
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("firstName", JSON.stringify(firstName));
            localStorage.setItem("lastName", JSON.stringify(lastName));
            localStorage.setItem("isUserLoggedIn", JSON.stringify(true));

            state.userId = userId;
            state.token = token;
            state.firstName = firstName;
            
            state.isUserLoggedIn = true;
        },

        [loginUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

        [signUpUser.pending]: (state) => {
            state.status = "loading";
        },

        [signUpUser.fulfilled]: (state, action) => {
            const { userId, firstName, token } = action.payload;

            localStorage.setItem("userId", JSON.stringify(userId));
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("firstName", JSON.stringify(firstName));
            localStorage.setItem("isUserLoggedIn", JSON.stringify(true));

            state.userId = userId;
            state.token = token;
            state.firstName = firstName;
            state.status = "tokenFetched";
            state.isUserLoggedIn = true;
        },

        [signUpUser.rejected]: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },

    }
});

export const { logoutUser, resetAuthStatus } = userSlice.actions;

export default userSlice.reducer