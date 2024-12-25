document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Save JWT
            window.location.href = '/admin/dashboard'; // Redirect to admin dashboard
        } else {
            document.getElementById('error-message').innerText = data.message;
            document.getElementById('error-message').style.display = 'block';
        }
    } catch (err) {
        console.error('Error:', err);
    }
});
