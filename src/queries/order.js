const addOrder = "INSERT INTO orders (user_id, menu_id, status) VALUES($1, $2, $3) RETURNING *";

module.exports = {
    addOrder,
}