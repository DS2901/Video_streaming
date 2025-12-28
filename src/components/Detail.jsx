import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../disneyplus-clone.json";

const Detail = (props) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const movie = (moviesData.movies && moviesData.movies[id]) || null;
    if (movie) {
      setDetailData(movie);
    } else {
      console.log("no such document (movie) in local data");
    }
  }, [id]);

  return (
    <div className="detail-container">
      <div className="detail-background">
        <img alt={detailData.title} src={detailData.backgroundImg} />
      </div>

      <div className="detail-imagetitle">
        <img alt={detailData.title} src={detailData.titleImg} />
      </div>
      <div className="detail-contentmeta">
        <div className="detail-controls">
          <button className="detail-player">
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </button>
          <button className="detail-player detail-trailer">
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </button>
          <div className="detail-addlist">
            <span />
            <span />
          </div>
          <div className="detail-groupwatch">
            <div>
              <img src="/images/group-icon.png" alt="" />
            </div>
          </div>
        </div>
        <div className="detail-subtitle">{detailData.subTitle}</div>
        <div className="detail-description">{detailData.description}</div>
      </div>
    </div>
  );
};
// styles moved to src/Developer.css

export default Detail;
