const Item = require('../models/Item');
const List = require('../models/List');

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
  const item = new Item({
    name: req.body.name,
    urlImg: req.body.urlImg,
    description: req.body.description,
    price: parseFloat(req.body.price),
  });

  item.save((err, item) => {
      if (err) {
        res.status(500).json({ message: 'Erro ao salvar item' });
      } else {

        // salva item na lista
        List.findById(req.params.id, function(err, list) {
          if (err) {
            res.status(500).json({ message: 'Erro ao salvar Lista' });
          }

          list.itens.push({
            itemRefe: item._id,
            checked: false
          });

          list.save((err, list) => {
              if (err) {
                res.status(500).end();
              } else {
                res.json(list);
              }
            });
        });
      }
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
