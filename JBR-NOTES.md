NOTES
=====


## To Do

- remove passwords from /users
- rename Auth to... Local ?
- what to do with ErrorView?
- change Api to have [generic] calls
- move profile to right, make it Profile (user1)
- document code & install
- add proxy 5000 to package.json ? Or SERVER_URL?
- add model/database.js ?
- remove my _response() ??


## Installation

```
yarn (in project and client folders)
.env, like this:

# create MySQL DB 'auth2'
mysql auth2 < tables.sql
mysql auth2 < seed.sql
```

- Seed data has usernames user1-user3 with passwords pass1-pass3

## Notes

- This is an example of components that do *not* use centralized data; each one fetches


## Running Tests


## References

- https://github.com/jshttp/http-errors
