import { ReactComponent as Logo } from '../src/Logo.svg';
import forkAndSpoon from  '../src/ForkAndSpoon.png';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRegister () {

    const [ isShow, setShow ] = useState(false);
    const [role, setRole] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginHandle = async () => {

        if (username === "" || password === "") {
            return alert("กรุณากรอกข้อมูลให้ครบถ้วน")
        }

        let api_url;

        if (role === 'customer') {
            api_url = "http://localhost:5000/api/CustomerAuth/LoginCustomer";
        } else {
            api_url = "http://localhost:5000/api/RestuarantAuth/LoginRestaurant";
        }

        try {

            const response = await axios.post(api_url, {
                username,
                password
            });

            alert(response.data.message);

            localStorage.setItem("user", JSON.stringify(response.data.user));

            if (role === 'customer') {
                navigate("/HomeCustomer");
            } else {
                navigate("/HomeRestaurant");
            }

        } catch (err) {
            alert(err.response?.data?.message || "เข้าสู่ระบบล้มเหลว")
        }

    }

    return (
        <div className = "min-h-screen flex flex-col items-center bg-gray-100">

            <div className = "flex items-center">
                <h1 className = "text-5xl pl-8">
                    kin rai 
                </h1>
                <Logo className = "size-28 pt-4"/>
            </div>

            <div className = 'size-28'>
                <img
                    className = ''
                    src = {forkAndSpoon}
                    alt = "User Profile"
                />
            </div>

            <div>
                <h1 className = 'text-lg pt-4'>
                    คุณเป็นลูกค้าหรือร้านค้า?
                </h1>
            </div>

            <div className = "pt-4 flex flex-row">
                <div className = 'pr-5'>
                    <button onClick = { () => {setShow(true); setRole("customer")} } className = "bg-blue-500 rounded-lg min-h-20 min-w-20 hover:bg-blue-600 active:scale-[0.98] text-white text-lg">
                        ลูกค้า
                    </button>
                </div>

                <button onClick = { () => {setShow(true); setRole("restaurant")} } className = "bg-orange-500 rounded-lg min-h-20 min-w-20 hover:bg-orange-600 active:scale-[0.98] text-white text-lg">
                    ร้านค้า
                </button>
            </div>
            
            {isShow && (
            <div className = 'flex flex-col items-center'>
                
                <div className = 'flex flex-row pt-6'>
                    <p>คุณคือ</p> 
                    {role === 'customer' && (<p className = 'pl-2 font-bold text-lg'>ลูกค้า</p>)}
                    {role === 'restaurant' && (<p className = 'pl-2 font-bold text-lg'>ร้านค้า</p>)}
                    <p className = 'pl-2'>?</p>
                </div>

                <div className = 'pt-6'>
                <input className = "bg-gray-400 min-w-80 min-h-11 rounded-lg text-center placeholder:text-gray-600 placeholder:text-center" 
                    type = 'text'
                    placeholder = 'Username'
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                />
                </div>

                <div className = 'pt-5'>
                    <input className = "bg-gray-400 min-w-80 min-h-11 rounded-lg text-center placeholder:text-gray-600 placeholder:text-center" 
                        type = 'password'
                        placeholder = 'Password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className = 'pt-8'>
                    <button onClick={loginHandle} className = ' bg-blue-400 text-white min-h-10 min-w-40 rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98]'>
                        Login
                    </button>
                </div>

                <div className = 'pt-5'>
                    <Link className = "underline" to = "/ForgotPassword">
                        ลืมรหัสผ่าน?
                    </Link>
                </div>
            </div>
            )}
            

            <div className = 'pt-10 flex lex-row'>
                <p>ไม่มีสมาชิก?</p>
                <Link className = 'underline pl-2' to = "/RegisterRole">
                    สมัครสามาชิกที่นี่
                </Link>
            </div>

            <div className='pt-10'>
            </div>

        </div>
    );
}

export default LoginRegister;