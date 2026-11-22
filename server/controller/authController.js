import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role, bio, skills } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide name, email and password',
            });
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'jobseeker',
            bio: bio || '',
            skills: skills || [],
        });

        const token = generateToken(user._id, user.role);

        return res.status(201).json({
            success: true,
            message: 'User Registered Successfully',
            token,
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                bio: user.bio,
                skills: user.skills,
                createdAt: user.createdAt,
                
            }
        });

    }
    catch (err) {
        next(err);
    }

}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or Password',
            });
        }

        const isPasswordMatch = await user.coparePassword(password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        const token = generateToken(user._id, user.role);

        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                bio: user.bio,
                skills: user.skills,
                
                
            }
        });
    }
    catch (err) {
        next(err);
   }
}

export const getMe = async (req, res, next) => {
    try {
        return res.status(200).json(
            {
                success: true,
                user: req.user,
            }
        )
    }
    catch (err) {
        next(err);
    }
}