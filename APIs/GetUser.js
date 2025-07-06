fetch('http://localhost:8000/api/users/1')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error('خطأ:', err));