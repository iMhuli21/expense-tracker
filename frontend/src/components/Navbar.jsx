import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/6457545_bill_document_expense_invoice_purchase_icon.svg";
import { BiSolidUserCircle } from "react-icons/bi";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = ({ currentPage }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const logout = () => {
    //remove token
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow min-h-[100px] font-poppins text-2xl flex items-center font-extrabold text-lightBlack justify-between">
      <div className="flex items-center justify-start">
        <img src={Logo} alt="icon" className="h-20" />
        <Link to={"/"} className="ml-5">
          Expe<span className="text-red-600">nse</span> Tracker
        </Link>
      </div>
      <div
        className={
          currentPage === "home"
            ? "hidden md:flex items-center mr-10 space-x-6"
            : "hidden"
        }
      >
        <span className="text-sm font-normal">{user && user.email}</span>
        <button
          className="text-sm font-poppins font-medium uppercase tracking-wide border-2 border-red-600 p-2 rounded hover:bg-red-500 hover:text-white hover:transition-all hover:duration-300"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
