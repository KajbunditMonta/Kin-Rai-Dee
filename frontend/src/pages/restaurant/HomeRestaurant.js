import wallet from '../../src/wallet.webp';
import menu from '../../src/menu.webp';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomeRestaurant () {
    
    const navigate = useNavigate();

    const menuManagement = () => {
        navigate("/MenuManagement");
    }

    const userData = JSON.parse(localStorage.getItem('user'));
    const username = userData?.username;

    const [isOpen, setIsopen] = useState(false);

    useEffect(() => {

        const fetchStatus = async () => {

            try {

                const res = await axios.get(`http://localhost:5000/api/RestaurantAuth/getShop/${username}`);
                
                if (res.data) {
                    setIsopen(res.data.isOpen);
                }

            } catch (err) {
                console.error("Fetch Status Error:", err);
            }
        };

        if (username) {
            fetchStatus();
        }
    }, [username]);

    const statusHandle = async () => {

        if(window.confirm("ต้องการเปลี่ยนสถานะร้านหรือไม่")) {

            try {

                const nextStatus = !isOpen;
                
                const res = await axios.put(`http://localhost:5000/api/RestaurantAuth/setStatus/${username}`, {
                    username : username,
                    isOpen : nextStatus
                });

                if (res.status === 200) {
                    setIsopen(nextStatus);
                }

            } catch (err) {
                console.error("Update Status Error:", err);
                alert("ไม่สามารถเปลี่ยนสถานะร้านได้ในขณะนี้");
            }

        }
    }

    return (
        <div className = "min-h-screen flex flex-col items-center bg-gray-100 font-notoSans">

            <div className = "h-8"></div>

            <div className = "bg-blue-300 w-80 h-32 rounded-3xl shadow-2xl">

                <div className = 'flex flex-row pt-6 pl-3'>

                    <img 
                        className = 'w-20'
                        src = {wallet}
                        alt = 'wallet'
                    />

                    <div className = 'flex flex-col'>
                        <div className = 'pl-4'>
                            <p className = 'text-white font-bold text-lg'>
                                ยอดขายวันนี้
                            </p>
                            <p className = 'text-white font-bold text-lg text-right pt-4'>
                                บาท
                            </p>
                        </div>
                    </div>

                </div>

                <div className = 'pt-12 pl-5 flex flex-row items-center'>
                    <button onClick = {menuManagement} className = 'bg-gray-300 w-20 h-20 rounded-full hover:bg-gray-500 active:scale-[0.98] flex items-center justify-center'>
                        <img className = 'w-14'
                            src = {menu} alt = 'menu-icon'/>
                    </button>
                    <label className = 'pl-5 text-2xl'>
                        เมนู
                    </label>
                </div>

                <div className = 'pt-8 flex items-center justify-center'>
                    <p className = 'text-xl pl-4'>
                        คำสั่งซื้อ
                    </p>
                </div>

            </div>

            <div className = 'fixed bottom-0 z-50 h-20 min-w-full bg-white flex flex-row items-center justify-center'>
                <div className = ''>
                    <button onClick = {statusHandle} className = {`w-20 h-20 text-white rounded-full ${isOpen ? 'bg-green-600' : 'bg-red-600'}`}>
                        {isOpen ? "ปิดร้าน" : "เปิดร้าน"}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default HomeRestaurant;