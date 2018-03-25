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
  (1680481522006, "Alexandre Cassiano dos Santos", "011955931212","Xandele", "ADS","alexandre.santos67", "avatar.jpg", "13:00:00", "18:00:00"),
  (1680481522040, "Antonio Ernando Siqueira de Souza Filho", "011955931212","Toninho", "ADS","antonio.souza26", "avatar.jpg", "13:00:00", "18:00:00");

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
  emailMotorista varchar(40),
  kilometragem numeric(3,1),
  acessibilidade boolean default 0,
  fumantes boolean default 0,
  musica boolean default 0,
  veiculo int,
  qtdVagas tinyint unsigned default 1,
  foreign key (veiculo) references veiculos(id),
  foreign key (emailMotorista) references membros(email)
);

create table membros_carona (
  id int,
  emailCaronista varchar(40),
  foreign key (emailCaronista) references membros (email),
  foreign key (id) references caronas (id)
);

insert into veiculos (placa, email, ativo, marca, modelo) values ('AAA-1111', 'alexandre.santos67', 1, 'Mercedes', 'SLK');

insert into caronas (dataCarona, rota, emailMotorista, kilometragem, veiculo, qtdVagas, musica)
  values (NOW(), 1, 'thiago.ramos9', 12.5, 1, 3, 1);

insert into membros_carona values
  (1, 'alexandre.santos67'),
  (1, 'antonio.souza26');
