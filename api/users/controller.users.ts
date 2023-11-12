import usersService from './service.users.js';

const getAlllUsers = async (req:any, res:any) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const registerUser = async (req: any, res: any) => {
    try {
        const newUser = req.body;
        const user = await usersService.registerUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
};

const loginUser = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        const user = await usersService.loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(401).json({ message: 'An unknown error occurred' });
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
