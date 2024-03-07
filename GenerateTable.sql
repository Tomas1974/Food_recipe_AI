DROP SCHEMA IF EXISTS recipes CASCADE;
CREATE SCHEMA IF NOT EXISTS recipes;
DROP TABLE IF EXISTS recipes.id;
DROP TABLE IF EXISTS recipes.name;
DROP TABLE IF EXISTS recipes.text;

create table recipes.all
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(50)  NOT NULL,
    text       TEXT      NOT NULL
);

INSERT INTO recipes.all (name, text)
VALUES ('Boller i karry', 'Det skal bare koges');