const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

// 데이터베이스 연결 설정
const db = new sqlite3.Database('books.db');

// 라우트 설정
app.get('/books', (req, res) => {
  // 데이터베이스에서 모든 책 정보 조회
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
