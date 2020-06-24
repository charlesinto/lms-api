
CREATE TABLE lms_roles(
id int primary key auto_increment,
rolename varchar(200) not null,
datecreated timestamp default current_timestamp
);

insert into lms_roles(rolename)
values('SUPER ADMINISTRATOR'),
('STUDENTS'),
('TEACHERS'),
('SCHOOL ADMIN'),
('ADMIN');

create table lms_module(
id int primary key auto_increment,
module varchar(100) not null,
datecreated timestamp default current_timestamp
);


drop table lms_role_access;

CREATE TABLE lms_role_access(
id int primary key auto_increment,
roleid int not null,
pageid int not null,
canView int default 0,
canEdit int default 0,
canDelete int default 0,
canCreate int default 0,
datecreated timestamp default current_timestamp,
foreign key (roleid) references lms_roles(id),
foreign key (pageid) references lms_module(id)
);

select * from lms_role_access;

insert into lms_module(module)
values('roles'),('student'),('teachers'),('notifications'),('materials');

insert into lms_role_access(
roleid, pageid, canView, canEdit, canDelete, canCreate)
values(1,1,1,1,1,1), (1,2,1,1,1,1), (1,3,1,1,1,1),
(1,4,1,1,1,1),(1,5,1,1,1,1);

create table lms_schools(
id int primary key auto_increment,
schoolName varchar(200) not null,
schoolAddress varchar(200) not null,
contactNumber varchar(200) not null,
state varchar(100) not null,
lga varchar(100) not null,
country varchar(50) default 'nigeria',
datecreated timestamp default current_timestamp,
licenseStartDate timestamp,
licenseEndDate timestamp,
isBlcoked int,
updatedAt timestamp 
);

select * from lms_schools;

insert into lms_schools(schoolName, schoolAddress, contactNumber, state, lga, licenseStartDate, licenseEndDate)
values ('cbc college', 'Lekki Phase 1', '08163113450', 'Lagos', 'Eti Osa', NOW(),NOW());





create table users(
id int primary key auto_increment,
firstName varchar(200) not null, 
lastName varchar(200) not null,
emailAddress varchar(200) not null,
username varchar(200),
phoneNumber varchar(200),
datecreated timestamp default current_timestamp,
token varchar(350),
isLoggedIn int default 0,
roleid int not null,
isActive int default 1,
resetPassword int default 0,
schoolId int default 0,
password varchar(300) not null,
foreign key (roleid) references lms_roles(id)
);





