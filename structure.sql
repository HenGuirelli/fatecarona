create database Fatecarona;
  use Fatecarona;

create table membro(
  ra bigint not null primary key,
  nome varchar(40) not null,
  curso char(5) not null,
  email varchar(40) not null,
  genero char(1) default 'M',
  img varchar(50)
);

insert into membro (ra, nome, curso, email, img) values
  (1680481522013, "Thiago Cardoso Ramos", "ADS","thiago.ramos9", "avatar.jpg");