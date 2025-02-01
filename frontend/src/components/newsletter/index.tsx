import Button from "../micro/button";

const Newsletter = () => {
  return (
    <section className="mt-10 p-10 bg-black flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center rounded-2xl">
      <h2 className="font-bold text-2xl sm:text-4xl text-white max-w-xl">STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
      <form onSubmit={() => alert("submitted")} className="flex flex-col space-y-3">
        <input
          type="email"
          placeholder="Enter your email address"
          name="email"
          className="border border-white bg-white sm:w-80 p-3 rounded-full text-center text-sm sm:text-base"
        />
        <Button className="sm:w-80">Subscribe to Newsletter</Button>
      </form>
    </section>
  );
};

export default Newsletter;
