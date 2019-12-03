create table alldayzz(
	id serial not null primary key,
	thedays text not null,
	counters int not null
);

create table mynamezz (
	id serial not null primary key,
    usernames text not null,
	alldayzz_id int,
	foreign key (alldayzz_id) references alldayzz(id)
);


insert into alldayzz(thedays,counters) values('monday',0);