import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"
import { setPodcastList } from "../features/podcasts/podcastSlice";
import { toggleVisibility } from "../features/podcasts/loaderSlice";
import { SideBar } from "../components/SideBar";
export const SinglePodcast = () => {

    const dispatch = useDispatch()
    const {podcastid} = useParams();
    const podcastList = useSelector((state) => state.podcast.podcastList);
    const ActualPodcastEpisodes = useSelector((state) => state.podcast.selectedPodcastEpisodes);
    const [actualPodcast,setActualPodcast] = useState(null);
    const [podcastEpisodes, setPodcastEpisodes] = useState(null)

    const setPodcasts = async () => {

        const cachedData = localStorage.getItem('podcasts');

        if(cachedData && podcastList.length === 0){

            dispatch(setPodcastList(JSON.parse(cachedData)));
            return JSON.parse(cachedData);
        }

        if(podcastList.length === 0 && !cachedData){

            const response = await fetch(`https://api.allorigins.win/raw?url=https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`,{
                method:'GET'
            })
            
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
            
            setPodcastEpisodes(JSON.parse(cachedData))
            dispatch(toggleVisibility());
            return JSON.parse(cachedData);
        }
        const response = await fetch(`https://api.allorigins.win/get?url=https://itunes.apple.com/lookup?id=${podcastid}&media=podcast&entity=podcastEpisode`,{
            method:'GET'
        })
        const dataResponse = await response.json();
        const data = JSON.parse(dataResponse.contents)
        localStorage.setItem(`podcast-${podcastid}`, JSON.stringify(data));
        dispatch(setActualPodcastEpisodes(data));
        
        dispatch(toggleVisibility());
        return data;
    }

    useEffect(() => {
        const initialize = async () => {
            dispatch(toggleVisibility())
            const podcasts = await setPodcasts();
            const podcast = podcasts.find((podcast) => podcast.id.attributes['im:id'] === podcastid);
            setActualPodcast(podcast);
            const actualEpisodes = await setActualPodcastEpisodes();
            setPodcastEpisodes(actualEpisodes);
        }
        initialize();
    },[]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    }

    function parseMilliseconds(milliseconds) {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
      
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
        return formattedTime;
      }
    if(!actualPodcast || !podcastEpisodes){
        return (<></>);
    }

    return (<>

        <div className="w-screen h-screen flex justify-start items-center">
            <SideBar name={actualPodcast['im:name'].label} author={actualPodcast['im:artist'].label} image={actualPodcast['im:image'][2].label} description={actualPodcast.summary.label} />
            <div className="w-full h-full p-5 flex flex-col justify-start items-center">
                <h4 className="text-2xl p-5">Episodes: {ActualPodcastEpisodes.resultCount}</h4>
                <table className=" w-full px-5 divide-y divide-slate-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-lg tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-lg tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-lg tracking-wider">
                                Duration
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {podcastEpisodes.results.map((row,index) =>{
                        return(
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link to={`/podcast/${podcastid}/episode/${row.trackId}`}>
                                        {row.trackName}
                                    </Link>
                                    
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {formatDate(row.releaseDate)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {parseMilliseconds(row.trackTimeMillis)}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>

    </>)
}