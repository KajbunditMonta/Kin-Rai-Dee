import express from 'express';
import bcrypt from 'bcryptjs';
import Customer from '../models/Customer.js';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

router.post('/RegisterCustomer', async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const emailExists = await Customer.findOne({ email });
        if (emailExists) {
            return res.status(400).json({message : "ไม่สามารถใช้อีเมลนี้ได้"})
        }
        const emailExists2 = await Restaurant.findOne({ email });
        if (emailExists2) {
            return res.status(400).json({message : "ไม่สามารถใช้อีเมลนี้ได้"})
        }
        

        const userExists = await Customer.findOne({ username });
        if (userExists) {
            return res.status(400).json({message : "ไม่สามารถใช้ชื่อผู้ใช้นี้ได้"})
        }
        const userExists2 = await Restaurant.findOne({ username });
        if (userExists2) {
            return res.status(400).json({message : "ไม่สามารถใช้ชื่อผู้ใช้นี้ได้"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Customer({
            username,
            email,
            password : hashedPassword
        });

        await newUser.save();
        res.status(201).json({message : "สมัครสมาชิกเสร็จสิ้น"});

    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

router.post('/LoginCustomer', async (req, res) => {

    try {
        const {username, password} = req.body;

        const user = await Customer.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "ไม่พบชื่อผู้ใช้ในระบบ"});
        }

        const isMath = await bcrypt.compare(password, user.password);

        if (!isMath) {
            return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" })
        }

        res.status(200).json({
            message: "เข้าสู่ระบบสำเร็จ",
            user : {
                username: user.username,
                email: user.email,
                types: user.type
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Backend Error : " + err.message});
    }

})

export default router;