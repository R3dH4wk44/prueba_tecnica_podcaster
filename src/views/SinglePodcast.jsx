import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { setPodcastList, setSelectedPodcastEpisodes } from "../features/podcasts/podcastSlice";
import { toggleVisibility } from "../features/podcasts/loaderSlice";
import { SideBar } from "../components/SideBar";
export const SinglePodcast = () => {
    const dispatch = useDispatch()
    const {podcastid} = useParams();
    const podcastList = useSelector((state) => state.podcast.podcastList);
    const ActualPodcastEpisodes = useSelector((state) => state.podcast.selectedPodcastEpisodes);
    const [actualPodcast,setActualPodcast] = useState(null);


    const setPodcasts = async () => {

        const cachedData = localStorage.getItem('podcasts');

        if(cachedData && podcastList.length === 0){

            dispatch(setPodcastList(JSON.parse(cachedData)));
            return JSON.parse(cachedData);
        }

        if(podcastList.length === 0){
            const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',{
                method:'GET'
            });
            const data = await response.json();
            dispatch(setPodcastList(data.feed.entry));
            localStorage.setItem('podcasts',JSON.stringify(data.feed.entry));
            return data.feed.entry;
        }
        return podcastList;
    }


    const setActualPodcastEpisodes = async () => {
        const cachedData = localStorage.getItem(`podcast-${podcastid}`);

        if(cachedData){
            dispatch(setSelectedPodcastEpisodes(JSON.parse(cachedData)));
            dispatch(toggleVisibility());
            return;
        }

        const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastid}&media=podcast&entity=podcastEpisode&limit=50`,{
            method:'GET'
        });
        const data = await response.json();
        localStorage.setItem(`podcast-${podcastid}`, JSON.stringify(data));
        dispatch(setActualPodcastEpisodes(data));
        dispatch(toggleVisibility());
        return;
    }

    useEffect(() => {
        const initialize = async () => {
            dispatch(toggleVisibility())
            const podcasts = await setPodcasts();
            const podcast = podcasts.find((podcast) => podcast.id.attributes['im:id'] === podcastid);
            setActualPodcast(podcast);
            setActualPodcastEpisodes();
        }
        initialize();
    },[podcastid]);

    if(!actualPodcast){
        return (<></>);
    }

    return (<>

        <div className="w-screen h-screen flex justify-start items-center">
            <SideBar name={actualPodcast['im:name'].label} author={actualPodcast['im:artist'].label} image={actualPodcast['im:image'][2].label} description={actualPodcast.summary.label} />
            <div className="w-full h-full flex flex-col justify-start items-center">
                {ActualPodcastEpisodes.resultCount}
                <div className="grid grid-cols-3">
                    <div>Title</div>
                    <div>Date</div>
                    <div>Duration</div>
                </div>
            </div>
        </div>

    </>)
}