# Highest Grossing Films Analysis and Visualization
Assignment for "Data Wrangling and Visualization" course

## Data Pipeline Overview

### 1. Data Collection

Movie data was scraped from Wikipedia using the **BeautifulSoup** library in Python. Fields (title, release year, director, box office, country, language, duration, genre) were extracted.

### 2. Data Cleaning
The raw data was processed and cleaned:

* Removed unnecessary symbols (e.g., currency signs in box office)
* Standardized formats (e.g., numeric values for revenue and duration)
* Ensured consistency across all records

The cleaned dataset was then saved as a `movies.json` file.

### 3. Database Setup
A PostgreSQL database was created using pgAdmin. A single table `films` was designed to store all relevant attributes:

* `id` (Primary Key)
* `title`
* `release_year`
* `director`
* `box_office`
* `country`
* `language`
* `duration_minutes`
* `genre`

### 4. Data Loading
A Python script (`load_to_db.py`) was used to load the data from `movies.json` into PostgreSQL using `psycopg2`.

### 5. Installation & Running
Install required dependencies:

```bash
pip install psycopg2-binary
```

Run the data loading script:

```bash
py load_to_db.py
```
