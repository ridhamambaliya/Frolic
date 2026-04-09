const BASE_URL = 'http://localhost:3000';

const runTests = async () => {
    try {
        console.log('--- STARTING COMPREHENSIVE TEST ---');

        // 1. Register a new user
        const userData = {
            name: 'Test Coordinator',
            email: `coord_${Date.now()}@example.com`,
            password: 'password123'
        };
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const regData = await regRes.json();
        const coordId = regData.data.user.id;
        console.log('✅ User Registered:', coordId);

        // 2. Login as Admin
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@frolic.com',
                password: 'Admin@12345'
            })
        });
        const loginData = await loginRes.json();
        const adminToken = loginData.data.token;
        console.log('✅ Admin Logged In');

        // 3. Create Institute
        const instData = {
            name: 'Test University',
            code: `TU${Date.now()}`,
            city: 'Test City',
            coordinator: coordId,
            status: 'Active',
            description: 'Test Description'
        };
        const instRes = await fetch(`${BASE_URL}/institute`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify(instData)
        });
        const instResult = await instRes.json();
        const instId = instResult.data._id;
        console.log('✅ Institute Created:', instId);

        // 4. Create Department
        const deptData = {
            name: 'Test Department',
            institute: instId,
            coordinator: coordId, // Reusing coord for simplicity
            status: 'Active',
            description: 'Dept Description'
        };
        const deptRes = await fetch(`${BASE_URL}/department`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify(deptData)
        });
        const deptResult = await deptRes.json();
        const deptId = deptResult.data._id;
        console.log('✅ Department Created:', deptId);

        // 5. Create Event
        const eventData = {
            name: 'Test Event',
            tagline: 'Cool Tagline',
            description: 'Event Description',
            category: 'Technical',
            date: new Date().toISOString(),
            location: 'Main Hall',
            department: deptId,
            institute: instId,
            coordinator: coordId,
            fees: 100,
            participationType: 'solo',
            maxGroupsAllowed: 50,
            status: 'Active'
        };
        const eventRes = await fetch(`${BASE_URL}/event`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify(eventData)
        });
        const eventResult = await eventRes.json();
        console.log('✅ Event Created:', eventResult.data._id);

        console.log('--- ALL FUNCTIONAL TESTS PASSED ---');
    } catch (error) {
        console.error('❌ TEST FAILED:', error.message);
        process.exit(1);
    }
};

runTests();
