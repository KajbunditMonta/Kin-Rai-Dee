import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import backImg from '../../src/back.jpg'
import axios from "axios";

function Orderfood() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { food, shop } = location.state || {};

    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    if (!food || !shop) {
        return (
            <div className="text-center mt-20 text-gray-500">
                ไม่พบข้อมูลเมนู
                <br />
                <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">
                    กลับ
                </button>
            </div>
        );
    }

    const totalPrice = food.price * quantity;

    const handleOrder = async () => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:5000/api/order/create`, {
                restaurantId: id,
                foodId: food._id,
                foodName: food.name,
                price: food.price,
                quantity,
                note,
                totalPrice,
            });
            alert("สั่งอาหารสำเร็จ!");
            navigate(`/restaurant/${id}`);
        } catch (err) {
            console.error("Order error:", err);
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm p-4 flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="text-xl">
                    <img className = "w-9" 
                        src = {backImg}
                        alt = 'backIcon'
                    />
                </button>
                <h1 className="text-lg font-bold text-gray-800">สั่งอาหาร</h1>
            </div>
            <div className="p-4">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <img
                        src={food.image ? `http://localhost:5000${food.image}` : "https://via.placeholder.com/400x200"}
                        alt={food.name}
                        className="w-full h-52 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-2xl font-bold text-gray-800">{food.name}</h2>
                        <p className="text-gray-500 text-sm mt-1">{food.desc}</p>
                        <p className="text-orange-500 font-bold text-xl mt-2">{food.price}.-</p>
                    </div>
                </div>
                <div className="p-4 mt-4">
                    <h3 className="font-bold text-gray-700 mb-2">หมายเหตุถึงร้านค้า</h3>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="เช่น ไม่ใส่ผัก, เผ็ดน้อย..."
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                        rows={3}
                    />
                </div>
                <div className="p-4 mt-4">
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-10 h-10 rounded-full bg-orange-500 text-white text-xl  font-bold flex items-center justify-center"
                        >
                            −
                        </button>
                        <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-10 h-10 rounded-full bg-orange-500 text-white text-xl font-bold flex items-center justify-center"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="w-full bg-orange-500 text-white py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-orange-600 active:scale-95 disabled:opacity-50 flex justify-between items-center px-6"
                >
                    <span>{loading ? "กำลังสั่ง..." : "สั่งอาหาร"}</span>
                    <span>฿{totalPrice.toFixed(2)}</span>
                </button>
            </div>
        </div>
    );
}

export default Orderfood;