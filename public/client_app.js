const form = document.getElementById('addBookForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch('/books/add', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      console.log(data); // 응답 데이터 확인
      // 책 추가가 성공하면 필요한 동작을 수행
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
});
