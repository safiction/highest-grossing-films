import json
import psycopg2

conn = psycopg2.connect(
    dbname="movies_db",
    user="postgres",
    password="your_password",
    host="localhost",
    port="5432"
)

cur = conn.cursor()

with open("movies.json", "r", encoding="utf-8") as f:
    movies = json.load(f)

for movie in movies:
    cur.execute("""
        INSERT INTO films (
            title, release_year, director, box_office,
            country, language, duration_minutes, genre
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        movie.get("title"),
        movie.get("release_year"),
        movie.get("director"),
        movie.get("box_office"),
        movie.get("country"),
        movie.get("language"),
        movie.get("duration_minutes"),
        movie.get("genre")
    ))

conn.commit()
cur.close()
conn.close()