import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import ItemList from "./ItemList";
const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
    const handleClick=()=>{
        // console.log("Handle Clicked")
        // setShowItems(!showItems);
        setShowIndex();
    }

    // console.log(data);
    return (
        <div>
            <div className="w-6/12 mx-auto my-7 bg-gray-50 shadow-xl p-4 ">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                <span className="font-bold text-lg">
                    {data?.title} ({data?.itemCards?.length || data?.categories?.length})
                </span>
                <span><ChevronDown /> </span>
                </div>
                {showItems && <ItemList items={data.itemCards || data.categories} />}
            </div>
        </div>
    );
};

export default RestaurantCategory;
