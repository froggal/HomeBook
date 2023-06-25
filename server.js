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

// 이전에 작성한 코드...

// 라우트 설정
app.get('/books/search', (req, res) => {
    const searchQuery = req.query.q;
  
    // 데이터베이스에서 검색 쿼리 실행
    const sql = `SELECT * FROM books WHERE title LIKE '%${searchQuery}%' OR author LIKE '%${searchQuery}%'`;
    db.all(sql, (err, rows) => {
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