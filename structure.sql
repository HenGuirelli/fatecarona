create database Fatecarona;
  use Fatecarona;

create table membro(
  ra bigint not null primary key,
  nome varchar(40) not null,
  email varchar(40) not null,
  genero char(1) default 'M',
  avatar varchar(100)
);