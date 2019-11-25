create table alldays(
	id serial not null primary key,
	thedays text not null
);

create table mynames (
	id serial not null primary key,
    usernames text not null,
	alldays_id int,
	foreign key (alldays_id) references alldays(id)
);