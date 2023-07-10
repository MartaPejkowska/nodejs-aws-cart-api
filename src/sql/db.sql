CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create type IF NOT EXISTS status as enum ('OPEN', 'ORDERED');

create table IF NOT EXISTS carts(
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null ,
	created_at date not null,
	updated_at date not null,
	status status,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

create table IF NOT EXISTS cart_items(
    cart_id uuid not null,
    product_id uuid not null,
    count integer ,
    FOREIGN KEY (cart_id) REFERENCES carts(id)
);

create table IF NOT EXISTS orders (
    id uuid not null default uuid_generate_v4() primary key,
    user_id uuid,
    cart_id uuid,
    payment JSON,
    delivery JSON,
    comments text,
    status status,
    total integer,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    );
create table IF NOT EXISTS users (
	id uuid not null default uuid_generate_v4() primary key,
	firstName text not null,
	lastName text not null,
	adress text not null,
	created_at date not null,
)

insert into carts(user_id,created_at,updated_at,status)
    values
    ('20e3ac50-cbee-4983-9d60-556bb6d08eff','2022-10-20', '2023-07-05','ORDERED'),
    ('96e2b16b-c010-48a5-88cf-2e1d1d3f3a04','2023-06-20', '2023-07-04','OPEN'),
    ('4298d62d-bb29-4373-b5d2-d399a772e03e','2023-07-02', '2023-07-06','ORDERED'),
    ('5fd3ee8e-af69-4db3-8cad-6a1dcb8abf75','2023-07-05', '2023-07-06','OPEN'),
    ('3038f47f-2715-4f99-8c51-9a18029fd53f','2023-06-29', '2023-07-01','ORDERED')

insert into cart_items (cart_id,product_id,count)
	values
	('dbf4a8b2-edce-46b0-a689-558cfa2faa21','18771056-185f-485c-a891-74e47a8ea855',10),
	('4ceb9aea-3051-418c-bc29-4cea330825dd','cdb06d59-e4b7-4835-b82a-804679a15876',12),
	('35925a77-698a-419b-b4bc-a93cf923e1c8','371a6d08-97ff-4b4d-a08e-d2ad53d413c2',5),
	('21fa74de-aa51-4570-b8fc-372ba17efbbb','3c799d51-9c85-435b-bbd8-d43aacd8a1f7',1),
	('1951fdf1-a376-4551-955c-efa7d70c2ad8','a8c60df2-19ac-4ddf-8702-07f1f3ab97da',8)

insert into orders (user_id, cart_id , payment, delivery, comments, status, total)
 	values
 	('20e3ac50-cbee-4983-9d60-556bb6d08eff','dbf4a8b2-edce-46b0-a689-558cfa2faa21','{"type": "PayU", "address:blabla","creditCard": "no" }','{"type":"delivery man","address":"blabla"}','awesome','ORDERED',255),
 	('96e2b16b-c010-48a5-88cf-2e1d1d3f3a04','4ceb9aea-3051-418c-bc29-4cea330825dd','{"type": "Blik", "address:blabla 15","creditCard": "no" }','{"type":"delivery man","address":"blabla 15"}','too long','OPEN',205),
 	('4298d62d-bb29-4373-b5d2-d399a772e03e','35925a77-698a-419b-b4bc-a93cf923e1c8','{"type": "card", "address:blabla 20","creditCard": "15315145" }','{"type":"INPOST","address":"blabla 20"}','expensive','ORDERED',50),
 	('5fd3ee8e-af69-4db3-8cad-6a1dcb8abf75','21fa74de-aa51-4570-b8fc-372ba17efbbb','{"type": "PayU", "address:blabla 45","creditCard": "no" }','{"type":"INPOST","address":"blabla 45"}','great','OPEN',25),
 	('3038f47f-2715-4f99-8c51-9a18029fd53f','1951fdf1-a376-4551-955c-efa7d70c2ad8','{"type": "Blik", "address:blabla 1","creditCard": "no" }','{"type":"delivery man","address":"blabla 1"}','ehh','ORDERED',150)

insert into users (firstname ,lastname , adress, created_at)
	values
	('Marta','Wisniewska','blabla', '2018-12-31'),
	('Zosia','Kowalska','blabla 15', '2017-10-21'),
	('Piotr','Zakoscielny','blabla 20', '2020-08-11'),
	('Michal','Kaminski','blabla 45', '2021-07-01'),
	('Tomasz','Natanek','blabla 1', '2022-01-12')


