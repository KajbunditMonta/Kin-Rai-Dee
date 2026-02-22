import express from 'express';
import bcrypt from 'bcryptjs';
import Customer from '../models/Customer.js';

const router = express.Router();

router.post('/RegisterCustomer', async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const emailExists = await Customer.findOne({ email });
        if (emailExists) {
            return res.status(400).json({message : "ไม่สามารถใช้อีเมลนี้ได้"})
        }

        const userExists = await Customer.findOne({ username });
        if (userExists) {
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

export default router;