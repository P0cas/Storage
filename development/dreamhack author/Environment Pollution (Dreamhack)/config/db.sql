create database challenge;
use challenge;
create table users (
    name varchar(50) not null,
    id varchar(50) not null,
    pw varchar(64) not null
);
create table filelist(path varchar(100));