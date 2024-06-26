import { configureStore } from '@reduxjs/toolkit'
import ListSlice from '../ListSlice'
import AddSlice from '../AddSlice'
import Deleteslice from '../Deleteslice'
import UserDetailsSlice from '../DetailsSlice'

export const store = configureStore({
  reducer: {
    list : ListSlice,
    add : AddSlice,
    delete : Deleteslice,
    details : UserDetailsSlice,
  },
})