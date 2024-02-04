const User = require("./models/user");
const Cord = require("./models/coordinate");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
require("dotenv").config({ path: "backend/config/config.env" });
let validator = require("email-validator");
const { isAuthenticated } = require("./middlewares/auth");
const haversineDistance = require("./haversineDistance");

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.json());
app.use(cookieParser());
// Root endpoint to welcome users
app.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "welcome to the  Location-based Service API" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Endpoint for user registration
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const verifyEmail = validator.validate(email);

    if (!verifyEmail) {
      return res
        .status(400)
        .json({ success: false, message: "please check the email id " });
    }
 // Checking if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }
 // Creating a new user
    user = await User.create({
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "sucessfully registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Endpoint for user login
app.post("/api/login", async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;
 // Finding the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
// Checking if the password is correct
    const isMatch = password == user.password;
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
 // Creating a JWT token for authentication
    const token = jwt.sign({ userEmail: email }, process.env.JWT_SECRET);
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
 // Sending the token as a cookie
    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Endpoint for user logout
app.get("/api/logout", async (req, res) => {
  try {
    // Logging out the user by clearing the token cookie
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Endpoint for writing user location in db
app.post("/api/location", isAuthenticated, async (req, res) => {
  try {

    // Extracting latitude and longitude from the request body
    const { latitude, longitude } = req.body;
// Validating latitude and longitude values
    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    if (latitude > 90.0 || latitude < -90.0) {
      return res.status(400).json({
        message: "Invalid latitude",
      });
    }

    if (longitude > 180.0 || longitude < -180.0) {
      return res.status(400).json({
        message: "Invalid longitude",
      });
    }
// Creating a new coordinate entry
    const newCordinateEntry = {
      latitude: latitude,
      longitude: longitude,
    };
 // Adding the new coordinate entry to the database
    await Cord.create(newCordinateEntry);

    res.status(200).json({
      success: true,
      location: { latitude, longitude },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Endpoint for calculating distance between two coordinates
app.post("/api/distance", isAuthenticated, async (req, res) => {
  try {
    const { cord1, cord2 } = req.body;
    if (!cord1 || !cord2) {
      return res.status(400).json({
        message: "coordinate-1 and coordinate-2 are required",
      });
    }
// Extracting latitude and longitude from each coordinate
    const { latitude: latitude1, longitude: longitude1 } = cord1;
    const { latitude: latitude2, longitude: longitude2 } = cord2;

// Validating latitude and longitude values
    if (latitude1 > 90.0 || latitude1 < -90.0) {
      return res.status(400).json({
        message: "Invalid latitude",
      });
    }

    if (longitude1 > 180.0 || longitude1 < -180.0) {
      return res.status(400).json({
        message: "Invalid longitude",
      });
    }
    if (latitude2 > 90.0 || latitude2 < -90.0) {
      return res.status(400).json({
        message: "Invalid latitude",
      });
    }

    if (longitude2 > 180.0 || longitude2 < -180.0) {
      return res.status(400).json({
        message: "Invalid longitude",
      });
    }
 // Calculating haversine distance between coordinates
    const distance = haversineDistance(
      latitude1,
      longitude1,
      latitude2,
      longitude2
    );
    res.status(201).json({
      success: true,
      distance: distance,
      unit: "kilometre",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Endpoint for finding the closest coordinate to a given point
app.post("/api/closest", isAuthenticated, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
// Validating latitude and longitude values
    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    if (
      latitude > 90.0 ||
      latitude < -90.0 ||
      longitude > 180.0 ||
      longitude < -180.0
    ) {
      return res.status(400).json({
        message: "Invalid latitude or longitude",
      });
    }
// Retrieving all coordinates from the database
    const allCoordinates = await Cord.find();
    let closestCoordinate = null;
    let minDistance = Infinity;
// Finding the closest coordinate using haversine distance
    for (coordinate of allCoordinates) {
      const distance = haversineDistance(
        latitude,
        longitude,
        coordinate.latitude,
        coordinate.longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestCoordinate = coordinate;
      }
    }

    res.status(200).json({
      success: true,
      closestCoordinate,
      distance: minDistance,
      unit: "kilometre",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = app;
