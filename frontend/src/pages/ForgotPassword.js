import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ForgotPassword () {
    const navigate = useNavigate();

    const newpasswordOnclick = () => {
        navigate('/Newpassword');
    }
    return (
        <div className = "h-screen flex flex-col items-center bg-gray-100">
            <div className = "pt-16">
                <h1 className = "font-bold text-3xl">
                    Forget password?
                </h1>
            </div>
            <div className = "pt-10 w-64 flex flex-col">
                <label className = "text-left mb-2">
                    กรุณาใส่อีเมล
                </label>
        
                <input className = "rounded-md border-2 min-h-10 w-full text-center px-2"
                    placeholder = "Email address"
                />
            </div>

            <div className = "pt-10">
                <button onClick = {newpasswordOnclick} className = " bg-blue-400 text-white min-h-10 min-w-52 rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98]">
                    ยืนยันการเปลี่ยนรหัสผ่าน
                </button>
            </div>
            <div className = "pt-16 flex flex-row">
                <p className = "text-sm">
                    ย้อนกลับไปหน้า
                </p>
                <Link className = "text-sm underline pl-2 " to = "/">
                    Login
                </Link>
            </div>
        </div>
    ) 
}

export default ForgotPassword;