import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FilesService from "./files.service.js";

class UsersService {
    async register({username, password, email}, picture) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        let avatarUrl = '';
        if (picture) {
            avatarUrl = FilesService.saveFile(picture);
        }
        const createdUser = await User.create({username, passwordHash, email, avatarUrl});
        console.log(createdUser);
        return {
            ...createdUser._doc,
            token: jwt.sign(
                {
                    _id: createdUser._id,
                },
                'secret',
                {
                    expiresIn: '30d'
                }
            ),
        }
    }

    async login({username, password}) {
        const user = await User.findOne({username});

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        const isValidPass = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPass) {
            throw new Error('Неверный логин или пароль');
        }

        return {
            ...user._doc,
            token:jwt.sign(
                {
                    _id: user._id,
                },
                'secret',
                {
                    expiresIn: '30d',
                }
            ),

        }
    }

    async getInfoUser(token) {

        const decodedId = jwt.verify(token, 'secret');
        const user = await User.findById(decodedId._id);
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        return user._doc;
    }
}

export default new UsersService();