import ReviewCard from "./review-card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { CustomerReviews } from "../../utils/constants";

const Testimonials = () => {
  const [currentSlideNumber, setCurrentSlideNumber] = useState(0);
  return (
    <section className="mx-auto container px-8 lg:px-16">
      <h1 className="sm:text-4xl text-xl my-10 font-bold">
        OUR HAPPY CUSTOMERS
      </h1>
      <div className="slider-div hidden lg:block">
        <Slider
          {...largeSettings}
          afterChange={(current) => {
            setCurrentSlideNumber(current);
          }}
        >
          {CustomerReviews.map((customer) => (
            <ReviewCard
              name={customer.name}
              content={customer.content}
              rating={4}
              key={customer.id.toString()}
            />
          ))}
        </Slider>
      </div>
      <div className="slider-div lg:hidden sm:block hidden">
        <Slider
          {...tabSettings}
          beforeChange={(nextSlide: number) => setCurrentSlideNumber(nextSlide)}
        >
          {CustomerReviews.map((customer, index) => (
            <ReviewCard
              name={customer.name}
              content={customer.content}
              rating={4}
              key={customer.id.toString()}
              className={
                currentSlideNumber === index
                  ? "bg-white shadow-md"
                  : "bg-accentGrey"
              }
            />
          ))}
        </Slider>
      </div>

      <div className="slider-div block sm:hidden">
        <Slider
          {...mobileSettings}
          beforeChange={(nextSlide: number) => setCurrentSlideNumber(nextSlide)}
        >
          {CustomerReviews.map((customer, index) => (
            <ReviewCard
              name={customer.name}
              content={customer.content}
              rating={4}
              key={customer.id.toString()}
              className={
                currentSlideNumber === index
                  ? "bg-white shadow-md"
                  : "bg-accentGrey"
              }
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;

const largeSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  autoplay: true,
  speed: 8000,
  autoplaySpeed: 8000,
  pauseOnHover: true,
  className: "center",
  centerMode: true,
  centerPadding: "20px",
};

const tabSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 2,
  autoplay: true,
  speed: 8000,
  autoplaySpeed: 8000,
  pauseOnHover: true,
  className: "center",
  centerMode: true,
  centerPadding: "20px",
};

const mobileSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  autoplay: true,
  speed: 8000,
  autoplaySpeed: 8000,
  pauseOnHover: true,
};
