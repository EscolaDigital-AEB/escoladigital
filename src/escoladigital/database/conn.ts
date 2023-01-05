import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

function connectFactory(){
    try {
        mongoose.connect(String(process.env.MONGO_URI));
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log('Connected to MongoDB');
        });
        return db;
    }
    catch (error) {
        console.error(error);
    }
}

export default connectFactory;
