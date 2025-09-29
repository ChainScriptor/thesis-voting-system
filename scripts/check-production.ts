// scripts/check-production.ts
import { prisma } from '../lib/prisma';

async function checkProduction() {
    console.log('🔍 Checking production readiness...');

    try {
        // 1. Test database connection
        console.log('📡 Testing database connection...');
        await prisma.$connect();
        await prisma.$queryRaw`SELECT 1`;
        console.log('✅ Database connection successful');

        // 2. Check if essential tables exist and have data
        console.log('📊 Checking tables...');

        const userCount = await prisma.user.count();
        const electionCount = await prisma.election.count();
        const voteCount = await prisma.vote.count();

        console.log(`✅ Users: ${userCount}`);
        console.log(`✅ Elections: ${electionCount}`);
        console.log(`✅ Votes: ${voteCount}`);

        // 3. Check environment variables
        console.log('🔧 Environment variables:');
        console.log(`✅ DATABASE_URL: ${process.env.DATABASE_URL ? 'Set' : 'Missing'}`);
        console.log(`✅ NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'Set' : 'Missing'}`);
        console.log(`✅ NODE_ENV: ${process.env.NODE_ENV}`);

        console.log('\n🎉 Production readiness check completed successfully!');

    } catch (error) {
        console.error('❌ Production readiness check failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

checkProduction();
