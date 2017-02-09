# project-geoloc [Video Demo][11]


## Introduction
Our project which name is geoloc is a game like orienteering. During your play, you need to answer the questions step by step to achieve the final goal. It shows you a place on the google map and you need to go to that place to find out the answer of the question which asked by the system. If your answer is correct you could get a new question, if not you need to try to find out another response.    

This documents gives you the instructions of how to install and to use this application.

## Installation

### Prerequisites

##### MongoDB
This project asked you to use the [MongoDB][1] at the server side to store all the data. So please make sure that you have installed the MongoDB correctly on your computer. You could follow this [tutorial][2] to download and to install the latest version (3.4) of MongoDB Community Edition on your computer. You could use [Linux][3], [Mac OS][4] or [Windows][5].

After the installation is finished, please make sure that you could see the following sentence
`It looks like you are trying to access MongoDB over HTTP on the native driver port.` at the [localhost:27017][10] after the MongoDB service has been started.

#### Node
The [NodeJS][7] is also required to compile the [ECMAScript 6][6]. The version that we suggest is `v6.9.2`.

#### Bower
The [Bower][8] is also useful to install the module, such as angular, bootstrap, of the frontend. The latest version is `1.8.0`. 

#### Ubuntu or Windows
After all the preparation above were ready, you could begin to install our application on your ubuntu or windows system.

##### Ubuntu
If your system is `Ubuntu` it could be easy. You just need to execute the file of `install_local.sh` to begin the installation. Maybe you need to run it in the `sudo` mode.

##### Windows
You need to follow the following steps to finish the installation.
Open the `cmd` and go to the folder of the geoloc.
 * 1. Install user service.
    `cd backend/user` then `npm install`
 * 2. Install questionn service.
    `cd backend/question` then `npm install`
 * 3. Install upload image service.
    `cd backend/uploadImage` then `npm install`
 * 4. Install chart service 
    `cd backend/chart` then `npm install`
 * 5. Install the frontend
    `cd frontend/` then `npm install` then `bower install`
 * 6. Initial all questions and an admin user
    `in the root folder` then `mongo localhost/geoloc initial.js`
    

### Running
##### Ubuntu
To start all the services, you need to execute the file of `run_local.sh`.
The user service is listening at port `8080`.
The question service is listening at port `8081`.
The uploadImage service is listening at port `8082`.
And you could open the frontend at port `3000`.
So please make sure that all the ports are free.

You could open the [localhost:3000][9] from the broswer to start to use our application on local.

To stop the application you could use `stop_local.sh`.

##### Windows
It could be a little bit complex to run our application on windows because you need to run all the services manually.
 * 1. Run user service.
    `cd backend/user` then `node user_app.js`
 * 2. Run questionn service.
    `cd backend/question` then `node question_app.js`
 * 3. Run upload image service.
    `cd backend/uploadImage` then `node uploadImage.js`
 * 4. Run chart service.
    `cd backend/chart` then `node chartServer.js`
 * 5. Run the frontend
    `cd frontend/` then `node server.js`
After all the services were run correctly, you could open the [localhost:3000][9] from the broswer to start to use our application on local.

To stop the application please close each service manually.

##### Remark
If you want to use it in your server or you want to use a computer use a server do not forget to change the address IP (`var URLServer = 'http://localhost';`) in the file `frontend/app/homeRouter.js` to the address IP of your computer or your server.

### Testing
##### Ubuntu
You can run the command `mocha -u tdd` in each backend subdirectory (`backend/user`, `backend/question`, `backend/uploadImage`) in order to run each service related test suites.

## Team
 * Feng DING, database structure design, user service, question service, chart service, uploadImage service (backend) all the admin functionnalities (frontend)
 * Thibaut SORIANO, mocha test of all the services (backend)
 * Zhengqin YAN, Angular, login and signup, google map, questions and its blog (frontend)
 * Kaiwen YU, display user position (frontend)

## Links
[MongoDB offical website][1]
[MongoDB installation][2]
[ECMAScript][6]
[NodeJs offical website][7]
[Bower installation][8]


[1]: https://www.mongodb.com/
[2]: https://docs.mongodb.com/manual/installation/
[3]: https://docs.mongodb.com/manual/administration/install-on-linux/
[4]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
[5]: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
[6]: http://es6-features.org/
[7]: https://nodejs.org/en/
[8]: https://bower.io/
[9]: http://localhost:3000
[10]: http://localhost:27017
[11]: https://www.youtube.com/watch?v=YAV987vaAEE
