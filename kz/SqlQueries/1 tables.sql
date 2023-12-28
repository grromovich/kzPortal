DROP TABLE IF EXISTS [Articles];
DROP TABLE IF EXISTS [Settings];
DROP TABLE IF EXISTS [BadLogins];
DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Admins];


CREATE TABLE [Users] (
TabelCode varchar(6) NOT NULL PRIMARY KEY,
Name nvarchar(255) NOT NULL,
Password varchar(64),
BeforeDolg float NOT NULL,
AfterDolg float NOT NULL,
TotalDohod float NOT NULL,
BanDate datetime2 NOT NULL,
);

CREATE TABLE [Articles] (
TabelCode varchar(6) NOT NULL,
ArticleType varchar(13) NOT NULL,
/*       Типы статьи:*/
/*             Начислено - Na*/
/*             Удержано - Ud*/
/*             Выплачено - Vi*/
ArticleName nvarchar(400) NOT NULL,
Period nvarchar(15), 
DayTime int,
HourTime int,
Oplacheno int,
Money float NOT NULL,
);

/* Не трогать! Челы вылетят из аков*/
CREATE TABLE [Settings] (
TabelCode varchar(6) NOT NULL,
APIkey varchar(255),
APIkeyDate datetime2,
LastLoginDate datetime2,
);

CREATE TABLE [BadLogins] (
TabelCode varchar(6) NOT NULL,
BadLoginDate datetime2,
IPaddress varchar(30) NOT NULL,
);

CREATE TABLE [Admins] (
Password varchar(64),
APIkey varchar(255),
);

INSERT INTO [Admins] VALUES ('149bfb5f0ba194f684cd8d068d42eee34c41a20cda0a5f54e2a928212e5ccb48', '')

SELECT * FROM [Users];
SELECT * FROM [Articles];
SELECT * FROM [Settings];
SELECT * FROM [BadLogins];
SELECT * FROM [Admins];