const Item = require('../models/Item');

/**
 * GET /item/:id
 * Mostra item unico
 */
exports.getItem = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};


/**
 * POST /item/:id
 * Adiciona novo item a lista
 */
exports.postItem = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};

/**
 * PUT /item/:id
 * Updade Item
 */
exports.updateItem = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};

/**
 * DELETE /item/:id
 * Remove item
 */
exports.deleteItem = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};
