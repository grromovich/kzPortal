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
FOREIGN KEY (TabelCode)  REFERENCES Users (TabelCode)
);

/* �� �������! ���� ������� �� ����*/
CREATE TABLE [Settings] (
TabelCode varchar(6) NOT NULL,
APIkey varchar(255),
);


INSERT INTO [Users] VALUES ('000000', N'������� �������� ����������', 'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', '', '', '');
INSERT INTO [Users] VALUES ('000001', N'���� ������ ��������',	'b493d48364afe44d11c0165cf470a4164d1e2609911ef998be868d46ade3de4e', '', '', '');

INSERT INTO [Articles] VALUES ('000000', 'Na', N'������ �� ������', N'����� ���',  26, 156, 130, 29013);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'�������� ����������� ', N'����� ���',  null, null, 130, 5551.95);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'������������� ������� (���.2.2, 4.1, 4.2, 5.4, 5.5, 7)', N'����� ���',  null, null, 130, 8000);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'���������� � ����� � ���������� ������',N'����� ���', null, null, 130, 5603.45);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'������ �������� ���������� �� ���������', N'����� ���',  null, null, 130, 18430);
INSERT INTO [Articles] VALUES ('000000', 'Na', N'���������� �� ���������� �����������', N'����� ���',  null, null, 130, 7000);
INSERT INTO [Articles] VALUES ('000000', 'Ud', N'����', N'����� ���',  null, null, 130, 5534);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'�� ������ �������� ������ (����, ���. � 12507 �� 18.09.20)', '����� ���', null, null, 130, 22688.13);
INSERT INTO [Articles] VALUES ('000000', 'Vi', N'�������� �� ����� (����, ���. � 12138 �� 30.09.20)', N'����� ���',  null, null, 130, 45376.27);

SELECT * FROM [Users];
SELECT * FROM [Articles];
SELECT * FROM [Settings];