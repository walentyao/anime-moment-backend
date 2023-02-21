import UsersService from "../services/users.service.js";

class UsersController {

    async register(req, res) {
        try {
            let registerUser;
            if (req.files){
                registerUser = await UsersService.register(req.body, req.files.picture);
            }
            else registerUser = await UsersService.register(req.body, '');
            res.json({message: 'Пользователь зарегестрирован', ...registerUser});
        } catch (error) {
            res.status(500).json({message: 'Ошибка при регистрации'});
        }
    }

    async login(req, res) {
        try {
            const loginUser = await UsersService.login(req.body);
            res.json({message: 'Авторизация прошла успешно', ...loginUser});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getInfoUser(req,res){
        try {
            const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
            const user = await UsersService.getInfoUser(token)
            res.json({message:'Пользователь найден', ...user})
        }catch (error) {
            res.status(500).json({message:'Ошибка'});
        }
    }
}

export default new UsersController();