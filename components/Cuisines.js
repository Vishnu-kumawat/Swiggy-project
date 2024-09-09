import React, { useState, useEffect, useRef } from 'react';
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import { ArrowRight, ArrowLeft } from 'lucide-react';

const Cuisines = (props) => {
    const [cuisines, setCuisines] = useState([]);
    const scrollContainerRef = useRef(null);
    const { resData } = props;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1825167&lng=73.19260229999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await response.json();
            const cards = json?.data?.cards || [];
            const whatsOnYourMindCard = cards.find(card => card?.card?.card?.id === "whats_on_your_mind");
            if (whatsOnYourMindCard) {
                const info = whatsOnYourMindCard.card.card.gridElements.infoWithStyle.info;
                setCuisines(info);
            }
        }

        fetchData();
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div>
            <div className='relative '>
            <div className='mx-10 mt-6 text-3xl font-extrabold'>What's on your mind?</div>
                <div className='absolute top-2 right-2 flex space-x-2 z-10'>
                    <button onClick={scrollLeft} className='p-2 bg-gray-300 rounded-full'>
                        <ArrowLeft />
                    </button>
                    <button onClick={scrollRight} className='p-2 bg-gray-300 rounded-full'>
                        <ArrowRight />
                    </button>
                </div>
                <div>
                    <img className=' object-cover' src={CDN_URL + (resData?.info?.imageId || '')} alt="" />
                    <div>
                        <p className=''>{resData?.info?.action?.text}</p>
                    </div>
                </div>
                <div className='flex h-40 overflow-x-auto scrollbar-hide' ref={scrollContainerRef}>
                    {cuisines.length === 0 ? (
                        <Shimmer />
                    ) : (
                        cuisines.map((cuisine, index) => (
                            <div key={index} className='flex-none w-36'>
                                <img className='w-44 h-44 cursor-pointer  object-cover' src={CDN_URL + (cuisine?.imageId || '')} alt={cuisine?.text} />
                                <p className='text-lg text-center'>{cuisine?.text}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cuisines;
