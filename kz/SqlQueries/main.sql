DROP TABLE IF EXISTS [Articles];
DROP TABLE IF EXISTS [Users];


CREATE TABLE [Users] (
TabelCode varchar(6) NOT NULL PRIMARY KEY,
Name nvarchar(255) NOT NULL,
PhoneNumber varchar(11),
PhoneCode varchar(6),
LogInToken varchar(255),
);
CREATE TABLE [Articles] (
TabelCode varchar(6) NOT NULL,
ArticleType varchar(13) NOT NULL,
ArticleName nvarchar(400) NOT NULL,
DayTime int,
HourTime int,
Money float NOT NULL,
FOREIGN KEY (TabelCode)  REFERENCES Users (TabelCode)
);

INSERT INTO [Users] VALUES ('000000', N'Василий Васильев Васильевич', '79209000540', '', '');
INSERT INTO [Users] VALUES ('000001', N'Петр Петров Петрович', '79005554346', '', '');

INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Na', N'Оплата по окладу', 26, 156, 29013);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Na', N'Районный коэффициент ', null, null, 5551.95);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Na', N'Стимулирующая выплата (ист.2.2, 4.1, 4.2, 5.4, 5.5, 7)', null, null, 8000);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Na', N'Начисления в связи с больничным листом', null, null, 5603.45);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Na', N'Расчет денежных начислений по отпускным', null, null, 18430);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Na', N'Начисления по социальным отчислениям', null, null, 7000);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Ud', N'НДФЛ', null, null, 5534);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Vi', N'За первую половину месяца (Банк, вед. № 12507 от 18.09.20)', null, null, 22688.13);
INSERT INTO [Articles] (TabelCode, ArticleType, ArticleName, DayTime, HourTime, Money) VALUES ('000000', 'Vi', N'Зарплата за месяц (Банк, вед. № 12138 от 30.09.20)', null, null, 45376.27);

SELECT * FROM [Users];
SELECT * FROM [Articles];