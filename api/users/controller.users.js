import usersService from './service.users.js';

const getAlllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const registerUser = async (req, res) => {
    try {
        const newUser = req.body;
        const user = await usersService.registerUser(newUser);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersService.loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
const getAllUsersAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersService.getAllUsersAdmin(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export default {
    getAlllUsers,
    registerUser,
    loginUser,
    getAllUsersAdmin
};
