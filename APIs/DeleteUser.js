fetch('http://localhost:8000/api/users/1', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));