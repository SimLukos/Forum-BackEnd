# BackEnd for Forum page

This BackEnd app provides specific EndPoints for running Forum site on backend server. It connects to MongoDb database. It has authentication and security middleware via login and register.

This app allows users to register or login. Also registered users has access to questions and answers.  
Also answers have ratings. Users can rate them (like - dislike). User can delete his/her own questions and answers.

This app also have **FrontEnd**, which is created with Next.js. **Link:** https://github.com/SimLukos/Forum-FrontEnd-Exam

## Running the app:

Before running the app, you have to be installed Node.js.
When using my source code, make sure to run
`npm install` in the extracted folder.

To start application run`npm start`.
Application runs on port 3000 by default. It can be changed at index.js file.

**Note**: To connect to your mongoDb database, change this line: `process.env.MONGO_CONNECTION` at index.js file with MongoDB ATLAS URL adress.

## App Endpoints:

post - **/question** - ask question;  
get - **/questions** - getting all questions with agregated answers;  
get - **/question/:id** - getting question by id;  
delete - **/question/:id** - delete a question by its id;

post - **/question/:id/answer** - posting answer for specific (id) question;  
delete - **/answer/:id** - delete answer by id;  
post - **/answer/:id** - updating answer with rating and like/dislike function;

post - **/register** - user registration;  
post - **/login** - user login and creating token for authentication (middleware).
