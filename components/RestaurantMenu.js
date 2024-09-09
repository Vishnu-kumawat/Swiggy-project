import React, { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import { MENU_URL } from '../utils/constants';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {
    const { resId } = useParams();
    const [resInfo, setResInfo] = useState(null);
    const [showIndex, setShowIndex] = useState(0)

    const fetchMenu = async () => {
            const response = await fetch(`${MENU_URL}${resId}`);
            const json = await response.json();
            setResInfo(json.data);
    };

    useEffect(() => {
        fetchMenu();
    }, [resId]);

    if (!resInfo) {
        return <Shimmer />;
    }

    const { name, cuisines, costForTwoMessage } = resInfo?.cards?.[2]?.card?.card?.info || {};
    const ItemCards = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card?.itemCards;

    const categories = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        c => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
             c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );


    return (
        <div className='text-center'>
            <h1 className='font-bold my-5 text-2xl'>{name}</h1>
            <h3 className='font-bold text-xl'>{cuisines?.join(", ")} - {costForTwoMessage}</h3>
            {categories.map((category, index)=>(<RestaurantCategory key={category?.card?.card?.title} data={category?.card?.card} 
            showItems={index == showIndex && true}
            setShowIndex={() => setShowIndex(index)}
            />))}
        </div>
    );
};

export default RestaurantMenu;
