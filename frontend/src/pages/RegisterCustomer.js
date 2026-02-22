import { Link } from "react-router-dom";

function Register () {
    return (
        <div className = "h-screen flex flex-col items-center bg-gray-100">

            <div className = "pt-16">
                <h1 className = "font-bold text-3xl">
                    สมัครสมาชิก
                </h1>
            </div>

            <div className = "pt-10 pr-48">
                <label className = "text-sm">
                    ชื่อผู้ใช้
                </label>
            </div>

            <div className = "pt-1">
                <input className = "rounded-md border-2 min-h-10 min-w-60 text-center"
                    placeholder = "ชื่อผู้ใช้"
                />
            </div>

            <div className = "pt-5 pr-36">
                <label className = "text-sm">
                    Email address
                </label>
            </div>

            <div className = "pt-2">
                <input className = "rounded-md border-2 min-h-10 min-w-60 text-center"
                    placeholder = "Email address"
                />
            </div>

            <div className = "pt-5 pr-48">
                <label className = "text-sm">
                    รหัสผ่าน
                </label>
            </div>

            <div className = "pt-2">
                <input className = "rounded-md border-2 min-h-10 min-w-60 text-center"
                    placeholder = "รหัสผ่าน"
                />
            </div>

            <div className = "pt-5 pr-40">
                <label className = "text-sm">
                    ยืนยันรหัสผ่าน
                </label>
            </div>

            <div className = "pt-2">
                <input className = "rounded-md border-2 min-h-10 min-w-60 text-center"
                    placeholder = "ยืนยันรหัสผ่าน"
                />
            </div>

            <div className = "pt-10">
                <button className = " bg-blue-400 text-white min-h-10 min-w-40 rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98]">
                    สมัครสมาชิก
                </button>
            </div>

            <div className = "pt-16 flex flex-row">
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

export default Register;