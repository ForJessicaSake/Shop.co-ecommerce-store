import { Link, useNavigate } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useCartStore } from "../store";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "sonner";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineLogin } from "react-icons/hi";

const Navbar = () => {
  const { cartCount } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: { currentTarget: HTMLElement }) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.clear();
    toast.success("You have been logged out.");
    navigate("/");
  };

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
          <div onClick={handleClick}>
            <CgProfile
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                navigate("/login");
              }}
            >
              <p className="flex items-center gap-2">
                <HiOutlineLogin /> <span> Log in</span>
              </p>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleLogOut();
              }}
            >
              <p className="flex items-center gap-2">
                <IoIosLogOut /> <span> Log out</span>
              </p>
            </MenuItem>
          </Menu>
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
            <div onClick={handleClick}>
              <CgProfile
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 bg-white pl-8">
          {isOpen && (
            <ul className="space-y-5 text-xs">
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <a href="#newsLetter">NewsLetter</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
