'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    console.log(gamblers);
    res.render('home/index', {gamblers:gamblers});
  });
};

exports.destroy = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.liquidate(req.params.name, function(obj){
      res.send(obj);
    });
  });
};
