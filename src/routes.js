const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/itens', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/item', async (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || !preco) {
    return res.status(400).send('Nome e preço são obrigatórios.');
  }
  try {
    const result = await pool.query(
      'INSERT INTO produtos (nome, preco) VALUES ($1, $2) RETURNING *',
      [nome, preco]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
