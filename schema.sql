CREATE TABLE films (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    release_year INTEGER,
    director TEXT,
    box_office BIGINT,
    country TEXT,
    language TEXT,
    duration_minutes INTEGER,
    genre TEXT
);