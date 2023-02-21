import Moment from "../models/Moment.js";
import FilesService from "./files.service.js";

class MomentsService{

    async getAllMoment(){
        const moments = await Moment.find();
        return moments;
    }

    async getOneMoment(id){
        if(!id) throw new Error('Не указан id');
        const moment = await Moment.findById(id);
        return moment;
    }

    async createMoment(moment, picture){
        const fileName = FilesService.saveFile(picture);
        const createdMoment = await Moment.create({...moment, imageUrl: fileName});
        return createdMoment;
    }

    async removeMoment(id){
        if(!id) throw new Error('Не указан id');
        await Moment.findByIdAndDelete(id);
        return {message:'Удалён'};
    }

    async updateMoment(moment){
        if(!moment._id) throw new Error('Нет id');
        const updateMoment = await Moment.findByIdAndUpdate(moment._id, moment, {new: true});
        return updateMoment;
    }

}
export default new MomentsService();