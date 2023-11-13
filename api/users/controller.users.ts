import usersService from './service.users';
import { UserModel, userJoiSchema } from './users.model';
import Joi from 'joi';

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
const registerUserSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    // name: Joi.string().required(),
    // address: Joi.string().required(),
});

const getAlllUsers = async (req:any, res:any) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const registerUser = async (req: any, res: any) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const newUser = req.body;
        const user = await usersService.registerUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    // בדיקת ולידציה עם Joi
    const { error } = loginUserSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await usersService.loginUser(email, password);
        if (!user) {
            // אם אין משתמש, שלח תגובה עם קוד 401
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            // טיפול בשגיאות ספציפיות
            res.status(401).json({ message: error.message });
        } else {
            // טיפול בשגיאות לא ידועות
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};
const getAllUsersAdmin = async (req: any, res: any) => {
    const { email, password } = req.body;
    try {
        const user = await usersService.getAllUsersAdmin(email, password);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};


export default {
    getAlllUsers,
    registerUser,
    loginUser,
    getAllUsersAdmin,
};
