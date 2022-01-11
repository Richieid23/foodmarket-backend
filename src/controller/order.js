const pool = require('../../db');
const queries = require('../queries/order');

const addOrder = async(req, res) => {
    try {
        const { user_id, menu_id, status } = req.body;

        const results = await pool.query(queries.addOrder, [user_id, menu_id, status]);
        res.status(201).json({
            status: "success",
            data: {
                menu: results.rows[0],
            },
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    addOrder
}