import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        default: 'user'
    }
});

// Method to hash the password
userSchema.methods.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Method to compare password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

export const User = model('users', userSchema);


