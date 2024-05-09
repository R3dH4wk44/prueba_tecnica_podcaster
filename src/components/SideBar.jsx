import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const SideBar = ({ name, author, image, description }) => {


    return (<>
        <div className="w-1/4 h-full text-center text-white bg-slate-900 flex flex-col justify-center items-center px-5 py-2 gap-5">
            <img src={image} alt="Image of the podcast" className="rounded-full"/>

            <h1>{name}</h1>
            <p>{author}</p>
            <h3 className="mt-3">Description:</h3>
            <p className="text-lg">{description}</p>
        </div>
    </>)
}

SideBar.propTypes = {
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };