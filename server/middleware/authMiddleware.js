import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.aurization && req.headers.aurization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split('')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'User belonging to this token no longer exists',
                });
            }
            next()
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: 'not authorized, token verification failed',
            });
            
        }
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not autorized, no token provided',
        })
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role(${req.user.role}) is not authorized to access this resource`,
            });
        }
        next()
    }
    
}