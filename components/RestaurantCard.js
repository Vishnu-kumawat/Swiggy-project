import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) =>{
    const {resData} = props;

    return (
        <div className="  flex flex-col gap-y-4 border-0 border-red-500 p-2 hover:scale-90 transform transition duration-200 ease-out rounded-lg" >
            <div className="relative w-64 h-44 overflow-hidden rounded-xl ">
            <img className='size-full object-cover' src={CDN_URL+resData.info.cloudinaryImageId} alt="res-logo" />
            <p className="absolute z-50 bottom-0 font-extrabold bg-gradient-to-t from-black text-white h-10  w-full p-2 "> {resData?.info?.aggregatedDiscountInfoV3?.header} {resData?.info?.aggregatedDiscountInfoV3?.subHeader}</p>
            </div>
            <p className="font-bold text-xl line-clamp-1"> {resData.info.name} </p>
            <p className="text-lg text-gray-600">⭐ {resData.info.avgRating} • {resData.info.sla.slaString}</p>
            <p className="text-lg text-gray-700 line-clamp-1"> {resData.info.cuisines.join(", ")}</p>
            <p className="text-lg text-gray-700"> {resData.info.areaName}</p>
        </div>
    )
}

export default RestaurantCard;