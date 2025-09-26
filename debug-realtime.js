// Simple Node.js script to test the real-time system
const http = require('http');

console.log('Testing Real-time Poll System...\n');

// Test 1: Check if server is running
console.log('1. Testing server connection...');
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`✅ Server is running (Status: ${res.statusCode})`);

    // Test 2: Check SSE endpoint
    console.log('\n2. Testing SSE endpoint...');
    const sseOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/polls-events',
        method: 'GET',
        headers: {
            'Accept': 'text/event-stream',
            'Cache-Control': 'no-cache'
        }
    };

    const sseReq = http.request(sseOptions, (sseRes) => {
        console.log(`✅ SSE endpoint accessible (Status: ${sseRes.statusCode})`);
        console.log(`   Content-Type: ${sseRes.headers['content-type']}`);

        let data = '';
        sseRes.on('data', (chunk) => {
            data += chunk.toString();
            if (data.includes('connected')) {
                console.log('✅ SSE connection message received');
                console.log(`   Data: ${data.trim()}`);
            }
        });

        sseRes.on('end', () => {
            console.log('✅ SSE stream ended');
        });

        // Close after 3 seconds
        setTimeout(() => {
            sseReq.destroy();
        }, 3000);
    });

    sseReq.on('error', (err) => {
        console.log(`❌ SSE endpoint error: ${err.message}`);
    });

    sseReq.end();
});

req.on('error', (err) => {
    console.log(`❌ Server connection error: ${err.message}`);
});

req.end();

console.log('\n3. Instructions for manual testing:');
console.log('   - Open two browser tabs');
console.log('   - In tab 1: Go to http://localhost:3000');
console.log('   - In tab 2: Go to http://localhost:3000/admin/polls');
console.log('   - Create a poll in tab 2');
console.log('   - Check if it appears in tab 1 without refresh');
console.log('   - Check browser console for debug messages');

