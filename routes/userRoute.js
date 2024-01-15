const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt')


// Route to register a new user
router.post('/register', async (req,res) => {
    try {
        const { name, email, phone, dateOfBirth,password } = req.body;

        // Hash the password before saving it to the database
        // const hashedPassword = await bcrypt.hash(password,10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            phone,
            dateOfBirth,
            password
        });

        // save the user to the database
        const savedUser = await newUser.save();

        const secretKey = 'mySecretKey';
        const token = jwt.sign({userId: newUser._id },secretKey, { expiresIn: '1h' });
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Route to login an existing user
router.post('/login',async (req,res) => {
    try {
        const {email, password } = req.body;

        // check if either email or phone is provided for login
        if(!email && !password) {
            return res.status(400).json({message: 'Please provide email and password for login'});
        }

        // Check if the user with existing email exists
        const existingUser = await User.findOne({ email });

        // Check if the user exists
        if(!existingUser){
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password.' })
        }
        // Additional login logic can be added here
        const secretKey = 'mySecretKey';
        const token = jwt.sign({ userId: existingUser._id }, secretKey, { expiresIn: '1h' })

        res.status(200).json({ message: 'Login successful!', token });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});


// Route for LogOut
router.post('/logout',async (req,res) => {
    try{
        // Additional logic for logout can be added here (e.g., invalidate session or token)

        res.status(200).json({ message: 'Logout successful!' });
    }
    catch(error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;