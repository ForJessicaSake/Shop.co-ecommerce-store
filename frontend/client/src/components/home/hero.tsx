import Button from "../micro/button";
import heroVector from "../../assets/images/hero-vector.svg";
import heroVector2 from "../../assets/images/hero-vector-2.svg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <header className="bg-[#F2F0F1]">
      <div className="container mx-auto px-8 lg:px-16 pt-10 lg:pt-20 lg:pb-20 bg-[url('/images/hero.svg')] bg-cover bg-no-repeat flex flex-col text-center items-center justify-center lg:flex-row lg:text-start  lg:justify-between">
        <section className="space-y-5">
          <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold max-w-lg">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="max-w-lg text-sm sm:text-base text-black/60 break-all">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link to="/shop">
            <Button dark={true}>Shop Now</Button>
          </Link>
          <div className="mt-10 grid lg:grid-cols-3 grid-cols-1 lg:gap-5 gap-2 break-all">
            <div className="lg:border-r border-black/10">
              <p className="font-bold text-xl md:text-3xl">200+</p>
              <p className="text-black/60 text-xs lg:text-sm">
                International Brands
              </p>
            </div>
            <div className="lg:border-r border-black/10">
              <p className="font-bold text-xl md:text-3xl">2,000+</p>
              <p className="text-black/60 text-xs lg:text-sm">
                High-Quality Products
              </p>
            </div>
            <div>
              <p className="font-bold text-xl md:text-3xl">30,000+</p>
              <p className="text-black/60 text-xs lg:text-sm">
                Happy Customers
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="relative right-[460px] top-10 xl:block hidden">
            <img src={heroVector2} alt="star" className="h-14 w-14" />
          </div>
          <div className="lg:hidden flex justify-center items-center overflow-hidden">
            <img
              src="/images/hero-mobile.svg"
              alt="models wearing shop.co items"
            />
          </div>
          <div className="relative bottom-50 right-10 xl:block hidden">
            <img src={heroVector} alt="star" className="h-24 w-24" />
          </div>
        </section>
      </div>
    </header>
  );
};

export default Hero;
