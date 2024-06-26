import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const AddPost = createAsyncThunk("Add / Post", async(data, {rejectWithValue})=>{
    try {
        const response = await axios.post(`http://localhost:3003/todolist`, data)
        console.log("ADD_RESPONSE...", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const AddSlice = createSlice({
    name : "add",
    initialState : {
        data:[],
        loading: false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(AddPost.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(AddPost.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action?.payload
        })
        builder.addCase(AddPost.rejected, (state,action)=>{
            state.loading = false;
            state.error = action?.payload
        })
    }
})

export default AddSlice.reducer