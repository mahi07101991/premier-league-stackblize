const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const app = express();
const matches = express.Router();
const deliveries = express.Router();
const cors = require("cors");
require("dotenv").config();

mongoose.Promise = global.Promise;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https:${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}`,
  algorithms: ["R256"]
});

// MongoDB cocal connect code
// mongoose
//   .connect("mongodb://localhost/premier-league", { useNewUrlParser: true })
//   .then(() => console.log("MongoDB connected..."))
//   .catch(err => console.log(err));

// MongoDB cloud connect link for Robo 3T
// mongodb+srv://mahi07101991:1B1VdhmXHch77w1v@cluster0-iicgl.mongodb.net/test?retryWrites=true&w=majority

// MongoDB cloud connect code
mongoose
  .connect(
    "mongodb+srv://mahi07101991:1B1VdhmXHch77w1v@cluster0-iicgl.mongodb.net",
    {
      dbName: "premier-league",
      useNewUrlParser: true
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const PORT = process.env.PORT || 5000;
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/matches/", matches);
app.use("/api/deliveries/", deliveries);
app.use("/api/batsmanscore/", deliveries);

// CORS support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Getting matches
const Matches = require("./models/Match");
const Deliveries = require("./models/Delivery");

let totalMatches = 0;

db.collection("matches").count({}, function(err, count) {
  totalMatches = count;
});

app.get("/api/matches/:id", function(req, res) {
  Matches.find()
    .skip(req.params.id * 10)
    .limit(20)
    .then(matches =>
      res.status(200).send({
        matches: matches,
        totalMatches: totalMatches,
        page: req.params.id
      })
    )
    .catch(err => {
      console.log("Fetch has failed", err);
    });
});

app.get("/api/matches/find/:value", function(req, res) {
  let value = req.params.value;
  Matches.find({
    $or: [
      { city: value },
      { season: value },
      { team1: value },
      { team2: value },
      { winner: value },
      { player_of_match: value },
      { venue: value }
    ]
  }).then(matches => {
    res
      .status(200)
      .send({ matches: matches, totalMatches: matches.length, page: 1 });
  });
});

app.get("/api/deliveries/:id", function(req, res) {
  let id = req.params.id;
  Deliveries.find({ match_id: id }).then(result => {
    res.status(200).send({ match: result });
  });
});

app.get("/api/batsmanscore", function(req, res) {
  db.collection("deliveries")
    .aggregate([
      { $match: {} },
      {
        $group: {
          _id: "$batsman",
          over: { $sum: "$over" },
          ball: { $sum: "$ball" },
          is_super_over: { $sum: "$is_super_over" },
          wide_runs: { $sum: "$wide_runs" },
          bye_runs: { $sum: "$bye_runs" },
          legbye_runs: { $sum: "$legbye_runs" },
          noball_runs: { $sum: "$noball_runs" },
          penalty_runs: { $sum: "$penalty_runs" },
          batsman_runs: { $sum: "$batsman_runs" },
          extra_runs: { $sum: "$extra_runs" },
          total_runs: { $sum: "$total_runs" }
        }
      }
    ])
    .toArray()
    .then(results => {
      res.status(200).send({ scores: results });
    });
});

// Listen on port
app.listen(PORT, function() {
  console.log("[SERVER]: Running on port " + PORT);
});
