import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import versace from "../../assets/images/brands/versace.svg";
import zara from "../../assets/images/brands/zara.svg";
import prada from "../../assets/images/brands/prada.svg";
import gucci from "../../assets/images/brands/gucci.svg";
import calvinKlien from "../../assets/images/brands/calvin klein.svg";

const Brands = () => {
  return (
    <section id="brands" className="bg-black p-5 lg:p-10 -mt-10 lg:-mt-20">
      <div className="lg:block hidden">
        <Slider {...largeSettings}>
          <img src={versace} alt="Versace" className="w-40 h-10" />
          <img src={zara} alt="Zara" className="w-40 h-10" />
          <img src={gucci} alt="Gucci" className="w-40 h-10" />
          <img src={prada} alt="Prada" className="w-40 h-10" />
          <img src={calvinKlien} alt="Calvin Klein" className="w-40 h-10" />
        </Slider>
      </div>
      <div className="block lg:hidden">
        <Slider {...mobileSettings}>
          <img src={versace} alt="Versace"className="w-28 h-7" />
          <img src={zara} alt="Zara" className="w-28 h-7" />
          <img src={gucci} alt="Gucci" className="w-28 h-7" />
          <img src={prada} alt="Prada" className="w-28 h-7" />
          <img src={calvinKlien} alt="Calvin Klein" className="w-28 h-7" />
        </Slider>
      </div>
    </section>
  );
};

export default Brands;

const largeSettings = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  arrows: false,
};

const mobileSettings = {
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};
