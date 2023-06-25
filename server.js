const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('books.db');

// books 테이블 생성 (이미 생성된 경우 무시)
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, location TEXT)');
});

// 책 목록 조회 API
app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '서버 에러' });
    } else {
      res.json(rows);
    }
  });
});

// 책 추가 API
app.post('/books', (req, res) => {
  const { title, author, location } = req.body;

  if (!title || !author || !location) {
    res.status(400).json({ error: '제목, 저자, 위치는 필수 입력 항목입니다.' });
    return;
  }

  const query = 'INSERT INTO books (title, author, location) VALUES (?, ?, ?)';
  db.run(query, [title, author, location], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '서버 에러' });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// 책 상세 정보 조회 API
app.get('/books/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '서버 에러' });
    } else if (!row) {
      res.status(404).json({ error: '책을 찾을 수 없습니다.' });
    } else {
      res.json(row);
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
