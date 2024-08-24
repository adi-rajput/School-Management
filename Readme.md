# School Management System

This is a Node.js and Express-based School Management System API that allows you to create schools and retrieve a list of schools sorted by proximity to a given location. The system uses MySQL as the database, with Sequelize ORM for database operations.

## Features

- Create a new school
- Retrieve a list of schools sorted by distance from a given location
- Rate limiting to protect the API from abuse

## Technologies Used

- Node.js
- Express.js
- MySQL (using `mysql2` package)
- Sequelize ORM
- `express-rate-limit` for rate limiting
- Redis (for caching, optional)

## Installation

->git clone https://github.com/adi-rajput/School-Management
->cd School_Management
->execute `npm install` on the same path as of your root directory of the downloaded project
->create a `.env` file in the root directory and add the following environment variable

- `PORT-3000`
  ->inside the `src/config` folder create a new file `config.json` and the add the following piece of json

```
{
"development": {
"username": <your_db_login_name>,
"password": <your password>,
"database": "school_management_database",
"host": "127.0.0.1",
"dialect": "mysql"
},
}
```

->once you have added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create`
and then execute
`npx sequelize db:migrate`
then execute 
`npm start`

## API Endpoints

### 1. Create a School

- **URL:** `/api/v1/school/addSchool`
- **Method:** `POST`
- **Description:** Creates a new school with the specified details.
- **Request Body:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 40.7128,
    "longitude": -74.0060
  }

### 2. Get School by Shortest Distance

- **URL:** `api/v1/school/listSchools?latitude=<user_latitude>&longitude=<user_longitude>`
- **Method:** `GET`
- **Description:** Get all schools sorted by minimum distance from user's latitude and longitude.
