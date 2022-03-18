#!/bin/bash

service mysql restart
mysql -uroot -ppocas -e 'create database challenge'
mysql -uroot -ppocas -e 'use challenge; create table filelist(path varchar(100));create table users (name varchar(50) not null,id varchar(50) not null, pw varchar(64) not null);' 
mysql -uroot -ppocas -e "alter user root@localhost identified by 'pocas'"

npm start app.js

sleep 300