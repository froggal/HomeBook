const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 연결 설정
const db = new sqlite3.Database('books.db');

// DELETE 문 실행
const sql = 'DELETE FROM books';
db.run(sql, function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log('All records deleted successfully');
  }
});

// 데이터베이스 연결 종료
db.close();
