import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTrending } from "../features/movie/movieSlice";

const Trending = (props) => {
  const movies = useSelector(selectTrending);

  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <div className="trending-content">
        {movies &&
          movies.map((movie, key) => (
            <div className="trending-wrap" key={key}>
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

export default Trending;
