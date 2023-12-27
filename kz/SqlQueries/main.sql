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
BanDate datetime2,
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

INSERT INTO [Users] VALUES ('000000', N'Василий Васильев Васильевич', '149bfb5f0ba194f684cd8d068d42eee34c41a20cda0a5f54e2a928212e5ccb48', 0, 0, 0, '01/01/0001 00:00:00');
INSERT INTO [Users] VALUES ('000001', N'Петр Петров Петрович',	'37f3d0fdecf217f8e8355a8776be94083586d86ec4af82eab24fb5bbbb94f31e', 0, 0, 0, '01/01/0001 00:00:00');

INSERT INTO [Articles] VALUES ('000000', 'Na', N'Оплата по окладу', N'месяц год',  26, 156, 130, 29013);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Районный коэффициент ', N'месяц год',  null, null, 130, 5551.95);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Стимулирующая выплата (ист.2.2, 4.1, 4.2, 5.4, 5.5, 7)', N'месяц год',  null, null, 130, 8000);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Начисления в связи с больничным листом',N'месяц год', null, null, 130, 5603.45);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Расчет денежных начислений по отпускным', N'месяц год',  null, null, 130, 18430);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Начисления по социальным отчислениям', N'месяц год',  null, null, 130, 7000);
INSERT INTO [Articles] VALUES ('000000', 'Ud', N'НДФЛ', N'месяц год',  null, null, 130, 5534);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'За первую половину месяца (Банк, вед. № 12507 от 18.09.20)', 'месяц год', null, null, 130, 22688.13);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'Зарплата за месяц (Банк, вед. № 12138 от 30.09.20)', N'месяц год',  null, null, 130, 45376.27);

INSERT INTO [Admins] VALUES ('149bfb5f0ba194f684cd8d068d42eee34c41a20cda0a5f54e2a928212e5ccb48', '')

SELECT * FROM [Users];
SELECT * FROM [Articles];
SELECT * FROM [Settings];
SELECT * FROM [BadLogins];
SELECT * FROM [Admins];