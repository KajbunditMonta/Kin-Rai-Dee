import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
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
            return res.status(400).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" })
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

router.post('/forgotpassword', async (req, res) => {
    try {
        const {email} = req.body;
        const customer = await Customer.findOne({email});
        const restaurant = await Restaurant.findOne({email});
        const user = customer || restaurant;
        if (!user) {
            return res.status(404).json({message: "ไม่มีอีเมลนี้ในระบบ"});
        }
        const resetnumber = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = resetnumber;
        user.resetPasswordExpired = Date.now() + 5 * 60 * 1000;
        await user.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: {
                name: "Kin Rai Dee",
                address: process.env.EMAIL_USER
            },
            to: email,
            subject: 'รหัสรีเซ็ตรหัสผ่านจาก Kin Rai Dee',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>แจ้งเตือนรหัสรีเซ็ตรหัสผ่าน</h2>
                    <p>คุณได้ทำการร้องขอเพื่อเปลี่ยนรหัสผ่าน</p>
                    <p>รหัสรีเซ็ตรหัสผ่านของคุณคือ:</p>
                    <h1 style="color: #e74c3c; letter-spacing: 5px;">${resetnumber}</h1>
                    <p>รหัสนี้จะหมดอายุใน <strong>5 นาที</strong></p>
                </div>
            `
        });
        return res.status(200).json({ message: "ส่งรหัสรีเซ็ตไปยังอีเมลเรียบร้อยแล้ว" });
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

router.post('/resetpassword', async (req, res) => {
    try {
        const {email, resetnumber, newpassword} = req.body;
        const customer = await Customer.findOne({email});
        const restaurant = await Restaurant.findOne({email});
        const user = customer || restaurant;
        if (!user) {
            return res.status(404).json({message: "ไม่มีอีเมลนี้ในระบบ"});
        }
        if (user.resetPasswordToken !== resetnumber || user.resetPasswordExpired < Date.now()) {
            return res.status(400).json({message: "รหัสไม่ถูกต้องหรือหมดเวลาแล้ว"});
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newpassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;
        await user.save();
        res.status(200).json({message: "เปลี่ยนรหัสผ่านสำเร็จ"});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

export default router;