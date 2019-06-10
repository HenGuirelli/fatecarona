drop database fatecarona;
create database Fatecarona;
use Fatecarona;

create table membros(
	email varchar(40) not null primary key,
	nome varchar(40) not null,
	telefone char(20),
	apelido varchar(20),
	img varchar(50),
	chegada time,
	saida time,
	motorista boolean default 0,
	cnh varchar(20),
	validadeCNH date,
	categoriaCNH char(2)
);

create table veiculos(
  placa char(8) not null primary key,
  email varchar(40) not null,
  marca varchar(20),
  modelo varchar(20),
  cor varchar(25),
  foreign key (email) references membros(email)
);

create table trajeto(
	id int primary key,
	email varchar(40) not null,
	nome varchar(40),
	origem varchar(100),
	destino varchar(100),
  	foreign key (email) references membros(email)
);

create table pontos_interesse (
	ponto varchar(100) not null,
	id_trajeto int not null,
	foreign key (id_trajeto) references trajeto(id)
);

create table caronas (
	id int auto_increment primary key,
	dataCarona datetime,
	horaCarona varchar(30),
	trajeto int,
	email varchar(40),
	cadeirante boolean,
	fumantes boolean,
	musica boolean,
	qtdVagas tinyint unsigned default 4,
    placa char(8) not null,
    destino varchar(10),
    agendado bool default false,
	`status` varchar(15) default 'PENDING',
	foreign key (email) references membros(email),
	foreign key (placa) references veiculos(placa),
	foreign key (trajeto) references trajeto(id)
);

create table dias_da_semana (
	id int not null primary key,
    nome varchar(20)
);

create table carona_agendada (
	id_carona int not null,
    id_dia_semana int not null,
    foreign key (id_carona) references caronas(id),
    foreign key (id_dia_semana) references dias_da_semana(id)
);

insert into dias_da_semana values (0, 'domingo'), (1, 'segunda'), (2, 'terça'), (3, 'quarta'), (4, 'quinta'), (5, 'sexta'), (6, 'sabado');

create table caronas_membros (
	id_carona int not null,
    email_membro varchar(40) not null,
    primary key (id_carona, email_membro),
    foreign key (id_carona) references caronas(id),
    foreign key (email_membro) references membros(email)
);


/*drop table notification;
drop table notification_type;*/

create table notification_type (
	id int primary key not null,
	type varchar(20) not null
);

insert into notification_type values (0, 'CARPOOL'), (1, 'CARPOOL_REQUEST'), (2, 'MESSAGE');

create table notification (
	id int primary key not null,
	title varchar(20) not null,
    `to` varchar(40) not null,
    `from` varchar(40),    
    text varchar(255),
    type int not null,
    carpoolId int, /* pode ser nulo */
    visualized bool default false,
    foreign key (type) references notification_type(id),
    foreign key (`to`) references membros(email),
    foreign key (`from`) references membros(email),
    foreign key (carpoolId) references caronas(id)
);

create table rating (
	ratedEmail varchar(30),
    raterEmail varchar(30),
    `comment` varchar(51),
    stars int,
    foreign key (ratedEmail) references membros(email),
    foreign key (raterEmail) references membros(email)
);


