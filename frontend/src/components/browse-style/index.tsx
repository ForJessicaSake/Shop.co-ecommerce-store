import casual from "../../assets/images/casual.svg";
import formal from "../../assets/images/formal.svg";
import party from "../../assets/images/party.svg";
import gym from "../../assets/images/gym.svg";

const BrowseStyle = () => {
  return (
    <section className="bg-[#F0F0F0] p-10 rounded-2xl">
      <h2 className="text-4xl font-bold text-center">BROWSE BY DRESS STYLE</h2>
      <div className="space-y-5 mt-10">
        <div className="flex gap-3">
          <img src={casual} alt="casual" />
          <img src={formal} alt="formal" />
        </div>
        <div className="flex gap-3">
          <img src={party} alt="party" />
          <img src={gym} alt="wedding" />
        </div>
      </div>
    </section>
  );
};

export default BrowseStyle;
