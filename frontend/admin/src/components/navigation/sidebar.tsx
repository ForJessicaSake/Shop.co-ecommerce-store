import { RiLogoutCircleRLine } from "react-icons/ri";
import { GiClothes } from "react-icons/gi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import clsx from "clsx";
import { toast } from "sonner";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogOut = () => {
    localStorage.clear();
    toast.success("You have been logged out.");
    navigate("/");
  };
  return (
    <nav className="max-w-sm flex flex-col h-screen space-y-12 bg-[#f2f2f2] p-8 text-[#808080]">
      <Link
        className="cursor-pointer font-extrabold text-black mt-2 text-4xl relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
        to="/"
      >
        SHOP.CO
      </Link>
      <div>
        <ul className="space-y-8 text-sm cursor-pointer w-full">
          <li>
            <Link
              to="/"
              className={clsx("flex items-center gap-3", {
                underline: location.pathname === "/",
              })}
            >
              <GiClothes className="text-lg" />
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/transactions"
              className={clsx("flex items-center gap-3", {
                underline: location.pathname === "/transactions",
              })}
            >
              <FaMoneyCheckAlt className="text-lg" />
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={clsx("flex items-center gap-3", {
                underline: location.pathname === "/users",
              })}
            >
              <FaRegUser className="text-lg" />
              Users
            </Link>
          </li>
          <li
            className="flex items-center gap-3 hover:underline"
            onClick={handleLogOut}
          >
            <RiLogoutCircleRLine className="text-lg" />
            Logout
          </li>
        </ul>
      </div>

      <ul className="cursor-pointer"></ul>
    </nav>
  );
};

export default Sidebar;
