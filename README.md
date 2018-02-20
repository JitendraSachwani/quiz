# WORKSHOP
## Day 1

1. JSON
  1. Intro - Array accessing using indices similarly dict using keys
 
  2. Object
 
  3. Array
 
  4. Complex
 
  5. Make your own JSON for your name,email,phone numbers

2. Mongo:
  1. Description (Uses JSON)
 
  2. Mongo Server
 
  3. Mongo shell 
    1. show dbs
    2. use < dbname >
      - db.getCollection('').method()
    3. db.users.insertOne({})
    4. db.users.insertMany([{},{}])
    4. db.users.findOne({})
    5. db.users.find
    5. db.users.find().limit(5) //Top 5
    6. db.users.updateOne({},{$set:{}})
    7. db.users.updateMany({},{$set:{}})
    (DB,Collection:(Users,Questions) creation, Documents' CRUD)

3. Node:
  1. Intro *asynchronous!!!*

  2. myFirst.js
    1. Hello <NAME> **install nodemon** make sure its globally installed
    2. for loop *\n and <br> difference*

  3. myFirstModule.js *exports*
    1. date
    2. require in myfirst.js *difference in './asaskdbja' and 'asdsadsa'*

  4. Node routes **not important**
    1. req.url *node routes*

  5. Node mailer **not important**
    1. nodemail.js

  6. Express
    1. Installation
    2. myFirstExpress.js 
    3. Get request
    4. POST request

## Day 2

  1. Connection with mongo
    1. install mongoose
    2. Import mongoose in myFirstExpress.js
    3. Connect to db at localhost
    4. Insert questions into db

  2. Project
    1. WORK ON THE FUCKING PROJECT
