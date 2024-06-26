import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const Delete = createAsyncThunk("List / Fetch", async(id, {rejectWithValue})=>{
    try {
        const response = await axios.delete(`http://localhost:3003/todolist/${id}`)
        console.log("DELETE_RESPONSE...", response)
        return response?.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const DeleteSlice = createSlice({
    name : "delete",
    initialState : {
        data:[],
        loading: false,
        error : null
    },
    reducers : {},

    extraReducers : (builder)=>{
        builder.addCase(Delete.pending, (state)=>{
            state.loading = true
        })
        builder.addCase(Delete.fulfilled, (state,action)=>{
            state.loading = false;
            state.data = action?.payload
        })
        builder.addCase(Delete.rejected, (state,action)=>{
            state.loading = false;
            state.error = action?.payload
        })
    }
})

export default DeleteSlice.reducer