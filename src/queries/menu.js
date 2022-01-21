const addMenu = "INSERT INTO menus (name, description, ingredients, price, rate, types, picture) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
const getMenus = "SELECT * FROM menus";
const getMenuById = "SELECT * FROM menus WHERE id = $1";
const getMenuByTypes = "SELECT * FROM menus WHERE types = $1";
const updateMenu = "UPDATE menus SET name = $1, description = $2, ingredients = $3, price = $4, rate = $5, types = $6, picture = $7 WHERE id = $8 RETURNING *";
const deleteMenu = "DELETE FROM menus WHERE id = $1";

module.exports = {
    addMenu,
    getMenus,
    getMenuById,
    getMenuByTypes,
    updateMenu,
    deleteMenu,
}