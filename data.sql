DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL
    
    -- first_name text NOT NULL,
    -- last_name text NOT NULL,
    -- phone text NOT NULL,
    -- join_at timestamp without time zone NOT NULL,
    -- last_login_at timestamp with time zone
);
