const register = "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email";
const getUserById = "SELECT id, username, email FROM users WHERE id = $1";
const checkUser = "SELECT * FROM users WHERE email = $1";

module.exports = {
    register,
    getUserById,
    checkUser,
}