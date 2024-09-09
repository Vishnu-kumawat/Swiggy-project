import { useDispatch } from 'react-redux';
import { CDN_URL } from '../utils/constants';
import { addItem } from '../utils/cartSlice';
const ItemList = ({ items }) => {

    const dispatch = useDispatch();

    const handleAddItem = (item) =>{
        dispatch(addItem(item))
    }


    return (
        <div>
            {items.map((item) => <div key={item?.card?.info?.id} className="p-2 m-2 border-gray-200  border-b-2 text-left">
                <div className="py-2 flex ">
                    <div className='ml-6 w-[528px]'>
                        <p className="text-2xl font-bold"> {item?.card?.info?.name} </p>
                        <p className='text-lg font-semibold'>₹ {item?.card?.info?.defaultPrice / 100 || item?.card?.info?.price / 100}
                            {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                                <span className='p-2'> ⭐ {item?.card?.info?.ratings?.aggregatedRating?.rating} </span>
                            )} </p>
                        <p className="text-lg font-sans text-gray-500 line-clamp-2"> {item?.card?.info?.description} </p>
                    </div>
                    <div className="relative">
                            <img className='w-36 rounded-2xl' src={CDN_URL + item?.card?.info?.imageId} />
                            <button className="px-10 py-2 shadow-lg bg-white text-green-500 font-bold text-lg rounded-xl absolute bottom-[-18px] left-1/2 transform -translate-x-1/2" onClick={() => handleAddItem(item)}>
                                ADD
                            </button>
                        </div>
                </div>
            </div>)}
        </div>
    )
}

export default ItemList;