fetch('http://localhost:8000/api/users/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: 'john_doe_updated',
        password: 'newsecret',
        role: 'Teacher',
        is_active: true
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
