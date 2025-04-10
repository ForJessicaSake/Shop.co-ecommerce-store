import { Link, useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { toast } from "sonner";
import TextInput from "../micro/inputs/input";
import { BsSearch } from "react-icons/bs";
import Button from "../micro/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    toast.success("You have been logged out.");
    navigate("/");
  };
  return (
    <nav className="container mx-auto py-5">
      <div className="hidden lg:flex items-center justify-between ">
        <div className="flex items-center gap-8">
          <Link
            className="cursor-pointer font-extrabold text-3xl relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            to="/"
          >
            SHOP.CO
          </Link>
        </div>
        <div className="relative">
          {!searchValue && (
            <div className="inset-y-0 absolute left-4 top-4">
              <BsSearch className="text-black/40" />
            </div>
          )}
          <TextInput
            placeholder="Search for products..."
            className="w-[550px] rounded-full py-3 pl-10 pr-4 placeholder:text-sm bg-[#F0F0F0]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="space-x-5">
          <Button
            size="s"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button size="s" onClick={handleLogOut}>
            Logout
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
    </nav>
  );
};

export default Navbar;
