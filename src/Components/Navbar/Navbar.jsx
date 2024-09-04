import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";

export default function Navbar() {
  let { UserLogin, setUserLogin } = useContext(userContext);
  let navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("UserToken");
    setUserLogin(null);
    navigate("/login");
  }


  return (
    <>
      <nav className="bg-slate-100 border-gray-200 fixed top-0 left-0 right-0  flex">
        <div className="max-w-screen-xl flex flex-wrap items-center me-auto p-3 ">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="FreshCart Logo" />
          </NavLink>
          {UserLogin ? (
            <>
              <ul className="font-medium flex flex-col md:p-0 mt-4 ms-7 items-center border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                <li>
                  <NavLink
                    to="home"
                    className="block py-2 px-3  text-gray-900   rounded md:bg-transparent md:p-0 "
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="cart"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="Products"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 "
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 "
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 "
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            </>
          ) : null}
        </div>
        <div className="flex ms-auto p-2">
          <ul className="flex p-2  items-center">
            <li>
              <i className="fa-brands p-2 fa-wikipedia-w"></i>
            </li>
            <li>
              <i className="fa-brands p-2 fa-facebook"></i>
            </li>
            <li>
              <i className="fa-brands p-2 fa-twitter"></i>
            </li>
            <li>
              <i className="fa-brands p-2 fa-tiktok"></i>
            </li>
            <li>
              <i className="fa-brands p-2 fa-linkedin"></i>
            </li>
            <li>
              <i className="fa-brands p-2 fa-youtube"></i>
            </li>
          </ul>
          <div className="navButtons p-3 items-center">
            {UserLogin ? (
              <button onClick={signOut} className="p-3">
                LogOut 
              </button>
            ) : null}
            {UserLogin ? null : (
              <>
                <Link to="login" className="p-3">
                  Login
                </Link>
                <Link to="register" className="p-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}