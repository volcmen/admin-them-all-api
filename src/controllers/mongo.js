import mongoose from 'mongoose';
import config from 'config';

const db = config.get('db');

mongoose.Promise = global.Promise;

mongoose.connect(db, { useMongoClient: true }).then(
    () => {
        console.log('connected to db');
    },
    (err) => {
        console.error('DB Connection Error:', err);
    },
);

export default mongoose;
