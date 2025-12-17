import styled from "styled-components";
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
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
