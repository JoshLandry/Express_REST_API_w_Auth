# Express_REST_API by Josh Landry
This is a simple REST API that uses the Express module and MongoDB as a backend.

It is designed to work with the 'goats' resource, and your posts will be saved to a new database called "goatsapp_development".

First now, run 'npm install' to install all dependencies.

Next, run mongod using `mongod --dbpath=./db --smallfiles` in the cloned repo of this app.  Then, start the server with node using the command `node server.js`.  

Then, send the server requests using Superagent or something similar: 

GET request - `superagent localhost:3000/api/v1/goats`
POST - `superagent localhost:3000/api/v1/goats post {goatSays: "test", goatHandler: "test"}`
PUT - `superagent localhost:3000/api/v1/goats/ID# post {goatSays: "modified", goatHandler: "test"}`
DELETE - `superagent localhost:3000/api/v1/goats/ID# delete`

Your posts must follow the format {goatSays: "I can talk im a goat", goatHandler: "who keeps a leashed goat"} to fit into the 'goat' schema.

Your requests will fail to authenticate unless you first create a user and generate a token, and include it with each request as a property of JSON object you are sending as data.

Create a user using the following request - 

`superagent localhost:3000/api/v1/create_user post {email: "test", password: "password"}`

Or sign in thusly - 

`superagent localhost:3000/api/v1/sign_in -u test:password`

You can also run the command `Grunt` to run both the jshint style checker and mocha/chai-http tests that check the functionality of the route handlers.