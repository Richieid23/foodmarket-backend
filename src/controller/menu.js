const pool = require('../../db');
const queries = require('../queries/menu');

const addMenu = async(req, res) => {
    try {
        const { name, description, price, type, picture } = req.body;

        const results = await pool.query(queries.addMenu, [name, description, price, type, picture]);
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

const getMenus = async(req, res) => {
    try {
        const results =  await pool.query(queries.getMenus);

        res.status(200).json({
            status: "success",
            results: results.rowCount,
            data: {
                menus: results.rows,
            },
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getMenuById = async(req, res) => {
    try {
        const { id } = req.params;
    
        const results = await pool.query(queries.getMenuById, [id]);

        if(results.rowCount !== 0) {
            res.status(200).json({
            status: "success",
            data: {
                menu: results.rows[0],
            },
        });
        } else {
            res.send('Menu tidak terdaftar');
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const updateMenu = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, type, picture } = req.body;

        const checkMenuExist = await pool.query(queries.getMenuById, [id]);
        if (checkMenuExist.rowCount !== 0) {
            const results = await pool.query(queries.updateMenu, [name, description, price, type, picture, id]);
            res.status(200).json({
                status: "success",
                data: {
                    menu: results.rows[0],
                },
            });
        } else {
            res.send('Menu tidak terdaftar');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const deleteMenu = async(req, res) => {
    try {
        const { id } = req.params;

        const checkMenuExist = await pool.query(queries.getMenuById, [id]);
        if (checkMenuExist.rowCount !== 0) {
            const results = await pool.query(queries.deleteMenu, [id]);
            res.status(200).json({
                status: "success",
            });
        } else {
            res.send('Menu tidak terdaftar');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    addMenu,
    getMenus,
    getMenuById,
    updateMenu,
    deleteMenu,
}