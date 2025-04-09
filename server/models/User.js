import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Clerk userId
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student'
    }
  });
  
  const User = mongoose.model('User', userSchema);
  
  export default User;