'use strict';


exports.index = function(req, res){
  res.render('home/index');
};
/*
exports.create = function(req, res){
  Gambler.create(req.body, function(err, gambler){
    console.log(gambler);
    res.render('home/gambler', {gambler:gambler});
  });
};*/
