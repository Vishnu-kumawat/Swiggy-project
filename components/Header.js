import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { Search, BriefcaseBusiness, BadgePercent, BadgeInfo, CircleUserRound, ShoppingCart } from 'lucide-react';
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnNameReact, setBtnNameReact] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(UserContext);
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems)

    return (
        <div className="flex justify-between shadow-lg">
            <div className="logo-container">
                <img className="h-28" src={LOGO_URL} alt="" />
            </div>

            <div className="nav-items my-10">
                <ul className="flex items-center text-xl font-sans text-gray-700">
                    <li className="mx-6 font-bold hover:text-orange-600">
                        Online Status: {onlineStatus ? "✅" : "🔴"}
                    </li>
                    <li className="mx-6 font-bold flex items-center hover:text-orange-600">
                        <BriefcaseBusiness className="mr-1" />
                        <Link to="/">Swiggy corporate</Link>
                    </li>
                    <li className="mx-6 font-bold flex items-center hover:text-orange-600">
                        <Search className="mr-1" />
                        <Link to="/about">Search</Link>
                    </li>
                    <li className="mx-6 font-bold flex items-center hover:text-orange-600">
                        <BadgePercent className="mr-1" />
                        <Link to="/contact">Offers <sup className="text-orange-600 font-bold">New</sup></Link>
                    </li>
                    <li className="mx-6 font-bold flex items-center hover:text-orange-600">
                        <BadgeInfo className="mr-1" />
                        <Link to="/grocery">Help</Link>
                    </li>
                    <li className="mx-6 font-bold flex items-center hover:text-orange-600">
                        <CircleUserRound className="mr-1" />
                        Sign in
                    </li>
                    <li className="mx-6 font-bold flex items-center hover:text-orange-600">
                        <ShoppingCart className="mr-1" /> <sup className="text-orange-600 font-bold">{cartItems.length}</sup>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <button className="mx-6 font-bold hover:text-orange-600" onClick={() => {
                        setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
                    }}>
                        {btnNameReact}
                    </button>
                    {/* <li className="px-4 font-bold"> {loggedInUser}</li> */}
                </ul>
            </div>
        </div>
    );
}

export default Header;