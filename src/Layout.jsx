import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'

import { Home } from "./views/home";
import { Navbar } from "./components/Navbar";
import { SinglePodcast } from "./views/SinglePodcast";
import { SingleEpisode } from "./views/SingleEpisode";


export const Layout = () => {

    const basename = '/';

    return (<>
        <BrowserRouter basename={basename}>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/podcast/:podcastid' element={<SinglePodcast />} />
                <Route path='/podcast/:podcastid/episode/:episodeid' element={<SingleEpisode />} />
                <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    </>)
}