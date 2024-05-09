import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { setSelectedPodcast } from "../features/podcasts/podcastSlice.jsx"
import { toggleVisibility } from "../features/podcasts/loaderSlice.jsx"

import { SideBar } from "../components/SideBar.jsx"

export const SinglePodcast = () => {
    const { podcastid } = useParams();

    const episodes = useSelector((state) => state.podcast.selectedPodcast);
    const episodeInfoList = JSON.parse(localStorage.getItem('podcasts')).filter(episode => {return episode.id.attributes['im:id'] === podcastid});
    const episodeInfo = episodeInfoList[0];
    const dispatch = useDispatch();

    const getPodcast = async () => {

        const response =await fetch(`https://itunes.apple.com/lookup?id=${podcastid}&media=podcast&entity=podcastEpisode&limit=20`);
        const data = await response.json();
        dispatch(setSelectedPodcast(data.results));
        dispatch(toggleVisibility());

    }

    useEffect(()=>{
        dispatch(toggleVisibility());
        getPodcast()
    },[])
    return (<>
        
        <div className="h-full w-screen flex items-center justify-start text-white text-3xl">
            <SideBar  name={episodeInfo['im:name'].label} author={episodeInfo['im:artist'].label} image={episodeInfo['im:image'][2].label} id={episodeInfo.id.attributes['im:id']}/>
        </div>
    </>)
}