import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPodcastList } from "../features/podcasts/podcastSlice";
import { useEffect, useState } from "react";
import { toggleVisibility } from "../features/podcasts/loaderSlice";
import { SideBar } from "../components/SideBar";


export const SingleEpisode = () => {
    
    const dispatch = useDispatch()
    const {podcastid, episodeid} = useParams();
    const [actualPodcast,setActualPodcast] = useState(null);
    const [episode,setEpisode] = useState(null)
    const podcastList = useSelector((state) => state.podcast.podcastList)
    const setPodcasts = async () => {

        const cachedData = localStorage.getItem('podcasts');

        if(cachedData && podcastList.length === 0){

            dispatch(setPodcastList(JSON.parse(cachedData)));
            return JSON.parse(cachedData);
        }

        if(podcastList.length === 0 && !cachedData){
            const response = await fetch('https://api.allorigins.win/get?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',{
                method:'GET'
            });
            const data = await response.json();
            dispatch(setPodcastList(data.feed.entry));
            localStorage.setItem('podcasts',JSON.stringify(data.feed.entry));
            return data.feed.entry;
        }
        return podcastList;
    }


    const setEpisodeInfo = async () => {
        const cachedData = localStorage.getItem(`podcast-${podcastid}-${episodeid}`);

        if(cachedData) {
            setEpisode(JSON.parse(cachedData));
            return;
        }
        const cacheEpisodes = localStorage.getItem(`podcast-${podcastid}`);
        if(cacheEpisodes && !cachedData){
            const episodesJson = JSON.parse(cacheEpisodes);
            console.log(episodesJson);
            const episode = episodesJson.results.find(podcast  => podcast.trackId == episodeid);
            localStorage.setItem(`podcast-${podcastid}-${episodeid}`, JSON.stringify(episode));
            setEpisode(episode)
            return;
        }
        const response = await fetch(`https://api.allorigins.win/raw?url=https://itunes.apple.com/lookup?id=${podcastid}&media=podcast&entity=podcastEpisode&limit=20`,{
            method:'GET'
        });
        
        const data = await response.json();
        
        const selectedEpisode = await data.results.find(episode => episode.trackId == episodeid);
        console.log(selectedEpisode);
        localStorage.setItem(`podcast-${podcastid}`, JSON.stringify(data.contents));
        localStorage.setItem(`podcast-${podcastid}-${episodeid}`, JSON.stringify(selectedEpisode));
        setEpisode(selectedEpisode);
    }

    useEffect(()=>{
        dispatch(toggleVisibility())
        const initialize = async () => {

            const podcasts = await setPodcasts()
            const podcast = podcasts.find((podcast) => podcast.id.attributes['im:id'] === podcastid);
            setActualPodcast(podcast);
            setEpisodeInfo();
        }

        initialize();
        dispatch(toggleVisibility());
    },[]);
    if(!actualPodcast || !episode){
        
        return;
    }
    
    return (<>
    
    <div className="w-screen h-screen flex justify-start items-center">
            <SideBar name={actualPodcast['im:name'].label} author={actualPodcast['im:artist'].label} image={actualPodcast['im:image'][2].label} description={actualPodcast.summary.label} podcastid={podcastid} link={true} />
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-2/3  bg-slate-900 p-5 rounded-xl">
                    <h2 className=' text-2xl mb-5'>{episode.trackName}</h2>
                    <p className='mb-5'>{episode.description}</p>
                    <audio controls>
                     <source src={episode.episodeUrl} type="audio/mp3"></source>
                        Your browser does not support the audio element.
                    </audio>
                    {console.log(episode)}
                </div>
            </div>
        </div>

    </>)
}