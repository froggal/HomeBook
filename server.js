const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const app = express();
const port = 8080;
const path = require('path');

// 데이터베이스 연결 설정
const db = new sqlite3.Database('books.db');

// public static 설정
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// JSON 데이터 파싱을 위한 미들웨어 설정
app.use(express.json());

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 라우트 설정 - 책 추가
app.post('/books/add', (req, res) => {
  const { title, author, location } = req.body;

  // 데이터베이스에 새로운 책 추가
  const sql = `INSERT INTO books (title, author, location) VALUES (?, ?, ?)`;
  db.run(sql, [title, author, location], function (err) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      // 책 추가 성공
      res.send('Book added successfully');
    }
  });
});

// 라우트 설정 - 책 검색 & 포맷팅
const fs = require('fs');

app.set('view engine', 'ejs');

app.get('/books/search', (req, res) => {
  const searchQuery = req.query.q;

  const sql = `SELECT * FROM books WHERE title LIKE '%${searchQuery}%' OR author LIKE '%${searchQuery}%'`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      const formattedRows = rows.map(row => {
        return {
          '제목': row.title,
          '저자': row.author,
          '위치': row.location
        };
      });

      // HTML 템플릿 파일을 읽어옵니다.
      const templatePath = path.join(__dirname, 'views', 'search-results.html');
      fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          // 검색 결과를 템플릿에 삽입하여 HTML을 생성합니다.
          const renderedHTML = ejs.render(template, { results: formattedRows });

          // 생성된 HTML을 클라이언트에 전달합니다.
          res.set('Content-Type', 'text/html; charset=utf-8');
          res.send(renderedHTML);
        }
      });
    }
  });
});

// 서버 시작
const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// 데이터베이스 연결 종료
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Database connection closed');
    }
    server.close(() => {
      console.log('Server stopped');
      process.exit();
    });
  });
});