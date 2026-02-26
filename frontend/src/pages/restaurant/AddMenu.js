import backImg from '../../src/back.jpg';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AddMenu () {

    const navigate = useNavigate();

    const backHandle = () => {
        navigate("/HomeRestaurant");
    }

    const [menu, setMenu] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState(null);

    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const saveHandle = () => {

        if (menu === "" || desc === "" || price === "" || img === null) {
            alert("โปรดอัพโหลดภาพหรือกรอกข้อมูลให้ครบ")
        }
        
    }
    

    return (
        <div className = "min-h-screen flex flex-col bg-gray-100">

            <div className = "pl-4 pt-10">
                <button onClick = {backHandle} className = "w-20 h-10 flex items-center justify-center rounded-full hover:bg-slate-300 active:scale-[0.98]">
                    <img className = "w-9" 
                        src = {backImg}
                        alt = 'backIcon'
                    />
                </button>
            </div>

            <div className = 'pl-16'>
                <p className = 'font-bold text-2xl'>
                    เพิ่มรูปภาพ
                </p>
            </div>

            {preview && (
                <div className="flex justify-center pt-4">
                    <img src={preview} className="w-40 h-40 rounded-xl" alt="Preview" />
                </div>
            )}

            <div className = 'flex flex-col items-center justify-center pt-4'>
                <input className = 'pl-16'
                    type = 'file'
                    accept='image/*'
                    onChange = { handleFileChange }
                />
            </div>

            <div className = 'pl-16 pt-5'>
                <p className = 'text-2xl font-bold'>
                    ชื่อเมนู
                </p>
            </div>

            <div className = 'pl-14 pt-3'>
                <input className = 'border-2 h-14 w-64 placeholder:pl-2 rounded-xl text-lg pl-2'
                    placeholder = 'ระบุชื่อเมนู'
                    value = {menu}
                    onChange = { (e) => setMenu(e.target.value)}
                />
            </div>
            
            <div className = 'pl-16 pt-5'>
                <p className = 'text-2xl font-bold'>
                    คำอธิบาย
                </p>
            </div>

            <div className = 'pl-14 pt-3'>
                <input className = 'border-2 h-14 w-64 placeholder:pl-2 rounded-xl text-lg pl-2'
                    placeholder = 'ส่วนประกอบ วิธีปรุง ฯลฯ'
                    value = {desc}
                    onChange = { (e) => setDesc(e.target.value)}
                />
            </div>

            <div className = 'pl-16 pt-5'>
                <p className = 'text-2xl font-bold'>
                    ราคา
                </p>
            </div>

            <div className = 'pl-14 pt-3'>
                <input className = 'border-2 h-14 w-64 placeholder:pl-2 rounded-xl text-lg pl-2'
                    placeholder = 'ระบุราคา'
                    type = 'number'
                    value = {price}
                    onChange = { (e) => setPrice(e.target.value)}
                />
            </div>
            
            <div className = 'flex flex-col items-center pt-10'>
                <button onClick = {saveHandle} className = 'bg-blue-400 h-16 w-40 rounded-xl text-white'>
                    บันทึกเมนู
                </button>
            </div>

        </div>
    )

}

export default AddMenu;