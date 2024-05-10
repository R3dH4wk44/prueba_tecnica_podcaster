import  { useEffect, useState } from "react";
import { PodcastCard } from "../components/PodcastCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setPodcastList, setPodcastsFromLocal } from "../features/podcasts/podcastSlice";
import { toggleVisibility } from "../features/podcasts/loaderSlice";
export const Home = () => {

    const podcastList = useSelector((state) => state.podcast.podcastList );
    const dispatch = useDispatch();
    const [filterInput, setFilterInput] = useState('')
    const setPodcasts = async () => {
        const dataInCache = localStorage.getItem('podcasts');
      if(dataInCache){
        dispatch(setPodcastsFromLocal(JSON.parse(dataInCache)))
        dispatch(toggleVisibility())
        return;
      }
        const response = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',{
            method:'GET'
        });
        const data = await response.json();
        localStorage.setItem('podcasts',JSON.stringify(data.feed.entry));
        dispatch(toggleVisibility())
        dispatch(setPodcastList(data.feed.entry));

    }
    useEffect(()=>{
      dispatch(toggleVisibility())     
      setPodcasts();
      return;
    },[])

    const filteredPodcastList = podcastList.filter(podcast => {
        return podcast['im:name'].label.toLowerCase().includes(filterInput.toLowerCase()) || podcast['im:artist'].label.toLowerCase().includes(filterInput.toLowerCase()) 
    })

    return (<>
        <div className="w-screen h-full px-5">
            <div className="input flex justify-end items-center gap-2 py-5">
                <p className=" px-5 py-2 font-xl font-extrabold bg-blue-800 rounded-xl">{filteredPodcastList.length}</p>
                <input className="px-5 py-2 rounded-xl" type="text"  name="filter" id="filter" placeholder="Filter Podcasts" onChange={e=> setFilterInput(e.target.value)} value={filterInput}/>

            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
                {filteredPodcastList.map((podcast,index) => {
                    return (<PodcastCard key={index} name={podcast['im:name'].label} author={podcast['im:artist'].label} image={podcast['im:image'][2].label} id={podcast.id.attributes['im:id']} />);
                })}
            </div>
        </div>

    </>)
}