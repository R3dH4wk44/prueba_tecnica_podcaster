import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from '../features/podcasts/podcastSlice'
export const store = configureStore({

    reducer: {
        podcast: podcastReducer
    }
})

