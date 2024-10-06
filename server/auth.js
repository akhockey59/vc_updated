const userModel = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();


const generateToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtKey, { expiresIn: "5d" });
};


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "There is already a user registered with this email" });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please fill up all the fields" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Please enter a valid email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: "Please enter a strong password" });
        }

        user = new userModel({ name, email, password, isFirstLogin: true });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const jwtToken = generateToken(user._id);
        res.status(200).json({ token: jwtToken, user: { name, email } });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "An error occurred while registering the user" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found with this email" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }
        //sendLoginEmail(email, name);
        //sendFirstTimeLoginEmail(email, user.name);
        const jwtToken = generateToken(user._id);
        res.status(200).json({ message: "User logged in successfully", token: jwtToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while logging in the user" });
    }
};

// Find a user by ID
const findUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while finding the user" });
    }
};

// Get all users
const users = async (req, res) => {
    try {
        const user = await userModel.find();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "An error occurred while finding the users" });
    }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userModel.deleteOne({ _id: userId });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(400).json({ error: "User not found with this id" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "An error occurred while deleting the user" });
    }
};

module.exports = { registerUser, loginUser, findUser, users, deleteUser };