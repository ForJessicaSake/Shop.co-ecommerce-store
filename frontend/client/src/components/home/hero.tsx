import Button from "../micro/button";
import heroVector from "../../assets/images/hero-vector.svg";
import heroVector2 from "../../assets/images/hero-vector-2.svg";
import { Link } from "react-router";

const Hero = () => {
  return (
    <header className="bg-surface-muted">
      <div className="container mx-auto grid items-center gap-10 px-8 py-12 lg:grid-cols-2 lg:px-16 lg:py-16">
        <section className="mx-auto max-w-lg space-y-5 text-center lg:mx-0 lg:text-start">
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-sm text-ink-soft sm:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link to="/shop" className="inline-block">
            <Button filled>Shop Now</Button>
          </Link>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:border-r sm:border-line">
              <p className="text-xl font-bold md:text-3xl">200+</p>
              <p className="text-xs text-ink-soft lg:text-sm">
                International Brands
              </p>
            </div>
            <div className="sm:border-r sm:border-line">
              <p className="text-xl font-bold md:text-3xl">2,000+</p>
              <p className="text-xs text-ink-soft lg:text-sm">
                High-Quality Products
              </p>
            </div>
            <div>
              <p className="text-xl font-bold md:text-3xl">30,000+</p>
              <p className="text-xs text-ink-soft lg:text-sm">Happy Customers</p>
            </div>
          </div>
        </section>

        <div className="relative mx-auto w-full max-w-xl">
          <img
            src={heroVector2}
            alt=""
            className="absolute -left-1 top-6 z-10 hidden h-10 w-10 dark:invert sm:block"
          />
          <img
            src="/images/hero-models.jpg"
            alt="Two models wearing denim jackets and hoodies"
            className="w-full rounded-3xl object-cover"
          />
          <img
            src={heroVector}
            alt=""
            className="absolute -right-2 -top-3 z-10 hidden h-16 w-16 dark:invert sm:block"
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
