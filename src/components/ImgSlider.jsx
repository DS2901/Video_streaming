import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay so videos don't conflict
    centerMode: true,
    centerPadding: "60px",
  };

  const handleMouseEnter = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (e) => {
    const video = e.currentTarget.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <Slider className="imgslider-carousel" {...settings}>
      <div className="imgslider-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="slider-content">
          <img src="/images/slider-badging.jpg" alt="Disney" />
          <video loop playsInline muted>
            <source src="/videos/1564674844-disney.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="imgslider-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="slider-content">
          <img src="/images/slider-scale.jpg" alt="Marvel" />
          <video loop playsInline muted>
             <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="imgslider-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="slider-content">
          <img src="/images/slider-badag.jpg" alt="Pixar" />
          <video loop playsInline muted>
            <source src="/videos/1564676714-pixar.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="imgslider-wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="slider-content">
          <img src="/images/slider-scales.jpg" alt="Star Wars" />
          <video loop playsInline muted>
            <source src="/videos/1608229455-star-wars.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </Slider>
  );
};

// Styles for the slider are defined in src/Developer.css under .imgslider-* classes

export default ImgSlider;
