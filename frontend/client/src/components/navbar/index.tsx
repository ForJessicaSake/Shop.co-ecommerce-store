import { Link, useNavigate } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useCartStore } from "../store";
import Button from "../micro/button";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartCount } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="container mx-auto px-8 lg:px-16 py-5">
      <div className="hidden lg:flex items-center justify-between ">
        <div className="flex items-center gap-8">
          <Link
            className="cursor-pointer font-extrabold text-3xl relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            to="/"
          >
            SHOP.CO
          </Link>
          <ul className="flex items-center gap-5 text-sm">
            <li className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
              <a href="#orders">Orders</a>
            </li>
            <li className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
              <a href="#newsLetter">Newsletter</a>
            </li>
            <li className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <p className="absolute bottom-3 right-5 text-sm font-medium text-green-500">
              {cartCount}
            </p>
            <FiShoppingCart className="w-5 h-5 cursor-pointer" />
          </Link>
          <Button
            size="s"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-x-2">
            <div>
              {isOpen ? (
                <IoClose
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 mt-1"
                />
              ) : (
                <GiHamburgerMenu
                  onClick={() => setIsOpen(true)}
                  className="h-6 w-6 mt-1"
                />
              )}
            </div>
            <Link className="font-[Integral-CF] font-extrabold text-lg" to="/">
              SHOP.CO
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <p className="absolute bottom-3 right-5 text-sm font-medium text-green-500">
                {cartCount}
              </p>
              <FiShoppingCart className="w-5 h-5 cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="mt-5 bg-white pl-8">
          {isOpen && (
            <ul className="space-y-5 text-xs">
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <a href="#orders">Orders</a>
              </li>
              <li>
                <a href="#newsLetter">NewsLetter</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
