import mongoose from 'mongoose';

const GitProjectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        fullName: { type: String, required: true },
        openIssues: { type: Number, required: true },
        averageDays: { type: Number },
        standardDeviation: { type: Number },
        items: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('GitProject', GitProjectSchema);
