# Wysa Mini Project APIs
This project assists users in determining their efficiency by analyzing their sleep timings and duration.

## Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js: Ensure you have Node.js installed on your system.
MongoDB Atlas: Set up a MongoDB Atlas cluster and obtain the connection URI.

## Installation
Clone the repository:
```
git clone https://github.com/SuhailAnsariRepo/wysa-assessment/backend.git
```

Install dependencies:
```
npm install
```

## Configuration
Create a .env file in the root directory of the project.

Add the following environment variables to the .env file:
```
PORT=<your_port_number>
MONGODB_URI=<your_mongodb_connection_uri>
ACCESS_TOKEN_SECRET=<your_jwt_secret_key>
```

Replace <your_mongodb_connection_uri> with your MongoDB Atlas connection URI and <your_jwt_secret_key> with your JWT secret key.

## Usage
Start the server:
```
npm start
```

The API will be accessible at http://localhost:3000.

Access the API endpoints using tools like Postman or any API testing tool of your choice.

## Working Link
This fullstack project is already hosted here [Wysa Sleep Efficiency Tracker](https://wysa-assessment-nine.vercel.app). You can also check this out without implementing anything.

## Endpoints

### 1. POST /register

- **Description:** User registration route.

### 2. POST /sleepStruggle

- **Description:** Add sleep struggle data.

### 3. POST /goTobed

- **Description:** Add data about the time the user goes to bed.

### 4. POST /getOutofBed

- **Description:** Add data about the time the user gets out of bed.

### 5. POST /sleepHours

- **Description:** Add data about the number of sleep hours.

### 6. POST /sleepEfficiency

- **Description:** Calculate sleep efficiency.
