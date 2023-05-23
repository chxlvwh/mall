/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return {
            fallback: [
                {
                    source: '/api',
                    destination: `http://localhost:3002/api`
                }
            ]
        };
    }
};

module.exports = nextConfig;
