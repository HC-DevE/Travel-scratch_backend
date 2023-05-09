# Travel-scratch_backend

This is the backend for the Travel-scratch project. It is a REST API built with Node.js and Express.js. It uses MySql as a database.

## Installation

1. Clone the repository
2. Run `npm install` to install all dependencies

## Usage

1. Run `npm start` to start the server
2. The server will be running on port 3000

## Endpoints

### User

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| GET    | /api/user     | Get all users    |
| GET    | /api/user/:id | Get a user by id |
| PUT    | /api/user/:id | Update a user    |
| DELETE | /api/user/:id | Delete a user    |

### Auth

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login a user        |

### Trip

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | /api/trip     | Create a new trip |
| GET    | /api/trip     | Get all trips     |
| GET    | /api/trip/:id | Get a trip by id  |
| PUT    | /api/trip/:id | Update a trip     |
| DELETE | /api/trip/:id | Delete a trip     |

### Location

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| POST   | /api/location     | Create a new location |
| GET    | /api/location     | Get all locations     |
| GET    | /api/location/:id | Get a location by id  |
| PUT    | /api/location/:id | Update a location     |
| DELETE | /api/location/:id | Delete a location     |

### Media

| Method | Endpoint       | Description        |
| ------ | -------------- | ------------------ |
| POST   | /api/media     | Create a new media |
| GET    | /api/media     | Get all medias     |
| GET    | /api/media/:id | Get a media by id  |
| PUT    | /api/media/:id | Update a media     |
| DELETE | /api/media/:id | Delete a media     |

### Comment

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| POST   | /api/comment     | Create a new comment |
| GET    | /api/comment     | Get all comments     |
| GET    | /api/comment/:id | Get a comment by id  |

## License

[MIT](https://choosealicense.com/licenses/mit/)

[]: # Path: .gitignore
node_modules
npm-debug.log
.DS_Store
