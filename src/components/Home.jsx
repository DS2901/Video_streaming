import "../Developer.css";
import ImgSlider from "./ImgSlider";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Recommends from "./Recommends";
import Trending from "./Trending";
import Viewers from "./Viewers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import moviesData from "../disneyplus-clone.json";
import { setMovies } from "../features/movie/movieSlice";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const movies = moviesData.movies || {};
    const all = Object.keys(movies).map((key) => ({ id: key, ...movies[key] }));
    const recommendsArr = all.filter((m) => m.type === "recommend");
    const newArr = all.filter((m) => m.type === "new");
    const originalsArr = all.filter((m) => m.type === "original");
    const trendingArr = all.filter((m) => m.type === "trending");

    dispatch(
      setMovies({
        recommend: recommendsArr,
        newDisney: newArr,
        original: originalsArr,
        trending: trendingArr,
      })
    );
  }, []);

  return (
    <main className="home-container">
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </main>
  );
};
export default Home;
