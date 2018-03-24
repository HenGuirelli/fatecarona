create database Fatecarona;
  use Fatecarona;

create table membros(
  ra bigint not null primary key,
  nome varchar(40) not null,
  telefone char(12) not null,
  apelido varchar(20),
  curso char(5) not null,
  email varchar(40) not null unique,
  genero char(1) default 'M',
  img varchar(50),
  chegada time,
  saida time
);

insert into membros (ra, nome, telefone, apelido, curso, email, img, chegada, saida) values
  (1680481522013, "Thiago Cardoso Ramos", "011955931212","Proagace", "ADS","thiago.ramos9", "avatar.jpg", "13:00:00", "18:00:00"),
  (1680481522022, "Monquidesio da Silva", "011955931212","Monqui", "SEG","monqui.desio", "avatar.jpg", "13:00:00", "18:00:00");

create table veiculos(
  id int auto_increment primary key, 
  placa char(8) not null unique,
  email varchar(40) not null,
  ativo boolean default 0,
  marca varchar(20),
  modelo varchar(20),
  qtdViagens tinyint unsigned default 0,
  foreign key (email) references membros(email)
);

create table avaliacao (
  estrelas tinyint unsigned,
  mensagem varchar(140),
  avaliador varchar(40), 
  avaliado varchar(40),
  foreign key (avaliado) references membros(email),
  foreign key (avaliador) references membros(email)
);

create table caronas (
  id int auto_increment primary key,
  dataCarona datetime,
  rota tinyint unsigned,
  kilometragem numeric(3,1),
  veiculo int,
  qtdVagas tinyint unsigned default 1,
  foreign key (veiculo) references veiculos(id)
);

create table passageiros_carona (
  id int auto_increment
);