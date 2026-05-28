# Github Profile Analyzer API
Created this API for fetching github users info using github public api and saving them in database 

Tech Stack used :
 1. ExpressJs
 2. MySql

this project provides two api's 
 1. /api/user
 2. /api/user/your_github_username

the first api is used for retrieve all the saved users info in mysql database 
and the second api is used for fetching the user info from username and if it does not exist in the database it will be saved to database 

# Setup 
1. clone this repo and install dependecies using npm install 
2. rename .env-sample to .env and give valid sql info like host, user, password, and db 
3. make sure mysql server is already running with database name ur specified and a table name users 
4. use this schema for while creating the users table : 
  ``
  CREATE TABLE users (
         id INT PRIMARY KEY,
         avatar_url VARCHAR(500),
         html_url VARCHAR(500),
         name VARCHAR(60),
         location VARCHAR(100),
         bio VARCHAR(150),
         public_repos INT,
         followers INT,
         following INT,
         created_at DATE
     ); 
  ``
5. start the mysql server and start the express server 
6. go to browser to endpoint http://localhost:5000/api/user

now u can fetch users info by specifiying the username ex : 

 `` http://localhost:5000/api/user/anani999 ``

this will fetch my github profile info and saves to the mysql database 
and when can be accessed the saved users using /api/user endpoint 
