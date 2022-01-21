const pool = require('../../db');
const queries = require('../queries/auth');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

const register = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await pool.query(queries.checkUser, [email]);

        if (user.rowCount !== 0) {
            return res.status(401).send('Email sudah terdaftar');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound); 
        const encryptedPassword = await bcrypt.hash(password, salt);
        
        const roles = "USER";

        const results = await pool.query(queries.register, [name, email, encryptedPassword, roles]);

        const token = jwtGenerator(results.rows[0].id)

        res.status(201).json({
            status: "success",
            token: token,
            data: {
                user: results.rows[0],
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(queries.checkUser, [email]);

        if (user.rowCount === 0){
            return res.status(401).json({
                status: "failed",
                message: "Email or Password invalid"
            });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json({
                status: "failed",
                message: "Email or Password invalid"
            });
        }

        const token = jwtGenerator(user.rows[0].id);

        res.status(200).json({
            status: "success",
            token,
            data: {
                user: user.rows[0],
            }
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const verify = async(req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const verified = async(req, res) => {
    try {
        const user = await pool.query(queries.getUserById, [req.user]);
        res.json({
            status: "success",
            data: {
                user: user.rows[0]
            }
        });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getUsers = async(req, res) => {
    try {
        const results =  await pool.query(queries.getUsers);

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

const getUserById = async(req, res) => {
    try {
        const { id } = req.params;
    
        const results = await pool.query(queries.getUserById, [id]);

        if(results.rowCount !== 0) {
            res.status(200).json({
            status: "success",
            data: {
                menu: results.rows[0],
            },
        });
        } else {
            res.send('User tidak terdaftar');
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const checkUserExist = await pool.query(queries.getUserById, [id]);
        if (checkUserExist.rowCount !== 0) {
            const results = await pool.query(queries.updateUser, [name, email, password, role, id]);
            res.status(200).json({
                status: "success",
                data: {
                    menu: results.rows[0],
                },
            });
        } else {
            res.send('User tidak terdaftar');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const deleteUser = async(req, res) => {
    try {
        const { id } = req.params;

        const checkUserExist = await pool.query(queries.getUserById, [id]);
        if (checkUserExist.rowCount !== 0) {
            const results = await pool.query(queries.deleteUser, [id]);
            res.status(200).json({
                status: "success",
            });
        } else {
            res.send('User tidak terdaftar');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    register,
    login,
    verify,
    verified,
}