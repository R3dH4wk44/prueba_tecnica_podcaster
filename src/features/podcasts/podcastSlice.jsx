import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcastList: [],
    selectedPodcast: []
}

export const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        get:  (state, action) => {

            state.podcastList = action.payload
        },
        setPodcastsFromLocal: (state, action) => {
            state.podcastList = action.payload;
        },

        setSelectedPodcast: (state,action) => {
            state.selectedPodcast = action.payload;
        }

    }
});

export const { get, setPodcastsFromLocal, setSelectedPodcast } = podcastSlice.actions;
export default podcastSlice.reducer

