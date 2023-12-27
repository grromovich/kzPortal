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
/*       ���� ������:*/
/*             ��������� - Na*/
/*             �������� - Ud*/
/*             ��������� - Vi*/
ArticleName nvarchar(400) NOT NULL,
Period nvarchar(15), 
DayTime int,
HourTime int,
Oplacheno int,
Money float NOT NULL,
);

/* �� �������! ���� ������� �� ����*/
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

INSERT INTO [Users] VALUES ('000000', N'������� �������� ����������', '149bfb5f0ba194f684cd8d068d42eee34c41a20cda0a5f54e2a928212e5ccb48', 0, 0, 0, '01/01/0001 00:00:00');
INSERT INTO [Users] VALUES ('000001', N'���� ������ ��������',	'37f3d0fdecf217f8e8355a8776be94083586d86ec4af82eab24fb5bbbb94f31e', 0, 0, 0, '01/01/0001 00:00:00');

INSERT INTO [Articles] VALUES ('000000', 'Na', N'������ �� ������', N'����� ���',  26, 156, 130, 29013);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'�������� ����������� ', N'����� ���',  null, null, 130, 5551.95);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'������������� ������� (���.2.2, 4.1, 4.2, 5.4, 5.5, 7)', N'����� ���',  null, null, 130, 8000);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'���������� � ����� � ���������� ������',N'����� ���', null, null, 130, 5603.45);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'������ �������� ���������� �� ���������', N'����� ���',  null, null, 130, 18430);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'���������� �� ���������� �����������', N'����� ���',  null, null, 130, 7000);
INSERT INTO [Articles] VALUES ('000000', 'Ud', N'����', N'����� ���',  null, null, 130, 5534);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'�� ������ �������� ������ (����, ���. � 12507 �� 18.09.20)', '����� ���', null, null, 130, 22688.13);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'�������� �� ����� (����, ���. � 12138 �� 30.09.20)', N'����� ���',  null, null, 130, 45376.27);

INSERT INTO [Admins] VALUES ('149bfb5f0ba194f684cd8d068d42eee34c41a20cda0a5f54e2a928212e5ccb48', '')

SELECT * FROM [Users];
SELECT * FROM [Articles];
SELECT * FROM [Settings];
SELECT * FROM [BadLogins];
SELECT * FROM [Admins];