# ecommerce-nodejs-api
_A Virtual Ecommerce Api using Node.js, Express, Mongoose and Docker._

## Technology
_The application is built with:_

- Node.js version 14.15.3
- MongoDB version 4.4.0
- bcrypt version 5.0.0
- cors version 2.8.5
- dotenv version 8.2.0
- express version 4.17.1
- express-fileupload version 1.2.0
- jsonwebtoken version 8.5.1
- mongoose version 5.11.4
- mongoose-seed version 0.6.0
- mongoose-unique-validator version 2.0.3
- stripe version 8.130.0
- underscore version 1.12.0
- url-slug version 2.3.2

## Run
_To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package._

## How to Run
_These instructions will get you a copy of the project up and running on your local machine for development and testing purposes (Without using Docker-compose)._

* Install node modules

   ```bash
   npm install

* Starting Project

    ```bash
    npm run dev


## Docker setup

    ```bash 
    docker-compose build
    

* Starting Docker

    ```
    docker-compose build
    ```


## Docker containers 

- server (mongoose  + expressJS runs on port :4000)
- mongo (mongd server runs on port :27017)




## License
_Released in 2020. This project is under the MIT license._