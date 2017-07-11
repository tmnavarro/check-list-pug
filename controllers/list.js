const List = require('../models/List');
const Item = require('../models/Item');

/**
 * GET /lists
 * Listagem de com todas listas criadas.
 */
exports.getLists = (req, res) => {
  List.find({}).sort('-createdAt').exec(function(err, lists) {
    if (err) {
      res.status(500).end();
    }
    res.json(lists);
  });
};

/**
 * GET /templateList/:id
 * Amostra de lista única
 */
 exports.getTemplateList = (req, res) => {
   List.findById(req.params.id).populate('itens.itemRefe').exec(function(err, list) {
     if (err) {
       res.status(500).end();
     }
     Item.find({}, function(err, itens){
       if (err) {
         res.status(500).end();
       }
       res.render('partials/component-list', {
         list,
         itens
       });
     });

   });
 };

/**
 * GET /list/:id
 * Amostra de lista única
 */
exports.getList = (req, res) => {
  List.findById(req.params.id).populate('itens.itemRefe').exec(function(err, list) {
    if (err) {
      res.status(500).end();
    }
    res.json(list);
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
        res.status(500).end();
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
  List.findById(req.params.id, function(err, list) {
    if (err) {
      res.status(500).end();
    }
    list.name = req.body.name;
    list.description = req.body.description;

    list.save((err, list) => {
        if (err) {
          res.status(500).end();
        } else {
          res.json(list);
        }
      });
  });

};

/**
 * DELETE /list/:id
 * Remove lista
 */
exports.deleteList = (req, res) => {
  List.findById(req.params.id, function (err, list) {
    list.remove();
    res.json({ message: 'Lista removida com sucesso!' })
  });
};

/**
 * DELETE /list/:id
 * Remove lista
 */
exports.addItemList = (req, res) => {
  List.findById(req.params.id, function (err, list) {
    if (err) {
      res.status(500).json({ message: 'Erro ao salvar Lista' });
    }

    list.itens.push({
      itemRefe: req.body.id,
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
};

/**
 * PUT /itemcheck/:id
 * Updade Item.checked
 */
exports.itemcheck = (req, res) => {
  List.update({'itens._id': req.params.id}, {'$set': {
    'itens.$.checked': true,
  }}, function(err, list) {
    if (err) {
      res.status(500).json(err).end();
    } else {
      res.json(list);
    }
  });
}

/**
 * PUT /itemcheck/:id
 * Updade Item.checked
 */
exports.itemDescheck = (req, res) => {
  List.update({'itens._id': req.params.id}, {'$set': {
    'itens.$.checked': false,
  }}, function(err, list) {
    if (err) {
      res.status(500).json(err).end();
    } else {
      res.json(list);
    }
  });
}
