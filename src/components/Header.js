import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/assets/delivery-guy.png";
import { useUserStatus } from "./utils/useUserStatus";
import { UserContext } from "./utils/UserContext";
import { useSelector } from "react-redux";

export const Header = () => {
  const [loginToggle, setLoginToggle] = useState(true);
  const navigate = useNavigate();
  const userStatus = useUserStatus();
  const { user } = useContext(UserContext);

  //Subscribing to the cart slicer of the store using Selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-white shadow-custom-light p-4 sticky top-0 z-20">
      <img className="w-12 h-12" src={logo}></img>
      <ul className="flex flex-row justify-center gap-4 items-center p-2 mr-2 cursor-pointer">
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/contact")}>Contact</li>
        <li onClick={() => navigate("/cart")} className="font-bold">
          Cart({cartItems.length})
        </li>
        <button onClick={() => setLoginToggle((prev) => !prev)}>
          {loginToggle ? "Login" : "Logout"}
        </button>
        <li className="text-orange-600">
          {user} {!userStatus ? "🔴" : ""}
        </li>
      </ul>
    </div>
  );
};
