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

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | /api/user | Get all users |
| GET | /api/user/:id | Get a user by id |
| PUT | /api/user/:id | Update a user |
| DELETE | /api/user/:id | Delete a user |

### Auth

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login a user |


### Trip

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/trip | Create a new trip |
| GET | /api/trip | Get all trips |
| GET | /api/trip/:id | Get a trip by id |
| PUT | /api/trip/:id | Update a trip |
| DELETE | /api/trip/:id | Delete a trip |

### Location

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/location | Create a new location |
| GET | /api/location | Get all locations |
| GET | /api/location/:id | Get a location by id |
| PUT | /api/location/:id | Update a location |
| DELETE | /api/location/:id | Delete a location |

### Photo

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/photo | Create a new photo |
| GET | /api/photo | Get all photos |
| GET | /api/photo/:id | Get a photo by id |
| PUT | /api/photo/:id | Update a photo |
| DELETE | /api/photo/:id | Delete a photo |

### Comment

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/comment | Create a new comment |
| GET | /api/comment | Get all comments |
| GET | /api/comment/:id | Get a comment by id |

## License
[MIT](https://choosealicense.com/licenses/mit/)

[]: # Path: .gitignore
node_modules
npm-debug.log
.DS_Store
