import Brands from "./brands";
import BrowseStyle from "./browse-style";
import Hero from "./hero";
import NewArrivals from "./new-arrivals";
import Testimonials from "./testimonials";
import TopSelling from "./top-selling";

const Home = () => {
  return (
    <main className="space-y-10 lg:space-y-20">
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <BrowseStyle />
      <Testimonials />
    </main>
  );
};

export default Home;
