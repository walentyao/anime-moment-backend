import mongoose from 'mongoose';

const MomentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Moment', MomentSchema);