import backImg from '../../src/back.jpg';

import { useNavigate } from 'react-router-dom';

function MenuManagement () {

    const navigate = useNavigate();

    const backHandle = () => {
        navigate("/HomeRestaurant");
    }

    const addMenu = () => {
        navigate("/AddMenu");
    }

    return (
        <div className = "min-h-screen flex flex-col bg-gray-100">

            <div className = "flex flex-col pt-10">
                <div className = "pl-4">

                    <button onClick = {backHandle} className = "w-20 h-10 flex items-center justify-center rounded-full hover:bg-slate-300 active:scale-[0.98]">
                        <img className = "w-9" 
                            src = {backImg}
                            alt = 'backIcon'
                        />
                    </button>

                </div>

                <h1 className = "font-bold text-center text-4xl">
                    เมนู
                </h1>
                
            </div>
            
            <div className = 'pl-8'>
                <button onClick = {addMenu} className = 'bg-blue-400 rounded-2xl w-20 h-10 text-white hover:bg-blue-600 active:scale-[0.98]'>
                    เพิ่มเมนู
                </button>
            </div>

            {/* Navbar */}
            <div className = 'fixed bottom-0 z-50 h-16 min-w-full bg-white'>
                
            </div>

        </div>
    )

}

export default MenuManagement;