import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false
}

export const loaderSlice = createSlice({
    name:'loader',
    initialState,
    reducers: {
        toggleVisibility: (state) => {
            state.visible = !state.visible;
        }
    }
})

export const { toggleVisibility } = loaderSlice.actions
export default loaderSlice.reducer