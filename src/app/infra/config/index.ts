import mongoose from 'mongoose';
import 'dotenv/config';

class DataBase {
    public mongoConnection: any;

    constructor() {
        this.mongo();
    }

    async mongo() {
        this.mongoConnection = await mongoose.connect(
            `${process.env.MONGO_URL}`,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
        );
    }
}

export default new DataBase();
