import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const Listfetch = createAsyncThunk("List / Fetch", async(arg, {rejectWithValue})=>{
    try {
        const response = await axios.get(`http://localhost:3003/todolist`)
        console.log("LIST_RESPONSE...", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const ListSlice = createSlice({
    name : "list",
    initialState : {
        data:[],
        loading: false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(Listfetch.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(Listfetch.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action?.payload
        })
        builder.addCase(Listfetch.rejected, (state,action)=>{
            state.loading = false;
            state.error = action?.payload
        })
    }
})

export default ListSlice.reducer