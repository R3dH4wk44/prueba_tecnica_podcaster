import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcastList: [],
    selectedPodcast: {},
    selectedPodcastEpisodes: []
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
        },
        setSelectedPodcastEpisodes: (state,action) => {
            state.selectedPodcastEpisodes = action.payload;
        }

    }
});

export const { get, setPodcastsFromLocal, setSelectedPodcast, setSelectedPodcastEpisodes } = podcastSlice.actions;
export default podcastSlice.reducer

