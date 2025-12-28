import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNewDisney } from "../features/movie/movieSlice";

const NewDisney = (props) => {
  const movies = useSelector(selectNewDisney);

  return (
    <div className="newdisney-container">
      <h4>New to Disney+</h4>
      <div className="newdisney-content">
        {movies &&
          movies.map((movie, key) => (
            <div className="newdisney-wrap" key={key}>
              {movie.id}
              <Link to={`/detail/` + movie.id}>
                <img src={movie.cardImg} alt={movie.title} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewDisney;
