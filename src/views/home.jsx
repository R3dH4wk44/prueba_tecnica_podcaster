import  { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get } from "../features/podcasts/podcastSlice";

export const Home = () => {

    const podcastList = useSelector((state) => state.podcast.podcastList )
    const dispatch = useDispatch();
    
    const setPodcasts = async () => {
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',{
            method:'GET'
        });
        const data = await response.json();
        dispatch(get(data.feed.entry));

    }
    useEffect(()=>{
        setPodcasts();
    })

    return (<>
        {console.log(podcastList)}
        <ul>
            {podcastList.map((element,index) => {
                return (
                    <li key={index}> {element['im:name'].label}</li>
                )
            })}
        </ul>
    </>)
}