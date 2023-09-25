DROP TABLE IF EXISTS [Articles];
DROP TABLE IF EXISTS [Settings];
DROP TABLE IF EXISTS [Users];


CREATE TABLE [Users] (
TabelCode varchar(6) NOT NULL PRIMARY KEY,
Name nvarchar(255) NOT NULL,
Password varchar(64),
BeforeDolg float NOT NULL,
AfterDolg float NOT NULL,
TotalDohod float NOT NULL,
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
FOREIGN KEY (TabelCode)  REFERENCES Users (TabelCode)
);

/* Не трогать! Челы вылетят из аков*/
CREATE TABLE [Settings] (
TabelCode varchar(6) NOT NULL,
APIkey varchar(255),
);


INSERT INTO [Users] VALUES ('000000', N'Василий Васильев Васильевич', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', '', '', '');
INSERT INTO [Users] VALUES ('000001', N'Петр Петров Петрович',	'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', '', '', '');

INSERT INTO [Articles] VALUES ('000000', 'Na', N'Оплата по окладу', N'месяц год',  26, 156, 130, 29013);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Районный коэффициент ', N'месяц год',  null, null, 130, 5551.95);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Стимулирующая выплата (ист.2.2, 4.1, 4.2, 5.4, 5.5, 7)', N'месяц год',  null, null, 130, 8000);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Начисления в связи с больничным листом',N'месяц год', null, null, 130, 5603.45);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Расчет денежных начислений по отпускным', N'месяц год',  null, null, 130, 18430);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'Начисления по социальным отчислениям', N'месяц год',  null, null, 130, 7000);
INSERT INTO [Articles] VALUES ('000000', 'Ud', N'НДФЛ', N'месяц год',  null, null, 130, 5534);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'За первую половину месяца (Банк, вед. № 12507 от 18.09.20)', 'месяц год', null, null, 130, 22688.13);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'Зарплата за месяц (Банк, вед. № 12138 от 30.09.20)', N'месяц год',  null, null, 130, 45376.27);

SELECT * FROM [Users];
SELECT * FROM [Articles];
SELECT * FROM [Settings];