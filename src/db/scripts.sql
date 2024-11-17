select * from movies;
delete from movies;


DELETE FROM movies WHERE strftime('%Y', release_date) = '2024';


SELECT strftime('%Y', release_date) as year, COUNT(*) as count 
FROM movies GROUP BY year ORDER BY YEAR DESC;

SELECT id, title, year, rating, poster_path
FROM (
  SELECT 
    id,
    title, 
    strftime('%Y', release_date) as year, 
    rating, 
    poster_path, 
    ROW_NUMBER() OVER (PARTITION BY strftime('%Y', release_date) ORDER BY rating DESC) AS ranking
  FROM movies
) AS ranked_movies
WHERE ranking <= 1
ORDER BY year DESC, rating DESC;


SELECT     
  strftime('%Y', release_date) as year, 
  count(*) as count
FROM movies
GROUP BY year
ORDER BY year DESC;