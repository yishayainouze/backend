import jsonfile from 'jsonfile';

const file = 'api/users/users.json';

const getUsersData = async () => {
  const data=jsonfile.readFileSync(file)
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
};

export default usersDAL;










