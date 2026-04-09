const testRegistration = async () => {
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Agent Test',
                email: `test_${Date.now()}@example.com`,
                password: 'password123'
            })
        });
        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Data:', data);
    } catch (error) {
        console.log('Error:', error.message);
    }
};

testRegistration();
