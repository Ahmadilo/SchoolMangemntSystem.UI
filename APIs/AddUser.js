const apiUrl = 'http://localhost:8000/api/users'; // عدّل المسار حسب السيرفر عندك
const apiUrl2 = 'http://localhost:8000'; // عدّل المسار حسب السيرفر عندك

const newUser = {
    username: 'john_doe',
    password: 'secret123',
    role: 'Student'
};

fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        // إذا كنت تستخدم Laravel Sanctum أو Token Authentication، أضف Authorization هنا
        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
    },
    body: JSON.stringify(newUser)
})
.then(response => {
    if (!response.ok) {
        // استخراج الأخطاء من JSON
        return response.json().then(err => { throw err; });
    }
    return response.json();
})
.then(data => {
    console.log('✅ تم إنشاء المستخدم بنجاح:', data);
})
.catch(error => {
    console.error('❌ حدث خطأ أثناء إنشاء المستخدم:', error);
});