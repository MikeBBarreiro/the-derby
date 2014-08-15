/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'the-derby-test',
    Mongo     = require('mongodb');

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new gambler object', function(){
      var g = {name:'Jeff', photo:'http://www.tsbmag.com/wp-content/uploads/2012/03/success1.jpg', cash:10000},
          jeff = new Gambler(g);

      expect(jeff).to.be.instanceof(Gambler);
      expect(jeff.name).to.equal('Jeff');
      expect(jeff.photo).to.equal('http://www.tsbmag.com/wp-content/uploads/2012/03/success1.jpg');
      expect(jeff.cash).to.equal(10000);
    });
  });

  describe('.create', function(){
    it('Should find and create a gambler', function(done){
      var g = {name:'Jeff', photo:'http://www.tsbmag.com/wp-content/uploads/2012/03/success1.jpg', cash:10000};

      Gambler.create(g, function(err, gamblers){
        expect(gamblers._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gambler){
        expect(gambler).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('Should find a gambler by ID', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Jeff');
        done();
      });
    });
  });

  describe('.destroyAsset', function(){
    it('Should destroy and delete assets', function(done){
      Gambler.findById('000000000000000000000001', function(gamblers){
        gamblers.destroyAsset('ring');
        expect(gamblers.assest).to.be.length(1);
        expect(gamblers.cash).to.equal(5000);
        expect(gamblers.assest).to.be.length(0);
        expect(gamblers.isDivorced).to.be.true;
        console.log(gamblers);
        done();
      });
    });
  });
});

