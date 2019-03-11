drop database fatecarona;
create database Fatecarona;
use Fatecarona;

create table membros(
	email varchar(40) not null primary key,
	nome varchar(40) not null,
	telefone char(15),
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
	data_carona datetime,
	hora_carona varchar(30),
	placa_veiculo varchar(8) not null,
	trajeto int,
	email varchar(40),
	cadeirante boolean,
	fumante boolean,
	musica boolean,
	status varchar(15) default 'ativo',
    destino varchar(20),
	foreign key (email) references membros(email),
	foreign key (placa_veiculo) references veiculos(placa),
	foreign key (trajeto) references trajeto(id)
);
/*drop table caronas_membros;*/
create table caronas_membros (
	id_carona int not null,
    email_membro varchar(40) not null,
    primary key (id_carona, email_membro),
    foreign key (id_carona) references caronas(id),
    foreign key (email_membro) references membros(email)
);


