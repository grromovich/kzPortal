DROP TABLE IF EXISTS [Articles];
DROP TABLE IF EXISTS [Settings];
DROP TABLE IF EXISTS [BadLogins];
DROP TABLE IF EXISTS [Bans];
DROP TABLE IF EXISTS [Users];


/* Роли           */
/* 0 - Юзер       */
/* 1 - Админ      */

CREATE TABLE [Users] (
TabelCode varchar(6) NOT NULL PRIMARY KEY,
Name nvarchar(255) NOT NULL,
Password varchar(64) NOT NULL,
BeforeDolg float NOT NULL,
AfterDolg float NOT NULL,
TotalDohod float NOT NULL,
Role int NOT NULL,
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

/* Таблицу не трогать! Челы вылетят из аков*/
CREATE TABLE [Settings] (
TabelCode varchar(6) NOT NULL,
APIkey varchar(255),
TabelFile varchar(255),
APIkeyDate datetime2,
LastLoginDate datetime2,
);

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

SELECT * FROM [Users];
SELECT * FROM [Articles];
SELECT * FROM [BadLogins];
SELECT * FROM [Settings];
SELECT * FROM [Bans];
