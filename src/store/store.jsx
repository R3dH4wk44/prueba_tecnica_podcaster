import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from '../features/podcasts/podcastSlice'
import loaderReducer from '../features/podcasts/loaderSlice'

export const store = configureStore({

    reducer: {
        podcast: podcastReducer,
        loader: loaderReducer
    }
})

