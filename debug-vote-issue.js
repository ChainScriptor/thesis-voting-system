// Debug script για το πρόβλημα ψηφοφορίας
import http from 'http';

console.log('Debugging Vote Issue...\n');

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

    // Test 2: Check elections endpoint
    console.log('\n2. Testing elections endpoint...');
    const electionsOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/elections/filtered',
        method: 'GET',
        headers: {
            'Cookie': 'session=test' // Basic auth header
        }
    };

    const electionsReq = http.request(electionsOptions, (electionsRes) => {
        console.log(`✅ Elections endpoint accessible (Status: ${electionsRes.statusCode})`);

        let data = '';
        electionsRes.on('data', (chunk) => {
            data += chunk.toString();
        });

        electionsRes.on('end', () => {
            try {
                const elections = JSON.parse(data);
                console.log(`📊 Found ${elections.length} elections`);

                if (elections.length > 0) {
                    const firstElection = elections[0];
                    console.log(`📋 First election: ${firstElection.title} (ID: ${firstElection.id})`);

                    // Test 3: Check specific election details
                    console.log('\n3. Testing specific election endpoint...');
                    const electionOptions = {
                        hostname: 'localhost',
                        port: 3000,
                        path: `/api/elections/${firstElection.id}`,
                        method: 'GET'
                    };

                    const electionReq = http.request(electionOptions, (electionRes) => {
                        console.log(`✅ Election details accessible (Status: ${electionRes.statusCode})`);

                        let electionData = '';
                        electionRes.on('data', (chunk) => {
                            electionData += chunk.toString();
                        });

                        electionRes.on('end', () => {
                            try {
                                const election = JSON.parse(electionData);
                                console.log(`📊 Election "${election.title}" has ${election.candidates.length} candidates`);

                                if (election.candidates.length === 0) {
                                    console.log('❌ PROBLEM: No candidates found!');
                                    console.log('💡 Solution: Add candidates to this election first');
                                } else {
                                    console.log('✅ Candidates found:');
                                    election.candidates.forEach((candidate, index) => {
                                        console.log(`   ${index + 1}. ${candidate.name} (${candidate.email})`);
                                    });
                                }
                            } catch (error) {
                                console.log('❌ Error parsing election data:', error.message);
                            }
                        });
                    });

                    electionReq.on('error', (err) => {
                        console.log(`❌ Election endpoint error: ${err.message}`);
                    });

                    electionReq.end();
                } else {
                    console.log('❌ PROBLEM: No elections found!');
                    console.log('💡 Solution: Create some elections first');
                }
            } catch (error) {
                console.log('❌ Error parsing elections data:', error.message);
            }
        });
    });

    electionsReq.on('error', (err) => {
        console.log(`❌ Elections endpoint error: ${err.message}`);
    });

    electionsReq.end();
});

req.on('error', (err) => {
    console.log(`❌ Server connection error: ${err.message}`);
});

req.end();

console.log('\n4. Common Issues & Solutions:');
console.log('   - No candidates: Add candidates to the election');
console.log('   - Authentication: Make sure user is logged in');
console.log('   - Database: Check if database is running');
console.log('   - Network: Check if localhost:3000 is accessible');
