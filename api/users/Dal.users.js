import jsonfile from 'jsonfile';

const file = 'api/users/users.json';

const getUsersData = async () => {
  const data = jsonfile.readFileSync(file)
  return data;
};

const saveUsersData = async (data) => {
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
  getUserByEmail: async (email) => {
    const users = await getUsersData();
    return users.find(user => user.email === email);
  },
  createUser: async (user) => {
    const usersData = await getUsersData();
    usersData.push(user);
    await saveUsersData(usersData);
    return user;
  },
  getAllUsersAdmin: async (admin) => {
    const { email, password } = admin;
    const users = await getUsersData();
    const findUser = users.find((user) => user.email === email);
    const Email = users.find((user) => user.password === password);
    const userIndex = users.findIndex((user) => user.email === email);
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










