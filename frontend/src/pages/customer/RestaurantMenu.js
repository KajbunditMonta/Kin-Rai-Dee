import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

function RestaurantMenu() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [shop, setShop] = useState(null);   
    const [menus, setMenus] = useState([]);   
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/RestaurantAuth/getMenu/${id}`);
                setShop(res.data.shopData);
                setMenus(res.data.menuData);
            } catch (err) {
                console.error("Error:", err);
                setLoading(false);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, [id, navigate]);

    if (loading) return <div className="text-center mt-20">กำลังโหลดเมนู</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="relative h-48 bg-gray-800">
                <img 
                    src={shop?.image ? `http://localhost:5000${shop.image}` : "https://via.placeholder.com/800x300"} 
                    alt="Cover" 
                    className="w-full h-full object-cover opacity-60"
                />
                <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg">
                    ⬅️
                </button>

                <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-3xl font-bold shadow-black drop-shadow-lg">{shop?.restaurantName || shop?.username}</h1>
                    <p className="text-sm opacity-90">{shop?.isOpen ? "เปิดให้บริการ" : "ปิดชั่วคราว"}</p>
                </div>
            </div>

            <div className="p-4">
                <h2 className="text-xl font-bold mb-4 text-gray-800">รายการอาหาร</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menus.length > 0 ? (
                        menus.map((food) => (
                            <div key={food._id} className="bg-white p-3 rounded-xl shadow-md flex flex-row h-28">
                                <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                                    <img 
                                        src={food.image ? `http://localhost:5000${food.image}` : "https://via.placeholder.com/150"} 
                                        alt={food.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="ml-3 flex flex-col justify-between w-full">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-800">{food.name}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-1">{food.desc}</p>
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-orange-500 font-bold text-lg">{food.price}.-</span>
                                        <button 
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm shadow hover:bg-blue-600 active:scale-95"
                                        >
                                            + ใส่ตะกร้า
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-2 mt-10">ร้านนี้ยังไม่ได้ลงเมนูอาหาร</p>
                    )}
                </div>
            </div>

        </div>
    );
}

export default RestaurantMenu;