import mongoose from 'mongoose';

let con = null;
const MONGO_URI = 'mongodb+srv://user:name@apidemo.dmj7f.mongodb.net/?retryWrites=true&w=majority&appName=apidemo';

const connectToDatabase = async () => {
	if (!MONGO_URI) {
		throw new Error("MongoDB connection URL is not defined in the settings.");
	}
	if (!con) {
		con = mongoose.connect(MONGO_URI, {});
	}
	if (!con) throw new Error("MongoDB connection URL is not defined in the settings.");
	return con;
};

export { connectToDatabase };