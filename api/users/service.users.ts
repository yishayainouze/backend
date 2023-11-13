import usersDAL from './Dal.users';

const usersService = {
  getAllUsers: async () => usersDAL.getAllUsers(),
  registerUser: async (user:any) => {
    // Check if email exists
    const existingUser = await usersDAL.getUserByEmail(user.email);
    if (existingUser) {////////*
      throw new Error('User with this email already exists.');
    }

    // Add the user
    const newUser = await usersDAL.createUser(user);
    if (!newUser) throw new Error("505");
    
    return { success: true, message: 'Registration successful', user: newUser };
  },
  getUserById: async (userId: string) => {
    const user = await usersDAL.getUserById(userId);
    console.log("service "+user);
    if (!user) {
      throw new Error('User not found.');
    }
    return { success: true, message: 'User retrieval successful', user };
  },
  updateUserById: async (userId: string, updateData: any) => {
    // Optional: Validate updateData or check if the user exists
    const existingUser = await usersDAL.getUserById(userId);
    if (!existingUser) {
      throw new Error('User not found.');
    }

    // Optional: Additional validation or processing
    // ...

    // Call DAL method to update the user
    const updatedUser = await usersDAL.updateUserById(userId, updateData);
    if (!updatedUser) {
      throw new Error('Error updating user.');
    }

    return { success: true, message: 'User updated successfully', user: updatedUser };
  },
  loginUser: async (email:any, password:any) => {
    const user = await usersDAL.getUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.');
    }

    return { success: true, message: 'Login successful', user };
  },
  
  getAllUsersAdmin: async (email:any, password:any) => {
    const admin = await usersDAL.getUserByEmail(email);
    if (!admin || admin.password !== password || !admin.isAdmin) {
      throw new Error('Invalid  not an admin.');
    }
    const allUsers = await usersDAL.getAllUsers();
    return { success: true, message: 'admin access',users: allUsers};

  }
};
// 
export default usersService;





// import users from './users.json'; // Assuming you have the user data in a JSON file

// const userService = {
//   registerUser: (email, password) => {
//     // Check if the email is already registered
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//       return { success: false, message: 'Email already registered' };
//     }

//     // Register the user
//     const newUser = {
//       id: users.length + 1,
//       email,
//       password,
//       isAdmin: false
//     };
//     users.push(newUser);
//     return { success: true, message: 'Registration successful' };
//   },

//   loginUser: (email, password) => {
//     // Find the user with the provided email and password
//     const user = users.find(user => user.email === email && user.password === password);
//     if (user) {
//       return { success: true, message: 'Login successful' };
//     } else {
//       return { success: false, message: 'Login failed' };
//     }
//   }
// };

// export default userService;
