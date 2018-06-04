const assert = require("assert");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const should = chai.should();
const server = require("../app");
chai.use(chaiHTTP);

// const db = require("../server/models/index.js");

describe("API", function() {
  it("should list all routes on /routes GET", function(done) {
    chai
      .request(server)
      .get("/routes")
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("array");
        done();
      });
  });
  it("should create a new route on /routes POST");
  it("should update or create route on /routes PUT");

  it("should list a single route on /routes/<id> GET");
  it("should list all sailings on a single route on /routes/<id>/sailings GET");
  it(
    "should list all a routes sailings for a date on /routes/<id>/sailings/<date> GET"
  );
  it("should create a single sailing on /routes/<id>/sailings/<date> POST");
  it(
    "should update or create a single sailing on /routes/<id>/sailings/<date> PUT"
  );
});

describe("Route Creation", function() {
  describe("Route Info", function() {
    it("should return an object with three properties");
  });
  describe("Sailing", function() {
    it("should return an object with six properties");
    it("should have scheduledDeparture of type Date");
  });
});

describe("Route Insertion", function() {
  describe("Test Database Connection", function() {
    it("should return true when connected to db");
  });

  describe("Test Route Existence", function() {
    it("should check if sailing already exists in database");
    it("should update route if it already exists");
    it("should insert route if it doesn't already exist");
  });

  describe("Test Insertion", function() {
    it("should insert sailing to db");
    it("should update sailing in db");
  });
});
