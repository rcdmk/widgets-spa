# Widgets Single Page App Demo
This is a SPA built with React on top of an Express.js server.

## Features
- A user view that displays a list of users (data via api `/users`), each user should have a method of clicking to viewing all the details of that user (`/user/:id`)
- A widget view that displays a list of widgets (`/widgets`), each widget should have a method of clicking to view the details of that widget (`/widget/:id`)
- A search/filter on the user and widget list views
- A method of creating a new widget (POST `/widgets`)
- A method of updating an existing widget (PUT `/widgets/:id`)


# API Documentation
There RESTful API runs on the same server as the app available at `/api` for retrieving the data used to make this app.  
There's also an API available at `http://spa.tglrw.com:4000`


## The endpoints are as follows:
- GET `/users` [http://spa.tglrw.com:4000/users](http://spa.tglrw.com:4000/users)
- GET `/users/:id` [http://spa.tglrw.com:4000/users/:id](http://spa.tglrw.com:4000/users/:id)
- GET `/widgets` [http://spa.tglrw.com:4000/widgets](http://spa.tglrw.com:4000/widgets)
- GET `/widgets/:id` [http://spa.tglrw.com:4000/widgets/:id](http://spa.tglrw.com:4000/widgets/:id)
- POST `/widgets` for creating new widgets [http://spa.tglrw.com:4000/widgets](http://spa.tglrw.com:4000/widgets)
- PUT `/widgets/:id` for updating existing widgets [http://spa.tglrw.com:4000/widgets/:id](http://spa.tglrw.com:4000/widgets/:id)


# Setup
As all npm managed projects, there is a need for installing all dependancies first.  
Navigate to the repository root and run:

    $ npm install 


## Build the app
In order to run this app, you will need to build it first:

    $ npm run build

This will build the react app source and generate the client JavaScript bundle.


## Running the app
To run the app, after building it:

    $ npm start

The app runs on `http://localhost:3000`.  
The RESTful API lives on `http://localhost:3000/api`.


# Future improvements (to come)
- Implement middlewares for validation and security
- Implement mongoose to operate on data from MongoDB
- Unit tests
- Implement a CI/CD cicle to run on heroku
- Create an ASP.Net WebAPI version

