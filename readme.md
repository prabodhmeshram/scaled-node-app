## Node App

### Description 

This is an NodeJS application to consume users Height, Weight, Gender which is given as POST Body.

The vitals are read and written in the Disk into different chunks. This service can be extended to write the data
into streaming servers like Kafka, SQS or other services.

The next part is consumption, the /v1/bmi/consume API reads the directory where the data is produced earlier and
processes over it to compute the BMI info for the users and return them. This service can again be extended to either 
save the data into DB or send to other services for persistent storage.

### Setting up the system

* Run the command `npm i` on root level to install all the dependencies
* Run the command `npm start` to start the server
* Run the command `npm test` for running test
* Run the command `npm test:coverage` to get the full coverage

> Note : consumerService.js is not being covered yet

### API Endpoint Supported

| API  | Usage |
| ------------- | ------------- |
| POST /v1/bmi/produce  | Send JSON data to process  |
| GET /v1/bmi/consume  | This API consumes the data posted by producer endpoint  |

### Tech used

| API |
| --- |
| NodeJS |
| await-to-js |
| jest |