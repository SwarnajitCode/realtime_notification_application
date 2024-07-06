# Notification Application

It is a simple notification application which deppicts a social media type behaviour. It does not include a front-end. However as WS library is used you can test the application through ws requests from postman. Authentication with jsonwebtoken is also implemented, Withour which you would not be able to send or receive messages.But firstly u have to register yourself.

# Table of contents
Installation


# Installation
Just opening the terminal and running command
npm i - will isntall all the dependencies which include express, ws, dotenv, bcrypt, jsonwebtoken, joi, pg, pg-hstore, sequelize

# Running the application
Please refer to envexample file to make an .env file for the project and fillup the database credentials and the jwt secret.
Then after using command 'npm start' it will run the application.

# Routes
Websocket connection : 
url : ws://localhost:3000?token=
query paramters = 'token'
------------------------------------

Registration route : 
method : post
protected : false
url : http://localhost:3000/register
body : {
    "userName":"swarnajit",
    "userPassword":"swarnajit"
}

--------------------------------------

login route :
method : post
protected : false
url : http://localhost:3000/login
body : {
    "userName":"swarnajit",
    "userPassword":"swarnajit"
}

---------------------------------------

follow someone : 
method : post
protected : true
url : http://localhost:3000/followers
body : {
    "followId":"39e5353d-6ad3-4f3d-842b-5ae016e60c0f"
}

---------------------------------------

get followers :
method : get
protected : true
url : http://localhost:3000/followers

----------------------------------------

logout : 
method : get
protected : true
url : http://localhost:3000/logout

----------------------------------------