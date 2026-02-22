import { ReactComponent as Logo } from '../src/Logo.svg';
import emptyUser from '../src/empty-user.png';

import { Link } from 'react-router-dom';

function Login () {
    return (
        console.log("Hello world!")
    )
}

function LoginRegister () {

    

    return (
        <div className = "h-screen flex flex-col items-center bg-gray-100">

            <div className = "flex items-center pt-10">
                <h1 className = "text-5xl pl-8">
                    kin rai 
                </h1>
                <Logo className = "size-28 pt-4"/>
            </div>

            <div className = 'size-40 pt-8'>
                <img
                    src = {emptyUser}
                    alt = "User Profile"
                />
            </div>

            <div>
                <input className = "bg-gray-400 min-w-80 min-h-11 rounded-lg text-center placeholder:text-gray-600 placeholder:text-center" 
                    type = 'text'
                    placeholder = 'Username'
                />
            </div>

            <div className = 'pt-5'>
                <input className = "bg-gray-400 min-w-80 min-h-11 rounded-lg text-center placeholder:text-gray-600 placeholder:text-center" 
                    type = 'password'
                    placeholder = 'Password'
                />
            </div>

            <div className = 'pt-10'>
                <button onClick={Login} className = ' bg-blue-400 text-white min-h-10 min-w-40 rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-[0.98]'>
                    Login
                </button>
            </div>

            <div className = 'pt-5'>
                <Link className = "underline" to = "/ForgotPassword">
                    ลืมรหัสผ่าน?
                </Link>
            </div>

            <div className = 'pt-10 flex lex-row'>
                <p>ไม่มีสมาชิก?</p>
                <Link className = 'underline pl-2' to = "/RegisterRole">
                    สมัครสามาชิกที่นี่
                </Link>
            </div>

        </div>
    );
}

export default LoginRegister;