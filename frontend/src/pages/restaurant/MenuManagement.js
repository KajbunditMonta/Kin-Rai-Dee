import backImg from '../../src/back.jpg';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function MenuManagement () {

    const navigate = useNavigate();

    const backHandle = () => {
        navigate("/HomeRestaurant");
    }

    const addMenu = () => {
        navigate("/AddMenu");
    }

    // show menu

    const [menus, setMenus] = useState([]);

    // get from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const username = userData?.username;

    const fetchMenus = useCallback( async () => {
        
        try {

            const response = await axios.get(`http://localhost:5000/api/RestaurantAuth/Menus/${username}`);
            setMenus(response.data);

        } catch (err) {
            console.error("Fetch error : ", err);
        }

    }, [username]);

    useEffect( () => {
        if (username) fetchMenus(); 
    }, [username, fetchMenus]);

    // delete

    const deleteHandle = async (id) => {
        
        if (window.confirm("ต้องการลบเมนูนี้ใช่หรือไม่?")) {
            try { 

                await axios.delete(`http://localhost:5000/api/RestaurantAuth/DeleteMenu/${id}`);

                setMenus(menus.filter(item => item._id !== id));

                alert("ลบเมนูสำเร็จ");

            } catch (err) {
                console.error("delete error : ", err);
                alert("เกิดข้อผิดพลาดในการลบ");
            }
        }

    }

    // edit

    const editMenuHandle = (item) => {
        navigate('/EditMenu', { state : {menu : item} });
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

                <h1 className = "font-bold text-center text-4xl pb-5">
                    เมนู
                </h1>
                
            </div>

            { menus.map( (item) => (
                <div className = 'bg-slate-300 rounded-xl m-5 py-4' key = {item._id}>
                    <div className = 'flex flex-row'>
                        <div className = 'w-20 h-20 m-5'>
                            <img className = 'rounded-xl w-20 h-20'
                                src = {`http://localhost:5000${item.image}`}
                                alt = {item.image}
                            />
                        </div>

                        <div className = 'pt-5 flex-1'>
                            <h2 className = 'font-bold text-lg'>{item.name}</h2>
                            <p className = 'text-sm'>{item.desc}</p>
                            <p className = 'text-green-600 font-bold'>{item.price} บาท</p>
                        </div>

                        <div className = 'flex items-end'>
                            <label>
                                <p className = 'underline'>แก้ไข</p>
                                <button onClick = {() => editMenuHandle(item)}></button>
                            </label>
                        </div>

                        <div className = 'flex items-end m-5'>
                            <button onClick = { () => deleteHandle(item._id)} className = 'w-14 h-14 bg-red-600 rounded-2xl text-white hover:bg-red-800 active:scale-[0.98]'>
                                ลบ
                            </button>
                        </div>

                    </div>

                </div>
            ))}
            

            <div className = 'pl-8 pt-5'>
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