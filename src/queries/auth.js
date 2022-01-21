const register = "INSERT INTO users (name, email, password, roles) VALUES ($1, $2, $3, $4) RETURNING id, name, email";
const getUserById = "SELECT id, name, email FROM users WHERE id = $1";
const checkUser = "SELECT * FROM users WHERE email = $1";

module.exports = {
    register,
    getUserById,
    checkUser,
}