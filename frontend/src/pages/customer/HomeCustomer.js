import { ReactComponent as Logo } from '../../src/Logo.svg';
import { Link, useNavigate } from "react-router-dom"; 
import axios from 'axios';
import { useState, useEffect } from "react";

function HomeCustomer () {
    const [restaurant, setRestaurant] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/RestaurantAuth/getAll");
                setRestaurant(res.data);
            } catch (err) {
                console.error("Error", err);
            }
        }
        fetchRestaurant();
    }, []);

    const handleRestaurant = (id) => {
        navigate(`/RestaurantMenu/${id}`);
    }
    return (    
        <div className = "min-h-screen flex flex-col items-center bg-gray-100 pb-20">
            <div className = "flex items-center pt-4">
                <h1 className = "text-5xl pl-8">Kin Rai </h1>
                <Logo className = "size-20"/>
            </div>
            <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.map((shop) => (
                    <div 
                        key={shop._id} 
                        onClick={() => handleRestaurant(shop._id)}
                        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-row h-32"
                    >
                        <div className="w-32 h-32 bg-gray-200 flex-shrink-0">
                             <img 
                                src={shop.image ? `http://localhost:5000${shop.image}` : "https://via.placeholder.com/150"}
                                alt={shop.restaurantName} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 flex flex-col w-full">
                            <h2 className="text-xl font-bold text-gray-800">{shop.restaurantName || shop.username}</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                {shop.isOpen ? "เปิดอยู่" : "ปิดชั่วคราว"}
                            </p>
                        </div>
                    </div>
                ))}
                {restaurant.length === 0 && (
                    <p className="text-center text-gray-500 col-span-2 mt-10">กำลังโหลดร้านค้า หรือยังไม่มีร้านค้าในระบบ...</p>
                )}

            </div>
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 h-16 flex justify-around items-center shadow-lg z-50">
                <Link to="/HomeCustomer" className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-600">
                    <span className="text-2xl">🏠</span>
                    <span className="text-xs font-medium">หน้าหลัก</span>
                </Link>
                <Link to="/OrderCustomer" className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-600">
                    <span className="text-2xl">📜</span>
                    <span className="text-xs font-medium">ออเดอร์</span>
                </Link>
                <Link to="/LoginRegister" className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-600">
                    <span className="text-2xl">👤</span>
                    <span className="text-xs font-medium">ฉัน</span>
                </Link>

            </div>

        </div>
    )
}

export default HomeCustomer;