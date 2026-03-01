import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NewPassword () {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";
    const [resetnumber, setResetnumber] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    useEffect(() => {
        if (!email) {
            alert("กรุณากรอกอีเมล");
            navigate("/ForgotPassword");
        }
    }, [email, navigate]);

    const Submit = async () => {
        if (newpassword !== confirmpassword) return alert("รหัสผ่านไม่ตรงกัน");
        try {
            const response = await axios.post("http://localhost:5000/api/ResetPassword/resetpassword", {
                email: email,
                resetnumber: resetnumber,
                newpassword: newpassword
            });
            alert(response.data.message);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || "รหัสยืนยันผิดพลาด");
        }
    }
    return (
        <div className = "h-screen flex flex-col items-center bg-gray-100">
            <div className = "pt-16">
                <h1 className = "font-bold text-3xl">
                    New password?
                </h1>
            </div>
            <div className="pt-5 w-64 flex flex-col">
                <label className="text-left mb-2 font-bold text-blue-600">รหัสรีเซ็ต</label>
                <input 
                    className="rounded-md border-2 border-blue-300 min-h-10 w-full text-center px-2 text-xl tracking-widest"
                    placeholder="XXXXXX"
                    maxLength="6"
                    value={resetnumber}
                    onChange={(e) => setResetnumber(e.target.value)}
                />
            </div>
            <div className = "pt-10 w-64 flex flex-col">
                <label className = "text-left mb-2">
                    รหัสผ่าน
                </label>
        
                <input className = "rounded-md border-2 min-h-10 w-full text-center px-2"
                    placeholder = "newpassword"
                    type="password"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                />
            </div>
            <div className = "pt-10 w-64 flex flex-col">
                <label className = "text-left mb-2">
                    ยืนยันรหัสผ่าน
                </label>
        
                <input className = "rounded-md border-2 min-h-10 w-full text-center px-2"
                    placeholder = "confirmpassword"
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className = "pt-10">
                <button onClick = {Submit} className = " bg-blue-400 text-white min-h-10 min-w-52 rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98]">
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

export default NewPassword;