import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// token checking middleware
const protect = async (req, res, next) => {
    try {
        let token;
        if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {        
            token = req.headers.authorization.split(" ")[1];        
        }
        console.log(token);
        
        if (!token) {
            return res.status(401).json({
                message: "Not authorized, no token"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, token failed",
        });   
    }
}

// role checking Middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role ${req.user.role} is not allowed to access this resource`,
            });
        }
        next();
    };
};

export {protect , authorizeRoles};

