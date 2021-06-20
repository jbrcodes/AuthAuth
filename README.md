Demo: Authentication & Authorization
=====

## Summary

This repo shows how to do very simple auth/auth
(authentication and authorization) in both the back end
and front end.


## Auth/Auth-Specific Technologies Used

- [JSON Web Token](https://jwt.io/) (JWT) implementation via NPM package [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- NPM package [bcrypt](https://www.npmjs.com/package/bcrypt) for hashing passwords


## Installation

### 1. Install NPM Packages

Run `yarn` in both the project/repo directory as well as the `client` directory.
(`npm` will work as well.)

### 2. Create and Configure Database

#### 2.1
Create a MySQL database via the MySQL CLI; we'll call our DB `authauth`.
```
CREATE DATABASE authauth;
```

#### 2.2
Initialize the DB via the shell:
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
DB_USER=root
DB_PASS=root
DB_NAME=authauth
```

## Running the Demo

To run just the back-end, use Postman (or similar) and connect to `http://localhost:5000`.
To run both front- and back-ends, 
you'll need to run `yarn start` in two different shells, the first in the project
directory (the server) and the second in the `client` directory.


## Server Notes

- Middleware *guards* are used to provide auth/auth on individual routes. They are located in `middleware/guards.js` in the project directory.


## Client Notes

- The front-end uses components that do *not* store data centrally in the lowest common ancestor (commonly the App). Instead, each component fetches its own data from the server when it is mounted.

- The `useEffect()` callback *cannot* be asynchronous. Therefore if we want to fetch data when the component mounts, we can get around that inconvenience by declaring an `async` function within the callback, and then call it (right after the declaration, still in the callback) *without* `await`.

- "Helper" classes `Api` and `Local` place commonly-used functionality in separate files.