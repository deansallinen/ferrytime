const assert = require('assert');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const server = require('../app');
chai.use(chaiHTTP);

// const db = require("../server/models/index.js");

describe('API', function() {
  it('should list all routes on /routes GET', function(done) {
    chai
      .request(server)
      .get('/api/routes')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });
  // it('should create a new route on /routes POST');
  it('should update or create route on /routes PUT', done => {
    chai
      .request(server)
      .put('/api/routes')
      .send({
        route_name: 'Langdale to Horseshoe Bay',
        average_sailing: '50 minutes'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        done();
      });
  });

  it('should list a single route on /routes/<id> GET', done => {
    chai
      .request(server)
      .get('/api/routes/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('route_name');
        res.body.should.have.property('average_sailing');
        done();
      });
  });

  it('should list a single route on /routes/name/<route_name> GET', done => {
    const route_name = 'TSAWWASSEN TO SWARTZ BAY';
    chai
      .request(server)
      .get(`/api/routes/name/${route_name}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('route_name');
        res.body.should.have.property('average_sailing');
        done();
      });
  });

  it('should list all sailings on a single route on /routes/<id>/sailings GET', done => {
    chai
      .request(server)
      .get('/api/routes/1/schedule')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });
  it(
    'should list all a routes sailings for a date on /routes/<id>/sailings/<date> GET'
  );
  // it('should create a single sailing on /routes/<id>/sailings/<date> POST');

  it('should update or create a single sailing on /routes/<id>/schedule PUT', done => {
    chai
      .request(server)
      .put('/api/routes/1/schedule')
      .send({
        route_id: 1,
        scheduled_departure: '2018-05-31T02:22:00.000Z',
        actual_departure: null,
        eta: '2018-05-31T03:22:00.000Z',
        sailing_status: 'Loading delay',
        vessel: 'Salish Eagle'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.a('object');
        res.body.should.have.property('route_id');
        res.body.should.have.property('scheduled_departure');
        res.body.should.have.property('actual_departure');
        res.body.should.have.property('eta');
        res.body.should.have.property('sailing_status');
        res.body.should.have.property('vessel');
        done();
      });
  });
});

describe('Route Creation', function() {
  describe('Route Info', function() {
    it('should return an object with three properties');
  });
  describe('Sailing', function() {
    it('should return an object with six properties');
    it('should have scheduledDeparture of type Date');
  });
});

describe('Route Insertion', function() {
  describe('Test Database Connection', function() {
    it('should return true when connected to db');
  });

  describe('Test Route Existence', function() {
    it('should check if sailing already exists in database');
    it('should update route if it already exists');
    it("should insert route if it doesn't already exist");
  });

  describe('Test Insertion', function() {
    it('should insert sailing to db');
    it('should update sailing in db');
  });
});
