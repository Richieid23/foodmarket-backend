const pool = require('../../db');
const queries = require('../queries/order');
const userQueries = require('../queries/user');
const menuQueries = require('../queries/menu');

const addOrder = async(req, res) => {
    try {
        const { user_id, menu_id, quantity, total, status } = req.body;

        const results = await pool.query(queries.addOrder, [
          user_id,
          menu_id,
          quantity,
          total,
          status,
        ]);

        const user = await pool.query(userQueries.getUserById, [results.rows[0].user_id]);
        const menu = await pool.query(menuQueries.getMenuById, [
          results.rows[0].menu_id,
        ]);

        res.status(201).json({
          status: "success",
          data: {
            order: results.rows[0],
            user: user.rows[0],
            menu: menu.rows[0],
          },
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getOrders = async (req, res) => {
  try {
    const {status} = req.query;

    if (status) {
      const statusResult = await pool.query(queries.getOrderByStatus, [req.user, status]);
      res.status(200).json({
        status: "success",
        results: statusResult.rowCount,
        data: {
          orders: statusResult.rows,
        },
      });
    } else {
      const results = await pool.query(queries.getOrders);
      res.status(200).json({
        status: "success",
        results: results.rowCount,
        data: {
          orders: results.rows,
        },
      });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const results = await pool.query(queries.getOrderById, [id]);

    if (results.rowCount !== 0) {
      res.status(200).json({
        status: "success",
        data: {
          order: results.rows[0],
        },
      });
    } else {
      res.send("Order tidak terdaftar");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getUserOrder = async (req, res) => {
  try {
    const results = await pool.query(queries.getOrderByUserId, [req.user]);

    if (results.rowCount !== 0) {
      res.status(200).json({
        status: "success",
        results: results.rowCount,
        data: {
          
          order: results.rows,
        },
      });
    } else {
      res.send("User tidak memiliki Order");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const checkOrderExist = await pool.query(queries.getOrderById, [id]);
    if (checkOrderExist.rowCount !== 0) {
      const results = await pool.query(queries.updateOrder, [status,
        id,
      ]);
      res.status(200).json({
        status: "success",
        data: {
          order: results.rows[0],
        },
      });
    } else {
      res.send("Order tidak terdaftar");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const checkOrderExist = await pool.query(queries.getOrderById, [id]);
    if (checkOrderExist.rowCount !== 0) {
      const results = await pool.query(queries.deleteOrder, [id]);
      res.status(200).json({
        status: "success",
      });
    } else {
      res.send("Order tidak terdaftar");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
    addOrder,
    getOrders,
    getOrderById,
    getUserOrder,
    updateOrder,
    deleteOrder,
}