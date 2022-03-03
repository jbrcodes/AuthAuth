Demo: Authentication & Authorization
=====

## Summary

This repo shows how to do very simple auth/auth
(authentication and authorization) in both the back end
and front end.

The user must be logged in to see the Members Only page,
and a logged-in user is only allowed to see his/her own profile page.


## Auth/Auth-Specific Technologies Used

- [JSON Web Token](https://jwt.io/) (JWT) implementation via NPM package [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- NPM package [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing passwords


## Installation

### 1. Install NPM Packages

Run `yarn` in both the project directory as well as the `client` directory.
(`npm` will work too.)

### 2. Create and Configure Database

#### 2.1
Create a MySQL database via the MySQL CLI; we'll call our DB `authauth`.
```
CREATE DATABASE authauth;
```

#### 2.2
Initialize the DB via the terminal, from the project directory:
```
node model/database.js
```
This creates the `users` table and inserts some sample data consisting of 3 users, 
with usernames `user1`-`user3` and passwords `pass1`-`pass3`.

#### 2.3
Create an `.env` file in the project directory that contains connect information for the DB.
(Your details may differ.)
```
DB_HOST=localhost
DB_NAME=authauth
DB_USER=root
DB_PASS=root
```

## Running the Demo

To run just the back end, type `yarn start` in the project directory and
use Postman (or similar) to connect to `http://localhost:5000`.

To run the front end as well, open another terminal and type `yarn start` in the client directory.

There are three users `user1`-`user3` with passwords `pass1`-`pass3`.


## Server Notes

These server files contain auth/auth code:

- Middleware *guards* are used to provide auth/auth on individual routes. The guards are located in `middleware/guards.js`.
- `routes/auth.js` contains registration and login routes.
- The other routes files use middleware to protect routes.



## Client Notes

These client files contain auth/auth code:

- The `Api` helper class contains all `fetch()` calls to the back end, and it adds the token to requests for protected routes.
- The `Local` helper class stores logged-in user data (including token) in `localStorage`, so that a logged-in user can come back later and still be logged in.
- The `PrivateRoute` component, used in `App`, will redirect anonymous users to the login view.
- The `NavBar` component shows different menu items for anonymous and logged-in users.

In this demo the client does *not* store data centrally in the lowest common ancestor (commonly the `App`). 
Instead, each component fetches its own data from the server when it is mounted.

Although the back end supports registration and works with Postman, the front end does not have a registration form.
Consider that an exercise for you. ;-)


<hr />
<small>Updated: 3 Mar 2022</small>