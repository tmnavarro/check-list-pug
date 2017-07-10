const List = require('../models/List');

/**
 * GET /lists
 * Listagem de com todas listas criadas.
 */
exports.getLists = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};

/**
 * GET /list/:id
 * Amostra de lista única
 */
exports.getList = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};

/**
 * POST /list
 * Adiciona nova lista
 */
exports.postList = (req, res) => {

  const list = new List({
    name: req.body.name,
    description: req.body.description
  });

  list.save((err, list) => {
      if (err) {
        return next(err);
      } else {
        res.json(list);
      }
    });
};

/**
 * PUT /list/:id
 * Updade list
 */
exports.updadeList = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};

/**
 * DELETE /list/:id
 * Remove lista
 */
exports.deleteList = (req, res) => {
  res.json({
    title: 'Lista de compra'
  });
};
