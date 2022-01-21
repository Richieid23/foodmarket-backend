const getUserById = "SELECT id, name, email FROM users WHERE id = $1";
const checkUser = "SELECT * FROM users WHERE email = $1";

module.exports = {
  getUserById,
  checkUser,
};
