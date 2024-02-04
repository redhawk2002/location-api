# Location-based Service API

## Overview

This Node.js backend REST API provides location-based services, allowing clients to submit GPS coordinates, storing them in a database, and performing logical operations on the collected data.

## Getting Started

### Prerequisites

- Node.js (v16.17.0)
- NPM (v10.2.3)
- MongoDB (v5.0.9)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the application: `npm run dev`

## Endpoints

**Root Endpoint ("/") - GET:**

- Returns a welcome message indicating that the user has reached the Location-based Service API.

**Register Endpoint ("/api/register") - POST:**

- Allows users to register by providing their email and password.

**Login Endpoint ("/api/login") - POST:**

- Enables users to log in by providing their email and password.

**Logout Endpoint ("/api/logout") - GET:**

- Logs the user out by clearing the token cookie.

**Location Endpoint ("/api/location") - POST (Authenticated):**

- Allows users to submit their location coordinates (latitude and longitude).
- Validates the coordinates and stores them in the database.

**Distance Calculation Endpoint ("/api/distance") - POST (Authenticated):**

- Enables users to calculate the distance between two sets of coordinates provided in the request body.
- Validates the coordinates and calculates the haversine distance between them, returning the result in kilometers.

**Closest Coordinate Endpoint ("/api/closest") - POST (Authenticated):**

- Allows users to find the closest stored coordinate to a specified location (latitude and longitude).
- Retrieves all coordinates from the database and calculates the haversine distance to find the closest one.

**Custom Authentication Middleware:**

- Custom middleware (isAuthenticated) protects specific routes by ensuring user authentication before access.
- Checks for the presence and validity of a JWT (JSON Web Token) in the request's cookies.

## Design Decisions

### Framework

- **Express.js:** Chosen for its simplicity, robustness, and extensive middleware support.

### Database

- **MongoDB:** Selected for its flexibility, scalability, and suitability for geospatial data.
- **Mongoose:** Used as an ODM (Object-Document Mapper) to model application data structures and interact with MongoDB.

### Authentication

- **JSON Web Tokens (JWTs):** Employed for secure and stateless authentication.

### Distance Calculation

- **Haversine Formula:** Used to accurately measure distances between geographical coordinates.

## Libraries/Frameworks

- **Express:** ^4.18.2 (core web framework)
- **Cookie-parser:** ^1.4.6 (cookie parsing middleware)
- **Dotenv:** ^16.4.1 (environment variable loading)
- **Email-validator:** ^2.0.4 (email address validation)
- **Jsonwebtoken:** ^9.0.2 (JWT generation and verification)
- **Mongoose:** ^8.1.1 (MongoDB ODM)
- **Nodemon:** ^3.0.3 (development server automation)

## Demonstration

