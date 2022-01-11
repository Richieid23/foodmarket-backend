const addMenu = "INSERT INTO menus (name, description, price, type, picture) VALUES($1, $2, $3, $4, $5) RETURNING *";
const getMenus = "SELECT * FROM menus";
const getMenuById = "SELECT * FROM menus WHERE id = $1";
const updateMenu = "UPDATE menus SET name = $1, description = $2, price = $3, type = $4, picture = $5 WHERE id = $6 RETURNING *";
const deleteMenu = "DELETE FROM menus WHERE id = $1";

module.exports = {
    addMenu,
    getMenus,
    getMenuById,
    updateMenu,
    deleteMenu,
}