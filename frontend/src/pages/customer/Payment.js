import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";

function Payment() {
    const { id } = useParams(); 
    const [PP, setPP] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/RestaurantAuth/getMenu/${id}`);
                setPP(res.data.shopData.imagePP); 
            } catch (err) {
                console.error("Error:", err.response?.data || err.message);
            }
        };
        fetchImage();
    }, [id]);

    const handleBack = () => {
        navigate(`/HomeCustomer`);
    };

    return (
        <>
            <div className="flex flex-col items-center pt-10">
                {PP ? (
                    <div className="w-100 h-80">
                        <img
                            src={`http://localhost:5000${PP}`}
                            alt="Fetched Images"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">ไม่มีรูปภาพ</p>
                )}
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4">
                <button
                    onClick={handleBack}
                    className="w-full text-white bg-orange-500 py-3 rounded-2xl font-bold text-center flex justify-center px-6"
                >
                    <span>จ่ายสำเร็จ</span>
                </button>
            </div>
        </>
    );
}

export default Payment;