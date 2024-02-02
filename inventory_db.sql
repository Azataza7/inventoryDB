create schema inventory_db;
alter
    schema inventory_db collate utf8mb4_general_ci;

create table inventory_db.category
(
    id            INT auto_increment PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description   TEXT        NUll
);

create table inventory_db.location
(
    id           INT auto_increment PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL,
    description  TEXT        NULL
);

create table inventory_db.inventory_items
(
    id                INT auto_increment PRIMARY KEY,
    category_id       INT         NOT NULL,
    location_id       INT         NOT NULL,
    item_name         VARCHAR(50) NOT NULL,
    description       TEXT        NULL,
    date_registration VARCHAR(50) NOT NULL
);

alter table inventory_db.inventory_items
    add constraint category_id_fk
        foreign key (category_id) references category (id);

alter table inventory_db.inventory_items
    add constraint location_id_fk
        foreign key (location_id) references location (id);

INSERT INTO inventory_db.category (id, category_name, description)
VALUES (60, 'Computer components', 'cables,CPUs,GPUs, display, routers');
INSERT INTO inventory_db.category (id, category_name)
VALUES (61, 'Marketing');
INSERT INTO inventory_db.category (id, category_name, description)
VALUES (62, 'Furniture', 'Coaches, tables, chairs and more');

INSERT INTO inventory_db.location (id, section_name, description)
VALUES (40, 'Director room', 'the place where makes all decisions');
INSERT INTO inventory_db.location (id, section_name, description)
VALUES (41, 'Warehouse', 'all products saving here');
INSERT INTO inventory_db.location (id, section_name, description)
VALUES (42, 'Kitchen', 'actually here makes all decisions and rumors');

INSERT INTO inventory_db.inventory_items (category_id, location_id, item_name, description, date_registration)
VALUES (60, 40, 'PC Asus', 'Just pc nothing special', '2023-02-22');
INSERT INTO inventory_db.inventory_items (category_id, location_id, item_name, date_registration)
VALUES (60, 42, 'TV remoter', '2019-08-14');
INSERT INTO inventory_db.inventory_items (category_id, location_id, item_name, description, date_registration)
VALUES (61, 41, 'Posters', 'Advertisement posters', '2024-01-10');
INSERT INTO inventory_db.inventory_items (category_id, location_id, item_name, description, date_registration)
VALUES (62, 42, 'Table', 'table made by designer', '2010-06-01');

