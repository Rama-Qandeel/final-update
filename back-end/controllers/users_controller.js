const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
require("dotenv").config();

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    address,
    city,
    region,
    phone_number,
    email,
    password,
    image_profile,
    role_id,
  } = req.body;
  console.log("SALT", process.env.SALT);
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
  console.log(hashedPassword);
  const data = [
    first_name,
    last_name,
    role_id,
    address,
    city,
    region,
    phone_number,
    email,
    hashedPassword,
    image_profile,
  ];
  const query = `INSERT INTO users (first_name,last_name,role_id,address,city,region,phone_number,email,password,
        image_profile)
    VALUES (?,?,?,?,?,?,?,?,?,?) `;
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

const login = (req, res) => {
  const query = `SELECT * ,roles.type FROM roles INNER JOIN users ON 
    users.role_id=roles.role_id WHERE email=? `;
  const { email, password } = req.body;
  const data = [email, password];
  connection.query(query, data, async (err, result) => {
    if (err) throw err;
    if (result.length) {
      if (await bcrypt.compare(password, result[0].password)) {
        const {
          user_id,
          type,
          email,
          first_name,
          last_name,
          address,
          city,
          birhday,
          phone_number,
        } = result[0];
        const payload = {
          user_id,
          type,
          email,
          first_name,
          last_name,
          address,
          city,
          birhday,
          phone_number,
        };
        const options = {
          expiresIn: process.env.TOKEN_EXPIRATION,
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.json(token);
      } else {
        // res.status(422);
        res.json("Invalid login check your password" );
      }
    } else {
      // res.status(404);
      res.json( "Invalid login check your email" );
    }
  });
};

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM users WHERE is_deleted=?`;
  const data = [0];
  connection.query(query, data, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};
const getUserById = (req, res) => {
  const query = `SELECT * FROM users WHERE user_id=${req.params.user_id}`;
  connection.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
};

module.exports = { register, getAllUsers, login, getUserById };
