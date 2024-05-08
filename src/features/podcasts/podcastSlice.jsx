import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcastList: []
}

export const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        get:  (state, action) => {

            state.podcastList = action.payload
        }
    }
});

export const { get } = podcastSlice.actions;
export default podcastSlice.reducer

