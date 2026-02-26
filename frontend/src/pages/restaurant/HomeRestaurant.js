import wallet from '../../src/wallet.webp';
import menu from '../../src/menu.webp';

import { useNavigate } from 'react-router-dom';

function HomeRestaurant () {
    
    const navigate = useNavigate();

    const menuManagement = () => {
        navigate("/MenuManagement");
    }

    return (
        <div className = "min-h-screen flex flex-col items-center bg-gray-100">

            <div className = "h-8"></div>

            <div className = "bg-blue-300 w-80 h-32 rounded-3xl">

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

            <div className = 'fixed bottom-0 z-50 h-16 min-w-full bg-white'>
                
            </div>

        </div>
    )
}

export default HomeRestaurant;