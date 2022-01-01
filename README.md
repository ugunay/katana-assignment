# Katana Assignment

A simple API to handle decks and cards to be used in card games.

## Getting Started

Clone the project to your local machine

```
git clone https://github.com/ugunay/katana.git

npm install

```

### Environment Variables Setup

Create .env file under the root directory and provide the Postgresql connection details. 
For each different runtime environment (development, test, production), provide/create different databases.
A sample file can be like this:

DB_USER=ufuk
DB_PASSWORD=changeMe
DB_NAME=katana_db
DB_HOST=localhost
DB_PORT=5433

DB_USER_TEST=ufuk
DB_PASSWORD_TEST=changeMe
DB_NAME_TEST=katana_db_test
DB_HOST_TEST=localhost
DB_PORT_TEST=5433

DB_USER_PRODUCTION=ufuk
DB_PASSWORD_TEST=changeMe
DB_NAME_TEST=katana_db_production
DB_HOST_TEST=localhost
DB_PORT_TEST=5432

Note that these credentials will be used by Sequelize under config/config.js.

### Development 

1. Create the database for the development environment if it does not exist
2. Run the commands below to sync & seed the database:
   npm run sync
   npm run seed
3. npm run dev
   If no environment variable is set for PORT, the application will listen to port 3000 by default.

### Endpoints
   We have three endpoints for this application. Try them with Postman.
   1. Create deck
      POST /api/deck
      Sample: http://localhost:3000/api/deck
         body:{
            "type": "short",
            "shuffled": true
         }

   2. OPEN deck
      PUT /api/deck/{deckId}/open
      Sample: http://localhost:3000/api/deck/4c5a93d1-ea04-4726-bb8d-87241396a2fc/open

   3. Draw deck
      PUT /api/deck/{deckId}/draw/?count={COUNT}
      Sample: http://localhost:3000/api/deck/4c5a93d1-ea04-4726-bb8d-87241396a2fc/draw/?count=3


### Testing

1. npm run test
2. If you have some tests failed, you should seed the database once with the command below :
   npm run seed-test

## Built With

- Node.js
- Express.js
- Sequelize
- PostgreSQL