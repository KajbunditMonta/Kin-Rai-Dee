import express from 'express';
import bcrypt from 'bcryptjs';
import Restaurant from '../models/Restaurant.js';
import Customer from '../models/Customer.js';

const router = express.Router();

router.post('/RegisterRestaurant', async (req, res) => {
    try {

        const { username, email, password} = req.body;

        const emailExists = await Restaurant.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message : "ไม่สามารถใช้อีเมลนี้ได้"})
        }
        const emailExists2 = await Customer.findOne({ email });
        if (emailExists2) {
            return res.status(400).json({message : "ไม่สามารถใช้อีเมลนี้ได้"})
        }

        const userExists = await Restaurant.findOne({ username });
            if (userExists) {
                return res.status(400).json({message : "ไม่สามารถใช้ชื่อผู้ใช้นี้ได้"})
        }
        const userExists2 = await Customer.findOne({ username });
        if (userExists2) {
            return res.status(400).json({message : "ไม่สามารถใช้ชื่อผู้ใช้นี้ได้"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Restaurant({
            username,
            email,
            password : hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message : "สมัครสมาชิกเสร็จสิ้น"})

    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

export default router;