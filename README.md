# transfers Microservice API

Using Clean Architecture for Microservice APIs in Node.js with MongoDB and Express

> In this approach I will demonstrate the use of Bob Martin's Clean Architecture model and I will show you how we can apply it to a Microservice built in node.js with MongoDB and Express JS.

## Running Locally

#### Prerequisites
* [Node JS](https://nodejs.org/en/)
* [Mongo DB](https://www.mongodb.com) (To use the Mongo DB interface you need to install Mongo Compass, or have access to cloud.mongodb.com)


#### 1. Clone the repo and install dependencies
```bash
git clone
cd money-pal-api
npm i
```

#### 2. Modify the .env file
Save `sampledotenv` as `.env` and then add your database details.

#### 3. Connect your MongoDB
Usually this is Running in a cluster inside MongoDB Atlas provider. If you set up the .env file correctly you don't need to do nothing here.

#### 4. Start the server
To run in production mode where code is transpiled by Babel into a `dist` folder and run directly in `node`:
```bash
npm start
```

To run in development mode where code is run by [babel-node](https://babeljs.io/docs/en/babel-node) via [nodemon](https://nodemon.io) and re-transpiled any time there is a change:
```bash
npm run dev
```

To run tests:
```bash
npm run test
```

To run only e2e tests:
```bash
npm run test:e2e
```
