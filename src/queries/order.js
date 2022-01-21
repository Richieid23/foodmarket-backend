const addOrder = "INSERT INTO orders (user_id, menu_id, quantity, total, status) VALUES($1, $2, $3, $4, $5) RETURNING *";
const getOrders = "SELECT o.*, m.name as menu_name, m.description as menu_description, m.ingredients as menu_ingredients, m.price as menu_price, m.rate as menu_rate, m.types as menu_types, m.picture as menu_picture, u.name as user_name, u.email as user_email FROM orders o INNER JOIN users u ON u.id = o.user_id INNER JOIN menus m ON m.id = o.menu_id";
const getOrderById = "SELECT * FROM orders WHERE id = $1";
const getOrderByUserId = getOrders + " WHERE user_id = $1";
const getOrderByStatus = getOrders + " WHERE user_id = $1 AND status = $2";
const updateOrder = "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *";
const deleteOrder = "DELETE FROM orders WHERE id = $1";

module.exports = {
    addOrder,
    getOrders,
    getOrderById,
    getOrderByUserId,
    getOrderByStatus,
    updateOrder,
    deleteOrder,
}