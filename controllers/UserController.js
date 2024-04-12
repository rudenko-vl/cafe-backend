import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { resolve } from 'path/posix';
import UserModel from '../models/User.js';

const JWT_SECRET = 'secret123';
export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            name: req.body.name,
            email: req.body.email,
            admin: false,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save();
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                    expiresIn: "30d",
                },);
        res.cookie('token', token, { httpOnly: true });

        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData, token, })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не вдалось зареєструватись!",
        })
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return resolve.status(404).json({
                message: "Користувач не знайдений!"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass) {
            return res.status(404).json({
                message: "Неправильний пароль або логін!"
            })
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                    expiresIn: "30d",
                },);
        res.cookie('token', token, { httpOnly: true });

        const { passwordHash, ...userData } = user._doc;
        res.json({ ...userData, token, })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Не вдалось авторизуватись!",
        })
    };
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Користувач не знайдений"
            })
        }
        res.json({
            email: user.email,
            name: user.name,
            admin: user.admin,
        });
    } catch (error) {
        res.status(500).json({
            message: "Нема доступу"
        })

    }
};

export const logOut = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};