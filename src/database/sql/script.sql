-- Materia: Arquitectura de Software
-- UAGRM - FICCT
-- @author: Ruddy Bryan Quispe Mamani 
-- @version: 0.0.1
-- @since: 03-05-2021

-- ******** CREACION DEL USUARIO O ROL ******** 

CREATE ROLE biblioteca_municipal
   WITH
   LOGIN
   INHERIT
   REPLICATION
   CONNECTION LIMIT -1
   PASSWORD 'b6200836-fea7-4a86-9d33-107d08655f33';

-- ********* CREACION DE LA BD *************
CREATE DATABASE biblioteca_municipal
   with owner=biblioteca_municipal
   encoding='UTF8'
   tablespace=pg_default
   CONNECTION LIMIT=-1;

-- ********* IMPLEMENTACION DE LA BASE DE DATOS *****************
create table usuario_lector(
	ci integer not null primary key,
	nombre text not null,
	apellidos text not null,
	email text not null,
	telefono varchar(8) not null
);

create table categoria(
	id serial not null primary key,
	descripcion text not null
);

insert into categoria(descripcion) values ('novela');
insert into categoria(descripcion) values ('terror');
insert into categoria(descripcion) values ('infantil');

create table libro(
	codigo serial not null primary key,
	autor text not null,
	titulo text not null,
	descripcion text not null,
	edicion varchar(5) not null,
	stock integer not null,
	estado boolean not null,
	id_categoria integer not null,
	foreign key (id_categoria) references categoria(id)
	on update cascade
	on delete cascade
);

insert into libro(autor, titulo, descripcion, edicion, stock,estado,id_categoria) values ('Alcides Arguedas', 'Lo que el agua se LLevo', 'Libro del agua se llevo','3ra', 1, true, 1) returning codigo;
insert into libro(autor, titulo, descripcion, edicion, stock,estado,id_categoria) values ('Kobey Bryant', 'Lo que la anotacion se LLevo', 'Libro del exito en el basquet','8va', 3, false, 2) returning codigo;

create table prestamo_libro(
	nro_solicitud serial primary key,
	fecha date not null,
	cant_dias_prestamo integer not null,
	ci_usuario_lector integer not null,
	foreign key (ci_usuario_lector) references usuario_lector(ci)
	on update cascade
	on delete cascade
);

create table lista_libros(
	nro_solicitud integer not null,
	codigo_libro integer not null,
	primary key (nro_solicitud, codigo_libro),
	foreign key (nro_solicitud) references solicitud_prestamo(nro_solicitud)
	on update cascade
	on delete cascade,
	foreign key (codigo_libro) references libro(codigo)
	on update cascade
	on delete cascade
);

create table ampliacion_prestamo(
	codigo_ampliacion serial not null,
	nro_solicitud integer not null,
	cant_dias_ampliacion integer not null check(cant_dias_ampliacion>0),
	primary key(codigo_ampliacion, nro_solicitud),
	foreign key (nro_solicitud) references solicitud_prestamo(nro_solicitud)
	on update cascade
	on delete cascade
);
