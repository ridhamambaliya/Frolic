import jwt from 'jsonwebtoken';
import bcrypt, { compare } from "bcrypt"
import User from "../models/user.model.js";

// ============================ //
// Register(Sign Up) Controller //
// ============================ //
const register = async (req,res,next) => {
    try {        
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        if (role === "admin"){
            return res.status(403).json({
                message: "Admin cannot be registered publicly"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };        
        res.status(201).json({
            message: "User registered successfully",
            usrName: userResponse.name,
            userRole: userResponse.role
        });
    } catch (error) {
        next(error);
    }
}

// ========================== //
// Login(Sign In) Controller  //
// ========================== //
const login = async (req,res,next) => {    
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const passMatch = await bcrypt.compare(password,existingUser.password);
        if(!passMatch){
            return res.status(400).json({ message: "Invalid Password"});
        }
        if(role !== existingUser.role){
            return res.status(403).json({
                message: "You are not authorized for this role"
            })
        }
        const token = jwt.sign(
        { 
            id: existingUser._id, 
            role: existingUser.role
        },
        process.env.JWT_SECRET, // process is main object of node
        { expiresIn: "1d"}
        );

        res.status(200).json({ message: "Login Successful", token,userRole:existingUser.role});
    } catch (error) {
        next(error);      
    }
}
export {register,login}