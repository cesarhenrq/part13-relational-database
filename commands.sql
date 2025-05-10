CREATE TABLE blogs(
    id SERIAL PRIMARY KEY, 
    author text, url text NOT NULL, 
    title text NOT NULL, 
    likes INT DEFAULT 0
);
INSERT INTO 
    blogs(author, url, title, likes) 
    VALUES ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 'TDD harms architecture', 0), 
            ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7);