drop database fatecarona2;
create database fatecarona2;
use fatecarona2;

SET SQL_SAFE_UPDATES=0;

create table contas (
    email varchar(50) primary key,
    senha varchar(50),
	nome varchar(40),
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

create table veiculos (
	placa char(8) not null primary key,
	email varchar(40) not null,
	marca varchar(20),
	modelo varchar(20),
	cor varchar(25),
	foreign key (email) references contas(email)
);

create table trajetos (
	id int auto_increment primary key,
	email varchar(40) not null,
	nome varchar(40),
	origem varchar(100),
	destino varchar(100),
  	foreign key (email) references contas(email)
);

create table pontos_de_interesse (
	id_trajeto int not null,
    `local` varchar(50),
    foreign key (id_trajeto) references trajetos(id) 
);


create table caronas (
	 id int auto_increment primary key,
     motorista varchar(50),
     veiculo char(8),
     trajeto int,
     
     `data` date,
	 hora time,
     destino varchar(20),
     
     permitido_fumar bool default false,
     permitido_musica_alta bool default false,
     permitido_cadeira_rodas bool default false,
     
     eh_semanal bool default false,
     
     segunda bool default false,
     terca bool default false,
     quarta bool default false,
     quinta bool default false,
     sexta bool default false,
     sabado bool default false,
     domingo bool default false,     
     
     foreign key (motorista) references contas(email),
     foreign key (veiculo) references veiculos(placa),
     foreign key (trajeto) references trajetos(id)
);

delimiter $
CREATE TRIGGER apagar_pontos_interesse before delete
ON trajetos
FOR EACH ROW
BEGIN
	delete from pontos_de_interesse where id_trajeto = OLD.id;
END$

CREATE TRIGGER apagar_carona BEFORE DELETE
ON caronas
FOR EACH ROW
BEGIN
	DELETE FROM pedidos_carona WHERE id_carona = OLD.id;
END$
delimiter ;


create table passageiros (
	passageiro varchar(50),
    id_carona int,
    foreign key (passageiro) references contas(email),
    foreign key (id_carona) references caronas(id)
);

create table pedidos_carona (
	id_carona int,
    email_passageiro varchar(50),
    
    foreign key (id_carona) references caronas(id),
    foreign key (email_passageiro) references contas(email),
    primary key (id_carona, email_passageiro)
);

delimiter $
CREATE PROCEDURE ACEITAR_PEDIDO_CARONA(IN ID INT, IN EMAIL_PASSAGEIRO VARCHAR(50))
BEGIN
	DELETE FROM PEDIDOS_CARONA WHERE ID_CARONA = ID AND EMAIL_PASSAGEIRO = EMAIL_PASSAGEIRO;
    INSERT INTO PASSAGEIROS(PASSAGEIRO, ID_CARONA) VALUES (EMAIL_PASSAGEIRO, ID);
END$
delimiter ;

ALTER TABLE CARONAS ADD COLUMN FINALIZADA BOOL DEFAULT FALSE;
