import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcastList: [],
    selectedPodcast: [],
    selectedPodcastEpisodes: [],
    selecedEpisodeInfo: {}
}

export const podcastSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        setPodcastList:  (state, action) => {

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
        },
        setSelectedEpisodeInfo: (state,action) => {

            state.selecedEpisodeInfo = action.payload;
        }

    }
});

export const { setPodcastList, setPodcastsFromLocal, setSelectedPodcast, setSelectedPodcastEpisodes, setSelectedEpisodeInfo } = podcastSlice.actions;
export default podcastSlice.reducer

