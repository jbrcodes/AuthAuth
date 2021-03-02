NOTES
=====


## To Do

- document code & install


## Installation

```
yarn (in project and client folders)
.env, like this:

# create MySQL DB 'authauth'
mysql authauth < tables.sql
mysql authauth < seed.sql
```

- Seed data has 3 users, with usernames user1-user3 and passwords pass1-pass3

## Notes

- This is an example of components that do *not* use centralized data; each one fetches its own.

- The `useEffect()` callback *cannot* be asynchronous. Therefore if we want to fetch something when the component mounts, we can get around that inconvenience by declaring an `async` function within the callback, and then calling it (still within `useEffect()`) *without* `await`.



## References

- https://github.com/jshttp/http-errors
