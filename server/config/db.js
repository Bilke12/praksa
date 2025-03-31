import mongoose from "mongoose";

//Funkcija za konekciju MONGODB baze
const connectDB= async() => {

    mongoose.connection.on('connected', ()=> console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/praksa`)

}

export default connectDB