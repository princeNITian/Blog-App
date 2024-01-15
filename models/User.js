const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const nameRegex = /^[a-zA-Z]+$/;
                return nameRegex.test(value);
            },
            message: 'Name should only contain letters without digits or special characters.'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: 'Invalid email format.'
        }
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(value){
                const phoneRegex = /^\d{10}$/;
                return phoneRegex.test(value);
            },
            message: 'Phone number must be a 10-digit numeric value.'
        }
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const today = new Date();
                const userBirthDate = new Date(value);
                const age = today.getFullYear() - userBirthDate.getFullYear();
                // Check if the user is 18 years or older
                return age >= 18;
            },
            message: 'User must be 18 years or older.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                // Custom regex for password with specific requirements
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
                return passwordRegex.test(value);
            },
            message: 'Password must contain at least 1 uppercase, 1 lowercase, 1 special character, and 1 numerical character. The length shoudl be between 8 and 15 characters.'
        }
    }
});

// Middleware to hash the password before saving to the database
userSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        try{
            const hashedPassword = await bcrypt.hash(this.password,10);
            this.password = hashedPassword;
        } catch (error){
            return next(error);
        }
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;