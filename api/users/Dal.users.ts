import jsonfile from 'jsonfile';

const file = 'api/users/users.json';

const getUsersData = async () => {
  const data = jsonfile.readFileSync(file)
  return data;
};

const saveUsersData = async (data:any) => {
  try {
    await jsonfile.writeFile(file, data,);
  } catch (error) {
    console.error('Error saving users data:', error);
  }
};

const usersDAL = {
  getAllUsers: async () => {
    const users = await getUsersData();
    return users;
  },
  getUserByEmail: async (email: string) => {
    const users = await getUsersData();
    return users.find((user: any) => user.email === email);
  },
  getUserById: async (userId: string) => {
    const users = await getUsersData();
    console.log("Users Data:", users);
    const foundUser = users.find((user: any) => user.id === Number(userId));
    console.log("Found User:", foundUser);
    return foundUser;
},
updateUserById: async (userId: string, updateData: any) => {
  const users = await getUsersData();
  const userIndex = users.findIndex((user: any) => user.id === Number(userId));
  
  if (userIndex === -1) {
    throw new Error('User not found.');
  }

  // Update the user's data
  users[userIndex] = { ...users[userIndex], ...updateData };

  // Save the updated users data
  await saveUsersData(users);

  return users[userIndex];
},
  createUser: async (user:any) => {
    const usersData = await getUsersData();
    usersData.push(user);
    await saveUsersData(usersData);
    return user;
  },
  getAllUsersAdmin: async (admin:any) => {
    const { email, password } = admin;
    const users = await getUsersData();
    const findUser = users.find((user:any) => user.email === email);
    const Email = users.find((user:any) => user.password === password);
    const userIndex = users.findIndex((user:any) => user.email === email);
    if (users[userIndex].isAdmin && Email && findUser) {
      return users;
    } else {
      throw new Error("User authentication failed");
    }
  }
  // getAllUsersAdmin: async (admin) => {
  //   const users = await getUsersData(admin);
  //   cosnt {email,password}= admin.email,admin.password;
  //   return users.find(user => user.admin === admin);

  // }


};

export default usersDAL;










