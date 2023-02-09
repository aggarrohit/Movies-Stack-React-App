# Getting Started 

npm install

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

As we have used APIs from themoviedb.org to fetch, search, add/remove favourites and add/remove watch later movies, we have to enter our themoviedb.org account's username and password in the login box once in 24 hours as session expires in one day.
Without login we can only search for the movies.
Login is requried to get/add/remove favourites and watch later movies.

If user has entered more than 2 characters to search the movie then it will automatically search,.
If user wants to search for movie with 1 or 2 characters then enter button needs to be pressed or search icon needs to be clicked.

### `yarn test`

Unit tests are written for
Home Page elements
Favoutie Movies List
Watch Later Movie List
Now Playing movie list

All the tests are performed by mocking the API data with sample data of one movie i.e. "The Pursuit of Happyness"

### `yarn run cypress open`

This will open up the cypress.
There are two e2e test cases : 
1. Login with the themoviedb.org username and password to fetch favourites and watch later movie lists
2. Search the keyword "the pursuit of happyness" and checks that the movie has been searched successfully.


