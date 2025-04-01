import casual from "../../assets/images/casual.svg";
import formal from "../../assets/images/formal.svg";
import party from "../../assets/images/party.svg";
import gym from "../../assets/images/gym.svg";

const BrowseStyle = () => {
  return (
    <section className="mx-auto container px-8 lg:px-16">
      <div className="bg-[#F0F0F0] lg:p-10 p-5 rounded-2xl break-all">
        <h2 className="sm:text-4xl text-xl font-bold text-center">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="space-y-3 mt-10 flex flex-col items-center">
          <div className="flex flex-col xl:flex-row gap-3">
            <img
              src={casual}
              alt="casual"
              className="cursor-pointer hover:transition-all delay-100 duration-500 hover:scale-105"
            />
            <img
              src={formal}
              alt="formal"
              className="cursor-pointer hover:transition-all delay-100 duration-500 hover:scale-105"
            />
          </div>
          <div className="flex flex-col xl:flex-row gap-3">
            <img
              src={party}
              alt="party"
              className="cursor-pointer hover:transition-all delay-100 duration-500 hover:scale-105"
            />
            <img
              src={gym}
              alt="gym"
              className="cursor-pointer hover:transition-all delay-100 duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseStyle;
