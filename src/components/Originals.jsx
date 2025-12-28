import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOriginal } from "../features/movie/movieSlice";

const Originals = (props) => {
  const movies = useSelector(selectOriginal);

  return (
    <div className="originals-container">
      <h4>Originals</h4>
      <div className="originals-content">
        {movies &&
          movies.map((movie, key) => (
            <div className="originals-wrap" key={key}>
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

export default Originals;
