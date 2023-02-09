# Getting Started 

npm install

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

As we have used APIs from themoviesdb.org to fetch, search, add/remove favourites and add/remove watch later movies, we have to enter our themoviesdb.org account's username and password in the login box once in 24 hours as session expires in one day.



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
1. Login with the themoviesdb.org username and password to fetch favourites and watch later movie lists
2. Search the keyword "the pursuit of happyness" and checks that the movie has been searched successfully.


