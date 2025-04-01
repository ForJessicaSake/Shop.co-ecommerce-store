import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#F0F0F0] py-10 mt-10">
      <div className="mx-auto container px-8 lg:px-16">
        <section className="gap-10 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3">
          <div className="space-y-4 col-span-2">
            <h2 className="font-bold text-3xl">SHOP.CO</h2>
            <p className="max-w-[230px] text-sm text-black/60">
              We have clothes that suits your style and which you’re proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3">
              <div className="h-8 w-8 flex justify-center items-center p-1 rounded-full border border-black/5 cursor-pointer">
                <FaTwitter />
              </div>
              <div className="h-8 w-8 flex justify-center items-center p-1 rounded-full border border-black/5 cursor-pointer">
                <FaFacebookF />
              </div>
              <div className="h-8 w-8 flex justify-center items-center p-1 rounded-full border border-black/5 cursor-pointer">
                <FaInstagram />
              </div>
              <div className="h-8 w-8 flex justify-center items-center p-1 rounded-full border border-black/5 cursor-pointer">
                <FaThreads />
              </div>
            </div>
          </div>
          <div className="space-y-5 text-sm">
            <p className="font-medium">COMPANY</p>
            <ul className="space-y-3 text-black/60 cursor-pointer">
              <li>About</li>
              <li>Features</li>
              <li>Work</li>
              <li>Career</li>
            </ul>
          </div>
          <div className="space-y-5 text-sm">
            <p className="font-medium">HELP</p>
            <ul className="space-y-3 text-black/60 cursor-pointer">
              <li>Customer Support</li>
              <li>Delivery Details</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="space-y-5 text-sm">
            <p className="font-medium">FAQ</p>
            <ul className="space-y-3 text-black/60 cursor-pointer">
              <li>Account</li>
              <li>Manage Deliveries</li>
              <li>Orders</li>
              <li>Payments</li>
            </ul>
          </div>
          <div className="space-y-5 text-sm">
            <p className="font-medium">RESOURCES</p>
            <ul className="space-y-3 text-black/60 cursor-pointer">
              <li>Free eBooks</li>
              <li>Development Tutorials</li>
              <li>How to - Blog</li>
              <li>Youtube Playlist</li>
            </ul>
          </div>
        </section>

        <div className="mt-10 mb-5 border border-black/5"></div>
        <section>
          <p className="text-black/60 text-sm">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
