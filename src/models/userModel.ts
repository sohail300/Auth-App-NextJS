import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Please enter a unique username"],
        required: [true, "Please enter a username"]
    },
    email: {
        type: String,
        unique: [true, "Please enter a unique email"],
        required: [true, "Please enter a email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date
})

export const User = mongoose.models.users || mongoose.model('users', userSchema);