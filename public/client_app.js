// 클라이언트 측 JavaScript 코드 (client_app.js)

const addBookForm = document.getElementById('addBookForm');

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // 폼 입력값 가져오기
  const title = event.target.elements.title.value;
  const author = event.target.elements.author.value;
  const location = event.target.elements.location.value;

  // 서버로 데이터 전송
  fetch('/books/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, author, location })
  })
  .then((response) => {
    if (response.ok) {
      console.log('Book added successfully');
      // 페이지 새로고침
      location.reload();
    } else {
      console.error('Failed to add the book');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
