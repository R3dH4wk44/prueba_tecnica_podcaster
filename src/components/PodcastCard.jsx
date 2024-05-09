import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export const PodcastCard = ({ name, author, image, id }) => {
  return (
    <>
      <div className="bg-slate-800 shadow-md rounded-lg flex flex-col justify-start items-center py-2">
        <Link to={`/podcast/${id}`}>
          <img src={image} alt="Podcast Image" className=" rounded-full" />
        </Link>
        <Link to={{ pathname:'/podcast', state: {id}}}>
          <h4>{name}</h4>
        </Link>

        <Link to={`/podcast/${id}`}>
          <p>{author}</p>
        </Link>
      </div>
    </>
  );
};

PodcastCard.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
