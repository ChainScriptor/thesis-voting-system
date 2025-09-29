// Debug script για το πρόβλημα login του 3ου χρήστη
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugUsers() {
    try {
        console.log('🔍 Checking existing users in database...\n');

        const users = await prisma.user.findMany({
            select: {
                id: true,
                clerkId: true,
                email: true,
                username: true,
                fullName: true,
                isAdmin: true
            },
            orderBy: { id: 'asc' }
        });

        console.log(`📊 Total users found: ${users.length}\n`);

        users.forEach((user, index) => {
            console.log(`👤 User ${index + 1}:`);
            console.log(`   ID: ${user.id}`);
            console.log(`   Clerk ID: ${user.clerkId}`);
            console.log(`   Email: ${user.email}`);
            console.log(`   Username: ${user.username}`);
            console.log(`   Full Name: ${user.fullName}`);
            console.log(`   Is Admin: ${user.isAdmin}`);
            console.log('');
        });

        // Έλεγχος για duplicate emails
        const emailCounts = {};
        const usernameCounts = {};

        users.forEach(user => {
            emailCounts[user.email] = (emailCounts[user.email] || 0) + 1;
            usernameCounts[user.username] = (usernameCounts[user.username] || 0) + 1;
        });

        console.log('🔍 Checking for duplicates...\n');

        const duplicateEmails = Object.entries(emailCounts).filter(([email, count]) => count > 1);
        const duplicateUsernames = Object.entries(usernameCounts).filter(([username, count]) => count > 1);

        if (duplicateEmails.length > 0) {
            console.log('❌ Duplicate emails found:');
            duplicateEmails.forEach(([email, count]) => {
                console.log(`   ${email}: ${count} times`);
            });
            console.log('');
        } else {
            console.log('✅ No duplicate emails found\n');
        }

        if (duplicateUsernames.length > 0) {
            console.log('❌ Duplicate usernames found:');
            duplicateUsernames.forEach(([username, count]) => {
                console.log(`   ${username}: ${count} times`);
            });
            console.log('');
        } else {
            console.log('✅ No duplicate usernames found\n');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

debugUsers();





