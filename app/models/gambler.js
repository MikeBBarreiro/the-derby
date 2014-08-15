'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash');

function Gambler(g){
  this.name  = g.name;
  this.photo = g.photo;
  this.cash  = g.cash * 1;
 // this.assets = g.assets;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.create = function(obj, cb){
  var g = new Gambler(obj);
  Gambler.collection.save(g, cb);
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Gambler.collection.findOne({_id:_id}, function(err, objs){
    cb(reProto(objs));
  });
};

Gambler.prototype.destroyAsset = function(parameter){
  var assets = _.remove(this.assets, function(g){ return g.name === parameter;});
  this.cash += assets[0].value;

  if(this.assests.length === 0){return this.isDivorced === true;}
};

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

Gambler.prototype.liquidate = function(name, cb){
  this.removeAsset(name);
  var data = {id:this._id.toString(), name:name, cash:this.cash, isDivorced:this.isDivorced};
  this.save(function(){
    cb(data);
  });
};

module.exports = Gambler;
//Helper

function reProto(obj){
  return _.create(Gambler.prototype, obj);
}

