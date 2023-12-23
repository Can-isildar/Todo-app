const bcrypt = require('bcrypt');
const Users = require('../models/users');

const { UnauthorizedError, NotFoundError } = require('../utils/custom-erors')

// Yeni kullanıcı eklemek için işlev
async function registerUser({ jsonData }) {
  const password = jsonData.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  jsonData.password = hashedPassword;
  return await Users.query().insert(jsonData);
}
// Kullanıcı girişi yapmak için işlev
async function loginUser({ jsonData, throwNotFound = true }) {
  const email = jsonData.email;
  const user = await Users.query().where('email', email).first();

  if (user) {
    const isPasswordCorrect = await bcrypt.compare(jsonData.password, user.password);
    if (isPasswordCorrect) {
      return user;
    } else if (throwNotFound) {
      throw new UnauthorizedError();
    }
  } else {
    return null;
  }

}
// kullanıcı silme

async function deleteUser({ id }) {
  await getUserById({ id })

  return await Users.query().delete().where('users.id', id)

}

// kullanıcı güncelleme

async function updateUser({ id, updatedUserData, newPassword }) {
  await getUserById({ id });
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  updatedUserData.password = hashedPassword;
  return await Users.query().patch(updatedUserData).where('users.id', id);

}


// kullanıcı verilerini alma by id 

async function getUserById({ id, throwNotFound = true }) {
  const user = await Users.query().select('users.*').where('users.id', id);
  if (user) {
    return user;
  } else if (throwNotFound) {
    throw new UnauthorizedError();
  } else {
    return null;
  }

}
async function getAllUser() {

  return await Users.query().select('users.*');


}





module.exports = { registerUser, loginUser, deleteUser, updateUser, getUserById, getAllUser };


