import { Link } from "react-router-dom"; 

function HomeCustomer () {

    return (
        <div className = "min-h-screen flex flex-col items-center bg-gray-100">
            <h1 className = "text-5xl pl-8">รายการ</h1>
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 h-16 flex justify-around items-center shadow-lg z-50">
                <Link to="/HomeCustomer" className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-600">
                    <span className="text-2xl">🏠</span>
                    <span className="text-xs font-medium">หน้าหลัก</span>
                </Link>
                <Link to="/OrderHistory" className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-600">
                    <span className="text-2xl">📜</span>
                    <span className="text-xs font-medium">รายการ</span>
                </Link>
                <Link to="/Profile" className="flex flex-col items-center text-gray-600 hover:text-blue-500 focus:text-blue-600">
                    <span className="text-2xl">👤</span>
                    <span className="text-xs font-medium">ฉัน</span>
                </Link>

            </div>
        </div>
        
    )
}

export default HomeCustomer;    