create table names(
	id serial not null primary key,
	usernames text not null
);

create table mydays (
	id serial not null primary key,
    thedays text not null,
	names_id int,
	foreign key (names_id) references names(id)
);

create table finaldatas (
	id serial not null primary key,
    userdays text not null
);