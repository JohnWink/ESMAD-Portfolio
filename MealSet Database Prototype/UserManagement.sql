/* Creating Users*/

CREATE USER 'UserModerator'@'localhost'
IDENTIFIED BY '123456789' PASSWORD EXPIRE;

CREATE USER 'HealthInspector'@'localhost'
IDENTIFIED BY '123456789' PASSWORD EXPIRE;

CREATE USER 'Admin'@'localhost'
IDENTIFIED BY '123456789' PASSWORD EXPIRE;

CREATE USER 'DataBaseDev'@'localhost'
IDENTIFIED BY '123456789' PASSWORD EXPIRE;

/* Granting user privileges*/
GRANT select, delete on mealset.cliente to UserModerator@localhost;
GRANT select, delete on mealset.rating_restaurante to UserModerator@localhost;

GRANT select , delete on mealset.prato to HealthInspector@localhost;

GRANT select, insert,update,delete on mealset.* to Admin@localhost;

GRANT ALL on mealset.* to DataBaseDev@localhost;

Flush privileges;



use mysql;
select * from mysql.db;

