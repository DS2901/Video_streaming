import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRecommend } from "../features/movie/movieSlice";

const Recommends = (props) => {
  const movies = useSelector(selectRecommend);
  console.log(movies, ":🛢️");

  return (
    <div className="recommends-container">
      <h4>Recommended for You</h4>
      <div className="recommends-content">
        {movies &&
          movies.map((movie, key) => (
            <div className="recommends-wrap" key={key}>
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

export default Recommends;
