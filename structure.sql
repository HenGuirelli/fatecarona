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
  cor varchar(25),
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
  rota varchar(50),
  emailMotorista varchar(40),
  kilometragem numeric(3,1),
  acessibilidade boolean default 0,
  fumantes boolean default 0,
  musica boolean default 0,
  veiculo int,
  qtdVagas tinyint unsigned default 1,
  tipo varchar(25),
  status varchar(15),
  foreign key (veiculo) references veiculos(id),
  foreign key (emailMotorista) references membros(email)
);

create table membros_carona (
  id int,
  emailCaronista varchar(40),
  status char(9),
  foreign key (emailCaronista) references membros (email),
  foreign key (id) references caronas (id)
);

insert into veiculos (placa, email, ativo, marca, modelo, cor) values
  ('AAA-1111', 'thiago.ramos9', 1, 'Mercedes', 'SLK', 'preto'),
  ('BBB-2222', 'alexandre.santos67', 1, 'Fiat', 'Palio', 'vermelho'),
  ('CCC-3333', 'alexandre.santos67', 0, 'Fiat', 'Siena', 'branco');

insert into caronas (dataCarona, rota, emailMotorista, kilometragem, veiculo, qtdVagas, musica, tipo, status) values
  ("2018-04-15 10:08:28", "5abfbb953f4bbe6c741a195b", 'thiago.ramos9', 12.5, 1, 3, 1, "indo para a FATEC", "andamento"),
  ("2018-04-09 10:08:28", "5abfbb953f4bbe6c741a195b", 'alexandre.santos67', 12.5, 1, 3, 1, "indo para a FATEC", "pendente"),
  ("2018-05-25 10:08:28", "5acd5e718fc79a2d484721fb", 'alexandre.santos67', 12.5, 2, 3, 1, "saindo da FATEC", "pendente"),
  ("2018-05-25 16:30:00", "5acd5e718fc79a2d484721fb", 'thiago.ramos9', 12.5, 1, 3, 1, "saindo da FATEC", "pendente"),
  ("2018-05-25 13:15:00", "5acd5e718fc79a2d484721fb", 'antonio.souza26', 12.5, 3, 3, 1, "saindo da FATEC", "pendente"),
  ("2018-05-25 10:08:28", "5abfbb953f4bbe6c741a195b", 'alexandre.santos67', 12.5, 1, 3, 1, "saindo da FATEC", "pendente"),
  ("2018-04-22 15:08:28", "5abfbb953f4bbe6c741a195b", 'thiago.ramos9', 12.5, 1, 2, 0, "indo para a FATEC", "andamento");

insert into membros_carona values
  (1, 'alexandre.santos67', 'aceito'),
  (1, 'antonio.souza26', 'aceito'),
  (2, 'thiago.ramos9', 'aceito'),
  (2, 'antonio.souza26', 'aceito'),
  (5, 'alexandre.santos67', 'aceito'),
  (5, 'antonio.souza26', 'aceito');
