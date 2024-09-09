import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from 'react';
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import Cuisines from "./Cuisines";


const Body = () => {

    const [ListOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1825167&lng=73.19260229999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await response.json();
        const cards = json?.data?.cards || [];
        const topBrandsCard = cards.find(card => card?.card?.card?.id === "top_brands_for_you" );
        if (topBrandsCard) {
            const restaurants = topBrandsCard.card.card.gridElements.infoWithStyle.restaurants;
            setListOfRestaurants(restaurants);
            setFilteredRestaurants(restaurants);
        }
    }

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return <h1>Looks like you are offline!!  Please check your internet connection</h1>

    return ListOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className='body'>
        <Cuisines /> 
            <div className="filter flex">
                <div className=" m-4 p-4">
                    <input type="text" className="border-2 border-solid border-grey" value={searchText} onChange={(e => {
                        setSearchText(e.target.value);
                    })} />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={() => {
                        const filteredRestaurants = ListOfRestaurants.filter((res) =>
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurants(filteredRestaurants);
                    }}>Search</button>
                </div>

                <div className=" m-4 p-4 flex items-center">
                    <button className="px-4 py-2 rounded-lg bg-gray-200 m-4" onClick={() => {
                        const filteredList = ListOfRestaurants.filter((res) => res.info.avgRating > 4);
                        setFilteredRestaurants(filteredList);
                    }}>Top Rated Restaurants</button>
                </div>
            </div>

            <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 grid gap-4 mx-52 ">
                {
                    filteredRestaurants.map((resObj) => (
                        <Link key={resObj.info.id} to={"/restaurants/" + resObj.info.id}> <RestaurantCard resData={resObj} /> </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Body;