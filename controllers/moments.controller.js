import MomentsService from "../services/moments.service.js";

class MomentsController {

    async getAllMoment(req, res) {
        try {
            const moments = await MomentsService.getAllMoment();
            res.json(moments);
        } catch (error) {
            res.status(500).json({message: 'Ошибка'});
        }
    }

    async getOneMoment(req, res) {
        try {
            const moment = await MomentsService.getOneMoment(req.params.id);
            res.json(moment);
        } catch (error) {
            res.status(500).json({message: 'Ошибка'});
        }
    }

    async createMoment(req, res) {
        try {
            const moment = await MomentsService.createMoment({...req.body, user: req.userId}, req.files.picture);
            res.json(moment);
        } catch (error) {
            res.status(500).json({message: 'Неудалось создать момент'});
        }
    }

    async removeMoment(req, res) {
        try {
            const result = await MomentsService.removeMoment(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({message: 'Ошибка'});
        }
    }

    async updateMoment(req, res) {
        try {
            const moment = MomentsService.updateMoment(req.body);
            res.json(moment);
        } catch (error) {
            res.status(500).json({message: 'Ошибка'});
        }
    }

}

export default new MomentsController();