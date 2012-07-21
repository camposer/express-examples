Summary
=======

This project includes:
- EJS as view engine
- Code separation, on lib folder, including: REST facades, DAO implementations, and services (business logic).
- Database (sqlite) connectivity
- Changes on app.js for keeping it "as untouchable" as possible
- Documentation (kind of javadoc)
- Unit testing (working on it right now)

The application is really simple, for executing it you just have to try at your browser: 
http://localhost:3000/

This application has a database (db/db.sqlite) with only one table, bellow the DDL:
CREATE TABLE user (name VARCHAR(50));

In sqlite all tables have by default an auto-incremental key named rowid, so we don't need to speciy it.

The REST API implemented is really simple, you have the following methods:
- All users: GET /users
- User by id: GET /users/:id
- Add user: POST /users
- Remove user: DELETE /users
- Update user: UPDATE /users

For testing methods I added curltest.sh script with some curl expressions that help to test very quickly the REST API.
