import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()

// Connection factory
function connectionFactory(): any {
    return mongoose.connect(String(process.env.MONGO_URL))
}

// Export
export { connectionFactory }