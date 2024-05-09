import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get,setSelectedPodcast,setSelectedPodcastEpisodes } from "../features/podcasts/podcastSlice";
import { toggleVisibility } from "../features/podcasts/loaderSlice";
import { SideBar } from "../components/SideBar";
export const SinglePodcast = () => {

    const {podcastid} = useParams();
    const dispatch = useDispatch();
    const podcastList = useSelector((state) => state.podcast.podcastList);
    const actualPodcast = useSelector((state) => state.podcast.selectedPodcast);
    const episodesList = useSelector((state) => state.podcast.selectedPodcastEpisodes);

    const setPodcastList = async () => {

        const cachedPodcastList = localStorage.getItem('podcasts')

        if(cachedPodcastList && podcastList.length === 0){
            dispatch(get(JSON.parse(cachedPodcastList)))
            setActualPotcast(JSON.parse(cachedPodcastList));
            return;
        }

        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',{
            method:'GET'
        });
        const data = await response.json();
        localStorage.setItem('podcasts',JSON.stringify(data.feed.entry));
        dispatch(get(data.feed.entry));
        setActualPotcast(data.feed.entry);
    }


    const setActualPotcast = () => {

        const podcastSelected = podcastList.filter((podcast) => {return podcast.id.attributes['im:id'] === podcastid});
        dispatch(setSelectedPodcast(podcastSelected));

    }
    const setEpisodeList = async () => {
        const cachedEpisodeList = localStorage.getItem(`podcast-${podcastid}-episodes`);
        if(cachedEpisodeList)
            {
                dispatch(setSelectedPodcastEpisodes(JSON.parse(cachedEpisodeList)));
                dispatch(toggleVisibility());
                return;
            }
        const response = await fetch(`https://itunes.apple.com/lookup?id=${podcastid}&media=podcast&entity=podcastEpisode`,{
            method:'GET'
        });

        const data = await response.json();
        dispatch(setSelectedPodcastEpisodes(data.results));
        localStorage.setItem(`podcast-${podcastid}-episodes`, JSON.stringify(data.results));
        dispatch(toggleVisibility());
    }

    useEffect(()=>{
        dispatch(toggleVisibility());
        setPodcastList();
        setActualPotcast();
        setEpisodeList();

    },[podcastList, dispatch]);

    return (<>

        <div className="w-screen h-full flex justify-start items-center">
            <SideBar name={''} image='' author='' description=""  />

        </div>
        {console.log('Podcast List:')}
        {console.log(podcastList)}
        {console.log('Actual Podcast:')}
        {console.log(actualPodcast[0]['im:name'].label)}
        
        {console.log('Episodes List:')}
        {console.log(episodesList)}


    </>)

}