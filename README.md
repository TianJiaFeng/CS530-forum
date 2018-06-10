# CS-530-Forum
CS-530 final project, frontend
The frontend uses Node.js . I use Post request to interacting between frontend and backend, the file forum/src/assets/js/serverConfig.js sets the url of API. 
To run the frontend, just come into the forum file and then run "npm run dev"
 
Then you can access to the web in your own computer.
If it is not success, please go into forum/node_modules and run "npm install. Then go back and run "npm run dev" again.

frontend basically has 5 modules:
account, used for review and edit acount information
history, user can check their historical posts and comments
login, used for sign in and create account
post, main page of the forum and detail page of post
user, used for administrator to edit account

and other reused modules are stored in src/components/common like Alert, Bar, Modal and ModalAlert.

For backend, the file used to set the database is forum /application/config. I will upload my database file, but you may need to change this file according to your database setting.

