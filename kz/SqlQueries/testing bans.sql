DROP TABLE IF EXISTS [BadLogins];
DROP TABLE IF EXISTS [Bans];

CREATE TABLE [BadLogins] (
TabelCode varchar(6) NOT NULL,
BadLoginDate datetime2,
IPaddress varchar(30) NOT NULL,
);

CREATE TABLE [Bans] (
TabelCode varchar(6) NOT NULL,
BanDate datetime2,
IPaddress varchar(30) NOT NULL,
);