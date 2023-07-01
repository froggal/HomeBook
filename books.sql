-- books 테이블 생성
CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  author TEXT,
  location TEXT
);

-- 초기 데이터 추가
INSERT INTO books (title, author, location) VALUES
  ('Book 1', 'Author 1', 'Shelf A'),
  ('Book 2', 'Author 2', 'Shelf B'),
  ('Book 3', 'Author 3', 'Shelf C');