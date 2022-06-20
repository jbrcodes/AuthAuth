# Authentication & Authorization


This demo shows how to do very simple auth/auth
(authentication and authorization) in both the back end
and front end.

The user must be logged in to see the Members Only page,
and a logged-in user is only allowed to see his/her own profile page.
An anonymous user will be redirected to the login page.


## Auth/Auth-Specific Technologies Used

- [JSON Web Token](https://jwt.io/) (JWT) implementation via NPM package [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- NPM package [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing passwords


## Installation

### 1. Install NPM Packages

Type `npm install` in both the project `client` directories
to install dependencies.

### 2. Create and Configure Database

#### 2.1
Create a MySQL database via the MySQL CLI; we'll call our DB `authauth`.
```
CREATE DATABASE authauth;
```


#### 2.2
Create an `.env` file in the project directory that contains connect information for the DB
as well as a *secret key* for creating/verifying JSON web tokens.
(For a production website you would use a random string generator for the secret key, 
but for our purposes just write a string that can't be easily guessed, 
as you would/should do when choosing a password.)
```
DB_HOST=localhost
DB_NAME=authauth
DB_USER=root
DB_PASS=root
SECRET_KEY='The rain in Espanya falls mainly in the Flachland &#%'
```


#### 2.3
Initialize the DB via the terminal, from the project directory:
```
npm run migrate
```
This creates the `users` table and inserts some sample data consisting of 3 users, 
with usernames `user1`-`user3` and passwords `pass1`-`pass3`.



## Running the Demo

To run just the back end, type `npm start` in the project directory and
use Postman (or similar) to connect to `http://localhost:5000`.

To run the front end as well, open another terminal and type `npm start` in the client directory,
and point your browser at `http://localhost:3000`.


## Branches

- `final`: The finished demo
- `starter`: The starting point for adding login behavior to front/back ends


## Server Notes

These server files contain auth/auth code:

- Middleware *guards* are used to provide auth/auth on individual routes. The guards are located in `middleware/guards.js`.
- `routes/auth.js` contains registration and login routes.
- The other routes files use the middleware guards to protect routes.



## Client Notes

These client files contain auth/auth code:

- The `Api` helper class contains all `fetch()` calls to the back end.
- The `Local` helper class stores logged-in user data (including token) in `localStorage`, so that a logged-in user can come back later and still be logged in.
- The `PrivateRoute` component, used in `App`, will redirect anonymous users to the login view.
- The `NavBar` component shows different menu items for anonymous and logged-in users.

In this demo the client does *not* store data centrally in the lowest common ancestor (commonly the `App`). 
Instead, each component fetches its own data from the server.

The `Api` helper class has a number of advantages:
1. It places all "knowledge" and details of `fetch()` in one file, so individual components don't need 
to duplicate all `fetch()`-related code, making the code more DRY. It also does the second `await` for the data on a successful request.
1. It returns something called `myresponse`, which I call a "unified" response obj with four properties: 
`ok`, `data`, `status` and `error`. I call it "unified" because `error` will contain the error message for both server and network errors.

Although the back end supports registration and you can register new users with Postman, the front end does not have a registration form.
Consider that an exercise for you. ;-)


<hr />
<small>Updated: 20 Jun 2022</small>
