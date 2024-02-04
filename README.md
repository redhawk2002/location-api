# Location-based Service API

## Diagram
![image](https://github.com/redhawk2002/location-api/assets/77795912/7f47a5aa-957d-4a03-baea-86a68d9788e5)


## Overview

This Node.js backend REST API provides location-based services, allowing clients to submit GPS coordinates, storing them in a database, and performing logical operations on the collected data.

## Getting Started

### Prerequisites

- Node.js (v16.17.0)
- NPM (v10.2.3)
- MongoDB (v5.0.9)

### Installation

1. Clone the repository
2. Create a `config.env` file in the config directory and insert the following:
   ```env   
   PORT=<your_desired_port>
   MONGO_URI=<your_mongo_db_uri>
   JWT_SECRET=<your_jwt_secret>
   
3. Install dependencies: `npm install`
4. Start the application: `npm run dev`

## API Endpoints

### Root Endpoint ("/") - GET:
Access the welcome message by visiting: [http://localhost:<your_port>/](http://localhost:<your_port>/)

### Register Endpoint ("/api/register") - POST:
Register a new user by sending a POST request to: [http://localhost:<your_port>/api/register](http://localhost:<your_port>/api/register)

### Login Endpoint ("/api/login") - POST:
Log in by sending a POST request to: [http://localhost:<your_port>/api/login](http://localhost:<your_port>/api/login)

### Logout Endpoint ("/api/logout") - GET:
Log out by accessing: [http://localhost:<your_port>/api/logout](http://localhost:<your_port>/api/logout)

### Location Endpoint ("/api/location") - POST:
Submit location coordinates by sending a POST request to: [http://localhost:<your_port>/api/location](http://localhost:<your_port>/api/location)

### Distance Calculation Endpoint ("/api/distance") - POST:
Calculate the distance between two coordinates by sending a POST request to: [http://localhost:<your_port>/api/distance](http://localhost:<your_port>/api/distance)

### Closest Coordinate Endpoint ("/api/closest") - POST:
Find the closest stored coordinate by sending a POST request to: [http://localhost:<your_port>/api/closest](http://localhost:<your_port>/api/closest)

Remember to replace `<repository_url>` and `<your_port>` with the actual URL of your GitHub repository and the specified port number in your configuration.

## Design Decisions

### Framework

- **Express.js:** Chosen for its simplicity, robustness, and extensive middleware support.

### Database

- **MongoDB:** Selected for its flexibility, scalability, and suitability for geospatial data.
- **Mongoose:** Used as an ODM (Object-Document Mapper) to model application data structures and interact with MongoDB.

### Authentication

- **JSON Web Tokens (JWTs):** Employed for secure and stateless authentication.

### Haversine Formula
The Haversine Formula is utilized in this project to measure distances between geographical coordinates. This formula calculates the distance between two points on the surface of a sphere, and it is specifically employed to find the distance between two locations on Earth.

### Reference Article
The implementation in this project is based on the principles outlined in the following article:
- [Haversine Formula to Find Distance Between Two Points on a Sphere](https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/)

## Libraries/Frameworks

- **Express:** ^4.18.2 (core web framework)
- **Cookie-parser:** ^1.4.6 (cookie parsing middleware)
- **Dotenv:** ^16.4.1 (environment variable loading)
- **Email-validator:** ^2.0.4 (email address validation)
- **Jsonwebtoken:** ^9.0.2 (JWT generation and verification)
- **Mongoose:** ^8.1.1 (MongoDB ODM)
- **Nodemon:** ^3.0.3 (development server automation)

## Docker Image

The Docker image for this project has been pushed to Docker Hub under the username "sandeepankalita18".

- Docker Hub Repository: [sandeepankalita18/mapsense](https://hub.docker.com/r/sandeepankalita18/mapsense)

You can pull the image using the following command:

```bash
docker pull sandeepankalita18/mapsense
```
## Demonstration


https://github.com/redhawk2002/location-api/assets/77795912/ea118af4-668b-4241-a2b7-bebc9c379b60


