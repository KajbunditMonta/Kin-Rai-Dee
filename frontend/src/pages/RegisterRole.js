import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RegisterRole () {

    const navigate = useNavigate();

    const customerOnclick = () => {
        navigate('/RegisterCustomer');
    }

    const restaurantOnclick = () => {
        navigate('/RegisterRestaurant');
    }

    return (
        <div className = "h-screen flex flex-col items-center bg-gray-100 font-notoSans">

            <div className = "pt-16">
                <h1 className = "font-bold text-2xl font-notoSansBold">
                    คุณเป็นลูกค้าหรือร้านค้า?
                </h1>
            </div>

            <div className = "pt-14">
                <button onClick = {customerOnclick} className = "bg-blue-500 rounded-lg min-h-40 min-w-40 hover:bg-blue-600 active:scale-[0.98] text-white text-xl">
                    ลูกค้า
                </button>
            </div>

            <div className = "pt-16">
                <button onClick = {restaurantOnclick} className = "bg-orange-500 rounded-lg min-h-40 min-w-40 hover:bg-orange-600 active:scale-[0.98] text-white text-xl">
                    ร้านค้า
                </button>
            </div>

            <div className = "pt-20 flex flex-row">
                <p className = "text-sm">
                    มีสมาชิกอยู่แล้ว?
                </p>
                <Link className = "text-sm underline pl-2" to = "/">
                    Login ที่นี่
                </Link>
            </div>

        </div>
    )
}

export default RegisterRole;