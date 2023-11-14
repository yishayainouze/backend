import usersService from './service.users';
import { UserModel, userJoiSchema } from './users.model';
import { Types } from 'mongoose';
import Joi from 'joi';

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
const cartItemJoiSchema = Joi.object({
    product_id: Joi.number().required(),
    quantity: Joi.number().required(),
    price: Joi.string().required(),
    image: Joi.string().required(),
});
const registerUserSchema = Joi.object({
    user_id: Joi.number().required(), // Only include if you are manually setting user IDs
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(5).required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    cart: Joi.array().items(cartItemJoiSchema), // Assuming cartItemJoiSchema is defined elsewhere
});
const updateUserSchema = Joi.object({
    username: Joi.string().min(3).max(30),  // שם משתמש בין 3 ל-30 תווים
    password: Joi.string().min(5),          // סיסמה עם לפחות 5 תווים
    email: Joi.string().email(),            // כתובת דוא"ל תקפה
    name: Joi.string(),                     // שם מלא
    address: Joi.string(),                  // כתובת
    cart: Joi.array().items(cartItemJoiSchema), // מערך של פריטים בעגלה
});

const getAlllUsers = async (req:any, res:any) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getUserByID = async (req: any, res: any) => {
    const userId = req.params.id;
     // Assuming the user ID is passed as a URL parameter
     console.log(typeof userId);
    try {
        const user = await usersService.getUserById(userId);
        if (!user) {
            // If the user is not found, return a 404 status code
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            // Handle specific errors
            res.status(500).json({ message: error.message });
        } else {
            // Handle unknown errors
            res.status(500).json({ message: 'An unknown error occurred' });
        }
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

const updateUserById = async (req: any, res: any) => {
    const { error } = updateUserSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = new Types.ObjectId(req.params.id);
    console.log("controller1 "+ userId);
    try {
        const updatedUserData = req.body;
        console.log("controller "+ updatedUserData);
        const updatedUser = await usersService.updateUserById(userId, updatedUserData);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
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
// const getAllUsersAdmin = async (req: any, res: any) => {
//     const { email, password } = req.body;
//     try {
//         const user = await usersService.getAllUsersAdmin(email, password);
//         res.status(200).json(user);
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(401).json({ message: error.message });
//         } else {
//             res.status(500).json({ message: 'An unknown error occurred' });
//         }
//     }
// };


export default {
    getAlllUsers,
    registerUser,
    loginUser,
    // getAllUsersAdmin,
    getUserByID, 
    updateUserById
};
