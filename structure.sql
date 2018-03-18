create database Fatecarona;
  use Fatecarona;

create table membro(
  ra bigint not null primary key,
  nome varchar(40) not null,
  telefone char(12) not null,
  apelido varchar(20),
  curso char(5) not null,
  email varchar(40) not null,
  genero char(1) default 'M',
  img varchar(50),
  chegada time,
  saida time
);

insert into membro (ra, nome, telefone, apelido, curso, email, img, chegada, saida) values
  (1680481522013, "Thiago Cardoso Ramos", "011955931212","Proagace", "ADS","thiago.ramos9", "avatar.jpg", "13:00:00", "18:00:00");
